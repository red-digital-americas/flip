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
  //  this.addImages();

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


   passdata(id:any ){
    this.PostId = id ; 
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
   
   updatephoto() {
    if(this.imageInputLabel!="Choose file"){

      if(this.imageInputLabeltwo!="Choose file"){
     //debugger;
    var creadoobj = { id: this.PostId, Photo: this.postphoto[0], PhotoMobile: this.postphoto[1] , Description: this.direction};
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
              this.primaryModal.hide();

            this.showSuccess();



            }
        }
      });    
    }
    else {
     
      alert("Sube la imagen móvil, por favor ")
    }
  
  }
else {
  this.showWarning();
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
    debugger; 
    this.addImages(indice);
  }

  uploadAttachmentToServer(indice) {
    debugger; 
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
      for (let f of this.newImages) {
        debugger;
        if(indice==0){
          this.imageInputLabel = f.name;
        }
       
        this.heroService.UploadImgSuc(f).subscribe((r) => {
          if (Utils.isDefined(r)) {
            url = <string>r.message;
            debugger;
            url = url.replace('/Imagenes', this.heroService.getURL() + 'Flip');
            debugger;
            this.postphoto[indice]=(url);
            debugger;
          }
        })
      }
    }
  }
}
