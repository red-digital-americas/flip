import { Component, OnInit, NgModule, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Router, ActivatedRoute } from '@angular/router';
import { DatosService } from '../../../datos.service';
import { ToasterService, ToasterConfig } from 'angular2-toaster';
import { Utils } from '../../utils/utils';
import { ImageCropperModule, ImageCroppedEvent, ImageCropperComponent } from 'ngx-image-cropper';
import * as $ from 'jquery';
import { SystemMessage } from '../../../ts/systemMessage';
import { LoaderComponent } from '../../../ts/loader';

@Component({
  selector: 'app-homeammenities',
  templateUrl: './homeammenities.component.html',
  styleUrls: ['./homeammenities.component.scss']
})
export class HomeammenitiesComponent implements OnInit {


  @ViewChild(ImageCropperComponent, { read: ImageCropperComponent, static: true }) imageCropper: ImageCropperComponent;
  @ViewChild(ImageCropperComponent, { read: ImageCropperComponent, static: true }) imageCropper1: ImageCropperComponent;

  public loader: LoaderComponent = new LoaderComponent();

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
  PostId: number;
  posttext: string = "";
  posttitle: string = "";
  namebuilding: string = "";
  post_blanck: any;
  lengthpost: number = 0;

  title: string = "";

  direction: string = "";
  public user: string[];

  postphoto: any[] = [];


  comment: string = "";

  imageInputLabel = "Choose file";
  imageInputLabeltwo = "Choose file";
  imageInputLabelthree = "Choose file";
  imageInputLabelfour = "Choose file";
  imageInputLabelfive = "Choose file";
  imageInputLabelsix = "Choose file";
  public newImages: any[] = [];
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


  imageChangedEvent: any = '';
  croppedImage: any = '';
  showCropper = false;
  blob: any = '';

  imageChangedEvent1: any = '';
  croppedImage1: any = '';
  showCropper1 = false;
  blob1: any = '';


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

