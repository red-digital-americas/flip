import { Component, OnInit } from '@angular/core';
import { DatosService } from '../../../../datos.service';
import { SystemMessage } from '../../../../ts/systemMessage';
import { LoaderComponent } from '../../../../ts/loader';
import { Utils } from '../../../utils/utils';

@Component({
    selector: 'flip-network',
    templateUrl: '/flipNetwork.component.html',
    styleUrls: ['/flipNetwork.component.scss']
}) export class FlipNetworkComponent implements OnInit {

    public system_message: SystemMessage = new SystemMessage();
    public loader: LoaderComponent = new LoaderComponent();
    public modal: number;

    public flipNetworkMain: any[] = [];
    public flipNetworkSlides: any[] = [];
    public postphoto: any[]=[];
    public newImages: any[] = [];
    public form_watcher: any = {};

    public beneficios: any[] = [];
    public back_stage_data: any = {};
    constructor(
        public _services: DatosService
    ) {}

    ngOnInit() {

        this.getBackstageFlipNetworkData();

    }



    public getBackstageFlipNetworkData():void {
      this.loader.showLoader();
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

    public new(numbermodal, data?:any){
        this.form_watcher.no_img0 = false;
        this.modal = numbermodal;
        console.log(data);
        if(data){
            console.log(data);
            this.back_stage_data = data;
            this.beneficios = this.back_stage_data.networkBenefits;
        }else if (data == null){
            console.log("sin data");
            this.back_stage_data = {};
            this.beneficios = [
                {
                    photoSlider: "",
                    photoMobileSlider: "",
                    title: "", 
                    description: ""
                }
              ];
        }
    }

    public addbeneficio(){
        this.beneficios.push(
            {
                photoSlider: "",
                photoMobileSlider: "",
                title: "", 
                description: ""
            }
        );
    }

    public deletebeneficio(index, data){
        
        this._services.deleteNetworkBenefits( {id: data.id, userid: 1}).subscribe((data=>{
            if(data.result == "Success"){
            this.beneficios.splice(index, 1);
            this.getBackstageFlipNetworkData();
            }
            console.log(data);
        }))
    
    }

    public update(){
        this.back_stage_data.networkBenefits = this.beneficios;
        console.log(this.back_stage_data);
        this.loader.showLoader();
        if(this.modal == 1){
            this.back_stage_data.id = 0;
            this._services.updateSladerNetwork(this.back_stage_data).subscribe((data =>{
                console.log(data);
                setTimeout( () => this.loader.hideLoader(), 777);
                this.getBackstageFlipNetworkData();
            }));
        }else if(this.modal == 2){
          this.beneficios.forEach(d =>{
            d.idBackStageNetworkSlide = this.back_stage_data.id;
          })
          this.back_stage_data.networkBenefits = this.beneficios;
       console.log(this.back_stage_data);
            this._services.updateSladerNetwork(this.back_stage_data).subscribe((data =>{
                console.log(data);
                setTimeout( () => this.loader.hideLoader(), 777);
                this.getBackstageFlipNetworkData();
            }));
        }
    }

    public deleteslide(data){
        console.log(data);
        this._services.deleteNetworkSlides({id: data.id, userid: 1}).subscribe((res =>{
            console.log(res);
            this.getBackstageFlipNetworkData();
        }))
    }
//funciones de imagen para slider
    public readImageData( event_data, dimension, image_index: number ):void {

        const file = event_data.target.files,
              root_event = event_data.target,
              img_target = event_data.target.parentElement.getElementsByClassName('image_to_preview')[0],
              image_container_name = event_data.target.parentElement.getElementsByClassName('image_to_preview_name')[0],
              placeh_image_data = document.getElementById('image_data'),
              limits = {
                width: 0,
                height: 0
              },
              dimension_limits = {
                get_dimension_limits: function() {
    
                  const dimension_calc = dimension.split('x'),
                        width = dimension_calc[0],
                        height = dimension_calc[1];
    
                  return {
                    width: Number( width ),
                    height: Number( height )
                  };
    
                }
              },
              last_image = this.postphoto;
    
        if( file && file[0] ) {
    
          const root = this;
    
          this.prepareImages( event_data, image_index );
    
        }
    
      }

      prepareImages(e,indice ) {
        if (Utils.isDefined(e.srcElement.files)) {
          for (let f of e.srcElement.files) {
            this.newImages[indice]=(f);
          }
        } 
        this.addImages(indice,e);
      }
    
      addImages(indice,e) { 
        let url: string = '';
        if (!Utils.isEmpty(this.newImages)) {
          for (let f of this.newImages) {
            this._services.UploadImgSuc(f).subscribe((r) => {
              if (Utils.isDefined(r)) {
                url = <string>r.message;
                url = url.replace('/Imagenes', this._services.getURL() + 'Flip');
                this.postphoto[indice]=(url);
                if(indice==0){
                    debugger;
                  this.back_stage_data.photoSlider = url;
                  this.form_watcher.no_img0 = false;
                  debugger;
                }
  
                if(indice==1){
                  this.back_stage_data.photoMobileSlider = url;
                }
  
                if( indice == 3 ) {
  
                  const root_element = e.target,
                        image_container = root_element.parentElement.querySelectorAll('[icon-image="icon"]');
                        image_container[0].src = url;
  
                }
  
              }else{
                if(indice==0){
                this.form_watcher.no_img0 = true;
                }
              }
            })
          }
        }
      }

//funciones de imagen para benefit
readImageDataBenefit( event_data, dimension, img: number, index: number ):void {

    const file = event_data.target.files,
          root_event = event_data.target,
          //img_target = event_data.target.parentElement.getElementsByClassName('image_to_preview')[0],
          //image_container_name = event_data.target.parentElement.getElementsByClassName('image_to_preview_name')[0],
          //placeh_image_data = document.getElementById('image_data'),
          limits = {
            width: 0,
            height: 0
          },
          dimension_limits = {
            get_dimension_limits: function() {

              const dimension_calc = dimension.split('x'),
                    width = dimension_calc[0],
                    height = dimension_calc[1];

              return {
                width: Number( width ),
                height: Number( height )
              };

            }
          },
          last_image = this.postphoto;

    if( file && file[0] ) {

      const root = this;

      this.prepareImagesBenefit( event_data, img, index );

    }

  }

  prepareImagesBenefit(e, img,indice) {
    if (Utils.isDefined(e.srcElement.files)) {
      for (let f of e.srcElement.files) {
        this.newImages[indice]=(f);
      }
    } 
    this.addImagesBenefit(indice,e, img);
  }

  addImagesBenefit(indice,e, img) { 
    let url: string = '';
    if (!Utils.isEmpty(this.newImages)) {
      for (let f of this.newImages) {
        this._services.UploadImgSuc(f).subscribe((r) => {
          if (Utils.isDefined(r)) {
            url = <string>r.message;
            url = url.replace('/Imagenes', this._services.getURL() + 'Flip');
            this.postphoto[indice]=(url);
            if(img==0){
              this.beneficios[indice].photoSlider = url;
              this.form_watcher.no_img0 = false;
              debugger;
            }

            if(img==1){
                this.beneficios[indice].photoMobileSlider = url;
                debugger;
            }

          }
        })
      }
    }
  }
}

class NetworkMaindata {
    id: number = 1;
    titulo: string = '';
    descripcion: string = '';
}
