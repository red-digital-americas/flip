import { Component, OnInit } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Router, ActivatedRoute } from '@angular/router';
import { DatosService } from '../../../datos.service';
import { ToasterService, ToasterConfig } from 'angular2-toaster';
import { Utils } from '../../utils/utils';
import { SystemMessage } from '../../../ts/systemMessage';
import { LoaderComponent } from '../../../ts/loader';
@Component({
  selector: 'app-design',
  templateUrl: './design.component.html',
  styleUrls: ['./design.component.scss']
})
export class DesignComponent implements OnInit {

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
  public user: string[];
  imageInputLabel = "Choose file";

  postphoto: string = "assets/img/Coliving.jpg";
  desc:string=""; 
  posdesc:string="";

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

      this.user = JSON.parse(localStorage.getItem("user"));
      console.log(this.user);
      this.IDUSR = JSON.parse(localStorage.getItem("user")).id;
      this.IDBUILD = this.route.snapshot.params['id']; 
      this.get_photos();
      

    }
  }

  public system_message: SystemMessage = new SystemMessage();
  public loader: LoaderComponent = new LoaderComponent();
   
  showSuccess() {
    this.toasterService.pop('success', 'Success ', 'Publicación Actualizada Correctamente ');
  }

  showError() {
    this.toasterService.pop('error', 'Error ', 'Por favor completa todos los campos ');
  }
  showWarning() {
    this.toasterService.pop('warning', 'Warning Toaster', 'Completa todos los campos por favor');
  }

  get_photos() {
    // debugger;
     var creadoobj = { buildingid: 1 , userid: this.IDUSR };
     //debugger;
     this.heroService.ServicioPostPost("SeeDesign", creadoobj).subscribe((value) => {
 
 
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


   public desing_data: DesingDTO = new DesingDTO();
   passdata( post: any ){

    this.desing_data.PositionDescription = post.posdesc;
    this.desing_data.Description = post.desc;
    this.desing_data.Photo = post.frontphoto;
    this.desing_data.Position = post.position;
    this.desing_data.id = post.id;

   }

   updatephoto() {

    let creadoobj = { 
      id: this.desing_data.id, 
      Photo: this.desing_data.Photo,  
      Position: this.desing_data.Position, 
      Description: this.desing_data.Description, 
      PositionDescription: this.desing_data.PositionDescription 
    }

    if( this.formValidator( this.desing_data ) ) {

      const close_modal = document.getElementById('close_modal');

      this.loader.showLoader();

      this.heroService.ServicioPostPost("UpdateDesign", creadoobj)
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

              close_modal.click();
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
   
  prepareImages(e, indice) {
    //debugger; 
    if (Utils.isDefined(e.srcElement.files)) {
      for (let f of e.srcElement.files) {
        //debugger;
        this.newImages.push(f);
      }
    }
    this.addImages( indice );

  }


  addImages( indice: any ) {
    let url: string = '';
    if (!Utils.isEmpty(this.newImages)) {
      for (let f of this.newImages) {
        this.imageInputLabel = f.name;
        this.heroService.UploadImgSuc(f).subscribe((r) => {
          if (Utils.isDefined(r)) {
            url = <string>r.message;
          //  debugger;
            url = url.replace('/Imagenes', this.heroService.getURL() + 'Flip');
            //debugger;
            //this.postphoto = url;
            //debugger;
            //this.newImages = [];
            if( indice == 0 ) this.desing_data.Photo = url;
          }
        })
      }
    }
  }

  public form_watcher = {
    no_titl: false,
    no_desc: false,
    no_img0: false
  }
  public formValidator( form_data: DesingDTO ):boolean {

    let result: boolean = false;

    form_data.PositionDescription == null || form_data.PositionDescription == '' ?
      this.form_watcher.no_titl = true : this.form_watcher.no_titl = false;
      
    form_data.Description == null || form_data.Description == '' ?
      this.form_watcher.no_desc = true : this.form_watcher.no_desc = false; 

    form_data.Photo == null || form_data.Photo == '' ?
      this.form_watcher.no_img0 = true : this.form_watcher.no_img0 = false; 

    for( const dato in this.form_watcher ) {

      if( this.form_watcher[dato] ) return false;
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

  public resetImagesData():void {

    const images: any = document.getElementsByClassName('image_form'),
          name_image: any = document.getElementsByClassName('name_image_uploaded');

          for( let image = images.length; image--; ) {

            images[image].value = '';
            name_image[image].innerHTML = '';

          }

  }

}

class DesingDTO {
  id: number;
  Photo: string;
  Position: number;
  Description: string;
  PositionDescription: string;
}
