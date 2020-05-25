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

    }

    public builds_list: any[];
    public getAddTenantData():void {

        this.loader.showLoader();

        this._services.service_general_get('Tenant/GetBuilds')
            .subscribe( (response: any) => {

                if( response.result == 'Sucess' ) {

                    this.builds_list = response.item;

                    console.log('Builds => ', this.builds_list);

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

                console.log('Build Selected ====> ', this.current_build);

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

                    console.log('Type room Catalog => ', this.typesrooms_catalog);

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

                    console.log('Roomate Catalog => ', this.roomates_catalog);

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
                    birth: '',
                    idBooking: null,
                    active: null,
                    phone: null,
                    genderId: null
                }

                this.beds_to_add.push( add_new_bed );

            }

        } else {

            this.show_beds_section = false;

        }

    }

    
    public booking_data: BookingDetailModel = new BookingDetailModel();
    public validateBookingDetailForm():void {

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
                    bed_in.email = 'no_data' : bed_in.email = bed_inputs[3].value;

                bed_inputs[4].value == '' ?
                    bed_in.phone = 'no_data' : bed_in.phone = bed_inputs[4].value;

              });

              this.beds_to_add.forEach( (bed: any) => {

                if(
                    bed.name == 'no_data' ||
                    bed.lastName == 'no_data' ||
                    bed.motherName == 'no_data' ||
                    bed.genderId == 'no_data' ||
                    bed.email == 'no_data' ||
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

                    console.log('Memberships => ', this.memberships_cards);
                    console.log('Rooms => ', this.rooms_cards);

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
                        header: 'Fatal Error',
                        text: 'Error Fatal'
                    }
                });

            });

    }

    public room_selected: any = null;
    public selectThisRoom( room: any ):void {

        this.room_selected = room;

        this.rooms_cards.forEach( (card: any) => {

            card.id == this.room_selected.id ?
                card.active = true : card.active = false;

        });

        this.getAddiotionalServices();

    }

    public membership_selected: any = null;
    public selectThisMembership( membership: any ):void {

        this.membership_selected = membership;

        this.memberships_cards.forEach( (card: any) => {

            card.membership.id == this.membership_selected.membership.id ?
                card.active = true : card.active = false; 

        });

        this.getAddiotionalServices();

    }

    public additional_services_list: any[];
    public additional_services_section: boolean = false;
    public getAddiotionalServices():void {

        console.log('R => ', this.room_selected);
        console.log('M => ',this.membership_selected);

        if( this.room_selected != null && this.membership_selected != null ) {

            this.additional_services_section = true; 

            const ws_data = {
                idMembership: this.membership_selected.membership.id,
                idBuilding: this.current_build.id
            }

            this._services.service_general_get_with_params('Tenant/GetServices', ws_data)
                .subscribe( (response: any) => {

                    if( response.result == 'Sucess' ) {

                        this.additional_services_list = response.services;

                        console.log('Services additionals => ', this.additional_services_list);

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

    public additonal_services_selected: any[] = [];

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

            console.log('Teminas el proceso');

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
    roomatePreferences: boolean = null;
    totalBeds: number = null;
}
