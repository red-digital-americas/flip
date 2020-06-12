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
    /////////////////////////////////////////////// CHAT ////////////////////////////////////////////////
    IDUSR = '';
    messageInput = '';
    userSendMessage: {} = {
        id: 0,
        info: {
            name: 'Name',
            lastname: 'Last Name',
            photo: 'https://radio.spainrp.es/assets/images/logo-122x122.png'
        }
    };

    messages: [
        {
            message: {
                userId: 0,
                message1: 'Cadena 0'
            }
        },
        {
            message: {
                userId: 1,
                message1: 'Cadena 1'
            }
        }
    ];
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    ngOnInit() {
        this.IDUSR = JSON.parse(localStorage.getItem('user')).id;
        this.section = 'alerts';
        this.getAlertsData();
        this.getToday();

    }

    public show_modal: boolean = false;
    public section_to_show: string = '';
    public showModal( section_selected: string = 'default' ):void {

        !this.show_modal ? 
            this.show_modal = true : this.show_modal = false; 

        this.section_to_show = section_selected;

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

        console.log('Init => ', ws_data);

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
                        
                        this.specificFieldWorker( this.pending_schedule_cards, 'creationDate' );
                        this.specificFieldWorker( this.confirming_completion_cards, 'creationDate' );
                        this.specificFieldWorker( this.awaiting_invoice_cards, 'creationDate' );
                        this.specificFieldWorker( this.confirming_paymnet_cards, 'creationDate' );
                        this.specificFieldWorker( this.completed_and_paid_cards, 'creationDate' );

                    } else {

                        this.other_cards.forEach( (card: any) => card.visible_item = true ); 
                        this.schedule_month_cards.forEach( (card: any) => card.visible_item = true ); 
                        this.schelude_today_cards.forEach( (card: any) => card.visible_item = true ); 
                        this.schelude_week_cards.forEach( (card: any) => card.visible_item = true ); 
                        this.urgent_cards.forEach( (card: any) => card.visible_item = true ); 

                        this.specificFieldWorker( this.other_cards, 'creationDate' );
                        this.specificFieldWorker( this.schedule_month_cards, 'creationDate' );
                        this.specificFieldWorker( this.schelude_today_cards, 'creationDate' );
                        this.specificFieldWorker( this.schelude_week_cards, 'creationDate' );
                        this.specificFieldWorker( this.urgent_cards, 'creationDate' );

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

    public specificFieldWorker( array_to_work: any[], which_one: string ):void {

        array_to_work.forEach( (element: any) => {

            const split_to_time_date = element[which_one].split('T'),
                  date_gotted = split_to_time_date[0],
                  time_gotted = split_to_time_date[1],
                  time_gotted_hour = `${ time_gotted.split(':')[0] }:${ time_gotted.split(':')[1] }`;

            element.date_worked = date_gotted;
            element.hour_worked = time_gotted_hour;

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

    public initNewAlertModule():void {

        this.getAlterStatusCatalog();

        this.getUsersBookingList();

        function initDaySelecterApp():void {

            const selecter: any = document.querySelector('[day-selecter="container"]').children;

            selecter.forEach( (day: any) => {

                const day_button = day.querySelector('[day-selecter="day"]');

                console.log('Button => ', day_button);

                day_button.onclick = function( event_data ) {

                    const root_data = event_data.target;

                    if( root_data.classList.contains('days-icons__day-letter--active') ) {

                        root_data.classList.remove('days-icons__day-letter--active');

                    } else {

                        root_data.classList.add('days-icons__day-letter--active');

                    }

                }

            });

        }

        setTimeout( () => initDaySelecterApp(), 177);

    }

    public build_users_list: any[] = [];
    public getUsersBookingList():void {

        const ws_data: any = {
            buildingId: 1
        }

        this._services.service_general_get_with_params("Users", ws_data)
            .subscribe( (response: any) => {

                if( response.result == 'Success' ) {

                    this.build_users_list = response.item;

                }

                console.log('Here => ', this.build_users_list);

            }, (error: any) => {

                this.system_message.showMessage({
                    kind: 'error',
                    time: 4777,
                    message: {
                        header: 'System Error',
                        text: 'Please contact your administrator'
                    }
                });

            });

    }

    public new_alert_data: NewAlertDTO = new NewAlertDTO();
    public saveNewAlertData():void {

        console.log(' ===========> New alert save!');
        console.log(this.new_alert_data);

    }

    public schedule_object: any = null;
    public schedule_avaible: any = null;
    public passScheduleData( schedule_selected: any, action: string = 'new' ):void {

        this.resetAlertFormData();
        this.getAlterStatusCatalog();

        this.schedule_object = schedule_selected;
        console.log('Schedule selected ===> ', this.schedule_object );

        if( this.schedule_object.alertDetails.length != 0 ) {

            console.log('Schedule selected Avaible ===> ', this.schedule_object.alertDetails );

            const root_data: any = this.schedule_object.alertDetails[0];

            console.log('Data before => ', root_data);

            this.alert_detail_form.id = root_data.id;
            this.alert_detail_form.IdAlert = this.schedule_object.id;
            this.alert_detail_form.Company = root_data.company;
            this.alert_detail_form.Phone = root_data.phone;
            this.alert_detail_form.EmailCompany = root_data.emailCompany;
            this.alert_detail_form.AssignStaff = root_data.assignStaff;
            this.alert_detail_form.MobilPhone = root_data.mobilPhone;
            this.alert_detail_form.EmailStaff = root_data.emailStaff;
            this.alert_detail_form.MaxBudget = root_data.maxBudget;
            this.alert_detail_form.HoreSchedule = root_data.horeSchedule;
            this.alert_detail_form.DateSchedule = root_data.dateSchedule;

            console.log('Here Edit => ', this.alert_detail_form);

        } else {

            this.alert_detail_form.id = 0;
            this.alert_detail_form.IdAlert = this.schedule_object.id;

            console.log('Here New => ', this.alert_detail_form);

        }

        this.schedule_avaible = JSON.parse( schedule_selected.availableSchedule );
        this.setDaysActives( this.schedule_avaible.daysOfWeek );
        this.color_alert_updated = this.schedule_object.color;

        if( action == 'edit' ) {

            this.alert_detail_form.AlertStatusId = Number( this.schedule_object.alertStatusId );

        }


    }

    public color_alert_updated: string = '';
    public changeColorStatus( color_select: string ):void {

        this.alerts_status_catalog.forEach( (alert: any) => {

            if( alert.id == color_select ) {

                this.color_alert_updated = alert.color;

            }

        });

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

            this.alert_detail_form.AlertStatusId = Number( this.alert_detail_form.AlertStatusId );

            this._services.service_general_post('Alerts/UpdateAlertDetail', this.alert_detail_form)
                .subscribe( (response: any) => {

                    if( response.result == 'Success' ) {

                        this.showModal();
                        this.getAlertsData();

                        this.system_message.showMessage({
                            kind: 'ok',
                            time: 4777,
                            message: {
                                header: 'Alert updated',
                                text: 'Alert has been updated successfully.'
                            }
                        });

                    } else {

                        this.system_message.showMessage({
                            kind: 'error',
                            time: 4777,
                            message: {
                                header: 'System Error',
                                text: 'Please contact your administrator'
                            }
                        });

                    }

                    setTimeout( () => this.loader.hideLoader(), 1777);

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

    public alerts_status_catalog: any[] = [];
    public getAlterStatusCatalog():void {

        this.loader.showLoader();

        this._services.service_general_get('Alerts/getstatusalerts')
            .subscribe( (response: any) => {

                if( response.result == 'Success' ) {

                    this.alerts_status_catalog = response.item; 
                    this.loader.hideLoader();

                }

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

    public alert_detail_validator: any = {
        no_aler: false,
        no_cnam: false,
        no_cpho: false,
        no_cmai: false,
        no_snam: false,
        no_spho: false,
        no_smai: false,
        no_mbud: false,
        no_date: false,
        no_hour: false
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

        this.alert_detail_form.DateSchedule == '' ?
            this.alert_detail_validator.no_date = true :
            this.alert_detail_validator.no_date = false;  
        
        this.alert_detail_form.HoreSchedule == '' ?
            this.alert_detail_validator.no_hour = true :
            this.alert_detail_validator.no_hour = false;  

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
        this.alert_detail_validator.no_date = false;
        this.alert_detail_validator.no_hour = false;

        this.alert_detail_form.Company = '';
        this.alert_detail_form.Phone = '';
        this.alert_detail_form.EmailCompany = '';
        this.alert_detail_form.AssignStaff = '';
        this.alert_detail_form.MobilPhone = '';
        this.alert_detail_form.EmailStaff = '';
        this.alert_detail_form.MaxBudget = '';
        this.alert_detail_form.DateSchedule = '';
        this.alert_detail_form.HoreSchedule = '';

    }

    /*Utilities Section*/
    public dateWorker( the_date: string ) {

        let result: string = '';

        if( the_date != null || the_date != '' ) {

            const split_the_date = the_date.split('-'),
                  date_splited_day = split_the_date[0],
                  date_splited_month = split_the_date[1],
                  date_splited_year = split_the_date[2],
                  new_date = `${ date_splited_year }-${ date_splited_month }-${ date_splited_day }`;

            result = new_date;

        }

        return result;

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
                            //root_data.prepareImages( event_data );
    
                          } else {
    
                            id_image_container.src = '../../../assets/14.jpg';
                            //root_data.general_user_data.avatar = '';
                            name_image_container.innerHTML = `Image must be <br /><span class="text-bold">${ dimensions_image }px</span>`;
                            id_image_container.classList.add('no-image');
    
                          }
                          
                        });
    
                }
    
                reader.readAsDataURL( event.files[0] );
    
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

    /////////////////////////////////////////////////////////////////////////////////////////////
    //////////////////////////////////////// CHAT ///////////////////////////////////////////////
    showChat(card: any) {
        !this.show_modal ?
            this.show_modal = true : this.show_modal = false;

        this.section_to_show = 'chat';
        console.log(card);
        this.userSendMessage = {
            id: card.id,
            userId: card.userId,
            info: {
                name: card.user.name + ' ',
                lastname: card.user.lastName + ' ' + card.user.motherName,
                photo: card.user.avatar
            }
        };
        const creadoobj = { alertId: card.id, userId: card.userId };
        console.log('My User', this.IDUSR);
        this._services.service_general_get_with_params('Alerts/GetAlertsMessages', creadoobj).subscribe((value) => {
            switch (value.result) {
                case 'Error':
                    console.log('Ocurrio un error ' + value.detalle);
                    break;
                default:
                    console.log(value.item);
                    if (value.result === 'Success') {
                        this.messages = value.item;
                        setTimeout(() => { this.scrollToBottom(); }, 200);
                    }
            }
        });
    }

    GetMessages(data) {
        console.log('GetMessage', data);
        const creadoobj = { alertId: data.id, userId: data.userId };
        this._services.service_general_get_with_params('Alerts/GetAlertsMessages', creadoobj).subscribe((value) => {
            switch (value.result) {
                case 'Error':
                    console.log('Ocurrio un error ' + value.detalle);
                    break;
                default:
                    console.log(value.item);
                    if (value.result === 'Success') {
                        this.messages = value.item;
                        setTimeout(() => { this.scrollToBottom(); }, 200);
                    }
            }
        });
    }

    // SentMessageBTN() {
    //     console.log('Sent Message');
    // }

    SentMessageBTN (message: string, alertId: number, alertStatusId: number = 0) {
        if (this.messageInput.length <= 0) { return; }
        if (this.messageInput.trim().replace('/\r?\n|\r/', '').length <= 0) { return; }
        console.log('DATA', message, alertId);
        // return;
        const alertMesage: AlertMessage = new AlertMessage();
        alertMesage.message = message;
        alertMesage.userId = parseInt(this.IDUSR);
        alertMesage.alertStatusId = alertStatusId;
        alertMesage.alertId = alertId;

        this._services.service_general_post('Alerts/SentMessage', alertMesage).subscribe((value) => {
          switch (value.result) {
            case 'Error':
              console.log('Ocurrio un error ' + value.detalle);
            //   this.presentToast(value.detalle);
              break;
            default:
              console.log(value.item);
              if (value.result === 'Success') {
                this.messageInput = '';
                this.GetMessages(this.userSendMessage);
              }
            }
        });
      }

      private scrollToBottom(): void {
        document.getElementById('last').scrollIntoView(false);
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
    DateSchedule: string = '';
    HoreSchedule: string = '';
    AlertStatusId: any = '';
    IdAlert: number = -1;
}

export class AlertMessage {
    public id:number;
    public message:string;
    public date:Date;
    public seen:boolean;
    public userId:number;
    public alertStatusId:number;
    public alertId:number;
}

class NewAlertDTO {
    Information: string = '';
    Photo: string = '';
    Description: string = '';
    AvailableSchedule: string = '';
    UserId: number = null;
    BuildingId: number = null;
    AlertCategoryId: number = null;
    AlertStatusId: number = null;
    alertDetails: AlertDetail = new AlertDetail();
}
