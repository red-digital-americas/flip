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
  public room_data: RoomModel = new RoomModel();
  passdataRoom(post: any) {
    //this.PostId = id;
    this.room_data.id = post.id;
    this.room_data.Description = post.desc;
    this.room_data.Title = post.title;
    this.room_data.Price = post.price;
  }
  passnumroom(id: any) {
    this.numroom = id;
  }

  updateindo() {

    //debugger;
    var creadoobj = { 
      id: this.room_data.id, 
      Description: this.room_data.Description, 
      Title: this.room_data.Title, 
      Price: this.room_data.Price 
    };
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

  public photos_data: PhotosModelData = new PhotosModelData();
  public passPhotosData( album: any, id: any ):void {

    this.photos_data.id = id;
    this.photos_data.icon = album.icon;
    this.photos_data.icon2 = album.icon2;
    this.photos_data.Photo = album.photo;
    this.photos_data.PhotoMobile = album.photoMobile;
    this.photos_data.IdCommunitiesRoomWeb = album.idCommunitiesRoomWeb;

  }

  updatephoto() {

    console.log('Here => ', this.photos_data );
    //debugger;
    //if (this.imageInputLabel != "Choose file") {

      //if (this.imageInputLabeltwo != "Choose file") {

        var creadoobj = { 
          id: this.photos_data.id, 
          Photo: this.photos_data.Photo, 
          PhotoMobile: this.photos_data.PhotoMobile, 
          icon: this.photos_data.icon, 
          icon2: this.photos_data.icon2, 
          IdCommunitiesRoomWeb: this.photos_data.IdCommunitiesRoomWeb 
        };

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

            if (indice == 0) {
              this.photos_data.icon = url;
            }

            if (indice == 1) {
              this.photos_data.icon2 = url;
            }

            if (indice == 2) {
              this.photos_data.Photo = url;
            }

            if (indice == 3) {
              this.photos_data.PhotoMobile = url;
            }

          }
        })
      }
    }
  }



  public showSection( event_data ,id_section:string ):void {

    const event = event_data.target,
          tabs_in = document.getElementsByClassName('room-data__tab');

          if( !event.classList.contains('room-data__tab--active') ) {

            resetTabsIn();
            sectionSelected( id_section );
            event.classList.add('room-data__tab--active');

          }

          function resetTabsIn() {

            for( let tab = tabs_in.length; tab--; ) {

              tabs_in[tab].classList.remove('room-data__tab--active');

            }

          }

          function sectionSelected( section ) {

            const rooms = document.getElementsByName('room-section');

            for( let room = rooms.length; room--; ) {

              rooms[room].classList.add('display-none');

            }

            let section_to_show = document.getElementById( section );

                section_to_show.classList.remove('display-none');

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

class RoomModel {
  id: number;
  Description: string;
  Title: String;
  Price: number;
}

class PhotosModelData {
  id: number;
  Photo: string;
  PhotoMobile: string;
  icon: string;
  icon2: string;
  IdCommunitiesRoomWeb: number;
}
 