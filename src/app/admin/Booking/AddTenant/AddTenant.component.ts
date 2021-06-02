import { Component, OnInit } from '@angular/core';
import { DatosService } from '../../../../datos.service';
import { LoaderComponent } from '../../../../ts/loader';
import { SystemMessage } from '../../../../ts/systemMessage';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import * as CryptoJS from 'crypto-js';
import { Utils } from '../../../utils/utils';
import { Router } from '@angular/router';

@Component({
    selector: 'add-tenant-component',
    templateUrl: './AddTenant.component.html',
    styleUrls: ['./AddTenant.component.scss']
}) export class AddTenantComponent implements OnInit {

    public loader: LoaderComponent = new LoaderComponent();
    public system_message: SystemMessage = new SystemMessage();
    public table_services_resumen: any[] = ['icon','service','type','lapse','sdate','edate','ammount'];

    constructor(
        public _services: DatosService,
        public _router: Router
    ) {}

    dispalyMemberships = false;
    emailExist = false;


    /*Welcome back Mr.Anderson we missed you.*/
    ngOnInit() {

        this.getAddTenantData();
        this.getToday();

    }

    public builds_list: any[];
    public getAddTenantData():void {

        this.loader.showLoader();

        this._services.service_general_get('Tenant/GetBuilds')
            .subscribe( (response: any) => {

                if( response.result == 'Sucess' ) {

                    this.builds_list = response.item;

                }

                this.loader.hideLoader();

            }, (error: any) => {

                this.system_message.showMessage({
                    kind: 'error',
                    time: 4777,
                    message: {
                        header: 'Fatal Error',
                        text: 'Error Fatal'
                    }
                });

            });

    }

    public build_selected = null;
    public current_build: any;
    public buildSelected( event_data: any ):void {

        const build_selected = event_data.target; 

        this.builds_list.forEach( (build: any) => {

            if( build_selected.value == build.id ) {
                
                this.build_selected = build.id;
                this.current_build = build;
                this.getTypeRoomCatalog();
                this.getRoomateTypeCatalog();
                this.able_section_two = false;
                this.additional_services_selected = [];
                this.all_services_selected = [];
                this.total_services_ammount = 0;

            }

        });

    }

    public typesrooms_catalog: any[] = [];
    public getTypeRoomCatalog():void {

        const ws_data = {
            buildingId: this.current_build.id
        }

        this._services.service_general_get_with_params('TypeRoom', ws_data)
            .subscribe( (response: any) => {

                if( response.result == 'Success' ) {

                    this.typesrooms_catalog = response.item;

                } else {

                    this.system_message.showMessage({
                        kind: 'error',
                        time: 4777,
                        message: {
                            header: 'Fatal Error',
                            text: 'Required data can not load correctly. Reload page or try later.'
                        }
                    });                    

                }

            }, (error: any) => {

                this.system_message.showMessage({
                    kind: 'error',
                    time: 4777,
                    message: {
                        header: 'Error Fatal',
                        text: 'Can not load catalogs.'
                    }
                });

            });

    }

    public roomates_catalog: any[] = [];
    public getRoomateTypeCatalog():void {

        this._services.service_general_get('Tenant/GetRoomate')
            .subscribe( (response: any) => {

                if( response.result == 'Sucess' ) {

                    this.roomates_catalog = response.item;

                } else {

                    this.system_message.showMessage({
                        kind: 'error',
                        time: 4777,
                        message: {
                            header: 'Fatal Error',
                            text: 'Required data can not load correctly. Reload page or try later.'
                        }
                    });                    

                }

            }, (error: any) => {

                this.system_message.showMessage({
                    kind: 'error',
                    time: 4777,
                    message: {
                        header: 'Error Fatal',
                        text: 'Can not load catalogs.'
                    }
                });

            });

    }

    public show_beds_section: boolean = false;
    public beds_to_add: any[] = [];
    public setBedsSelected( event_data: any ):any {

        this.beds_to_add = [];

        const root_event = event_data.target;

        if( root_event.value != 0 ) {

            this.show_beds_section = true;

            for( let bed = 0; bed < root_event.value; bed += 1 ) {

                const add_new_bed = {
                    email: '',
                    lastName: '',
                    motherName: '',
                    name: '',
                    birth: this.today,
                    idBooking: null,
                    active: null,
                    phone: '',
                    genderId: '0'
                }

                this.beds_to_add.push( add_new_bed );

            }

        } else {

            this.show_beds_section = false;

        }

    }


    public booking_data: BookingDetailModel = new BookingDetailModel();
    public validateBookingDetailForm():void {

        this.room_selected = null;
        this.membership_selected = null;
        this.additional_services_section = false;
        this.additional_services_selected = [];
        this.all_services_selected = [];
        this.total_services_ammount = 0;

        const validations_booking_detail = {
            form_booking_detail: this.formBookingDetailValidator( this.booking_data ),
            form_booking_beds: this.bedsFormValidator() 
        }

        if( validations_booking_detail.form_booking_detail && validations_booking_detail.form_booking_beds ) {

            this.getMembershipsAndRoomsData();
            this.ableBookingDetail( true );

        } else {

            this.system_message.showMessage({
                kind: 'error',
                time: 4777,
                message: {
                    header: 'Required data',
                    text: 'All inputs must be filled to continue.'
                }
            });

        }

    }

    public able_section_two: boolean = false;
    public ableBookingDetail( to_edit: boolean ):void {

        if( to_edit ) {

            this.able_section_two = true;

        } else {

            this.able_section_two = false;

        }

    }

    public bt_form_data: any = {
        no_sdat: false,
        no_edat: false,
        no_beds: false,
        no_rtyp: false,
        no_gend: false,
        no_smok: false,
        no_pets: false,
        no_room: false
    } 
    public formBookingDetailValidator( form_data: BookingDetailModel ):boolean {

        let result: boolean = false;

        form_data.startDate == '' || form_data.startDate == undefined ?
            this.bt_form_data.no_sdat = true : this.bt_form_data.no_sdat = false; 

        form_data.finishDate == '' || form_data.finishDate == undefined ?
            this.bt_form_data.no_edat = true : this.bt_form_data.no_edat = false;

        form_data.roomateFlip == null || form_data.roomateFlip == undefined ?
            this.bt_form_data.no_rtyp = true : this.bt_form_data.no_rtyp = false;

        form_data.pets == null || form_data.pets == undefined ?
            this.bt_form_data.no_pets = true : this.bt_form_data.no_pets = false;

        form_data.roomType == null || form_data.roomType == undefined ?
            this.bt_form_data.no_room = true : this.bt_form_data.no_room = false;

        form_data.smoke == null || form_data.smoke == undefined ?
            this.bt_form_data.no_smok = true : this.bt_form_data.no_smok = false;

        form_data.roomatePreferences == null || form_data.roomatePreferences == undefined ?
            this.bt_form_data.no_gend = true : this.bt_form_data.no_gend = false;

        form_data.totalBeds == null || form_data.totalBeds == undefined ?
            this.bt_form_data.no_beds = true : this.bt_form_data.no_beds = false;

        for( let field in this.bt_form_data ) {

            if( this.bt_form_data[field] ) return false;
            else result = true;

        }

        return result;

    }

    public bedsFormValidator():boolean {

        let result = true;

        const beds: any = document.querySelectorAll('[bed="additional"]');

              beds.forEach( (bed: any, index: number) => {

                const bed_inputs = bed.querySelectorAll('input'),
                      bed_select = bed.querySelectorAll('select'),
                      bed_in = this.beds_to_add[index];

                bed_in.idBooking = this.current_build.id;
                bed_in.active = true;

                bed_inputs[0].value == '' ?
                    bed_in.name = 'no_data' : bed_in.name = bed_inputs[0].value;

                bed_inputs[1].value == '' ?
                    bed_in.lastName = 'no_data' : bed_in.lastName = bed_inputs[0].value;

                bed_inputs[2].value == '' ?
                    bed_in.motherName = 'no_data' : bed_in.motherName = bed_inputs[2].value; 

                bed_select[0].value == '0' ?
                    bed_in.genderId = 'no_data' : bed_in.genderId = bed_select[0].value;

                bed_inputs[3].value == '' ?
                    bed_in.email = 'no_data' : 
                    ( !this.isEmailValid( bed_inputs[3].value ) ? 
                        bed_in.email = 'no_valid' : bed_in.email = bed_inputs[3].value );

                bed_inputs[4].value == '' ?
                    bed_in.phone = 'no_data' : bed_in.phone = bed_inputs[4].value;

              });

              console.log('Beds to add => ', this.beds_to_add);

              this.beds_to_add.forEach( (bed: any) => {

                if(
                    bed.name == 'no_data' ||
                    bed.lastName == 'no_data' ||
                    bed.motherName == 'no_data' ||
                    bed.genderId == 'no_data' ||
                    bed.email == 'no_data' ||
                    bed.email == 'no_valid' ||
                    bed.phone == 'no_data'
                ) result = false;

              });

            return result;

    }

    public memberships_cards: any[];
    public rooms_cards: any[];
    public getMembershipsAndRoomsData():void {

        const tenant_data = {
            building: this.current_build.id,
            startDate: this.booking_data.startDate,
            finishDate: this.booking_data.finishDate, 
            roomateFlip: this.booking_data.roomateFlip,
            pets: this.booking_data.pets,
            roomType: this.booking_data.roomType,
            smoke: this.booking_data.smoke,
            roomatePreferences: this.booking_data.roomatePreferences,
            totalBeds: Number(this.booking_data.totalBeds) + 1
        }

        this.loader.showLoader();

        this._services.service_general_post('Tenant/PostValidateTenant', tenant_data)
            .subscribe( (response: any) => {

                if( response.result == 'Sucess' ) {

                    this.memberships_cards = response.membershipsAvaible;
                    this.rooms_cards = response.roomsAvaible;

                } else {

                    this.system_message.showMessage({
                        kind: 'error',
                        time: 4777,
                        message: {
                            header: 'Membersips & Rooms',
                            text: 'Memberships and rooms can not load.'
                        }
                    });

                }

                this.loader.hideLoader();

            }, (error: any) => {

                this.system_message.showMessage({
                    kind: 'error',
                    time: 4777,
                    message: {
                        header: 'System Error',
                        text: 'Error has been detected, please try later.'
                    }
                });

                this.loader.hideLoader();

            });

    }

    public room_selected: any = null;
    public selectThisRoom( room: any ):void {

        this.room_selected = room;
        this.additional_services_selected = [];
        this.all_services_selected = [];
        this.total_services_ammount = 0;

        this.rooms_cards.forEach( (card: any) => {

            card.id == this.room_selected.id ?
                card.active = true : card.active = false;

        });

        this.getAddiotionalServices();

    }

    public membership_selected: any = null;
    public selectThisMembership( membership: any ):void {

        this.membership_selected = membership;
        this.additional_services_selected = [];
        this.all_services_selected = [];
        this.total_services_ammount = 0;

        this.memberships_cards.forEach( (card: any) => {

            card.id == this.membership_selected.id ?
                card.active = true : card.active = false; 

        });

        this.getAddiotionalServices();

    }

    public additional_services_list: any[];
    public additional_services_section: boolean = false;
    public table_additional_services: any[] = ['icon','service','description','recurrent','once','able'];
    public additional_services_table: any;
    public getAddiotionalServices():void {

        if( this.room_selected != null && this.membership_selected != null ) {

            this.additional_services_section = true; 
            this.joinAllMyServices();

            const ws_data = {
                idMembership: this.membership_selected.id,
                idBuilding: this.current_build.id
            }

            this._services.service_general_get_with_params('Tenant/GetServices', ws_data)
                .subscribe( (response: any) => {

                    if( response.result == 'Sucess' ) {

                        this.additional_services_list = response.services;

                        this.additional_services_list.forEach( (service: any) => {

                            service.active = true;

                        });

                        this.additional_services_table = this.additional_services_list;

                    }

                }, (error: any) => {

                    this.system_message.showMessage({
                        kind: 'error',
                        time: 4777,
                        message: {
                            header: 'Fatal Error',
                            text: 'Error Fatal'
                        }
                    });

                });

        }

    }

    public additional_services_selected: any[] = [];
    public selectingAdditionalServices( service_selected: any ):void {

        this.additional_services_table = this.additional_services_list.filter( (service: any) => {

            if( service_selected.id == service.id ) {

                service.active = false;
                this.additional_services_selected.push( service );

            }

            if( service.active ) {

                return service;

            }

        });

    }

    public removeAdditionalServiceSelected( service_selected: any ):void {

        this.additional_services_table = this.additional_services_list.filter( (service: any) => {

            if( service_selected.id == service.id ) {

                service.active = true;
                this.additional_services_selected
                    .splice(this.additional_services_selected.findIndex( (service: any) => service.id == service_selected.id ),1);

            }

            if( service.active ) {

                return service;

            }

        });

        this.joinAllMyServices();

    }

    public getAdditionalServicesSelected():void {

        if( this.validateAdditionalServices() ) {

            this.system_message.showMessage({
                kind: 'ok',
                time: 4777,
                message: {
                    header: 'Additional services added',
                    text: 'Additional services has been added successfully.'
                }
            });

            this.joinAllMyServices();
            this.showModal();

        } else {

            this.system_message.showMessage({
                kind: 'error',
                time: 4777,
                message: {
                    header: 'Required data',
                    text: 'All inputs must be filled to continue.'
                }
            });

        }

    }

    public validateAdditionalServices():boolean {

        let result: boolean = true;

        const additional_services = document.getElementById('form_services_added'),
              additional_service:any = additional_services.querySelectorAll('[service="added"]');

        additional_service.forEach( (service_add: any) => {

            const inputs = service_add.querySelectorAll('input'),
                select = service_add.querySelectorAll('select'),
                sDate = inputs[0].value,
                eDate = inputs[1].value,
                lapse = select[0].value,
                id_service = inputs[0].id.split('_')[inputs[0].id.split('_').length - 1];

                this.additional_services_selected.forEach( (service_find: any) => {

                    if( service_find.id == id_service ) {

                        service_find.startDate = sDate;
                        service_find.endDate = eDate;
                        service_find.lapse = lapse;
                        service_find.validator = {
                            no_sdat: false,
                            no_edat: false,
                            no_laps: false,
                        }

                        service_find.startDate == '' ?
                            service_find.validator.no_sdat = true : 
                            service_find.validator.no_sdat = false;

                        service_find.endDate == '' ?
                            service_find.validator.no_edat = true : 
                            service_find.validator.no_edat = false;

                        service_find.lapse == '' ?
                            service_find.validator.no_laps = true : 
                            service_find.validator.no_laps = false;

                    }

                });

        });

        this.additional_services_selected.forEach( (service: any) => {

            for( let field in service.validator ) {

                if( service.validator[field] ) {

                    result = false;

                }                

            }

        });

        return result;

    }

    public updateLapseService( event_data: any, service: any ) {

        const event_root: any = event_data.target;

        service.lapse = event_root.value;

        if( service.startDate != '' && service.endDate != '' ) {

            service.lapse == '1' ?
                service.total_ammount = service.priceUnit * service.day_diff :
                service.total_ammount = service.price * service.day_diff;

        }

    }

    public getAdditionalServiceAmmount( event_data: any, date_position: number, service: any ):void {

        const root_event: any = event_data.target;

        date_position == 0 ? 
            service.startDate = root_event.value :
            service.endDate = root_event.value;

        if( service.startDate != '' && service.endDate ) {

            const days_diff = getDaysDifference(service.startDate, service.endDate);

            service.day_diff = days_diff == 0 ? 1 : days_diff;

            if( service.lapse != '' ) {

                service.lapse == '1' ?
                    service.total_ammount = service.priceUnit * service.day_diff :
                    service.total_ammount = service.price * service.day_diff;

            }

        }

        function getDaysDifference( sDate, eDate ):number {

            const start_date: any = new Date( sDate ),
                end_date: any = new Date( eDate ),
                diff_time = Math.abs( start_date - end_date ),
                diff_days = Math.ceil(diff_time / (1000 * 60 * 60 * 24));

            return diff_days + 1;

        }

    }

    public all_services_selected: any[] = [];
    public total_services_ammount: number = 0;
    public booking_detail_total_ammount: number = 0;
    public joinAllMyServices():void {

        this.all_services_selected = [];

        this.membership_selected.services.forEach( (service: any) => {

            service.type_service = 'Included';
            service.lapse = '1';
            service.startDate = this.booking_data.startDate;
            service.endDate = this.booking_data.finishDate;
            service.total_ammount = 0;

            this.all_services_selected.push( service );

        });

        this.additional_services_selected.forEach( (service: any) => {

            service.type_service = 'Extra';

            this.all_services_selected.push( service );

        });

        this.total_services_ammount = 0;

        this.all_services_selected.forEach( (service) => {

            this.total_services_ammount += service.total_ammount;

        });

        this.booking_detail_total_ammount = this.getTotalAmmount() + this.total_services_ammount;

    }

    public getNameRoomateType( id_roomtype: string ):string {

        let result: string = 'No Data';

        this.roomates_catalog.forEach( (roomate: any) => {

            if( roomate.id == Number( id_roomtype ) ) {

                result = roomate.roomateType1;

            }

        });

        return result;

    }

    public terms_of_use: string = '';
    public getDaysReserved():number {

        let start_date: any = new Date( this.booking_data.startDate ),
            end_date: any = new Date( this.booking_data.finishDate ),
            diff_time = Math.abs( start_date - end_date ),
            diff_days = Math.ceil(diff_time / (1000 * 60 * 60 * 24)) + 1;

            this.terms_of_use = diff_days < 31 ? 'short_t' : 'long_t';

        return diff_days;

    }

    public getTotalBeds( beds: string ):number {

        const num_beds = Number( beds );

        return num_beds + 1;

    }

    public getTotalAmmount():number {

        const days_reserved = this.getDaysReserved(),
            beds_reserved = this.getTotalBeds( this.booking_data.totalBeds.toString() ),
            price_membership = this.membership_selected.price,
            total = ( price_membership * days_reserved ) * beds_reserved;

        return total;

    }

    public booking_post_data: BookingPostDetailModel = new BookingPostDetailModel();
    public completeBookingsDetail():void {

        this.booking_post_data.idMembership = this.membership_selected.id;
        this.booking_post_data.Booking.dateInitProgram = this.booking_data.startDate;
        this.booking_post_data.Booking.dateEndProgram = this.booking_data.finishDate;
        this.booking_post_data.Booking.idRommateType = this.booking_data.roomateFlip;
        this.booking_post_data.Booking.reservedBeds = Number( this.booking_data.totalBeds ) + 1;
        this.booking_post_data.Booking.idRoom = this.room_selected.id;
        this.booking_post_data.aditionalBeds = this.beds_to_add;
        this.booking_post_data.serviceBooking = this.servicesModelWorker( this.all_services_selected );

        this.getUsersDataList();

        this.iHaveCompletedStep(0);

        this.sendToTopPage();
        
    }
    
    public servicesModelWorker( services: any ):any {

        let services_worked: any[] = [];

        services.forEach( (service: any) => {

            const service_model = {
                idService: service.id,
                dateStart: service.startDate,
                dateEnd: service.endDate,
                recurrent: service.lapse,
                fromMembership: this.membership_selected.id,
                amount: service.total_ammount,
                idUserPaymentService: 0,
                idUserPaymentServiceNavigation: {
                    id: 0,
                    idCreditCard: null,
                    idServiceBooking: 0,
                    payment: 0,
                    paymentDate: ""
                }
            }

            services_worked.push( service_model );

        });

        return services_worked;

    }

    /* Section two begins =====> */
    /* Section two refers to profile tenant
     * Section two refers to profile tenant
     * Section two refers to profile tenant
     * Section two refers to profile tenant
     * Section two refers to profile tenant
    */
    public general_user_data: GeneralUserData = new GeneralUserData();
    public join_all_data: BookingCompleted = new BookingCompleted();
    public credit_card_data: CreditCardModel = new CreditCardModel();

    public single_profile: boolean = true;
    public changeProfileType( event_data: any ):void {

        const type_profile = event_data.target;

        type_profile.value == '1' ? 
            this.general_user_data.clientKind = false :
            this.general_user_data.clientKind = true;

        this.single_profile =  this.general_user_data.clientKind === false ? true : false;

    }

    public gender_list_gotten: any = [];
    public relationship_list_gotten: any = [];
    public scholarship_list_gotten: any = [];
    public country_list_gotten: any = [];
    public companytype_list_gotten: any = [];
    public civilstatus_list_gotten: any = [];
    public birthplace_list_gotten: any = [];
    public getUsersDataList():void {

        this.loader.showLoader();

        this._services.service_general_get('Tenant/getCatalogsUser')
            .subscribe( (response: any) => {

                if( response.result == 'Sucess' ) {

                    this.gender_list_gotten = response.genderList;
                    this.country_list_gotten = response.country;
                    this.birthplace_list_gotten = response.birthPlace;
                    this.civilstatus_list_gotten = response.civilStatus;
                    this.scholarship_list_gotten = response.scholarShip;
                    this.companytype_list_gotten = response.companyTypeList;
                    this.relationship_list_gotten = response.relationship;

                    this.loader.hideLoader();

                }

            }, (error: any) => {

                this.system_message.showMessage({
                    kind: 'error',
                    time: 4777,
                    message: {
                        header: 'Error to load',
                        text: 'Error loading information, please try again.'
                    }
                });

                setTimeout( () => this.loader.hideLoader(), 1777);

            })

    }

    public updateStates(newValue) {
        console.log('Values', newValue);
        const country_data = {countryId: newValue};
        this._services.service_general_get_with_params('Tenant/getStateListById', country_data)
          .subscribe((response: any) => {
            if (response.result == 'Sucess') {
              this.birthplace_list_gotten = response.item;
            }
          }, (error: any) => {
            console.log('Error WS getStateListById => ', error);
          });
      }

    public profile_section_card: boolean = false;
    public async profileTenantCompleted( is_short_term: boolean = true ):Promise<void> {

        const form_validation_result = {
            information: this.profileFormValidator(),
            pay_method: await this.creditCardValidator() 
        }

        const cc_encrypt: CreditCardModel = {
            active: true,
            ccv: this.encryptData(this.credit_card_data.ccv),
            id: 0,
            main: 1,
            month: this.credit_card_data.month,
            name: this.credit_card_data.name,
            year: this.credit_card_data.year,
            number: this.encryptData(this.credit_card_data.number)
        };

        if( is_short_term ) {

            if( form_validation_result.information && form_validation_result.pay_method ) {

                this.profile_section_card = true;
                this.join_all_data.booking = this.booking_post_data;
                this.join_all_data.user = this.general_user_data;
                this.join_all_data.creditCard = cc_encrypt;
                this.iHaveCompletedStep(1);
    
            } else if( form_validation_result.pay_method != null ) {
    
                this.system_message.showMessage({
                    kind: 'error',
                    time: 4777,
                    message: {
                        header: 'Inputs required',
                        text: 'Some inputs must be fill to continue.'
                    }
                });
    
                this.sendToTopPage();   
    
            }

        }

        if( !is_short_term ) {

            const additional_forms: any = {
                income_form: this.incomeFormValidator(),
                reference_form: this.referenceFormValidator()
            }

            if( 
                form_validation_result.information && 
                form_validation_result.pay_method &&
                additional_forms.income_form &&
                additional_forms.reference_form ) {
                this.profile_section_card = true;
                this.join_all_data.booking = this.booking_post_data;
                this.join_all_data.user = this.general_user_data;
                this.join_all_data.creditCard = cc_encrypt;
                this.iHaveCompletedStep(1);
    
            } else {
    
                this.system_message.showMessage({
                    kind: 'error',
                    time: 4777,
                    message: {
                        header: 'Inputs required',
                        text: 'Some inputs must be fill to continue.'
                    }
                });
    
                this.sendToTopPage();
    
            } 

        }

    }

    public income_form_validator_single: any = {
        no_enam: false,
        no_indu: false,
        no_phon: false,
        no_tenu: false,
        no_chis: false,
        no_spli: false,
        no_kcom: false,
        no_empl: false,
        no_char: false,
        no_main: false,
        no_minc: false
    }
    public income_form_validator_buss: any = {
        no_year: false,
        no_lche: false,
        no_empl: false,
        no_stor: false,
        no_city: false,
        no_comm: false,
        no_stre: false,
        no_nstr: false,
        no_snum: false
    }
    public incomeFormValidator():boolean {

        const income_data = this.general_user_data.income;

        let result: boolean = false;

        if( this.single_profile ) {

            income_data.nameEmployer == '' ?
                this.income_form_validator_single.no_enam = true :
                this.income_form_validator_single.no_enam = false;

            income_data.industry == '' ?
                this.income_form_validator_single.no_indu = true :
                this.income_form_validator_single.no_indu = false;

            income_data.contactNumber == '' ?
                this.income_form_validator_single.no_phon = true :
                this.income_form_validator_single.no_phon = false;

            income_data.tenureId == null ?
                this.income_form_validator_single.no_tenu = true :
                this.income_form_validator_single.no_tenu = false;

            income_data.creditHistory == null ?
                this.income_form_validator_single.no_chis = true :
                this.income_form_validator_single.no_chis = false;

            income_data.splitRent == null ?
                this.income_form_validator_single.no_spli = true :
                this.income_form_validator_single.no_spli = false;

            income_data.companyTypeId == null ?
                this.income_form_validator_single.no_kcom = true :
                this.income_form_validator_single.no_kcom = false;

            income_data.employeeId == null ?
                this.income_form_validator_single.no_empl = true :
                this.income_form_validator_single.no_empl = false;

            income_data.jobPosition == '' ?
                this.income_form_validator_single.no_char = true :
                this.income_form_validator_single.no_char = false;

            income_data.mainSource == '' ?
                this.income_form_validator_single.no_main = true :
                this.income_form_validator_single.no_main = false;

            income_data.monthlyIncome == null ?
                this.income_form_validator_single.no_minc = true :
                this.income_form_validator_single.no_minc = false;

            for( let field in this.income_form_validator_single ) {

                if( this.income_form_validator_single[field] ) return false;
                else result = true;

            }

        } else {

            income_data.companyYearStart == '' ?
                this.income_form_validator_buss.no_year = true :
                this.income_form_validator_buss.no_year = false;

            income_data.billLastYear == null ?
                this.income_form_validator_buss.no_lche = true :
                this.income_form_validator_buss.no_lche = false;

            income_data.employeeId == null ?
                this.income_form_validator_buss.no_empl = true :
                this.income_form_validator_buss.no_empl = false;

            income_data.branchoffice == null ?
                this.income_form_validator_buss.no_stor = true :
                this.income_form_validator_buss.no_stor = false;

            income_data.cityHo == '' ?
                this.income_form_validator_buss.no_city = true :
                this.income_form_validator_buss.no_city = false;

            income_data.communityHo == '' ?
                this.income_form_validator_buss.no_comm = true :
                this.income_form_validator_buss.no_comm = false;

            income_data.streetHo == '' ?
                this.income_form_validator_buss.no_stre = true :
                this.income_form_validator_buss.no_stre = false;

            income_data.intNumberHo == '' ?
                this.income_form_validator_buss.no_snum = true :
                this.income_form_validator_buss.no_snum = false;

            income_data.numberHo == '' ?
                this.income_form_validator_buss.no_nstr = true :
                this.income_form_validator_buss.no_nstr = false;

            for( let field in this.income_form_validator_buss ) {

                if( this.income_form_validator_buss[field] ) return false;
                else result = true;

            }

        }

        return result;

    }

    public reference_form_validator: any = {
        no_name: false,
        no_fnam: false,
        no_lnam: false,
        no_rela: false,
        no_mail: false,
        no_phon: false,
        no_rent: false,
        no_lord: false,
        no_lmai: false,
        no_lpho: false
    }
    public referenceFormValidator():boolean {

        let result: boolean = false;

        const reference_form = this.general_user_data.reference;

        reference_form.name == '' ?
                this.reference_form_validator.no_name = true :
                this.reference_form_validator.no_name = false;
                
        reference_form.firstName == '' ?
            this.reference_form_validator.no_fnam = true :
            this.reference_form_validator.no_fnam = false; 

        reference_form.lastName == '' ?
            this.reference_form_validator.no_lnam = true :
            this.reference_form_validator.no_lnam = false; 

        reference_form.relationshipId == null ?
            this.reference_form_validator.no_rela = true :
            this.reference_form_validator.no_rela = false; 

        reference_form.mail == '' ?
            this.reference_form_validator.no_mail = true :
            this.reference_form_validator.no_mail = false; 

        reference_form.phone == '' ?
            this.reference_form_validator.no_phon = true :
            this.reference_form_validator.no_phon = false; 

        reference_form.firstRent == null ?
            this.reference_form_validator.no_rent = true :
            this.reference_form_validator.no_rent = false; 

        reference_form.NameLandlord == '' ?
            this.reference_form_validator.no_lord = true :
            this.reference_form_validator.no_lord = false; 
        
        reference_form.EmailLandLord == '' ?
            this.reference_form_validator.no_lmai = true :
            this.reference_form_validator.no_lmai = false; 

        reference_form.PhoneLandLord == '' ?
            this.reference_form_validator.no_lpho = true :
            this.reference_form_validator.no_lpho = false; 

        if( this.single_profile ) {

            for( let field in this.reference_form_validator  ) {

                if( this.reference_form_validator[field] ) return false;
                else result = true; 
    
            }

        } else {

            if(
                !this.reference_form_validator.no_name &&
                !this.reference_form_validator.no_fnam &&
                !this.reference_form_validator.no_lnam &&
                !this.reference_form_validator.no_rela &&
                !this.reference_form_validator.no_mail &&
                !this.reference_form_validator.no_phon
            ) result = true;
            else result = false;

        }

        return result;

    }

    public kind_card: string = '';
    public cardDataDriver():void {

        this.kind_card = this.kindCardDetecter( this.credit_card_data.number.toString() );

    }

    public credit_card_form: any = {
        no_name: false,
        no_numb: false,
        no_mont: false,
        no_year: false,
        no_ccv: false
    }
    public async creditCardValidator():Promise<any> {

        let hold_result: boolean = false,
            result: boolean = null;

        const processing_card: Promise<any>  = new Promise( (resolve: any) => {

            this.credit_card_data.name == '' ? 
            this.credit_card_form.no_name = true :
            this.credit_card_form.no_name = false;

            this.credit_card_data.number == '' ? 
                this.credit_card_form.no_numb = true :
                this.credit_card_form.no_numb = false;

            this.credit_card_data.month == null ? 
                this.credit_card_form.no_mont = true :
                this.credit_card_form.no_mont = false;

            this.credit_card_data.year == null ? 
                this.credit_card_form.no_year = true :
                this.credit_card_form.no_year = false;

            this.credit_card_data.ccv == '' ? 
                this.credit_card_form.no_ccv = true :
                this.credit_card_form.no_ccv = false;

            if(
                !this.credit_card_form.no_name &&
                !this.credit_card_form.no_numb &&
                !this.credit_card_form.no_mont &&
                !this.credit_card_form.no_year &&
                !this.credit_card_form.no_ccv 
            ) hold_result = true;

            if( hold_result ) {

                const card_data = {
                    number: this.credit_card_data.number,
                    expYear: Number( this.credit_card_data.year ),
                    expMonth: Number( this.credit_card_data.month ),
                    cvc:  this.credit_card_data.ccv,
                }
        
                this._services.service_general_post('Stripe', card_data)
                    .subscribe( ( response: any ) => {
        
                        if( response.result == 'Success' ) {
                            
                            this.join_all_data.token = response.item;
                            result = true;
    
                        } else {
    
                            this.join_all_data.token = response.item;
                            result = false;
    
                        }

                        resolve( result );
        
                    }, ( error: any ) => {
        
                        this.system_message.showMessage({
                            kind: 'error',
                            time: 4777,
                            message: {
                                header: 'Card Error',
                                text: error
                            }
                        });

                        resolve( false );
        
                    });

            } else {

                this.sendToTopPage();

                resolve( false );

            }

        });

        return processing_card.then( (result: boolean) => {

            if( result ) {

                return result;

            } else return false;

        });

    }

    public form_profile_validator: any = {
        no_name: false,
        no_lnam: false,
        no_mnam: false,
        no_mail: false,
        no_mail_valid: false,
        no_phon: false,
        no_gend: false,
        no_nati: false,
        no_bdat: false
    }
    public form_profile_buss = {
        no_name: false,
        no_acti: false,
        no_trad: false,
        no_rfc: false,
        no_patr: false,
        no_phon: false
    }
    public profileFormValidator():boolean {

        let result: boolean = false;

        this.general_user_data.name == '' ? 
            this.form_profile_validator.no_name = true :
            this.form_profile_validator.no_name = false;

        this.general_user_data.lastName == '' ? 
            this.form_profile_validator.no_lnam = true :
            this.form_profile_validator.no_lnam = false;

        // this.general_user_data.motherName == '' ? 
        //     this.form_profile_validator.no_mnam = true :
        //     this.form_profile_validator.no_mnam = false;

        this.general_user_data.phone == '' ? 
            this.form_profile_validator.no_phon = true :
            this.form_profile_validator.no_phon = false;

        this.general_user_data.email == '' ? 
            this.form_profile_validator.no_mail = true :
            this.form_profile_validator.no_mail = false;

        this.general_user_data.email == '' ? 
            this.form_profile_validator.no_mail = true :
            ( !this.isEmailValid( this.general_user_data.email ) ? 
                this.form_profile_validator.no_mail_valid = true :
                this.form_profile_validator.no_mail_valid = false );

        this.general_user_data.userData.genderId == '' ? 
            this.form_profile_validator.no_gend = true :
            this.form_profile_validator.no_gend = false;

        this.general_user_data.userData.countryId == '' ?
            this.form_profile_validator.no_nati = true :
            this.form_profile_validator.no_nati = false;

        this.general_user_data.birth == '' ?
            this.form_profile_validator.no_bdat = true :
            this.form_profile_validator.no_bdat = false;

        this.general_user_data.userTaxData.name == '' ?
            this.form_profile_buss.no_name = true :
            this.form_profile_buss.no_name = false;

        this.general_user_data.userTaxData.activity == '' ?
            this.form_profile_buss.no_acti = true :
            this.form_profile_buss.no_acti = false;

        this.general_user_data.userTaxData.tradeName == '' ?
            this.form_profile_buss.no_trad = true :
            this.form_profile_buss.no_trad = false;

        this.general_user_data.userTaxData.rfc == '' ?
            this.form_profile_buss.no_rfc = true :
            this.form_profile_buss.no_rfc = false;

        this.general_user_data.userTaxData.legalRepresentative == '' ?
            this.form_profile_buss.no_patr = true :
            this.form_profile_buss.no_patr = false;

        this.general_user_data.userTaxData.phone == '' ?
            this.form_profile_buss.no_phon = true :
            this.form_profile_buss.no_phon = false;

        if(
            !this.form_profile_validator.no_name &&
            !this.form_profile_validator.no_lnam &&
            // !this.form_profile_validator.no_mnam &&
            !this.form_profile_validator.no_phon &&
            !this.form_profile_validator.no_mail &&
            !this.form_profile_validator.no_mail_valid &&
            !this.form_profile_validator.no_gend &&
            !this.form_profile_validator.no_nati &&
            !this.form_profile_validator.no_bdat
        ) {

            if( !this.single_profile ) {

                if(
                    !this.form_profile_buss.no_name &&
                    !this.form_profile_buss.no_acti &&
                    !this.form_profile_buss.no_trad &&
                    !this.form_profile_buss.no_rfc &&
                    !this.form_profile_buss.no_patr &&
                    !this.form_profile_buss.no_phon
                ) {

                    result = true;

                } else result = false;

            } else {

                result = true;

            }

        } else result = false;

        return result;

    }

    /** Final step ==============================================> */
    public completeAddTenantProcess():void {

        // this.credit_card_data.number = this.encryptData( this.credit_card_data.number );
        // this.credit_card_data.ccv = this.encryptData( this.credit_card_data.ccv );
        this.join_all_data.amount = this.booking_detail_total_ammount.toString() + "00";
        this.join_all_data.amountMembership = this.getTotalAmmount().toString();

        console.log('Sending this => ', this.join_all_data);

        this.loader.showLoader();

        this._services.service_general_post('Tenant/NewTenant', this.join_all_data)
            .subscribe( (response: any) => {

                if( response.result == 'Success' ) {  

                    this._router.navigateByUrl('generalTenantlist');

                } 

                setTimeout( () => this.loader.hideLoader(), 1777);

            }, (error: any) => {

                this.system_message.showMessage({
                    kind: 'error',
                    time: 4777,
                    message: {
                        header: 'Error',
                        text: error
                    }
                });

                setTimeout( () => this.loader.hideLoader(), 1777);

            });

    }


    /* Utilities ====================================================================> */
    /* Utilities and steper app section
     * Utilities and steper app section
     * Utilities and steper app section
     * Utilities and steper app section
     * Utilities and steper app section
     */
    public visible_step: any = {
        step_1: true,
        step_2: false,
        step_3: false
    }
    public iHaveCompletedStep( step_completed: number ):void {

        if( step_completed == 0 ) {

            this.visible_step.step_1 = false;
            this.visible_step.step_2 = true;
            this.visible_step.step_3 = false;

        }

        if( step_completed == 1 ) {

            this.visible_step.step_1 = false;
            this.visible_step.step_2 = false;
            this.visible_step.step_3 = true;

        }

        if( step_completed == 4 ) {

            this.visible_step.step_1 = true;
            this.visible_step.step_2 = false;
            this.visible_step.step_3 = false;

        }

        if( step_completed == 5 ) {

            this.visible_step.step_1 = false;
            this.visible_step.step_2 = true;
            this.visible_step.step_3 = false;

        }
        
        if( step_completed == 2 ) {



        }

    }

    public show_modal_content: string = '';
    public show_modal: boolean = false;
    public showModal( section: string = 'deafult' ):void {

        !this.show_modal ? 
            this.show_modal = true : this.show_modal = false; 

        this.show_modal_content = section;

    }

    public ableDateSelection(id_date_start: string, id_date_end: string, extra: string = ''):void {

        const date_start: any = document.getElementById( id_date_start ),
              date_end: any = document.getElementById( id_date_end );

        if( date_start.value != '' && date_end.value == '' ) {

            date_end.removeAttribute('disabled');
            date_end.setAttribute('min', date_start.value);

        } else if( date_start.value != '' && date_end.value != '' ) {

            date_end.value = '';
            date_end.setAttribute('min', date_start.value);

            switch( extra ) {

                case 'booking':
                    this.booking_data.finishDate = '';
                    break;
    
            }

        }

    }

    public today: string = '';
    public getToday():void {

        const date = new Date(),
              today = {
                  day: date.getDate(),
                  month: date.getMonth() + 1,
                  year: date.getFullYear()
              },
              format_date = {
                  day: function() {

                    let day = today.day < 10 ? `0${today.day}` : today.day;

                    return day;

                  },
                  month: function() {

                    let month = today.month < 10 ? `0${today.month}` : today.month;

                    return month;

                  }
              },
              new_date = `${ today.year }-${ format_date.month() }-${ format_date.day() }`;
              
        this.today = new_date;

    }

    public isEmailValid( email: string ): boolean {

        let result = false;
    
        const email_split = email.split('@'); 
    
        if( email_split.length > 1 ) {
    
            const email_nick_nosp = email_split[0].match(/[^a-zA-Z0-9.\-_]/),
                email_doma_nosp = email_split[1].match(/[^a-zA-Z0-9.]/);

            email_nick_nosp == null && email_doma_nosp == null ? 
                ( email_split[1].length < 4 ? result = false : result = true ) :
                result = false;
    
        } else result = false;
    
        return result;
    
    }

    public getDigits( the_string: any, how_many: number ):string {

        let this_chain = '',
            string_to = '';

        if( the_string != null ) {

            this_chain = '',
            string_to = the_string.toString();

            this_chain = string_to.substr( string_to.length - how_many );

        }

        return this_chain;

    }

    public sendToTopPage():void {

        window.scrollTo(0,0);

    }

    public kindCardDetecter( card_number: string ):any {

        let card_kind = '';
        
        const visa_regex = new RegExp("^4[0-9]{12}(?:[0-9]{3})?$"),
              mcard_regex = new RegExp("^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$"),
              american_regex = new RegExp("^3[47][0-9]{13}$");
    
        if( visa_regex.test( card_number ) && 
            card_number.length >= 13 && 
            card_number.length <= 16 ) card_kind = 'visa';
    
        if( mcard_regex.test( card_number ) && 
            card_number.length == 16 ) card_kind = 'mcard';
    
        if( american_regex.test( card_number ) && 
            card_number.length == 15 ) card_kind = 'american';
    
        return card_kind;
    
    }

    private encryptSecretKey = 'Llave';
    public decryptData(data) {
        try {
          const bytes = CryptoJS.AES.decrypt(data, this.encryptSecretKey);
          if (bytes.toString()) {
            var decrypt = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
          }
    
          return decrypt;
        } catch (e) { console.log(e); }
    }
    
    public encryptData(data) {
        try {
            var crypt = CryptoJS.AES.encrypt(JSON.stringify(data), this.encryptSecretKey).toString();
            // console.log(this.crypt)
            // this.decryptData(this.crypt);
            return crypt;
        } catch (e) { console.log(e); }
    }

    public unableField( event_data:any, field_selected:string ):void {

        const event = event_data.target,
              field_to_hide = document.getElementById( field_selected );

        if( event.value == '2' ) {

            field_to_hide.classList.add('display-none');
            this.booking_data.roomatePreferences = '1';
            
        } else {

            field_to_hide.classList.remove('display-none');
            this.booking_data.roomatePreferences = null;

        }

    }
    public validateEmail(email) {
        const obj = {
          email: email
        };
        this._services.service_general_get_with_params('UsersAdmin/GetValidateEmail', obj).subscribe((value) => {
        //   console.log('Success Service', value);
          if (value.item === false) {
            this.general_user_data.email = '';
            this.emailExist = true;
          } else {
            this.emailExist = false;
          }
        }, (err) => {
          console.log('Error Service', err);
        });
      }

    public validateImageUpload( event_data:any, dimensions_image:string, target_image:string, name_image:string ):void {

        const event = event_data.target,
              dimensions_image_data = {
                get_dimensions: ( function() {
    
                  const dimensions_split = dimensions_image.split('x'),
                        width = Number( dimensions_split[0] ),
                        height = Number( dimensions_split[1] );
    
                  return {
                    width: width,
                    height: height
                  }
    
                }())
              },
              image_limit_width = dimensions_image_data.get_dimensions.width,
              image_limit_height = dimensions_image_data.get_dimensions.height,
              id_image_container:any = document.getElementById( target_image ),
              name_image_container = document.getElementById( name_image ),
              native_image_uploaded = document.getElementById('image_real_dimension'),
              root_data = this;
    
        if( event.files && event.files[0] ) {
    
          const reader = new FileReader();
    
                reader.onload = function(e:any) {
    
                  const image_convert:any = e.target.result,
                        validating_image = new Promise( (resolve) => {
    
                          native_image_uploaded.setAttribute('src', image_convert);
                          
                          setTimeout( () => {
    
                            const native_image_dimension = {
                              image: image_convert,
                              width: native_image_uploaded.offsetWidth,
                              height: native_image_uploaded.offsetHeight
                            };
    
                            resolve( native_image_dimension );
    
                          }, 277);
                  
                        });
    
                        validating_image.then( ( image_data:any ) => {
    
                          if( image_limit_width === image_data.width && image_limit_height === image_data.height ) {
                            
                            id_image_container.setAttribute('src', image_data.image );
                            name_image_container.innerHTML = `<span class="image-name">${ event.files[0].name }</span>`;
                            id_image_container.classList.remove('no-image');
                            root_data.prepareImages( event_data );
    
                          } else {
    
                            id_image_container.src = '../../../assets/14.jpg';
                            root_data.general_user_data.avatar = '';
                            name_image_container.innerHTML = `Image must be <br /><span class="text-bold">${ dimensions_image }px</span>`;
                            id_image_container.classList.add('no-image');
    
                          }
                          
                        });
    
                }
    
                reader.readAsDataURL( event.files[0] );
    
        }
        
    }

    public newImages: any[] = [];
    prepareImages(e) {
        
        if (Utils.isDefined(e.srcElement.files)) {
        for (let f of e.srcElement.files) {
            
            this.newImages.push(f);
        }
        }
        this.addImages();

    }

    addImages() {
        let url: string = '';
        if (!Utils.isEmpty(this.newImages)) {
        for (let f of this.newImages) {
            this._services.UploadImgSuc(f).subscribe((r) => {
            if (Utils.isDefined(r)) {
                url = <string>r.message;
                
                url = url.replace('/Imagenes', this._services.getURL() + 'Flip');
                this.general_user_data.avatar = url;
                
                this.newImages = [];
            }
            })
        }
        }
    }

}

