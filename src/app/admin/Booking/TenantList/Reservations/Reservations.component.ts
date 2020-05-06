import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DatosService } from '../../../../../datos.service';
import * as CryptoJS from 'crypto-js';
import { Router } from '@angular/router';

@Component({
    selector: 'reservations',
    templateUrl: './reservations.component.html',
    styleUrls: ['./reservations.component.scss']
}) export class ProfileReservationsComponent implements OnInit {

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;

    public table_colums: any[] = ['service','type','sdate','edate','xcost'];
    public table_history_colums: any[] = ['build','room','membership','adate','ddate','aout','button'];
    public table_adding_services: any[] = ['icon','service','description','recurrent','once','select'];
    public name_build: string;
    public user_id: number;

    public section: string;

    constructor(
        public _services: DatosService,
        public _router: Router
    ) {}

    ngOnInit() {

        this.user_id = Number( sessionStorage.getItem('user_id') );
        this.section = 'tenantList';
        this.getReservationData();
        this.name_build = sessionStorage.getItem('name_build');

    }

    public current_services: any;
    public current_aditionals: any;
    public current_topay: any;
    public current_history: any;
    public current_card: any;
    public current_membership: any;
    public number_card: string;
    public kind_card: string;
    public bill_services_added: number;
    public bill_services_added_total: number;
    public bill_services_topay: number;
    public check_in_active: boolean;
    public check_out_active: boolean;
    public getReservationData():void {

        const user_data = {
            userid: this.user_id
        };

        this._services.service_general_post('Booking/SeeStateAccountAdmin', user_data)
            .subscribe( (response: any) => {

                if( response.result == 'Success' ) {

                    this.current_membership = response.infoMembership;
                    this.current_membership.customDateS = this.dateWorker('format' ,this.current_membership.dateStart );
                    this.current_membership.customDateE = this.dateWorker('format' ,this.current_membership.dateEnd );
                    this.current_membership.customDateDif = 
                        this.dateWorker('calc' , this.current_membership.dateStart, this.current_membership.dateEnd );
                    this.current_services = response.infoMembership.services;
                    this.current_aditionals = response.infoMembership.servicesAditional;
                    this.current_topay = response.infoMembership.toPay;
                    this.current_history = response.history;
                    this.current_card = response.mainCard;

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

                }

                console.log('General => ', this.current_membership);
                console.log('Services => ', this.current_services);
                console.log('Services add => ', this.current_aditionals);
                console.log('Services to pay => ', this.current_topay);
                console.log('History => ', this.current_history);
                console.log('Credit => ', this.current_card);

            }, (error: any) => {

                console.log('Error Get Reservation => ', error);

            });

    }

    public payPendingItems():void {

        console.log('Pagar cosas pendientes');
        console.log('Pendientes => ', this.current_topay);
        console.log('Credit card => ', this.current_card);

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

                console.log('All Services => ', this.all_services_gotted );

            }, (error: any) => {

            });

    }

    public services_selected: any[] = [];
    public selectingServices( service_data: any ):void {

        const finder = (service: any) => service_data.id == service.id;

        if( this.services_selected.findIndex( finder ) == -1 ) {

            this.services_selected.push( service_data );

        } else {

            this.services_selected.splice( this.services_selected.findIndex( finder ), 1);

        }

        console.log('Services selected => ', this.services_selected );

    }

    public clearServicesSelected():void {

        this.services_selected = [];

    }


    public saveServicesSelected():void {

        console.log('Send Services => ', this.services_selected);

        const services_to_send: any[] = [];

        this.validateServicesSelectedForm();

        this.services_selected.forEach( (service: any) => {

            const object_service = new ServiceAddedDTO();

                  object_service.id = this.user_id;
                  object_service.idService = service.id;
                  object_service.idBooking = this.current_membership.idBooking;
                  object_service.dateStart = '10/07/2022';
                  object_service.dateEnd = '20/07/2022';
                  object_service.recurrent = 1;
                  object_service.fromMembership = 2;
                  object_service.IdUserPaymentService = 0;
                  object_service.amount = 100;
                  object_service.idUserPaymentServiceNavigation = {
                    id: 0,
                    idServiceBooking: 0,
                    idCreditCard: 0,
                    payment: 0,
                    paymentDate: ''
                  };

                  services_to_send.push( object_service );

        });

        console.log('To send => ', services_to_send);

        this._services.service_general_post('BookingServiceAdmin/PostBookingService', services_to_send )
            .subscribe( (response: any) => {

                console.log('Response => ', response);

            }, (error: any) => {

                console.log('Error WS Save Services => ', error);

            });

    } 

    public history_selected: any;
    public history_selected_services_bill: number;
    public history_selected_services_total: number;
    public moreHistoryData( history_data: any ):void {

        this.history_selected = history_data;
        this.history_selected.customDateDif = 
                    this.dateWorker('calc' , this.history_selected.dateStart, this.history_selected.dateEnd );
        this.history_selected_services_bill = this.getBillFrom( this.history_selected.servicesAditional );
        this.history_selected_services_total = this.getBillFrom( this.history_selected.servicesAditional ) + this.history_selected.price; 

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

    public dateWorker( action: string , date: string, date_b: string = '' ):any {

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

    public validateServicesSelectedForm():boolean {

        let result: boolean = false;

        const form_services_added = document.getElementById('form_services_added'),
              service_form = form_services_added.querySelectorAll('[service="added"]');

              service_form.forEach( (service: any) => {

                let service_form_data = {
                    select: service.querySelectorAll('select')[0].value,
                    date_s: service.querySelectorAll('input')[0].value,
                    date_e: service.querySelectorAll('input')[1].value 
                }

                console.log('B Here => ', service);
                console.log( service.querySelectorAll('select')[0] );
                console.log( service.querySelectorAll('input')[0] );
                console.log( service.querySelectorAll('input')[1] );
                console.log('Form Service => ', service_form_data);

                //Añadir validaciones a los campos cuando esten vacios
                //Calcular las fechas para sacar el total
                //Completar el objeto con la informacion validada
                //Desplegar mensajes de error si existen
                //Terminar de enviar la data

              });

        console.log('Here => ', form_services_added);
        console.log('Here Goes => ', service_form);

        return result;

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
