import { Component, OnInit } from '@angular/core';
import { DatosService } from '../../../../datos.service';
import { SystemMessage } from '../../../../ts/systemMessage';
import { LoaderComponent } from '../../../../ts/loader';

@Component({
    selector: 'flip-network',
    templateUrl: '/flipNetwork.component.html',
    styleUrls: ['/flipNetwork.component.scss']
}) export class FlipNetworkComponent implements OnInit {

    public system_message: SystemMessage = new SystemMessage();
    public loader: LoaderComponent = new LoaderComponent();

    constructor(
        public _services: DatosService
    ) {}

    ngOnInit() {

        this.getBackstageFlipNetworkData();

    }

    public flipNetworkMain: any[] = [];
    public flipNetworkSlides: any[] = [];
    public getBackstageFlipNetworkData():void {

        const ws_data: any = {
            userid: 1, 
            id: 1
        }

        this._services.service_general_post('Post/SeeBacksNetworkSection', ws_data)
            .subscribe( (response: any) => {

                if( response.result == 'Success' ) {

                    this.flipNetworkMain = response.backStageNetworkSection;
                    this.flipNetworkSlides = response.backStageNetworkSlides;

                    this.main_card_data.titulo = this.flipNetworkMain[0].title;
                    this.main_card_data.descripcion = this.flipNetworkMain[0].description; 

                    console.log('Network ==> ', this.flipNetworkMain);
                    console.log('Network slides ===> ', this.flipNetworkSlides);

                }

            }, (error: any) => {

                this.system_message.showMessage({
                    kind: 'error',
                    time: 4777,
                    message: {
                        header: 'System error',
                        text: 'A system error has ocurred, please try later.'
                    }
                });

            });

    }

    public main_card_data: NetworkMaindata = new NetworkMaindata();
    public saveMainCardFlipNetData():void {

        this.loader.showLoader();

        this._services.service_general_post('Post/UpdateNetworkSections_title', this.main_card_data)
            .subscribe( (response: any) => {

                if( response.result == 'Success' ) {

                    this.system_message.showMessage({
                        kind: 'ok',
                        time: 4777,
                        message: {
                            header: 'Main card data updated',
                            text: 'Main card data has been updated successfully.'
                        }
                    });

                    setTimeout( () => this.loader.hideLoader(), 777);

                }

            }, (error: any) => {

                this.system_message.showMessage({
                    kind: 'error',
                    time: 4777,
                    message: {
                        header: 'System error',
                        text: 'A system error has ocurred, please try later.'
                    }
                });

                setTimeout( () => this.loader.hideLoader(), 777);

            });

    }

}

class NetworkMaindata {
    id: number = 1;
    titulo: string = '';
    descripcion: string = '';
}
