
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
    IDBUILD: string = "0";
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
        this.IDBUILD = this.route.snapshot.params['id']; 
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
  
  
     passdata(id:any ){
      this.PostId = id ; 
     }
  
     
     updatephoto() {
       debugger;
       if(this.imageInputLabel!="Choose file"&&this.imageInputLabeltwo!="Choose file"&&this.imageInputLabelthree!="Choose file"){

       if(this.imageInputLabelfour!="Choose file"){

      var creadoobj = { id: this.PostId, Photo: this.postphoto[2], PhotoMobile: this.postphoto[3] , Category: this.direction , Title:this.title, Icon:this.postphoto[0], Icon2:this.postphoto[1] };
      debugger;
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
  
  
    addImages(indice) {
      let url: string = '';
      if (!Utils.isEmpty(this.newImages)) {
        for (let f of this.newImages) {
          debugger;
          if(indice==0){
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
  