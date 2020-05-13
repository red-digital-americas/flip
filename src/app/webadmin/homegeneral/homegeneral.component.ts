import { Component, OnInit, NgModule, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Router, ActivatedRoute } from '@angular/router';
import { DatosService } from '../../../datos.service';
import { ToasterService, ToasterConfig } from 'angular2-toaster';
import { Utils } from '../../utils/utils';
import { ImageCropperModule, ImageCroppedEvent, ImageCropperComponent } from 'ngx-image-cropper';

@Component({
  selector: 'app-homegeneral',
  templateUrl: './homegeneral.component.html',
  styleUrls: ['./homegeneral.component.scss'], 
})
  
export class HomegeneralComponent implements OnInit {

  @ViewChild(ImageCropperComponent, {read: ImageCropperComponent, static: true}) imageCropper: ImageCropperComponent;

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
  imageInputLabel = "Choose file";
  imageInputLabeltwo = "Choose file";


  comment: string = "";

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
  imageChangedEvent: any = '';
  croppedImage: any = '';
  showCropper = false;
  blob :any =''; 


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



  prepareImagesblob(e) {

    if (Utils.isDefined(e.srcElement.files)) {
      for (let f of e.srcElement.files) {
       // debugger;
        this.newImages.push(f);
      }
    }
    
    //this.addImages();

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
     this.heroService.ServicioPostPost("SeeHomeGeneral", creadoobj).subscribe((value) => {
 
 
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


   passdata( post:any ){

    this.general_data.id = post.id;
    this.general_data.Description = post.desc;
    this.general_data.Photo = post.frontphoto;
    this.general_data.PhotoMobile = post.photomobile;

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
   
   public general_data: GeneralData = new GeneralData();
   updatephoto() {
    //if(this.imageInputLabel!="Choose file"){

    //if(this.imageInputLabeltwo!="Choose file"){
     //debugger;
    var creadoobj = { 
      id: this.general_data.id, 
      Photo: this.general_data.Photo, 
      PhotoMobile: this.general_data.PhotoMobile, 
      Description: this.general_data.Description
    };

    console.log('=======> ', this.general_data );
    //debugger;

    this.heroService.ServicioPostPost("UpdateHomeGeneral", creadoobj).subscribe((value) => {


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
            this.imageInputLabel="Choose file";
            
              this.imageInputLabeltwo="Choose file";
              this.title="";
              this.direction="";
              //this.primaryModal.hide();

            this.showSuccess();



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
    //debugger; 
    this.addImages(indice);
  }

  uploadAttachmentToServer(indice) {
    //debugger; 
    const fileToUpload: File = new File([this.blob], 'filename.png');

    this.newImages[indice]=(fileToUpload);
    this.imageInputLabeltwo="movil"; 
    this.addImages(indice);
   // debugger;
   // console.log(this.newImages);
  }

  addImages(indice) {
    let url: string = '';
    if (!Utils.isEmpty(this.newImages)) {
      let f ={file:this.newImages[indice], name:this.newImages[indice].name}; {
         //debugger;
        if(indice==0){
          this.imageInputLabel = f.name;
        }
        if(indice==1)
        {
        this.imageInputLabeltwo = f.name;
        }
        
        this.heroService.UploadImgSuc(this.newImages[indice]).subscribe((r) => {
          if (Utils.isDefined(r)) {
            url = <string>r.message;
             
            url = url.replace('/Imagenes', this.heroService.getURL() + 'Flip');
             
            //this.postphoto[indice]=(url);
            if( indice == 0 ) {
              this.general_data.Photo = url;
            }

            if( indice == 1 ) {
              this.general_data.PhotoMobile = url;
            }
             //debugger;
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

class GeneralData {
  id: number;
  Photo: string;
  PhotoMobile: string;
  Description: string;
}