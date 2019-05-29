
  import { Component, OnInit, NgModule, ViewChild } from '@angular/core';
  import { ModalDirective } from 'ngx-bootstrap/modal';
  import { Router, ActivatedRoute } from '@angular/router';
  import { DatosService } from '../../../datos.service';
  import { ToasterService } from 'angular2-toaster';
  import { Utils } from '../../utils/utils';
  import { ImageCropperModule, ImageCroppedEvent, ImageCropperComponent } from 'ngx-image-cropper';

@Component({
  selector: 'app-homeservices',
  templateUrl: './homeservices.component.html',
  styleUrls: ['./homeservices.component.scss']
})
export class HomeservicesComponent implements OnInit {




  @ViewChild(ImageCropperComponent) imageCropper: ImageCropperComponent;

  @ViewChild(ImageCropperComponent) imageCropper1: ImageCropperComponent;


  
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
  
    postphoto: any[]=[];
    
  
    comment: string = "";
  
    public newImages: any[] = [];
  
  
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
  
  
    uploadAttachmentToServer() {
      const fileToUpload: File = new File([this.blob], 'filename.png');
      const fileToUpload1: File = new File([this.blob1], 'filename1.png');

      this.newImages.push(fileToUpload);
      this.newImages.push(fileToUpload1);

      this.addImages();
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
      this.addImages();
  
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
                debugger;
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
      var creadoobj = { id: this.PostId, Photo: this.postphoto[3], PhotoMobile: this.postphoto[2] , Category: this.direction , Title:this.title, Icon:this.postphoto[1] };
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
           
            break;
          default:
            //debugger;
            if (value.result == "Success") {
              this.get_photos();
              
              this.postphoto=[]; 
              this.postphoto.push("assets/img/Coliving.jpg");
             
  
            }
        }
      });
    }
     
    prepareImages(e) {
     // debugger; 
      if (Utils.isDefined(e.srcElement.files)) {
        for (let f of e.srcElement.files) {
       //   debugger;
          this.newImages.push(f);
        }
      }
      //this.addImages();
  
    }
  
  
    addImages() {
      let url: string = '';
      if (!Utils.isEmpty(this.newImages)) {
        for (let f of this.newImages ) {
          
          
          this.heroService.UploadImgSuc(f).subscribe((r) => {
            if (Utils.isDefined(r)) {
              url = <string>r.message;
              
              url = url.replace('/Imagenes', this.heroService.getURL() + 'Flip');
            
              this.postphoto.push(url);
              console.log(this.newImages);
              this.newImages = [];
            }
          })
        }
      }
    }
  }
  