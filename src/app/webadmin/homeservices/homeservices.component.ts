
  import { Component, OnInit, NgModule, ViewChild } from '@angular/core';
  import { ModalDirective } from 'ngx-bootstrap/modal';
  import { Router, ActivatedRoute } from '@angular/router';
  import { DatosService } from '../../../datos.service';
  import { ToasterService, ToasterConfig } from 'angular2-toaster';
  import { Utils } from '../../utils/utils';
  import { ImageCropperModule, ImageCroppedEvent, ImageCropperComponent } from 'ngx-image-cropper';

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
      this.addImages(indice);
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
      // debugger;
       var creadoobj = { buildingid: 1 , userid: this.IDUSR };
       //debugger;
       this.heroService.ServicioPostPost("SeeHomeServicios", creadoobj).subscribe((value) => {
   
   
         switch (value.result) {
           case "Error":
             console.log("Ocurrio un error al cargar los catalogos: " + value.detalle);
             break;
           default:
             //debugger; 
             if (value.result == "Success") {
                //debugger;
               this.posts = value.item;
             }
         }
       });
     }
  
     
     public service_data: ServiceData = new ServiceData();
     passdata( post: any ){
      console.log('That One => ', post);
      this.service_data.id = post.id;
      this.service_data.title = post.title;
      this.service_data.category = post.category;
      this.service_data.icon = post.icon;
      this.service_data.icon2 = post.icon2;
      this.service_data.frontphoto = post.frontphoto;
      this.service_data.photomobile = post.photomobile;

      /*this.PostId = id ; 
      this.title=tit;
      this.direction=desc*/

     }
  
     
     updatephoto() {

      //if(this.imageInputLabel!="Choose file"&&this.imageInputLabeltwo!="Choose file"&&this.imageInputLabelthree!="Choose file"){

      //if(this.imageInputLabelfour!="Choose file"){

      console.log('Here ===> ', this.service_data );
      var creadoobj = { 
        id: this.service_data.id, 
        Photo: this.service_data.frontphoto, 
        PhotoMobile: this.service_data.photomobile, 
        Category: this.service_data.category, 
        Description: this.service_data.description,
        Title: this.service_data.title, 
        Icon: this.service_data.icon, 
        Icon2: this.service_data.icon2 
      };
  /**  post.Photo = item.Photo;
                        post.Description = item.Description;
                        post.PhotoMobile = item.PhotoMobile;
                        post.Icon = item.Icon;
                        post.PhotoBuild = item.PhotoBuild;
                        post.PhotoBuilMobile = item.PhotoBuilMobile; */
      this.heroService.ServicioPostPost("UpdateHomeServicios", creadoobj).subscribe((value) => {
  
  
        switch (value.result) {
          case "Error":
            console.log("Ocurrio un error al cargar los catalogos: " + value.detalle);
           this.showError();
            break;
          default:
            //debugger;
            if (value.result == "Success") {
              this.get_photos();
              
              this.postphoto=[]; 
              this.postphoto.push("assets/img/Coliving.jpg");
              this.showSuccess();
              this.imageInputLabel="Choose file";
              this.imageInputLabelfour="Choose file";
              this.imageInputLabelthree="Choose file";
              this.imageInputLabeltwo="Choose file";
              this.title="";
              this.direction="";






            }
        }
      });    
    //} else { alert("Sube la imagen móvil, por favor ") }
  
  //} else { this.showWarning(); }
    
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
      this.addImages(indice);
    }
  
  
    addImages(indice) {
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
                this.service_data.icon = url;
              }

              if(indice==1){
                this.service_data.icon2 = url;
              }

              if(indice==2){
                this.service_data.frontphoto = url;
              }

              if(indice==3){
                this.service_data.photomobile = url;
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
                  console.log('Index => ', image_index);

                } else {

                  root.toasterService.pop('warning', 'Warning Toaster', 'El tamaño de la imagen es incorrecto.');
                  root_event.value = "";
                  root.postphoto = last_image;
                  placeh_image_data.removeAttribute('src');

                }

            });

          }

          reader.readAsDataURL( file[0] );

    }

  }

  }
  
  class ServiceData {
    id: number;
    title: string;
    category: string;
    description: string;
    icon: string;
    icon2: string;
    frontphoto: string;
    photomobile: string;
  }