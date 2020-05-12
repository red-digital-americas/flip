import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DatosService } from '../../../../../datos.service';
import { StripeToken, StripeSource } from 'stripe-angular';
import { StripeScriptTag } from "stripe-angular";
import * as CryptoJS from 'crypto-js';
import { Router } from '@angular/router';
import { LoaderComponent } from '../../../../../ts/loader';
import { SystemMessage } from '../../../../../ts/systemMessage';
import { resolve } from 'dns';

@Component({
    selector: 'reservations',
    templateUrl: './reservations.component.html',
    styleUrls: ['./reservations.component.scss']
}) export class ProfileReservationsComponent implements OnInit {

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;

    private st_key:string = "pk_test_WiAYJgrEz6XKxL2MwKD89oqO00bfPcrlOF";
    public loader: LoaderComponent = new LoaderComponent();
    public system_message: SystemMessage = new SystemMessage();
    public table_colums: any[] = ['service','type','sdate','edate','xcost'];
    public table_history_colums: any[] = ['build','room','membership','adate','ddate','aout','button'];
    public table_payHistory_colums: any[] = ['membership','dateStart','dateEnd','payday','ammount','card'];
    public table_serHistory_colums: any[] = ['name','price','payday','dateStart','dateEnd','card'];
    public table_adding_services: any[] = ['icon','service','description','recurrent','once','select'];
    public name_build: string;
    public user_id: number;
    public booking_id: number;
    public section: string;

    constructor(
        public _services: DatosService,
        public _router: Router,
        public _stripeScriptTag: StripeScriptTag
    ) {

        this._stripeScriptTag.setPublishableKey(this.st_key);

    }


    ngOnInit() {

        this.user_id = Number( sessionStorage.getItem('user_id') );
        this.booking_id = Number(sessionStorage.getItem('booking_id'));
        this.section = 'tenantList';
        this.getReservationData();
        this.name_build = sessionStorage.getItem('name_build');

    }

    public beds_section: boolean = false;
    public history_section: boolean = false;
    public showSection( section_to_show: string ):void {

        switch( section_to_show ) {

            case 'beds':
                this.beds_section ? this.beds_section = false : this.beds_section = true;
                break;

            case 'history_section':
                this.history_section ? this.history_section = false : this.history_section = true;
                break;

        }

    }

    public current_services: any;
    public current_aditionals: any;
    public current_topay: any;
    public current_history: any;
    public current_card: any;
    public current_membership: any;
    public current_paymentHis: any;
    public current_paymentSer: any;
    public current_beds: any;
    public number_card: string;
    public kind_card: string;
    public bill_services_added: number;
    public bill_services_added_total: number;
    public bill_services_topay: number;
    public check_in_active: boolean;
    public check_out_active: boolean;
    public getReservationData():void {

        const user_data = {
            userid: this.user_id,
            bookingId: this.booking_id
        };

        this._services.service_general_post('Booking/SeeStateAccountAdmin', user_data)
            .subscribe( (response: any) => {

                if( response.result == 'Success' ) {

                    this.current_membership = response.infoMembership;
                    this.current_beds = this.current_membership.additionalBeds;
                    this.current_membership.customDateS = this.dateWorker('format' ,this.current_membership.dateStart );
                    this.current_membership.customDateE = this.dateWorker('format' ,this.current_membership.dateEnd );
                    this.current_membership.customDateDif = 
                        this.dateWorker('calc' , this.current_membership.dateStart, this.current_membership.dateEnd );
                    this.current_services = response.infoMembership.services;
                    this.current_aditionals = response.infoMembership.servicesAditional;
                    this.current_topay = response.infoMembership.toPay;
                    this.current_history = response.history;
                    this.current_card = response.mainCard;
                    this.current_paymentHis = this.current_membership.historyPaymentsMemberships;
                    this.current_paymentSer = this.current_membership.historyPaymentService;

                    const card_number = this.decryptData( this.current_card.number ).toString();
                    this.bill_services_added = this.getBillFrom( this.current_aditionals );
                    this.bill_services_added_total = this.getBillFrom( this.current_aditionals ) + this.current_membership.price; 
                    this.bill_services_topay = this.getBillFrom( this.current_topay );
                    this.kind_card = this.kindCardDetecter( card_number );
                    this.number_card = card_number.substr( this.decryptData( this.current_card.number ).toString().length - 4);
                    this.current_membership.dateStartReal == null ? 
                        this.check_in_active = true : 
                        this.check_in_active = false;
                    this.current_membership.dateEndReal == null ? 
                        this.check_out_active = true : 
                        this.check_out_active = false; 
                    this.current_paymentHis.forEach( (history: any) => {

                        const card_number = this.decryptData( history.paymentData.cc );

                        history.creditNumber = card_number.substr( card_number.toString().length - 4); 

                    });
                    this.current_paymentSer.forEach( (service: any) => {

                        if( service.cc.cc != null ) {

                            const card_number = this.decryptData( service.cc.cc );

                            service.cardClue = card_number.substr( card_number.toString().length - 4);

                        } else {

                            service.cardClue = null;

                        }

                    });

                }

                console.log('General => ', this.current_membership);
                console.log('Add Beds => ', this.current_beds );
                console.log('Services => ', this.current_services);
                console.log('Services add => ', this.current_aditionals);
                console.log('Services to pay => ', this.current_topay);
                console.log('Payments History => ', this.current_paymentHis);
                console.log('Services History => ', this.current_paymentSer );
                console.log('History => ', this.current_history);
                console.log('Credit => ', this.current_card);

            }, (error: any) => {

                console.error('Error Get Reservation => ', error);

            });

    }

    public confirmCheckInOut( action: string ):void {

        let ws_action: string = null;

        const ws_data = {
            username: this.current_card.userId
        }

        switch( action ) {

            case 'in':
                ws_action = 'checkIn';
                break;

            case 'out':
                ws_action = 'checkOut';
                break;

        }

        this.loader.showLoader();

        this._services.service_general_post(`Profile/${ ws_action }`, ws_data)
            .subscribe( (response: any) => {

                if( response.result == 'Success' ) {

                    this.system_message.showMessage({
                        kind: 'ok',
                        time: 4200,
                        message: {
                            header: `${ ws_action == 'in' ? 'Check In ' : 'Check out' } successfully.`,
                            text: `You have been ${ ws_action == 'in' ? 'Check In ' : 'Check out' } successfully`
                        }
                    });

                    this.showModal();

                    setTimeout( () => this.loader.hideLoader(),1777);

                }

            }, (error: any) => {

                console.error('Error WS CIO => ', error);

            });

    }

    public payPendingItems():void {

        const card_data = {
            number: this.decryptData( this.current_card.number ),
            expYear: Number( this.current_card.year ),
            expMonth: Number( this.current_card.month ),
            cvc: this.decryptData( this.current_card.ccv ).toString(),
            id: this.current_card.id
        }

        this.loader.showLoader();
        
        this._services.service_general_post('Stripe', card_data)
            .subscribe( (response: any) => {
                
                if( response.result == 'Success' ) {

                    const st_data = {
                        token : response.item,
                        amount: this.bill_services_topay
                    }
            
                    this._services.service_general_post('Booking/PayAddServices', st_data)
                        .subscribe( (response: any) => {

                            if( response.result == 'Success' ) {

                                const ws_data = {
                                    id: this.current_membership.idBooking
                                }

                                this._services.service_general_post('Booking/PayFromAdmin', ws_data)
                                    .subscribe( (response: any) => {

                                        console.log( response );
                                        this.showModal();
                                        this.getReservationData();
                                        this.loader.hideLoader();

                                    }, (error: any) => {

                                        console.error('Error WS PayFromAdmin => ', error);

                                    });

                            }
            
                    });

                }

            }, (error: any) => {

                console.error('Error WS Pay Pend => ', error);

            });

    }

    public all_services_gotted: any[];
    public getServicesData():void {

        const user_data = {
            userId: this.user_id, 
            buildingId: this.current_membership.idRoom,  
            idBooking: this.current_membership.idBooking
        };

        this._services.service_general_get_with_params('HistoricalServices/GetBookedAndBuildingAdmin' ,user_data)
            .subscribe( (response: any) => {

                if( response.result == 'Success' ) {

                    this.all_services_gotted = response.item;

                }

            }, (error: any) => {

                console.log('Error WS GetBookedAndBuildingAdmin => ', error);

            });

    }

    public services_selected: any[] = [];
    public selectingServices( service_data: any ):void {

        const finder = (service: any) => service_data.id == service.id;

        if( this.services_selected.findIndex( finder ) == -1 ) {

            service_data.service_lapse = '';

            this.services_selected.push( service_data );

            setTimeout( () => {

                const input_s_field = document.getElementById(`addServ_sDate_${ service_data.id }`);
                      input_s_field.setAttribute('min', this.dateWorker('value', this.current_membership.dateStart.trim() ) );

            }, this.services_selected.length * 10 );

        } else {

            this.services_selected.splice( this.services_selected.findIndex( finder ), 1);

        }

    }

    public updateServiceSelectedPrice( service: any ,event_data: any ):void {

        service.service_lapse = event_data.value;

        if( service.days_diff ) {

            service.service_lapse == '1' ? 
                service.total = service.price * service.days_diff :
                service.total = service.priceUnit * service.days_diff;

        }

    }

    public clearServicesSelected():void {

        this.services_selected = [];

    }

    private get_token: string;
    public saveOrPayServicesSelected( action: string = '' ):void {

        if( this.validateServicesSelectedForm() ) {

            this.loader.showLoader();

            if( action == 'pay' ) {

                const card_data = {
                    number: this.decryptData( this.current_card.number ),
                    expYear: Number( this.current_card.year ),
                    expMonth: Number( this.current_card.month ),
                    cvc: this.decryptData( this.current_card.ccv ).toString(),
                    id: this.current_card.id
                }

                this._services.service_general_post('Stripe', card_data)
                    .subscribe( (response: any) => {

                        if( response.result == 'Success' ) {

                            const st_data = {
                                token : response.item,
                                amount: this.bill_services_topay
                            }

                            this._services.service_general_post('Booking/PayAddServices', st_data)
                                .subscribe( (response: any) => {

                                    if( response.result == 'Success' ) {

                                        this.services_to_send.forEach( (service: any) => {

                                            service.idUserPaymentServiceNavigation.id = 0;
                                            service.idUserPaymentServiceNavigation.idServiceBooking = 0;
                                            service.idUserPaymentServiceNavigation.payment = 1;
                                            service.idUserPaymentServiceNavigation.idCreditCard = card_data.id;
                                            service.idUserPaymentServiceNavigation.paymentDate = 
                                                `${ new Date().getFullYear() }-${ new Date().getDay() }-${ new Date().getMonth() }`;
            
                                        });

                                        this.saveOrPayServices();

                                    }

                                }, (error: any) => {

                                    console.error('WS PayService => ', error);

                                });

                        }

                    }, (error: any) => {

                        console.error('Error WS Stripe => ', error);

                    });

            } else {

                this.saveOrPayServices();

            }


        } else this.system_message.showMessage({
                    kind: 'error',
                    time: 5200,
                    message: {
                        header: 'Information Error',
                        text: 'All Inputs must be fill to continue'
                    }
                });

    }

    public saveOrPayServices():void {

        this._services.service_general_post('BookingServiceAdmin/PostBookingService', this.services_to_send )
            .subscribe( (response: any) => {

            if( response.result == 'Success' ) {

                this.system_message.showMessage({
                    kind: 'ok',
                    time: 4200,
                    message: {
                        header: 'Services added.',
                        text: 'Service/s have been added succesfully.'
                    }
                });

                this.getReservationData();
                this.showModal();
                this.services_selected = [];

                setTimeout( () => this.loader.hideLoader(), 1777 );

            }

        }, (error: any) => {

            console.log('Error WS Save Services => ', error);

        });

    }
    
    public services_to_send: any[] = [];
    public validateServicesSelectedForm():boolean {

        this.services_to_send = [];

        let result = false;

        const service_data = document.querySelectorAll('[service="added"]');

        service_data.forEach( (service: any) => {

            const id_service = service.querySelectorAll('select')[0].id.split('_')[service.querySelectorAll('select')[0].id.split('_').length -1],
                  select_field = service.querySelectorAll('select')[0],
                  input_s_field = service.querySelectorAll('input')[0],
                  input_e_field = service.querySelectorAll('input')[1];
            
            let form_error_found = {
                error_one_found: false,
                error_two_found: false,
                error_three_found: false,
                confirm: function( this ) {

                        let result: boolean = false;

                        this.error_one_found || 
                        this.error_two_found ||
                        this.error_three_found ?
                            result = true : result = false;

                        return result;
                    }
                }

            this.services_selected.forEach( (service_on: any) => {

                if( service_on.id == id_service ) {

                    service_on.no_select = false;
                    service_on.no_sDate = false;
                    service_on.no_eDate = false;

                    if( select_field.value == null || select_field.value == "" ) {

                        service_on.no_select = true;
                        form_error_found.error_one_found = true;

                    } else {

                        service_on.no_select = false;
                        form_error_found.error_one_found = false;

                    }

                    if( input_s_field.value == null || input_s_field.value == "" ) {

                        service_on.no_sDate = true;    
                        form_error_found.error_two_found = true;    

                    } else {

                        form_error_found.error_one_found = false;
                        service_on.no_eDate = false;

                    }

                    if( input_e_field.value == null || input_e_field.value == "" ) {

                        service_on.no_eDate = true;
                        form_error_found.error_three_found = true;  

                    } else {

                        service_on.no_eDate = false;
                        form_error_found.error_one_found = false;

                    }

                    form_error_found.confirm(); 

                    const days_diff = this.calcDaysDiff(input_s_field.value, input_e_field.value),
                        object_service = new ServiceAddedDTO();
                        object_service.id = 0;
                        object_service.idService = service_on.id;
                        object_service.idBooking = this.current_membership.idBooking;
                        object_service.dateStart = input_s_field.value;
                        object_service.dateEnd = input_e_field.value;
                        object_service.recurrent = select_field.value;
                        object_service.fromMembership = 2;
                        object_service.IdUserPaymentService = 0;
                        object_service.amount = days_diff * ( service_on.service_lapse == '1' ? service_on.priceUnit : service_on.price );
                        service_on.total = object_service.amount;
                        object_service.idUserPaymentServiceNavigation = {
                            id: 0,
                            idServiceBooking: 0,
                            idCreditCard: null,
                            payment: 0,
                            paymentDate: ''
                        }

                    this.services_to_send.push( object_service );

                }

            });

        });

        for( let service of this.services_selected ) {

            if( service.no_select || service.no_sDate || service.no_eDate ) return;
            else result = true;

        }

        return result;

    }

    public addServiceDateValidator( id_sDate: string, id_eDate: string, id: string ):void {

        const date_s: any = document.getElementById( id_sDate ),
              date_e: any = document.getElementById( id_eDate ),
              id_service = Number( id );

        let days_diff = 0;

        if( date_s.value == '' ) {

            date_e.setAttribute('disabled', 'true');

        } else {

            date_e.min = date_s.value;
            date_e.removeAttribute('disabled');

        }

        if( date_e.value != '' ) {

            date_s.max = date_e.value;

        }

        days_diff = this.calcDaysDiff(date_s.value, date_e.value);

        if( days_diff !== NaN ) {

            this.services_selected.forEach( (service: any) => {

                if( service.id == id_service ) {

                    service.service_lapse == '1' ? 
                    service.total = service.price * days_diff : 
                    service.total = service.priceUnit * days_diff;
                    service.days_diff = days_diff;

                }

            });

        }

    }

    public calcDaysDiff( date_one: string, date_two: string ):number {

        const date_s = new Date(date_one),
              date_e = new Date(date_two),
              time_diff =  Math.abs(date_e.getTime() - date_s.getTime()),
              diff_days = Math.ceil(time_diff / (1000 * 3600 * 24));

        return diff_days;

    }

    public history_selected: any;
    public history_selected_memberships: any;
    public history_selected_servicesHis: any;
    public history_selected_services_bill: number;
    public history_selected_services_total: number;
    public moreHistoryData( history_data: any ):void { 

        this.history_selected = history_data; 
        this.history_selected_memberships = this.history_selected.historyPaymentsMemberships;
        this.history_selected_servicesHis = this.history_selected.historyPaymentService;

        console.log('CC Mem => ', this.history_selected_servicesHis);

        this.history_selected_memberships.forEach( (card: any) => {

            const card_number = this.decryptData( card.paymentData.cc );

            card.creditNumber = card_number.substr( card_number.toString().length - 4);

        });

        this.history_selected_servicesHis.forEach( (card: any) => {

            if( card.cc.cc != null || card.cc.cc != undefined ) {

                const card_number = this.decryptData( card.cc.cc );

                card.cardClue = card_number.substr( card_number.toString().length - 4);

            } else {

                card.cardClue = null;

            }

        });

        this.history_selected.customDateDif = 
                    this.dateWorker('calc' , this.history_selected.dateStart, this.history_selected.dateEnd );
        this.history_selected_services_bill = this.getBillFrom( this.history_selected.servicesAditional );
        this.history_selected_services_total = this.getBillFrom( this.history_selected.servicesAditional ) + this.history_selected.price; 

    }

    public endDateData: EndDateDataModel = new EndDateDataModel();
    public editEndDateInit():void {

        this.end_date_form.no_edat = false;
        
        this.endDateData.cost_nig = this.current_membership.costPerNigth;
        this.endDateData.date_s = this.dateWorker('value', this.current_membership.dateStart.trim(), '', 1 );
        this.endDateData.date_e = null;
        this.endDateData.days_res = 0;
        this.endDateData.total_pay = 0;

    }

    public updateEndDateData( event_data: any ):void {

        this.endDateData.date_e = event_data;
        this.endDateData.days_res = this.calcDaysDiff( this.endDateData.date_s, this.endDateData.date_e );
        this.endDateData.total_pay = this.endDateData.days_res * this.endDateData.cost_nig;
        
    }

    public updateEndDate():void {

        if( this.endDateFormValidator( this.endDateData ) ) {

            this.loader.showLoader();

            this.system_message.showMessage({
                kind: 'ok',
                time: 5200,
                message: {
                    header: 'End Date Updated',
                    text: 'End Date has been updated successfully'
                }
            });

            this.showModal();

            setTimeout( () => this.loader.hideLoader(), 1777);

        } else this.system_message.showMessage({
            kind: 'error',
            time: 5200,
            message: {
                header: 'Form incompleted',
                text: 'You must fill all inputs.'
            }    
        });

    }

    public end_date_form: any = {
        no_edat: false
    }
    public endDateFormValidator( form_data: EndDateDataModel ):boolean {

        let result: boolean = false;

        form_data.date_e == '' || form_data.date_e == null ?
            this.end_date_form.no_edat = true : this.end_date_form.no_edat = false; 

        if( this.end_date_form.no_edat ) result = false;
        else result = true;

        return result;

    }

    public show_page_modal: boolean = false;
    public modal_to_show: string;
    public showModal( to_show: string = 'default' ):void {

        !this.show_page_modal ?
            this.show_page_modal = true :
            this.show_page_modal = false;

        this.modal_to_show = to_show;

    }

    public getBillFrom( bills: any ):number {

        let total: number = 0;

        bills.forEach( (bill: any) => {

            total += bill.cost;

        });

        return total;

    }

    public dateWorker( action: string , date: string, date_b: string = '', add_days: number = 0 ):any {

        let result: any = null;

        const day_gotted = {
            date_values: (function(){ return date.split('/') }()),
            get day() { return this.date_values[0] },
            get month() { return this.date_values[1] },
            get year() { return this.date_values[2] }
        },
        months = ['Jan.','Feb.','Mar.','Apr.','May','June','July','Aug.','Sept.','Oct.','Nov.','Dec.'];

        const day_gotted_b = {
            date_values: (function(){ return date_b.split('/') }()),
            get day() { return this.date_values[0] },
            get month() { return this.date_values[1] },
            get year() { return this.date_values[2] }
        };

        let date_s: any, date_e: any, time_diff: any, diff_days: any;

        switch( action ) {

            case 'format':
                result = `${ months[day_gotted.month - 1] } ${ day_gotted.day } ${ day_gotted.year }`
                break;

            case 'value':
                const value_worker = {
                    day: function() {
                        
                        let day = Number( day_gotted.day ) + add_days,
                            result = day > 9 ? day.toString() : `0${ day.toString() }`;

                        return result;

                    } 
                }
                result = `${ day_gotted.year }-${ day_gotted.month }-${ value_worker.day() }`;
                break;

            case 'calc':
                date_s = new Date(`${ day_gotted.month }/${ day_gotted.day }/${ day_gotted.year }`);
                date_e = new Date(`${ day_gotted_b.month }/${ day_gotted_b.day }/${ day_gotted_b.year }`),
                time_diff =  Math.abs(date_e.getTime() - date_s.getTime());
                diff_days = Math.ceil(time_diff / (1000 * 3600 * 24));
                result = diff_days;
                break;

        }

        return result;

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
    public decryptData(data):any {
        try {
            const bytes = CryptoJS.AES.decrypt(data, this.encryptSecretKey);
            if (bytes.toString()) {
            var decrypt = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
            }

            return decrypt;
        } catch (e) { console.log(e); }
    }
    
    public encryptData(data):any {
        try {
            var crypt = CryptoJS.AES.encrypt(JSON.stringify(data), this.encryptSecretKey).toString();
            // console.log(this.crypt)
            // this.decryptData(this.crypt);
            return crypt;
        } catch (e) { console.log(e); }
    }

    public goToPage( the_page: string = '' ):void {

        the_page != '' ? 
            this._router.navigateByUrl( the_page ) :
            window.history.back();

    }

}

class ServiceAddedDTO {
    id: number = 0;
    idService: number = null;
    idBooking: number = null;
    dateStart: string = '';
    dateEnd: string = '';
    recurrent: number = null;
    fromMembership: number = null;
    IdUserPaymentService: number = null;
    amount: number = null;
    idUserPaymentServiceNavigation: {
        id: number;
        idServiceBooking: number;
        idCreditCard: any;
        payment: number;
        paymentDate: any;
    } = {
        id: null,
        idServiceBooking: null,
        idCreditCard: null,
        payment: null,
        paymentDate: null
    }
}

class EndDateDataModel {
    date_s: string = '';
    date_e: string = '';
    days_res: number = 0;
    total_pay: number = 0;
    cost_nig: number = 0;
}
