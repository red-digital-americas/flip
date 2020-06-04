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
    public getAlertsData():void {

        const ws_data = {
            userId: 0,
            startDate: '01-01-1900',
            endDate: '01-01-2050',
            type: 1,
            buildingId: 1
        }

        this._services.service_general_get_with_params('Alerts/GetAllAlertsByDateType', ws_data)
            .subscribe( (response: any) => {

                if( response.result == 'Sucess' ) {

                    console.log('Response on success ========> ', response);
                    
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

            });

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