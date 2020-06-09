import { Component, OnInit } from '@angular/core';
import { DatosService } from '../../../../datos.service';
import { LoaderComponent } from '../../../../ts/loader';
import { SystemMessage } from '../../../../ts/systemMessage';

@Component({
    selector: 'alerts',
    templateUrl: './alerts.component.html',
    styleUrls: ['./alerts.component.scss']
})
export class AlertsComponent implements OnInit {

    public section: string;
    public loader: LoaderComponent = new LoaderComponent();
    public system_message: SystemMessage = new SystemMessage();

    constructor(
        public _services: DatosService
    ) {}

    ngOnInit() {

        this.section = 'alerts';
        this.getAlertsData();
        this.getToday();

    }

    public show_modal: boolean = false;
    public showModal():void {

        !this.show_modal ? 
            this.show_modal = true : this.show_modal = false; 

    }

    public modules: any[] = [];
    public awaiting_invoice_cards: any[] = [];
    public completed_and_paid_cards: any[] = [];
    public confirming_completion_cards: any[] = [];
    public confirming_paymnet_cards: any[] = [];
    public pending_schedule_cards: any[] = [];
    public other_cards: any[] = [];
    public schedule_month_cards: any[] = [];
    public schelude_today_cards: any[] = [];
    public schelude_week_cards: any[] = [];
    public urgent_cards: any[] = [];
    public getAlertsData( id_type: string = '1' ):void {

        const ws_data = {
            userId: localStorage.getItem('id'),
            startDate: '01-01-1900',
            endDate: '01-01-2050',
            type: id_type,
            buildingId: localStorage.getItem('buildingid')
        },
        filter_by_container: any = document.getElementById('filter_by');

        this.loader.showLoader();

        this._services.service_general_get_with_params('Alerts/GetAllAlertsByDateType', ws_data)
            .subscribe( (response: any) => {

                if( response.result == 'Sucess' ) {

                    this.awaiting_invoice_cards = response.items.awaiting_invoice;
                    this.completed_and_paid_cards = response.items.completed_and_paid;
                    this.confirming_completion_cards = response.items.confirming_completion;
                    this.confirming_paymnet_cards = response.items.confirming_paymnet;
                    this.pending_schedule_cards = response.items.pending_schedule;
                    this.other_cards = response.items.other;
                    this.schedule_month_cards = response.items.schedule_month;
                    this.schelude_today_cards = response.items.schelude_today;
                    this.schelude_week_cards = response.items.schelude_week;
                    this.urgent_cards = response.items.urgent;

                    if( filter_by_container.value == '1' ) {

                        this.pending_schedule_cards.forEach( (card: any) => card.visible_item = true ); 
                        this.confirming_completion_cards.forEach( (card: any) => card.visible_item = true );
                        this.awaiting_invoice_cards.forEach( (card: any) => card.visible_item = true ); 
                        this.confirming_paymnet_cards.forEach( (card: any) => card.visible_item = true );
                        this.completed_and_paid_cards.forEach( (card: any) => card.visible_item = true ); 

                    } else {

                        this.other_cards.forEach( (card: any) => card.visible_item = true ); 
                        this.schedule_month_cards.forEach( (card: any) => card.visible_item = true ); 
                        this.schelude_today_cards.forEach( (card: any) => card.visible_item = true ); 
                        this.schelude_week_cards.forEach( (card: any) => card.visible_item = true ); 
                        this.urgent_cards.forEach( (card: any) => card.visible_item = true ); 

                    }

                    console.log('General => ', response);
                    
                }

                this.loader.hideLoader();

            }, (error: any) => {

                this.system_message.showMessage({
                    kind: 'error',
                    time: 4777,
                    message: {
                        header: 'System Error',
                        text: 'A system error has ocurred, please try leater'
                    }
                });

                this.loader.hideLoader();

            });

    }

    public find_text: TextFinder = new TextFinder();
    public filteringByText():void {

        const filter_by_container: any = document.getElementById('filter_by');

        if( filter_by_container.value == '1' ) {

            this.filterDataFrom( this.pending_schedule_cards, {name: 'pending_schedule_cards'} );
            this.filterDataFrom( this.confirming_completion_cards, {name: 'confirming_completion_cards'} );
            this.filterDataFrom( this.awaiting_invoice_cards, {name: 'awaiting_invoice_cards'} );
            this.filterDataFrom( this.confirming_paymnet_cards, {name: 'confirming_paymnet_cards'} );
            this.filterDataFrom( this.completed_and_paid_cards, {name: 'completed_and_paid_cards'} );

        } else {

            this.filterDataFrom( this.other_cards, {name: 'other_cards'} );
            this.filterDataFrom( this.schedule_month_cards, {name: 'schedule_month_cards'} );
            this.filterDataFrom( this.schelude_today_cards, {name: 'schelude_today_cards'} );
            this.filterDataFrom( this.schelude_week_cards, {name: 'schelude_week_cards'} );
            this.filterDataFrom( this.urgent_cards, {name: 'urgent_cards'} );

        }

    }

