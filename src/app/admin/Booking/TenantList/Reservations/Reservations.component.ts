import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DatosService } from '../../../../../datos.service';
import * as CryptoJS from 'crypto-js';

@Component({
    selector: 'reservations',
    templateUrl: './reservations.component.html',
    styleUrls: ['./reservations.component.scss']
}) export class ProfileReservationsComponent implements OnInit {

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;

    public table_colums: any[] = ['service','type','sdate','edate','xcost'];
    public table_history_colums: any[] = ['build','room','membership','adate','ddate','aout','button'];

    public section: string;

    constructor(
        public _services: DatosService
    ) {}

    ngOnInit() {

        this.section = 'tenantList';
        this.getReservationData();

    }

    public current_services: any;
    public current_aditionals: any;
    public current_topay: any;
    public current_history: any;
    public current_card: any;
    public current_membership: any;
    public number_card: string;
    public kind_card: string;
    public getReservationData():void {

        const user_data = {
            userid: 8
        };

        this._services.service_general_post('Booking/SeeStateAccountAdmin', user_data)
            .subscribe( (response: any) => {

                if( response.result == 'Success' ) {

                    this.current_membership = response.infoMembership;
                    this.current_services = response.infoMembership.services;
                    this.current_aditionals = response.infoMembership.servicesAditional;
                    this.current_topay = response.infoMembership.toPay;
                    this.current_history = response.history;
                    this.current_card = response.mainCard;

                    const card_number = this.decryptData( this.current_card.number ).toString();
                    this.kind_card = this.kindCardDetecter( card_number );
                    this.number_card = card_number.substr( this.decryptData( this.current_card.number ).toString().length - 4);

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

    public show_page_modal: boolean = false;
    public showModal( to_show: string ):void {

        !this.show_page_modal ?
            this.show_page_modal = true :
            this.show_page_modal = false;

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

}