class BookingDetailModel {
    building: number = null;
    startDate: string = '';
    finishDate: string = '';
    roomateFlip: number = null;
    pets: boolean = null;
    roomType: number = null;
    smoke: boolean = null;
    roomatePreferences: any = null;
    totalBeds: number = null;
}

class BookingPostDetailModel {
    idMembership: number;
    Booking: {
        dateInitProgram: string;
        dateEndProgram: string;
        idRommateType: number;
        reservedBeds: number;
        idRoom: number;
    } = {
        dateInitProgram: '',
        dateEndProgram: '',
        idRommateType: 0,
        reservedBeds: 0,
        idRoom: 0
    };
    amount: number;
    serviceBooking: any;
    aditionalBeds: any;
}   

class BookingCompleted {
    booking: BookingPostDetailModel;
    user: GeneralUserData;
    creditCard: CreditCardModel;
    token: string;
    amount: string;
    amountMembership: string;
}

class GeneralUserData {
    name: string = '';
    password: string = '';
    email: string = '';
    lastName: string = '';
    motherName: string = '';
    avatar: string = '';
    systemTypeId: number = 1;
    clientKind: boolean = false;
    phone: string = '';
    cellphone: string = '';
    workplace: string = '';
    aboutMe: string = '';
    twitterUrl: string = '';
    facebookUrl: string = '';
    instagramUrl: string = '';
    linkedInUrl: string = '';
    active: boolean = true;
    birth: string = '';
    rfc: string = '';
    userData: PersonaUserInfo = new PersonaUserInfo();
    userTaxData: UserBussinessData = new UserBussinessData();
    income: IncomeData = new IncomeData();
    reference: ReferenceData = new ReferenceData();
}