    if (indice == 3) {
      const fileToUpload: File = new File([this.blob], 'filename.png');
      ////debugger;
      this.newImages[indice] = (fileToUpload);
      this.imageInputLabelfour = "movil";
    }
    if (indice == 5) {
      const fileToUpload: File = new File([this.blob1], 'filename.png');

      this.newImages[indice] = (fileToUpload);
      this.imageInputLabelsix = "movil";
    }
    this.addImages(indice);
    //  
    // console.log(this.newImages);
  }

  prepareImagesblob(e) {

    if (Utils.isDefined(e.srcElement.files)) {
      for (let f of e.srcElement.files) {
        //  
        this.newImages.push(f);
      }
    }
    //this.addImages();

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
  loadImageFailed1() {
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
  loadImageFailed() {
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
    //debugger;
    var creadoobj = { buildingid: this.IDBUILD, userid: this.IDUSR };
      this.loader.showLoader();
    this.heroService.ServicioPostPost("SeeHomeAmmenities", creadoobj).subscribe((value) => {
      //debugger;

      switch (value.result) {
        case "Error":
          console.log("Ocurrio un error al cargar los catalogos: " + value.detalle);
          break;
        default:
          //  
          if (value.result == "Success") {
            // 
            this.posts = value.item;
            this.lengthpost = this.posts.length;
             this.namebuilding = value.detalle;
             setTimeout( () => { this.loader.hideLoader(); }, 1277);
          }
      }
    });
  }

  titulo: any = "";
  test: any = "";

  public post: PostObject = new PostObject();
  passdata( post: any ) {

    this.resetImagesData();

    this.post.test = post.title;
    this.post.id = post.id;
    this.post.icon = post.icon;
    this.post.icon2 = post.icon2;
    this.post.frontphoto = post.frontphoto;
    this.post.build = post.build;
    this.post.buildmobile = post.buildmobile;
    this.post.desc = post.desc;
    this.post.photomobile = post.photomobile;

  }

  public system_message = new SystemMessage();
  updatephoto() {

        let creadoobj = { 
          id: this.post.id, 
          Photo: this.post.frontphoto, 
          PhotoMobile: this.post.photomobile, 
          Description: this.post.desc, 
          Title: this.post.test, 
          Icon: this.post.icon, 
          Icon2: this.post.icon2, 
          PhotoBuild: this.post.build, 
          PhotoBuilMobile: this.post.buildmobile
        };

        if( this.formValidator( this.post ) ) {

          const close_modal_button = document.getElementById('close_modal');

          this.loader.showLoader();

          this.heroService.ServicioPostPost("UpdateHomeAmmenities", creadoobj)
              .subscribe( (response: any) => { 

                if( response.result == 'Success' ) {

                  this.system_message.showMessage({
                    kind: 'ok',
                    time: 4700,
                    message: {
                      header: 'Content updated',
                      text: 'Content hast been updated successfully'
                    }
                  });

                  this.get_photos();

                  setTimeout( () => this.loader.hideLoader(), 777);

                  close_modal_button.click();

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

                setTimeout( () => this.loader.hideLoader(), 777);

                this.get_photos();
                  
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
      //}
      //else {

        //alert("Sube la imagen móvil, por favor ")
      //}

    //}
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
        ////debugger;
        if (indice == 0) {
          this.imageInputLabel = f.name;
        }
        if (indice == 1) {
          this.imageInputLabeltwo = f.name;
        }
        if (indice == 2) {
          this.imageInputLabelthree = f.name;
        }
        if (indice == 4) {
          this.imageInputLabelfive = f.name;

        }
        this.heroService.UploadImgSuc(this.newImages[indice]).subscribe((r) => {
          if (Utils.isDefined(r)) {
            url = <string>r.message;

            url = url.replace('/Imagenes', this.heroService.getURL() + 'Flip');

            this.postphoto[indice] = (url);
            if (indice == 0) {
              this.post.icon = url;
            }
            if (indice == 1) {
              this.post.icon2 = url;
            }
            if (indice == 2) {
              this.post.frontphoto = url;
            }
            if (indice == 3) {
              this.post.build = url;
            }
            if (indice == 4) {
              this.post.buildmobile = url;
            }
            if (indice == 5) {
              this.post.photomobile = url;
            }
            ////debugger;
          }
        })
      }
    }
  }

  public form_watcher = {
    no_titl: false,
    no_desc: false,
    no_ico0: false,
    no_ico1: false,
    no_img0: false,
    no_img1: false,
    no_img2: false,
    no_img3: false
  }
  public formValidator( form_data: PostObject ):boolean {

      let resuslt: boolean = false;

      form_data.test == null || form_data.test == '' ? 
        this.form_watcher.no_titl = true : this.form_watcher.no_titl = false; 

      form_data.desc == null || form_data.desc == '' ? 
        this.form_watcher.no_desc = true : this.form_watcher.no_desc = false; 

      form_data.icon == null || form_data.icon == '' ? 
        this.form_watcher.no_ico0 = true : this.form_watcher.no_ico0 = false; 

      form_data.icon2 == null || form_data.icon2 == '' ? 
        this.form_watcher.no_ico1 = true : this.form_watcher.no_ico1 = false;
        
      form_data.build == null || form_data.build == '' ? 
        this.form_watcher.no_img0 = true : this.form_watcher.no_img0 = false;

      form_data.buildmobile == null || form_data.buildmobile == '' ? 
        this.form_watcher.no_img1 = true : this.form_watcher.no_img1 = false;

      form_data.frontphoto == null || form_data.frontphoto == '' ? 
        this.form_watcher.no_img2 = true : this.form_watcher.no_img2 = false;

      form_data.photomobile == null || form_data.photomobile == '' ? 
        this.form_watcher.no_img3 = true : this.form_watcher.no_img3 = false;

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
                    //debugger
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
//debugger;
                const image_dimension = {
                  width: placeh_image_data.offsetWidth,
                  height: placeh_image_data.offsetHeight
                };

                resolve( image_dimension );

              }, 777);

            });

            parse_my_image.then( ( image_data:any ) => {

              const limits = dimension_limits.get_dimension_limits();
//debugger;
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
                    time: 4700,
                    message: {
                      header: 'Image Resolution',
                      text: 'Image resolution is not valid.'
                    }
                  });

                }

            });

          }

          reader.readAsDataURL( file[0] );

    }

  }

}

class PostObject {
  build: string;
  buildmobile: string;
  desc: string;
  frontphoto: string;
  icon: string;
  icon2: string;
  id: number;
  photomobile: string;
  test: string;
}