
import { Component, OnInit, NgModule, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Router, ActivatedRoute } from '@angular/router';
import { DatosService } from '../../../../datos.service';
import { ToasterService, ToasterConfig } from 'angular2-toaster';
import { Utils } from '../../../utils/utils';
import { ImageCropperModule, ImageCroppedEvent, ImageCropperComponent } from 'ngx-image-cropper';
import { SystemMessage } from '../../../../ts/systemMessage';
import { LoaderComponent } from '../../../../ts/loader';

@Component({
    selector: 'membershipt-component',
    templateUrl: './memberships.component.html',
    styleUrls: ['./memberships.component.scss']
}) export class MembershipComponent implements OnInit {

    constructor(private router: Router,
        private _services: DatosService,
        private route: ActivatedRoute,
        //toasterService: ToasterService
        ) 
        {
          //this.toasterService = toasterService;
        }

    public system_message: SystemMessage = new SystemMessage();
    public loader: LoaderComponent = new LoaderComponent();

      posts: any[];
      email: string;
      password: string;
      token: boolean;
      message: {};
      validar: boolean = false;
      idpost: any;
      IDUSR: string = "0";
      IDBUILD: number = 0;
      PostId: number ;
      posttext: string = "";
      posttitle: string = "";
      namebuilding: string = "";
      post_blanck: any;
      lengthpost: number = 0;
  
      title: string = "";
    
      direction: string = "";
      public user: string[];
    
      postphoto: any[]=[];
      
    
      comment: string = "";
    
      public newImages: any[] = [];
    
      imageInputLabel = "Choose file";
      imageInputLabeltwo = "Choose file";
      imageInputLabelthree = "Choose file";
      imageInputLabelfour = "Choose file";
    
   //   private toasterService: ToasterService;
    
    /*   public toasterconfig: ToasterConfig =
        new ToasterConfig({
          tapToDismiss: true,
          timeout: 3000,
          positionClass: "toast-top-center",
        }); */



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


    public back_stage_data_array: BackstageMembershipSection[];
    public back_stage_data: BackstageMembershipSection = new BackstageMembershipSection();

    public getBackStageData():void {
////debugger;
        const ws_data = {
            userid: 8
        }

        this._services.service_general_post('Post/SeeBackstageMembershipSections', ws_data)
            .subscribe( (response: any) => {
              //  //debugger;
                if( response.result == 'Success' ) {

                    this.back_stage_data_array = response.item;
                    console.log("====== BACKNEW")
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


    public form_watcher = {
        no_titl: false,
        no_cate: false,
        no_ico0: false,
        no_ico1: false,
        no_img0: false,
        no_img1: false,
        no_p1:  false,
        no_p:  false,
        no_desc:  false
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
    
                    } else {
    
                      root_event.value = "";
                      root.postphoto = last_image;
                      placeh_image_data.removeAttribute('src');
                      root.system_message.showMessage({
                        kind: 'error',
                        time: 4777,
                        message: {
                          header: 'Resolución de Imagen',
                          text: 'Resolución de Imagen  no valida'
                        }
                      });
    
                    }
    
                });
    
              }
    
              reader.readAsDataURL( file[0] );
    
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
                  this.back_stage_data.photoSlider = url;
                }
  
                if(indice==1){
                  this.back_stage_data.photoMobileSlider = url;
                }
  
                if( indice == 3 ) {
  
                  const root_element = e.target,
                        image_container = root_element.parentElement.querySelectorAll('[icon-image="icon"]');
                        image_container[0].src = url;
  
                }
  
              }
            })
          }
        }
      }
    
    public passdata( post: any ):void {
     debugger;
     this.resetImagesData();
      
     this.back_stage_data.id = post.id;
     this.back_stage_data.title = post.title;
     this.back_stage_data.description = post.description;
     this.back_stage_data.price = post.price;
     this.back_stage_data.price1 = post.price1;
     this.back_stage_data.type = post.type;
     this.back_stage_data.descPrice = post.descPrice;
     this.back_stage_data.descPrice1 = post.descPrice1;
     this.back_stage_data.photoSlider = post.photoSlider;
     this.back_stage_data.photoMobileSlider = post.photoMobileSlider;
     this.back_stage_data.backstageMembershipItems = post.backstageMembershipItems;

     this.updatedIconsService( false );

     console.log('Service From server ===> ', post);
     console.log('My Service Send ===> ', this.back_stage_data);

    }

    public add_icon_button: boolean = true;
    public updatedIconsService( add_in: boolean = true ):void { 
  
      const icons_in = this.back_stage_data.backstageMembershipItems;
  
      setTimeout( () => {
  
        let icons_length = icons_in.length != 9 ? icons_in.length + 1 : 10;
  
        if( icons_length > 9 ) {
  
          this.add_icon_button = false;
  
        } else if ( add_in ) {
  
          const icon_model = {
            communitiesServiciosWeb: null,
            communitiesServiciosWebId: 0,
            icon: null,
            icon2: null,
            id: icons_length,
            titleIcon: ''
          }
  
          icons_in.push( icon_model );
  
          icons_length >= 9 ? 
            this.add_icon_button = false : 
            this.add_icon_button = true; 
  
        } else {
  
          this.add_icon_button = true;
  
        }
  
      }, 477);
  
    }

    public resetImagesData():void {

        const images: any = document.getElementsByClassName('image_form'),
              name_image: any = document.getElementsByClassName('name_image_uploaded');
    
              for( let image = images.length; image--; ) {
    
                images[image].value = '';
                name_image[image].innerHTML = '';
    
              }
    
      }

      public updatephoto():void {

        const close_modal = document.getElementById('close_modal'),
              validation_form: boolean = this.formValidator( this.back_stage_data ),
              validation_icons: boolean = this.getIconsData();
  
        if( validation_form && validation_icons ) {
  
          this.loader.showLoader();
  
          this._services.ServicioPostPost("UpdateBackstageMembershipSections", this.back_stage_data)
              .subscribe( (response: any) => {
                //debugger;
                if( response.result == 'Success' ) {
                    //debugger;
                  this.system_message.showMessage({
                    kind: 'ok',
                    time: 4700,
                    message: {
                      header: 'wwContent actualizado',
                      text: 'wwContent ha sido actualizado correcatamente'
                    }
                  });
                  this.set_post_blanck();
                  close_modal.click();
                  this.getBackStageData();
    
                  setTimeout( () => this.loader.hideLoader(),777);
  
                }
  
              }, (error: any) => {
  
                this.system_message.showMessage({
                  kind: 'error',
                  time: 4700,
                  message: {
                    header: 'Fatal Error',
                    text: 'Error Fatal'
                  }
                });
  
              });
  
        } else {
  
          this.system_message.showMessage({
            kind: 'error',
            time: 4700,
            message: {
              header: 'Formulario',
              text: 'Todos los campos deben ser llenados'
            }
          });
    
          this.sendToPageTop();
  
        }
      
      }

     

      set_post_blanck(){
        this.post_blanck = {
          "Id" : 0,
          "Photo" :  "",
          "Icon2" :  "",
          "Icon" :  "",
          "Title" :  "",
          "Category" :  "",
          "PhotoMobile" :  "",
          "CommunitiesIndexId" :this.IDBUILD, 
               "communitiesServicesWebItems": []
             }
      }

      public sendToPageTop():void {

        const modal_page: any = document.getElementById('modal-fw');
    
              modal_page.scrollTo(0,0);
    
      }

      public getIconsData():boolean {

        const icons_form: any = document.querySelectorAll('[icon="block"]');
        
        let new_icons_object: any[] = [],
            result: boolean = true;
    
        icons_form.forEach( (icon_form: any) => {
    
          const icon_inputs: any = icon_form.querySelectorAll('input')[0],
                icon_url: any = icon_form.querySelectorAll('[icon-image="icon"]')[0],
                icon_url2: any = icon_form.querySelectorAll('[icon-image="icon"]')[1],
                icon_model = {
                  idBackstageMembershipNavigation: null,
                  idBackstageMembership: this.back_stage_data.id,
                  icon: '',
                  icon2: '',
                  id: 0,
                  titleIcon: ''
                };
    
                icon_model.id = 0;
    
                icon_inputs.value == '' || icon_inputs.value == null ?
                  icon_model.titleIcon = null :
                  icon_model.titleIcon = icon_inputs.value;
    
                icon_model.icon = icon_url.src;
                icon_model.icon2 = icon_url2.src;
    
                new_icons_object.push( icon_model );
    
        });
    
        for( let icon = 0; icon < new_icons_object.length ; icon += 1 ) {
    
          if( new_icons_object[icon].titleIcon == null ) {
    
            result = false;
    
          }
    
        }
    
        this.back_stage_data.backstageMembershipItems = new_icons_object;
    
        return result;
    
      }

      public deleteIconsServices(i){
        console.log(this.back_stage_data.backstageMembershipItems);
        this.back_stage_data.backstageMembershipItems.splice(i,1);
        
        console.log(this.back_stage_data.backstageMembershipItems);
      }


      public formValidator( form_data: BackstageMembershipSection ):boolean {

        let resuslt: boolean = false;
  
        form_data.title == null || form_data.title == '' ? 
          this.form_watcher.no_titl = true : this.form_watcher.no_titl = false; 
  
        form_data.price1 == null || form_data.price1 == '' ? 
          this.form_watcher.no_p1 = true : this.form_watcher.no_p1 = false; 
        
        form_data.price == null || form_data.price == '' ? 
          this.form_watcher.no_p = true : this.form_watcher.no_p = false; 

        // form_data.icon == null || form_data.icon == '' ? 
        //   this.form_watcher.no_ico0 = true : this.form_watcher.no_ico0 = false; 
  
        // form_data.icon2 == null || form_data.icon2 == '' ? 
        //   this.form_watcher.no_ico1 = true : this.form_watcher.no_ico1 = false;
  
        // form_data.frontphoto == null || form_data.frontphoto == '' ? 
        //   this.form_watcher.no_img0 = true : this.form_watcher.no_img0 = false;
  
        // form_data.photomobile == null || form_data.photomobile == '' ? 
        //   this.form_watcher.no_img1 = true : this.form_watcher.no_img1 = false;
  
        for( const dato in this.form_watcher ) {
  
          if( this.form_watcher[dato] ) return false;
          else resuslt = true;
  
        }
  
        return resuslt;
  
    }
}




class BackstageMembershipSection
{
      id: number;
      title:string ;
      description: string;
      photoSlider: string;
      photoMobileSlider: string;
      price1: string;
      price: string;
      descPrice: string;
      descPrice1: string;
      type: string;
      backstageMembershipItems: any[];
}