class PersonaUserInfo {
    pet: boolean = null;
    civilStatusId: string = '';
    scholarshipId: string = '';
    countryId: string = '';
    stateId: any = '';
    genderId: string = '';
    rent: boolean = null;
    car: number = null;
    howMuchMax: number = null;
    howMuchMin: number = null;
    country: any = null;
    gender: any = null;
    scholarship: any = null;
    state: any = null;
}

class UserBussinessData {
    name: string = '';
    activity: string = '';
    tradeName: string = '';
    legalRepresentative: string = '';
    phone: string = '';
    rfc: string = '';
}

class CreditCardModel {
    id: number = 0;
    active: boolean = true;
    ccv: string = '';
    month: number = null;
    name: string = ''; 
    number: string = '';
    year: number = null;
    main: number = 0;  
}

class IncomeData {
    nameEmployer: string = '';
    industry: string = '';
    contactNumber: string = '';
    tenureId: number = null;
    creditHistory: boolean = null;
    splitRent: boolean = null;
    companyTypeId: number = null;
    employeeId: number = null;
    jobPosition: string = '';
    mainSource: string = '';
    monthlyIncome: number = null;
    billLastYear: number = null;
    companyYearStart: string = '';
    branchoffice: number = null;
    streetHo: string = '';
    numberHo: string = '';
    intNumberHo: string = '';
    cityHo: string = '';
    communityHo: string = '';
    departamentHo: string = '';
}

class ReferenceData {
    name: string = '';
    firstName: string = '';
    lastName: string = '';
    relationshipId: number = null;
    mail: string = '';
    phone: string = '';
    firstRent: boolean = null;
    NameLandlord: string = '';
    EmailLandLord: string = '';
    PhoneLandLord: string = '';
}