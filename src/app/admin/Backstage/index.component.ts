import { Component, OnInit } from '@angular/core';
import { DatosService } from '../../../datos.service';
import { SystemMessage } from '../../../ts/systemMessage';
import { LoaderComponent } from '../../../ts/loader';
import { Utils } from '../../utils/utils';

@Component({
    selector: 'backstage-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.scss']
}) export class BackstageIndexComponent implements OnInit {

    public system_message: SystemMessage = new SystemMessage();
    public loader: LoaderComponent = new LoaderComponent();
    public primaryModal;

    constructor(
        public _services: DatosService
    ) {}

    ngOnInit() {

        this.getBackStageData();

    }

    public back_stage_data: BackStageModel = new BackStageModel();
    public getBackStageData():void {

        const ws_data = {
            userid: 8
        }

        this._services.service_general_post('Post/SeeHomeBackstage', ws_data)
            .subscribe( (response: any) => {

                if( response.result == 'Success' ) {

                    this.back_stage_data = response.item[0];

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

    public sendBackstageData():void {

        const validator_form: boolean = this.formValidator( this.back_stage_data ),
              validator_questions: boolean = this.questionsValidation();
               

        if( validator_form && validator_questions ) {

            console.log('Send the data ===> ', this.back_stage_data);

            const close_modal_button = document.getElementById('close_modal');

            this.loader.showLoader();

            this._services.service_general_post('Post/UpdateHomeBackstage', this.back_stage_data)
                .subscribe( (response: any) => {

                    if( response.result == 'Success' ) {

                        this.system_message.showMessage({
                            kind: 'ok',
                            time: 4777,
                            message: {
                                header: 'Backstage updated',
                                text: 'Backstage has been updated successfully.'
                            }
                        });

                        setTimeout( () => this.loader.hideLoader(), 1777);

                        close_modal_button.click();

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

                });

        } else {

            this.system_message.showMessage({
                kind: 'error',
                time: 4700,
                message: {
                    header: 'Form must be completed',
                    text: 'All inputs must be filled to continue'
                }
            });
        
            this.sendToPageTop();

        }

    }

    public addNewQuestion():void {

        const questions = this.back_stage_data.faqs,
              new_question = {
                answer: '',
                id: 0,
                idHomeBackstage: 1,
                idHomeBackstageNavigation: null,
                question: ''
              }

        questions.push( new_question );


    }

    public deleteThisFaq( index: number ):void {

        this.back_stage_data.faqs.splice(index, 1);

    }

    public form_watcher: any = {
        no_titl: false,
        no_mnam: false,
        no_desc: false,
        no_img0: false,
        no_img1: false
    }
    public formValidator( form_data :BackStageModel ):boolean {

        let result: boolean = false;

        form_data.whatIstitle == '' || form_data.whatIstitle == null ?
            this.form_watcher.no_titl = true : this.form_watcher.no_titl = false; 

        form_data.membershipTitle == '' || form_data.membershipTitle == null ?
            this.form_watcher.no_mnam = true : this.form_watcher.no_mnam = false;

        form_data.description == '' || form_data.description == null ?
            this.form_watcher.no_desc = true : this.form_watcher.no_desc = false;

        form_data.photoSlider == '' || form_data.photoSlider == null ?
            this.form_watcher.no_img0 = true : this.form_watcher.no_img0 = false;

        form_data.photoMobileSlider == '' || form_data.photoMobileSlider == null ?
            this.form_watcher.no_img1 = true : this.form_watcher.no_img1 = false;

        for( let dato in this.form_watcher ) {

            if( this.form_watcher[dato] ) return false;
            else result = true;

        }

        return result;

    }

    public questionsValidation():boolean {

        let result: boolean = true;

        const faqs_form = document.querySelectorAll('[faq="faq"]'),
              faqs = this.back_stage_data.faqs;

        faqs_form.forEach( (faq: any, index: number) => {

            const faq_form = faq.querySelectorAll('input'),
                  faq_question = faq_form[0].value,
                  faq_answer = faq_form[1].value,
                  get_question = faqs[index];

            get_question.question = faq_question;
            get_question.answer = faq_answer;

        });

        faqs.forEach( (faq: any) => {

            if( faq.question == null || faq.question == '' ) faq.question = null;
            if( faq.answer == null || faq.answer == '' ) faq.answer = null;

            faq.question == null || faq.question == '' || 
            faq.answer == null || faq.answer == '' ?
                result = false : faq.id = 0;

        });

        return result;

    }

    public resetImagesData():void {

        const images: any = document.getElementsByClassName('image_form'),
              name_image: any = document.getElementsByClassName('name_image_uploaded');
    
        for( let image = images.length; image--; ) {

        images[image].value = '';
        name_image[image].innerHTML = '';

        }
    
    }

    public sendToPageTop():void {

        const modal_page: any = document.getElementsByClassName('modal-fw');
    
              modal_page.forEach( (modal: any) => {
    
                modal.scrollTo(0,0);
    
              });
    
    }

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
              }
    
        if( file && file[0] ) {
    
          const root = this;
    
          let reader = new FileReader();
    
              reader.onload = function(e:any) {
    
                const parse_my_image = new Promise( ( resolve:any ) => {
                  
                  placeh_image_data.setAttribute('src',  e.target.result );
    
                  setTimeout(() => {
    
                    const image_dimension = {
                      width: placeh_image_data.offsetWidth,
                      height: placeh_image_data.offsetHeight
                    };
    
                    resolve( image_dimension );
    
                  }, 177);
    
                });
    
                parse_my_image.then( ( image_data:any ) => {
    
                  const limits = dimension_limits.get_dimension_limits();
    
                    if( limits.width == image_data.width && limits.height == image_data.height ) {
    
                      img_target.src = e.target.result; 
                      image_container_name.classList.remove('display-none');
                      image_container_name.innerHTML = file[0].name;
                      root.prepareImages( event_data, image_index );
                      console.log('Index => ', image_index);
    
                    } else {
    
                      root_event.value = "";
                      placeh_image_data.removeAttribute('src');
                      root.system_message.showMessage({
                        kind: 'error',
                        time: 4777,
                        message: {
                          header: 'Image Resolution',
                          text: 'Image resolution is not valid'
                        }
                      });
    
                    }
    
                });
    
              }
    
              reader.readAsDataURL( file[0] );
    
        }
    
    }

    public newImages: any[] = [];
    public prepareImages(e, indice) {

        if (Utils.isDefined(e.srcElement.files)) {
          for (let f of e.srcElement.files) {
            this.newImages[indice] = (f);
          }
        }

        this.addImages(indice);

    }

    public addImages(indice) {
        let url: string = '';
        if (!Utils.isEmpty(this.newImages)) {
          let f = { file: this.newImages[indice], name: this.newImages[indice].name }; {
    
            this._services.UploadImgSuc(this.newImages[indice]).subscribe((r) => {
              if (Utils.isDefined(r)) {
                url = <string>r.message;
    
                url = url.replace('/Imagenes', this._services.getURL() + 'Flip');
    
                if (indice == 0) {
                    this.back_stage_data.photoSlider = url;
                }
    
                if (indice == 1) {
                    this.back_stage_data.photoMobileSlider = url;
                }
    
              }
            })
          }
        }
      }

}

class BackStageModel {
    id: number;
    whatIstitle: string;
    membershipTitle: string;
    description: string;
    photoSlider: string;
    photoMobileSlider: string;
    faqs: any;
}