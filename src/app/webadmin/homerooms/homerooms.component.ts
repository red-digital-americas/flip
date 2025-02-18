import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Router, ActivatedRoute } from '@angular/router';
import { DatosService } from '../../../datos.service';
import { ToasterService, ToasterConfig } from 'angular2-toaster';
import { Utils } from '../../utils/utils';
import { ImageCropperComponent, ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-homerooms',
  templateUrl: './homerooms.component.html',
  styleUrls: ['./homerooms.component.scss']
})
export class HomeroomsComponent implements OnInit {


  @ViewChild(ImageCropperComponent, { read: ImageCropperComponent, static: true }) imageCropper: ImageCropperComponent;

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
  posts_b: any[];
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
      console.log(this.user);
      this.IDUSR = JSON.parse(localStorage.getItem("user")).id;
      this.IDBUILD = parseInt(this.route.snapshot.params['id']);
      this.get_photos();


    }
  }
  imageChangedEvent: any = '';
  croppedImage: any = '';
  showCropper = false;
  blob: any = '';


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

    const fileToUpload: File = new File([this.blob], 'filename.png');

    this.newImages[indice] = (fileToUpload);
    this.imageInputLabeltwo = "movil";
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
    //  this.addImages();

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
    // debugger;
    var creadoobj = { buildingid: 1, userid: this.IDUSR };
    //debugger;
    this.heroService.ServicioPostPost("SeeHomeRoom", creadoobj).subscribe((value) => {

      console.log(value.item);
      switch (value.result) {
        case "Error":
          console.log("Ocurrio un error al cargar los catalogos: " + value.detalle);
          break;
        default:
          //debugger; 
          if (value.result == "Success") {

            this.posts = [
              {
                desc: value.item[0].desc,
                id: value.item[0].id,
                photos: value.item[0].photos,
                price: value.item[0].price,
                title: value.item[0].title
              }
            ];

            this.posts_b = [
              {
                desc: value.item[1].desc,
                id: value.item[1].id,
                photos: value.item[1].photos,
                price: value.item[1].price,
                title: value.item[1].title
              }
            ];

            console.log(this.posts);
            //for (let index = 0; index < value.item.length; index++) {
            //  this.photos = value.item[index].photos;
            //  debugger;
            //}

          }
      }
    });
  }

  numroom: number = 0;
  passdata(id: any) {
    this.PostId = id;
  }
  passnumroom(id: any) {
    this.numroom = id;
  }

  updateindo() {

    //debugger;
    var creadoobj = { id: this.PostId, Description: this.direction, Title: this.title, Price: this.price };
    //debugger;

    this.heroService.ServicioPostPost("UpdateHomeRooms", creadoobj).subscribe((value) => {


      switch (value.result) {
        case "Error":
          console.log("Ocurrio un error al cargar los catalogos: " + value.detalle);

          break;
        default:
          //debugger;
          if (value.result == "Success") {
            this.get_photos();
            this.postphoto = [];



          }
      }
    });
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
    //debugger;
    if (this.imageInputLabel != "Choose file") {

      if (this.imageInputLabeltwo != "Choose file") {

        var creadoobj = { id: this.PostId, Photo: this.postphoto[0], PhotoMobile: this.postphoto[1], icon: this.postphoto[2], icon2: this.postphoto[3], IdCommunitiesRoomWeb: this.numroom };
        debugger;

        this.heroService.ServicioPostPost("UpdateHomeRoomphoto", creadoobj).subscribe((value) => {


          switch (value.result) {
            case "Error":
              console.log("Ocurrio un error al cargar los catalogos: " + value.detalle);
              this.showError();
              break;
            default:
              //debugger;
              if (value.result == "Success") {
                this.get_photos();

                this.postphoto = [];
                this.postphoto.push("assets/img/Coliving.jpg");
                this.showSuccess();
                this.imageInputLabel = "Choose file";
                this.imageInputLabelfour = "Choose file";
                this.imageInputLabelthree = "Choose file";
                this.imageInputLabeltwo = "Choose file";
                this.imageInputLabelicon = "Choose file";
                this.imageInputLabelicon2 = "Choose file";
                this.title = "";
                this.direction = "";
                // window.location.reload();






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

  prepareImages(e, indice) {
    if (Utils.isDefined(e.srcElement.files)) {
      for (let f of e.srcElement.files) {
        this.newImages[indice] = (f);
      }
    }
    debugger;
    this.addImages(indice);
  }



  addImages(indice) {
    let url: string = '';
    if (!Utils.isEmpty(this.newImages)) {
      let f = { file: this.newImages[indice], name: this.newImages[indice].name }; {
        debugger;
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
            debugger;
          }
        })
      }
    }
  }
}
