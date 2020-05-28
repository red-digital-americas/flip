import { Component, OnInit } from '@angular/core';
import { DatosService } from '../../../../datos.service';
import { LoaderComponent } from '../../../../ts/loader';
import { SystemMessage } from '../../../../ts/systemMessage';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
    selector: 'add-tenant-component',
    templateUrl: './AddTenant.component.html',
    styleUrls: ['./AddTenant.component.scss']
}) export class AddTenantComponent implements OnInit {

    public loader: LoaderComponent = new LoaderComponent();
    public system_message: SystemMessage = new SystemMessage();
    public table_services_resumen: any[] = ['icon','service','type','lapse','sdate','edate','ammount'];

    constructor(
        public _services: DatosService
    ) {}

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
            totalBeds: this.booking_data.totalBeds
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
                service.total_ammount = service.price * service.day_diff :
                service.total_ammount = service.priceUnit * service.day_diff;

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
                    service.total_ammount = service.price * service.day_diff :
                    service.total_ammount = service.priceUnit * service.day_diff;

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

        this.current_build.services.forEach( (service: any) => {

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

        const start_date: any = new Date( this.booking_data.startDate ),
            end_date: any = new Date( this.booking_data.finishDate ),
            diff_time = Math.abs( start_date - end_date ),
            diff_days = Math.ceil(diff_time / (1000 * 60 * 60 * 24));

            this.terms_of_use = diff_days < 8 ? 'short_t' : 'long_t';

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

        /*this.loader.showLoader();

        this._services.service_general_post('Tenant/PostBooking', this.booking_post_data)
            .subscribe( (response: any) => {

                if( response.result == 'Sucess' ) {

                    this.system_message.showMessage({
                        kind: 'ok',
                        time: 4777,
                        message: {
                            header: 'Booking detail created',
                            text: 'Booking detail has been created successfully.'
                        }
                    });

                    this.iHaveCompletedStep(0);

                    setTimeout( () => this.loader.hideLoader(), 1777);

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

                setTimeout( () => this.loader.hideLoader(), 1777);

            });*/


        console.log('Service completed => ', this.booking_post_data );
        
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

    public single_profile: boolean = true;
    public changeProfileType( event_data: any ):void {

        const type_profile = event_data.target;

        type_profile.value == '1' ? 
            this.general_user_data.systemTypeId = 1 :
            this.general_user_data.systemTypeId = 2;

        this.single_profile =  this.general_user_data.systemTypeId == 1 ? true : false;   

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

    public profile_section_card: boolean = false;
    public profileTenantCompleted():void {

        if( this.profileFormValidator() ) {

            this.profile_section_card = true;

        } else {

            this.system_message.showMessage({
                kind: 'error',
                time: 4777,
                message: {
                    header: 'Inputs required',
                    text: 'Some inputs must be fill to continue.'
                }
            });

            this.profile_section_card = false;

        }

    }

    public form_profile_validator: any = {
        no_name: false,
        no_lnam: false,
        no_mnam: false,
        no_mail: false,
        no_mail_valid: false,
        no_phon: false,
        no_gend: false
    }
    public profileFormValidator():boolean {

        let result: boolean = false;

        this.general_user_data.name == '' ? 
            this.form_profile_validator.no_name = true :
            this.form_profile_validator.no_name = false;

        this.general_user_data.lastName == '' ? 
            this.form_profile_validator.no_lnam = true :
            this.form_profile_validator.no_lnam = false;

        this.general_user_data.motherName == '' ? 
            this.form_profile_validator.no_mnam = true :
            this.form_profile_validator.no_mnam = false;

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

        if(
            this.terms_of_use == 'short_t' &&
            !this.form_profile_validator.no_name &&
            !this.form_profile_validator.no_lnam &&
            !this.form_profile_validator.no_mnam &&
            !this.form_profile_validator.no_phon &&
            !this.form_profile_validator.no_mail &&
            !this.form_profile_validator.no_mail_valid &&
            !this.form_profile_validator.no_gend
        ) {

            result = true;

        } else result = false;

        return result;

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

}

class BookingDetailModel {
    building: number = null;
    startDate: string = '';
    finishDate: string = '';
    roomateFlip: number = null;
    pets: boolean = null;
    roomType: number = null;
    smoke: boolean = null;
    roomatePreferences: boolean = null;
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
}

class GeneralUserData {
    name: string = '';
    password: string = '';
    email: string = '';
    lastName: string = '';
    motherName: string = '';
    avatar: string = '';
    systemTypeId: number = 1;
    phone: string = '';
    cellphone: string = '';
    workplace: string = '';
    aboutMe: string = '';
    active: boolean = true;
    bith: string = '';
    rfc: string = '';
    userData: PersonaUserInfo = new PersonaUserInfo();
    userTaxData: UserBussinessData = new UserBussinessData();
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




