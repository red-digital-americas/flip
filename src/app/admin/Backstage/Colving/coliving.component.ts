import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Router, ActivatedRoute } from '@angular/router';
import { DatosService } from '../../../../datos.service';
import { ToasterService, ToasterConfig } from 'angular2-toaster';
import { Utils } from '../../../utils/utils';
import { ImageCropperComponent, ImageCroppedEvent } from 'ngx-image-cropper';
import { SystemMessage } from '../../../../ts/systemMessage';
import { LoaderComponent } from '../../../../ts/loader';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'coliving-component',
    templateUrl: '/coliving.component.html',
    styleUrls: ['/coliving.component.scss']
}) export class ColivingComponent implements OnInit {

    @ViewChild(ImageCropperComponent, { read: ImageCropperComponent, static: true }) imageCropper: ImageCropperComponent;

    public system_message: SystemMessage = new SystemMessage();
    public loader: LoaderComponent = new LoaderComponent();
    
    public myModal;
    public largeModal;
    public smallModal;
    public primaryModal;
    public successModal;
    public warningModal;
    public dangerModal;
    public infoModal;
    blob: any = '';
    
    constructor(
      private router: Router,
      private heroService: DatosService,
      private route: ActivatedRoute,
   //   toasterService: ToasterService,
      public domSanitiza: DomSanitizer,
      public _services: DatosService
      ) {
    //  this.toasterService = toasterService;
    }

   // back_stage_data: any;
    posts: any;
    posts_b: any;
    email: string;
    password: string;
    token: boolean;
    message: {};
    validar: boolean = false;
    idpost: any;
    IDUSR: string = "0";
    IDBUILD: number = 0;
    PostId: number;
    posttext: string = "";
    posttitle: string = "";
    namebuilding: string = "";
    post_blanck: any;
    lengthpost: number = 0;
    room_blanck: any;
  
    title: string = "";
    price: string = "";
  
    direction: string = "";
    public user: string[];
  
    postphoto: any[] = [];
    comment: string = "";
  
    public newImages: any[] = [];
    imageInputLabel = "Choose file";
    imageInputLabeltwo = "Choose file";
    imageInputLabelthree = "Choose file";
    imageInputLabelfour = "Choose file";
    imageInputLabelicon = "Choose file";
    imageInputLabelicon2 = "Choose file";
  
    private toasterService: ToasterService;
  
    public toasterconfig: ToasterConfig =
      new ToasterConfig({
        tapToDismiss: true,
        timeout: 3000,
        positionClass: "toast-top-center",
      });

    ngOnInit() {

        if (localStorage.getItem("user") == undefined) {
            this.router.navigate(['/login']);
          }
          else {
            this.postphoto.push("assets/img/Coliving.jpg");
      
            this.user = JSON.parse(localStorage.getItem("user"));
          //  console.log(this.user);
            this.IDUSR = JSON.parse(localStorage.getItem("user")).id;
            this.IDBUILD = parseInt(this.route.snapshot.params['id']);
        //   this.get_photos();
      
           this.getBackStageData();
          }
    }

    public back_stage_data_array: BackStageModel[];
    public back_stage_data: BackStageModel = new BackStageModel();

    public getBackStageData():void {

        const ws_data = {
            userid: 8
        }

        this._services.service_general_post('Post/SeeBackstageWhatIs', ws_data)
            .subscribe( (response: any) => {

                if( response.result == 'Success' ) {

                    this.back_stage_data_array = response.item;
                    console.log("====== BACK")
                    console.log(response);
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


    passdata( post:any ){

        this.resetImagesData();

        this.back_stage_data.id = post.id;
        this.back_stage_data.description= post.description;
        this.back_stage_data.icon2= post.icon2;
        this.back_stage_data.titleIcon= post.titleIcon;
        this.back_stage_data.icon= post.icon;
        this.back_stage_data.photoMobileSlider= post.photoMobileSlider;
        this.back_stage_data.photoSlider= post.photoSlider;
    
    }

    public resetImagesData():void {

        const images: any = document.getElementsByClassName('image_form'),
              name_image: any = document.getElementsByClassName('name_image_uploaded');
    
              for( let image = images.length; image--; ) {
    
                images[image].value = '';
                name_image[image].innerHTML = '';
    
              }
    
      }


       public form_watcher: any = {
        no_name: false,
        no_titl: false,
        no_mnam: false,
        no_desc: false,
        no_img0: false,
        no_img1: false
    }

    public sendBackstageData():void {

        const validator_form: boolean = this.formValidator( this.back_stage_data )
            //  validator_questions: boolean = this.questionsValidation();
               

        if( validator_form ) {

            console.log('Send the data ===> ', this.back_stage_data);

            const close_modal_button = document.getElementById('close_modal');

            this.loader.showLoader();
debugger;
            this._services.service_general_post('Post/UpdateBackstageWhatIs', this.back_stage_data)
                .subscribe( (response: any) => {
                    debugger;
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
                    else{

                        setTimeout( () => this.loader.hideLoader(), 1777);
                        console.log(response.message);
                        this.system_message.showMessage({
                            kind: 'error',
                            time: 4700,
                            message: {
                                header: 'Error in service',
                                text: 'The service response error.'
                            }
                        });
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

    public sendToPageTop():void {

        const modal_page: any = document.getElementsByClassName('modal-fw');
    
              modal_page.forEach( (modal: any) => {
    
                modal.scrollTo(0,0);
    
              });
    
    }

    public formValidator( form_data :BackStageModel ):boolean {

         let result: boolean = false;


       //  icon2: string;
        // titleIcon: string;
       //  icon: string;
       //  photoMobileSlider: string;
       //  photoSlider: string;

         /* form_data.whatIstitle == '' || form_data.whatIstitle == null ?
             this.form_watcher.no_titl = true : this.form_watcher.no_titl = false;  */

         form_data.titleIcon == '' || form_data.titleIcon == null ?
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

        return true; //result;

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
              },
              last_image = this.postphoto;
    
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
                      root.postphoto = last_image;
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

    uploadAttachmentToServer(indice) {

        const fileToUpload: File = new File([this.blob], 'filename.png');
    
        this.newImages[indice] = (fileToUpload);
        this.imageInputLabeltwo = "movil";
        this.addImages(indice);
        // debugger;
        // console.log(this.newImages);
      }


    prepareImages(e, indice) {
        if (Utils.isDefined(e.srcElement.files)) {
          for (let f of e.srcElement.files) {
            this.newImages[indice] = (f);
          }
        }
        this.addImages(indice);
      }

    addImages(indice) {
        let url: string = '';
        if (!Utils.isEmpty(this.newImages)) {
          let f = { file: this.newImages[indice], name: this.newImages[indice].name }; {
    
            if (indice == 0) {
              this.imageInputLabel = f.name;
            }
            if (indice == 1) {
              this.imageInputLabeltwo = f.name;
            }
    
            if (indice == 2) {
              this.imageInputLabelicon = f.name;
            }
    
            if (indice == 3) {
              this.imageInputLabelicon2 = f.name;
            }
    
            this.heroService.UploadImgSuc(this.newImages[indice]).subscribe((r) => {
              if (Utils.isDefined(r)) {
                url = <string>r.message;
    
                url = url.replace('/Imagenes', this.heroService.getURL() + 'Flip');
    
                this.postphoto[indice] = (url);
    
                if (indice == 0) {
                  this.back_stage_data.icon = url;
                }
    
                if (indice == 1) {
                  this.back_stage_data.icon2 = url;
                }
    
                if (indice == 2) {
                  this.back_stage_data.photoSlider = url;
                }
    
                if (indice == 3) {
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
    description: string;
    icon2: string;
    titleIcon: string;
    icon: string;
    photoMobileSlider: string;
    photoSlider: string;
}