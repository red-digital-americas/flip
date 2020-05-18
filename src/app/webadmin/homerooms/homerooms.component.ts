import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Router, ActivatedRoute } from '@angular/router';
import { DatosService } from '../../../datos.service';
import { ToasterService, ToasterConfig } from 'angular2-toaster';
import { Utils } from '../../utils/utils';
import { ImageCropperComponent, ImageCroppedEvent } from 'ngx-image-cropper';
import { SystemMessage } from '../../../ts/systemMessage';
import { LoaderComponent } from '../../../ts/loader';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-homerooms',
  templateUrl: './homerooms.component.html',
  styleUrls: ['./homerooms.component.scss']
})
export class HomeroomsComponent implements OnInit {


  @ViewChild(ImageCropperComponent, { read: ImageCropperComponent, static: true }) imageCropper: ImageCropperComponent;

  public system_message: SystemMessage = new SystemMessage();
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
    toasterService: ToasterService,
    public domSanitiza: DomSanitizer) {
    this.toasterService = toasterService;
  }
  posts: any;
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

      console.log('Home Rooms =====> ',value.item );
      switch (value.result) {
        case "Error":
          console.log("Ocurrio un error al cargar los catalogos: " + value.detalle);
          break;
        default:
          //debugger; 
          if (value.result == "Success") {

            this.posts = [ value.item[0] ];

            this.posts_b = [ value.item[1] ];

            this.posts_b[0].get_video_url = this.domSanitiza.bypassSecurityTrustResourceUrl( this.getVideoToEmbedUrl( this.posts_b[0].view360 ) );
            this.posts[0].get_video_url = this.domSanitiza.bypassSecurityTrustResourceUrl( this.getVideoToEmbedUrl( this.posts[0].view360 ) );

          }
      }
    });
  }

  public getVideoToEmbedUrl( video_url: string ):string {

    let video_data: string = video_url;

    const video_root = video_data.split('&')[0],
          video_as_param = video_root.split('/')[video_root.split('/').length - 1],
          video = video_as_param.split('=')[1],
          video_url_embed = `https://www.youtube.com/embed/${video}`;

    return video_url_embed;

  }

  numroom: number = 0;
  public room_data: RoomModel = new RoomModel();
  passdataRoom(post: any) {

    this.room_data.id = post.id;
    this.room_data.Title = post.title;
    this.room_data.Description = post.desc;
    this.room_data.Price = post.price;
    this.room_data.descPrice = post.descPrice;
    this.room_data.Price1 = post.price1;
    this.room_data.descPrice1 = post.descPrice1;
    this.room_data.getGuide = post.getGuide;
    this.room_data.View360 = post.view360;
    this.room_data.photos = post.photos;
    this.room_data.communitiesIndexId = post.communitiesIndexId;
    this.room_data.get_video_url = post.get_video_url;

  }

  passnumroom(id: any) {
    this.numroom = id;
  }

  updateindo() {

    if( this.formRoomsValidator( this.room_data ) ) {

      const close_room_button = document.getElementById('close_room'); 

      this.loader.showLoader();

      this.heroService.ServicioPostPost("UpdateHomeRooms", this.room_data)
          .subscribe( (response: any) => {

            if( response.result == 'Success' ) {

              if( response.result == 'Success' ) {

                this.system_message.showMessage({
                  kind: 'ok',
                  time: 4700,
                  message: {
                    header: 'Content updated',
                    text: 'Content has been updated successfully'
                  }
                });
  
                close_room_button.click();
                this.get_photos();
  
                setTimeout( () => this.loader.hideLoader(),777);

              }

            }

          }, (error: any) => {

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
  public passPhotosData( album: any ):void {

    this.photos_data.id = album.id;
    this.photos_data.titleIcon = album.titleIcon;
    this.photos_data.icon = album.icon;
    this.photos_data.icon2 = album.icon2;
    this.photos_data.Photo = album.photo;
    this.photos_data.PhotoMobile = album.photoMobile;
    this.photos_data.IdCommunitiesRoomWeb = album.idCommunitiesRoomWeb;

  }

  updatephoto() {

    if( this.formPhotosValidator( this.photos_data ) ) {

      const close_album_button = document.getElementById('close_album');

      this.loader.showLoader();

      this.heroService.ServicioPostPost("UpdateHomeRoomphoto", this.photos_data)
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

              close_album_button.click();
              this.get_photos();

              setTimeout( () => this.loader.hideLoader(),777);

            }

          }, (error: any) => {



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

    console.log('Aqui => ', id_section);

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

  public form_watcher = {
    no_titl: false,
    no_desc: false,
    no_pric: false,
    no_pde0: false,
    no_pri1: false,
    no_pde1: false,
    no_guid: false,
    no_view: false
  }
  public formRoomsValidator( form_data: RoomModel ):boolean {

      let resuslt: boolean = false;

      form_data.Title == null || form_data.Title == '' ? 
        this.form_watcher.no_titl = true : this.form_watcher.no_titl = false; 

      form_data.Description == null || form_data.Description == '' ? 
        this.form_watcher.no_desc = true : this.form_watcher.no_desc = false; 

      form_data.Price == null ? 
        this.form_watcher.no_pric = true : this.form_watcher.no_pric = false; 

      form_data.descPrice == null || form_data.descPrice == '' ? 
        this.form_watcher.no_pde0 = true : this.form_watcher.no_pde0 = false; 

      form_data.Price1 == null ? 
        this.form_watcher.no_pri1 = true : this.form_watcher.no_pri1 = false;

      form_data.descPrice1 == null || form_data.descPrice1 == '' ? 
        this.form_watcher.no_pde1 = true : this.form_watcher.no_pde1 = false; 

      form_data.getGuide == null || form_data.getGuide == '' ? 
        this.form_watcher.no_guid = true : this.form_watcher.no_guid = false;
        
      form_data.View360 == null || form_data.View360 == '' ? 
        this.form_watcher.no_view = true : this.form_watcher.no_view = false;

      for( const dato in this.form_watcher ) {

        if( this.form_watcher[dato] ) return false;
        else resuslt = true;

      }

      return resuslt;

  }

  public form_watcher_b = {
    no_name: false,
    no_ico0: false,
    no_ico1: false,
    no_img0: false,
    no_img1: false
  }
  public formPhotosValidator( form_data: PhotosModelData ):boolean {

    let result: boolean = false;

    form_data.titleIcon == null || form_data.titleIcon == '' ? 
      this.form_watcher_b.no_name = true : this.form_watcher_b.no_name = false; 

    form_data.icon == null || form_data.icon == '' ? 
      this.form_watcher_b.no_ico0 = true : this.form_watcher_b.no_ico0 = false; 

    form_data.icon2 == null || form_data.icon2 == '' ? 
      this.form_watcher_b.no_ico1 = true : this.form_watcher_b.no_ico1 = false; 

    form_data.Photo == null || form_data.Photo == '' ? 
      this.form_watcher_b.no_img0 = true : this.form_watcher_b.no_img0 = false; 

    form_data.PhotoMobile == null || form_data.PhotoMobile == '' ? 
      this.form_watcher_b.no_img1 = true : this.form_watcher_b.no_img1 = false;

    for( const dato in this.form_watcher_b ) {

      if( this.form_watcher_b[dato] ) return false;
      else result = true;

    }

    return result;

  }

  public sendToPageTop():void {

    const modal_page: any = document.getElementsByClassName('modal-fw');

          modal_page.forEach( (modal: any) => {

            modal.scrollTo(0,0);

          });

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

class RoomModel {
  id: number;
  Description: string;
  Title: String;
  Price: number;
  View360: string;
  getGuide: string;
  Price1: number;
  descPrice: string;
  descPrice1: string;
  photos: any;
  communitiesIndexId: number;
  get_video_url: any;
}

class PhotosModelData {
  id: number;
  Name: string;
  Photo: string;
  PhotoMobile: string;
  icon: string;
  icon2: string;
  IdCommunitiesRoomWeb: number;
  titleIcon: string;
}
 