
  import { Component, OnInit, NgModule, ViewChild } from '@angular/core';
  import { ModalDirective } from 'ngx-bootstrap/modal';
  import { Router, ActivatedRoute } from '@angular/router';
  import { DatosService } from '../../../datos.service';
  import { ToasterService, ToasterConfig } from 'angular2-toaster';
  import { Utils } from '../../utils/utils';
  import { ImageCropperModule, ImageCroppedEvent, ImageCropperComponent } from 'ngx-image-cropper';
import { SystemMessage } from '../../../ts/systemMessage';
import { LoaderComponent } from '../../../ts/loader';

@Component({
  selector: 'app-homeservices',
  templateUrl: './homeservices.component.html',
  styleUrls: ['./homeservices.component.scss']
})
export class HomeservicesComponent implements OnInit {

  @ViewChild(ImageCropperComponent, {read: ImageCropperComponent, static: true}) imageCropper: ImageCropperComponent;

  @ViewChild(ImageCropperComponent, {read: ImageCropperComponent, static: true}) imageCropper1: ImageCropperComponent;
  
    public myModal;
    public largeModal;
    public smallModal;
    public primaryModal;
    public successModal;
    public warningModal;
    public dangerModal;
    public infoModal;
  
    constructor(private router: Router,
      private heroService: DatosService,
      private route: ActivatedRoute,
      toasterService: ToasterService) {
        this.toasterService = toasterService;
      }
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
        console.log(this.user);
        this.IDUSR = JSON.parse(localStorage.getItem("user")).id;
        this.IDBUILD = parseInt(this.route.snapshot.params['id']); 
        this.get_photos();
        
  
      }
    }
    imageChangedEvent: any = '';
    croppedImage: any = '';
    showCropper = false;
    blob :any =''; 

    imageChangedEvent1: any = '';
    croppedImage1: any = '';
    showCropper1 = false;
    blob1 :any =''; 
  
  
    fileChangeEvent(event: any): void {
        this.imageChangedEvent = event;
    }
    imageCropped(event: ImageCroppedEvent) {
      this.croppedImage = event.base64;
      console.log(event);
      console.log(this.croppedImage);
      this.blob = this.dataURItoBlob(this.croppedImage);
      //this.uploadAttachmentToServer();
    }
    dataURItoBlob(dataURI): Blob {
      const byteString = atob(dataURI.split(',')[1]);
      const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
      const ab = new ArrayBuffer(byteString.length);
      let ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      
      return new Blob([ab], { type: mimeString });
    }
  
  
    uploadAttachmentToServer(indice) {
      debugger; 
      const fileToUpload: File = new File([this.blob], 'filename.png');

      this.newImages[indice]=(fileToUpload);
      this.imageInputLabelfour="movil"; 
      //this.addImages(indice);
     // debugger;
     // console.log(this.newImages);
    }
    gotonewsfeed(id?: number) {
      this.router.navigate(['webadmin/homeindex/' + id])
   }
   amm(id?: number) {
    this.router.navigate(['webadmin/homeammenities/' + id])
 }
 gene(id?: number) {
  this.router.navigate(['webadmin/homegeneral/' + id])
}
room(id?: number) {
  this.router.navigate(['webadmin/homeroom/' + id])
}
serv(id?: number) {
  this.router.navigate(['webadmin/homeservices/' + id])
}
  
    prepareImagesblob(e) {
  
      if (Utils.isDefined(e.srcElement.files)) {
        for (let f of e.srcElement.files) {
         // debugger;
          this.newImages.push(f);
        }
      }
     // this.addImages(e,);
  
    }

    
    fileChangeEvent1(event: any): void {
      this.imageChangedEvent1 = event;
  }

  imageCropped1(event: ImageCroppedEvent) {
    this.croppedImage1 = event.base64;
    console.log(event);
    console.log(this.croppedImage1);
    this.blob1 = this.dataURItoBlob(this.croppedImage1);
    //this.uploadAttachmentToServer();
  }
  
    imageLoaded1() {
      this.showCropper1 = true;
       console.log('Image loaded')
    }
    cropperReady1() {
      console.log('Cropper ready')
    }
    loadImageFailed1 () {
      console.log('Load failed');
    }
    rotateLeft1() {
      this.imageCropper1.rotateLeft();
    }
    rotateRight1() {
      this.imageCropper1.rotateRight();
    }
    flipHorizontal1() {
      this.imageCropper1.flipHorizontal();
    }
    flipVertical1() {
      this.imageCropper1.flipVertical();
    }
  
  
    imageLoaded() {
      this.showCropper = true;
       console.log('Image loaded')
    }
    cropperReady() {
      console.log('Cropper ready')
    }
    loadImageFailed () {
      console.log('Load failed');
    }
    rotateLeft() {
      this.imageCropper.rotateLeft();
    }
    rotateRight() {
      this.imageCropper.rotateRight();
    }
    flipHorizontal() {
      this.imageCropper.flipHorizontal();
    }
    flipVertical() {
      this.imageCropper.flipVertical();
    }
  
    get_photos() {

      var creadoobj = { buildingid: 1 , userid: this.IDUSR };

      this.heroService.ServicioPostPost("SeeHomeServicios", creadoobj).subscribe((value) => {

        console.log('Get Home Services =========> ', value);
        console.log( creadoobj );
   
        switch (value.result) {
          case "Error":
            console.log("Ocurrio un error al cargar los catalogos: " + value.detalle);
            break;
          default:
            if (value.result == "Success") {
              this.posts = value.item;
            }
        }
      });

     }
  
     
     public service_data: ServiceData = new ServiceData();
     public passdata( post: any ):void {
      
      this.resetImagesData();
       
      this.service_data.id = post.id;
      this.service_data.title = post.title;
      this.service_data.category = 'No Category/Description';
      this.service_data.icon = post.icon;
      this.service_data.icon2 = post.icon2;
      this.service_data.frontphoto = post.frontphoto;
      this.service_data.photomobile = post.photomobile;
      this.service_data.communitiesServicesWebItems = post.communitiesServicesWebItems;

      this.updatedIconsService( false );

      console.log('Service From server ===> ', post);
      console.log('My Service Send ===> ', this.service_data);

     }
  
     
     public system_message: SystemMessage = new SystemMessage();
     public loader: LoaderComponent = new LoaderComponent();
     public updatephoto():void {

      const close_modal = document.getElementById('close_modal'),
            validation_form: boolean = this.formValidator( this.service_data ),
            validation_icons: boolean = this.getIconsData();

      if( validation_form && validation_icons ) {

        this.loader.showLoader();

        this.heroService.ServicioPostPost("UpdateHomeServicios", this.service_data)
            .subscribe( (response: any) => {

              if( response.result == 'Success' ) {

                this.system_message.showMessage({
                  kind: 'ok',
                  time: 4700,
                  message: {
                    header: 'Content updated',
                    text: 'Content has been updated successfully'
                  }
                });
  
                close_modal.click();
                this.get_photos();
  
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
            header: 'Form must be completed',
            text: 'All inputs must be filled to continue'
          }
        });
  
        this.sendToPageTop();

      }
    
    }
  
  
    showSuccess() {
      this.toasterService.pop('success', 'Success ', 'Publicación Actualizada Correctamente ');
    }
  
    showError() {
      this.toasterService.pop('error', 'Error ', 'Por favor completa todos los campos ');
    }
    showWarning() {
      this.toasterService.pop('warning', 'Warning Toaster', 'Completa todos los campos por favor');
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
          /**
           * if(indice==0){
            this.imageInputLabel = f.name;
          }
          if(indice==1)
          {
          this.imageInputLabeltwo = f.name;
          }
          if(indice==2)
          {
          this.imageInputLabelthree = f.name;
          }
           */
          this.heroService.UploadImgSuc(f).subscribe((r) => {
            if (Utils.isDefined(r)) {
              url = <string>r.message;
              url = url.replace('/Imagenes', this.heroService.getURL() + 'Flip');
              this.postphoto[indice]=(url);

              if(indice==0){
                this.service_data.frontphoto = url;
              }

              if(indice==1){
                this.service_data.photomobile = url;
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

    /*
   * Autor: Carlos Hernandez Hernandez
   * Contacto: carlos.hernandez@minimalist.com
   * Nombre: readImageData
   * Tipo: Funcion efecto colateral
   * Visto en: webadmin, desingindex, moreindex, homeindex
   * Parametros: Objeto del evento que es emitido
   * Regresa: N/A
   * Descripcion: Cuando es seleccionada una imagen por el usuario, esta se muestra en la imagen que
                  es contenida por el elemento HTML interno. 
   */
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

  public add_icon_button: boolean = true;
  public updatedIconsService( add_in: boolean = true ):void { 

    const icons_in = this.service_data.communitiesServicesWebItems;

    setTimeout( () => {

      let icons_length = icons_in.length != 5 ? icons_in.length + 1 : 6;

      if( icons_length > 5 ) {

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

        icons_length >= 5 ? 
          this.add_icon_button = false : 
          this.add_icon_button = true; 

      } else {

        this.add_icon_button = true;

      }

    }, 477);

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
              communitiesServiciosWeb: null,
              communitiesServiciosWebId: this.service_data.id,
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

    this.service_data.communitiesServicesWebItems = new_icons_object;

    return result;

  }

  public deleteIconsServices( event_data: any ):void {

    const icons_in = this.service_data.communitiesServicesWebItems,
          delete_event = event_data.target,
          delete_this = icons_in.findIndex( (icons: any) => icons.id == delete_event.id );

          icons_in.splice( delete_this, 1 );

          this.updatedIconsService( false );

  }

  public form_watcher = {
    no_titl: false,
    no_cate: false,
    no_ico0: false,
    no_ico1: false,
    no_img0: false,
    no_img1: false
  }
  public formValidator( form_data: ServiceData ):boolean {

      let resuslt: boolean = false;

      form_data.title == null || form_data.title == '' ? 
        this.form_watcher.no_titl = true : this.form_watcher.no_titl = false; 

      form_data.icon == null || form_data.icon == '' ? 
        this.form_watcher.no_ico0 = true : this.form_watcher.no_ico0 = false; 

      form_data.icon2 == null || form_data.icon2 == '' ? 
        this.form_watcher.no_ico1 = true : this.form_watcher.no_ico1 = false;

      form_data.frontphoto == null || form_data.frontphoto == '' ? 
        this.form_watcher.no_img0 = true : this.form_watcher.no_img0 = false;

      form_data.photomobile == null || form_data.photomobile == '' ? 
        this.form_watcher.no_img1 = true : this.form_watcher.no_img1 = false;

      for( const dato in this.form_watcher ) {

        if( this.form_watcher[dato] ) return false;
        else resuslt = true;

      }

      return resuslt;

  }

  public sendToPageTop():void {

    const modal_page: any = document.getElementById('modal-fw');

          modal_page.scrollTo(0,0);

  }

  public resetImagesData():void {

    const images: any = document.getElementsByClassName('image_form'),
          name_image: any = document.getElementsByClassName('name_image_uploaded');

          for( let image = images.length; image--; ) {

            images[image].value = '';
            name_image[image].innerHTML = '';

          }

  }

}
  
  class ServiceData {
    id: number;
    title: string;
    category: string;
    icon: string;
    icon2: string;
    frontphoto: string;
    photomobile: string;
    communitiesServicesWebItems: any[];
  }