    public filterDataFrom( array_to_filter: any[], extra_data: any = null ):void { 

        array_to_filter.forEach( (card: any) => {

            card.visible_item = false;

            if( this.find_text.text ==  card.id.toString() || 
                card.information.toLowerCase().includes( this.find_text.text.toLowerCase() ) ) {

                card.visible_item = true;

            }

            if( this.find_text.text == '' ) {

                card.visible_item = true;

            }

        });

        if( extra_data != null && array_to_filter.length != 0 ) {

            let at_least_one_found: boolean = true;

            for( let index = 0; index < array_to_filter.length; index += 1 ) {

                if( array_to_filter[index].visible_item ) {

                    at_least_one_found = false;

                }

            }

            const list_card_container = document.getElementById(`${ extra_data.name }_nr`);

            if( list_card_container != null ) {

                if( at_least_one_found ) {

                    list_card_container.classList.remove('display-none');
    
                } else {
    
                    list_card_container.classList.add('display-none');
    
                }

            }

        }

    }

    public schedule_object: any = null;
    public schedule_avaible: any = null;
    public passScheduleData( schedule_selected: any ):void {

        this.resetAlertFormData();

        this.schedule_object = schedule_selected;

        this.schedule_avaible = JSON.parse( schedule_selected.availableSchedule );
        this.setDaysActives( this.schedule_avaible.daysOfWeek );

        console.log('Schedule ===> ', this.schedule_object );

    }

    public setDaysActives( days_active: any ):void {

        function getDataFromDom() {

            setTimeout( () => {

                const days_container: any = document.getElementById('days_container');

                for( let index = 0; index < days_active.length; index += 1 ) {

                    const day_container: any = days_container.children[days_active[index]],
                          day_span = day_container.querySelector('[day="day-letter"]');

                    day_span.classList.add('days-icons__day-letter--active');

                }

            }, 177);

        }

        getDataFromDom();

    }

    public alert_detail_form: AlertDetail = new AlertDetail();
    public saveAlertDetail():void {

        if( this.alterDetailFieldsValidator() ) {

            this.loader.showLoader();

            this.system_message.showMessage({
                kind: 'ok',
                time: 4777,
                message: {
                    header: 'Alert updated',
                    text: 'Alert has been updated successfully.'
                }
            });

            this.showModal();

            setTimeout( () => this.loader.hideLoader(), 1777);

            console.log('Here we go => ', this.alert_detail_form);

        } else {

            this.system_message.showMessage({
                kind: 'error',
                time: 4777,
                message: {
                    header: 'Form Data',
                    text: 'All inputs must be filled to continue.'
                }
            });

        }

    }

    public getAlterStatusCatalog():void {

        this.loader.showLoader();

        this._services.service_general_get('getstatusalerts')
            .subscribe( (response: any) => {

                console.log('===> ', response);

            }, (error: any) => {

                this.system_message.showMessage({
                    kind: 'error',
                    time: 4777,
                    message: {
                        header: 'System Error',
                        text: 'A system error has ocurred, please try leater'
                    }
                });

            });

    }

    public alert_detail_validator: any = {
        no_aler: false,
        no_cnam: false,
        no_cpho: false,
        no_cmai: false,
        no_snam: false,
        no_spho: false,
        no_smai: false,
        no_mbud: false
    }
    public alterDetailFieldsValidator():boolean {

        let result: boolean = false;

        this.alert_detail_form.IdAlert == -1 ?
            this.alert_detail_validator.no_aler = true :
            this.alert_detail_validator.no_aler = false;

        this.alert_detail_form.Company == '' ?
            this.alert_detail_validator.no_cnam = true :
            this.alert_detail_validator.no_cnam = false;

        this.alert_detail_form.Phone == '' ?
            this.alert_detail_validator.no_cpho = true :
            this.alert_detail_validator.no_cpho = false;

        this.alert_detail_form.EmailCompany == '' ?
            this.alert_detail_validator.no_cmai = true :
            this.alert_detail_validator.no_cmai = false;

        this.alert_detail_form.AssignStaff == '' ?
            this.alert_detail_validator.no_snam = true :
            this.alert_detail_validator.no_snam = false;

        this.alert_detail_form.MobilPhone == '' ?
            this.alert_detail_validator.no_spho = true :
            this.alert_detail_validator.no_spho = false;

        this.alert_detail_form.EmailStaff == '' ?
            this.alert_detail_validator.no_smai = true :
            this.alert_detail_validator.no_smai = false;

        this.alert_detail_form.MaxBudget == '' ?
            this.alert_detail_validator.no_mbud = true :
            this.alert_detail_validator.no_mbud = false;


        for( let field in this.alert_detail_validator ) {

            if( this.alert_detail_validator[field] ) return false;
            else result = true;

        }

        return result;
        
    }

    public resetAlertFormData():void {

        this.alert_detail_validator.no_aler = false;
        this.alert_detail_validator.no_cnam = false;
        this.alert_detail_validator.no_cpho = false;
        this.alert_detail_validator.no_cmai = false;
        this.alert_detail_validator.no_snam = false;
        this.alert_detail_validator.no_spho = false;
        this.alert_detail_validator.no_smai = false;
        this.alert_detail_validator.no_mbud = false;

        this.alert_detail_form.Company = '';
        this.alert_detail_form.Phone = '';
        this.alert_detail_form.EmailCompany = '';
        this.alert_detail_form.AssignStaff = '';
        this.alert_detail_form.MobilPhone = '';
        this.alert_detail_form.EmailStaff = '';
        this.alert_detail_form.MaxBudget = '';

    }

    /*Utilities Section*/
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

}

class TextFinder {
    text: string = '';
}

class AlertDetail {
    id: number = 0;
    Company: string = '';
    AssignStaff: string = '';
    MaxBudget: string = '';
    Phone: string = '';
    MobilPhone: string = '';
    EmailCompany: string = '';
    EmailStaff: string = '';
    ProgramSchedule: string = '';
    IdAlert: number = -1;
}
