import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatosService } from '../../../datos.service';
import { Utils } from '../../utils/utils';
import { ToasterService, ToasterConfig } from 'angular2-toaster';
import { SystemMessage } from '../../../ts/systemMessage';
import { LoaderComponent } from '../../../ts/loader';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

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
  Name: string ="";
  apellido: string = "";
  position: string = "";
  Desc: string ="";
  Link: string ="";
  tt: string ="";
  
  public titulo_seccion:string = 'Team seccion';

  postphoto: any[]=[];
  comment: string = "";

  imageInputLabel = "Choose file";
  imageInputLabeltwo = "Choose file";

  private toasterService: ToasterService;

  public toasterconfig: ToasterConfig =
    new ToasterConfig({
      tapToDismiss: true,
      timeout: 3000,
      positionClass: "toast-top-center",
    });
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

  get_photos() {
    // debugger;
     var creadoobj = { buildingid: 1 , userid: this.IDUSR };
     //debugger;
     this.heroService.ServicioPostPost("SeeTeam", creadoobj).subscribe((value) => {
 
 
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


  public team_data: teamDTO = new teamDTO();
  passdata( post ){

    this.resetImagesData();

    this.team_data.id = post.id;
    this.team_data.Name = post.name;
    this.team_data.LastName = post.lastname;
    this.team_data.Position = post.position;
    this.team_data.Description = post.desc;
    this.team_data.LinkedinUrl = post.link;
    this.team_data.TwitterUrl = post.twitter;
    this.team_data.FrontPhoto = post.frontphoto;
    this.team_data.BackPhoto = post.backphoto;

   }

   
   updatephoto() {

    let creadoobj = { 
      id: this.team_data.id, 
      BackPhoto: this.team_data.FrontPhoto, 
      FrontPhoto: this.team_data.FrontPhoto, 
      Name: this.team_data.Name, 
      LastName: this.team_data.LastName, 
      Position: this.team_data.Position, 
      Description: this.team_data.Description, 
      LinkedinUrl: this.team_data.LinkedinUrl,
      TwitterUrl: this.team_data.TwitterUrl
    }

    if( this.formValidator( this.team_data ) ) {

      const close_modal_button = document.getElementById('close_modal');

      this.loader.showLoader();

      this.heroService.ServicioPostPost("UpdateTeam", creadoobj)
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

              close_modal_button.click();
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
    console.log(e);
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

        if(indice==0){
          this.imageInputLabel = f.name;
        }
        if(indice==1)
        {
        this.imageInputLabeltwo = f.name;
        }
        this.heroService.UploadImgSuc(f).subscribe((r) => {
          if (Utils.isDefined(r)) {
            url = <string>r.message;
            //debugger;
            url = url.replace('/Imagenes', this.heroService.getURL() + 'Flip');
            this.postphoto[indice]=(url);

            if( indice == 0 ) this.team_data.FrontPhoto = url;

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

  public sendToPageTop():void {

    const modal_page: any = document.getElementsByClassName('modal-fw');

          modal_page.forEach( (modal: any) => {

            modal.scrollTo(0,0);

          });

  }

  public form_watcher = {
    no_name: false,
    no_lnam: false,
    no_post: false,
    no_desc: false,
    no_link: false,
    no_twit: false,
    no_img0: false
  }
  public formValidator( form_data: teamDTO ):boolean {

    let result: boolean = false;

    form_data.Name == null || form_data.Name == '' ?
      this.form_watcher.no_name = true : this.form_watcher.no_name = false;

    form_data.LastName == null || form_data.LastName == '' ?
      this.form_watcher.no_lnam = true : this.form_watcher.no_lnam = false;

    form_data.Position == null || form_data.Position == '' ?
      this.form_watcher.no_post = true : this.form_watcher.no_post = false;

    form_data.Description == null || form_data.Description == '' ?
      this.form_watcher.no_desc = true : this.form_watcher.no_desc = false;

    form_data.LinkedinUrl == null || form_data.LinkedinUrl == '' ?
      this.form_watcher.no_link = true : this.form_watcher.no_link = false;

    form_data.TwitterUrl == null || form_data.TwitterUrl == '' ?
      this.form_watcher.no_twit = true : this.form_watcher.no_twit = false;

    form_data.FrontPhoto == null || form_data.FrontPhoto == '' ?
      this.form_watcher.no_img0 = true : this.form_watcher.no_img0 = false;

    for( const dato in this.form_watcher ) {

      if( this.form_watcher[dato] ) return false;
      else result = true;

    }

    return result;

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

class teamDTO {
  id: number;
  BackPhoto: string;
  FrontPhoto: string;
  Name: string;
  LastName: string;
  Position: string;
  Description: string;
  LinkedinUrl: string;
  TwitterUrl: string;
}