import { Component, OnInit, NgModule, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Router, ActivatedRoute } from '@angular/router';
import { DatosService } from '../../../datos.service';
import { ToasterService } from 'angular2-toaster';
import { Utils } from '../../utils/utils';
import { ImageCropperModule, ImageCroppedEvent, ImageCropperComponent } from 'ngx-image-cropper';

@Component({
  selector: 'app-homegeneral',
  templateUrl: './homegeneral.component.html',
  styleUrls: ['./homegeneral.component.scss'], 
})
  
export class HomegeneralComponent implements OnInit {

  @ViewChild(ImageCropperComponent) imageCropper: ImageCropperComponent;

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
   ) {
  }
  posts: any[];
  email: string;
  password: string;
  token: boolean;
  message: {};
  validar: boolean = false;
  idpost: any;
  IDUSR: string = "0";
  IDBUILD: string = "0";
  PostId: number ;
  posttext: string = "";
  posttitle: string = "";

  title: string = "";

  direction: string = "";
  public user: string[];

  postphoto: string = "assets/img/Coliving.jpg";
  

  comment: string = "";

  public newImages: any[] = [];


  ngOnInit() {
    if (localStorage.getItem("user") == undefined) {
      this.router.navigate(['/login']);
    }
    else {

      this.user = JSON.parse(localStorage.getItem("user"));
      console.log(this.user);
      this.IDUSR = JSON.parse(localStorage.getItem("user")).id;
      this.IDBUILD = this.route.snapshot.params['id']; 
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
    this.uploadAttachmentToServer();
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


  uploadAttachmentToServer() {
    const fileToUpload: File = new File([this.blob], 'filename.png');
    this.newImages.push(fileToUpload);
    this.addImages();
  }


  prepareImagesblob(e) {

    if (Utils.isDefined(e.srcElement.files)) {
      for (let f of e.srcElement.files) {
       // debugger;
        this.newImages.push(f);
      }
    }
    this.addImages();

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

   
   updatephoto() {
    // debugger;
    var creadoobj = { id: this.PostId, Photo: this.postphoto, Title: this.title , Direction: this.direction ,  Position: this.PostId};
    debugger;

    this.heroService.ServicioPostPost("UpdateHomeGeneral", creadoobj).subscribe((value) => {


      switch (value.result) {
        case "Error":
          console.log("Ocurrio un error al cargar los catalogos: " + value.detalle);
         
          break;
        default:
          debugger;
          if (value.result == "Success") {
            this.get_photos();
           
           

          }
      }
    });
  }
   
  prepareImages(e) {
    debugger; 
    if (Utils.isDefined(e.srcElement.files)) {
      for (let f of e.srcElement.files) {
        debugger;
        this.newImages.push(f);
      }
    }
    this.addImages();

  }


  addImages() {
    let url: string = '';
    if (!Utils.isEmpty(this.newImages)) {
      for (let f of this.newImages) {
        this.heroService.UploadImgSuc(f).subscribe((r) => {
          if (Utils.isDefined(r)) {
            url = <string>r.message;
            
            url = url.replace('/Imagenes', this.heroService.getURL() + 'Flip');
           
            this.postphoto = url;
           
            this.newImages = [];
          }
        })
      }
    }
  }
}
