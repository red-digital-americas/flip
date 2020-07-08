
  import { Component, OnInit } from '@angular/core';
  import { ModalDirective } from 'ngx-bootstrap/modal';
  import { Router, ActivatedRoute } from '@angular/router';
  import { DatosService } from '../../../datos.service';
  import { ToasterService, ToasterConfig } from 'angular2-toaster';
  import { Utils } from '../../utils/utils';
import { LoaderComponent } from '../../../ts/loader';
import { SystemMessage } from '../../../ts/systemMessage';

@Component({
  selector: 'app-moreindex',
  templateUrl: './moreindex.component.html',
  styleUrls: ['./moreindex.component.scss']
})
export class MoreindexComponent implements OnInit {

    public system_message: SystemMessage = new SystemMessage();
    
    public myModal;
    public largeModal;
    public smallModal;
    public primaryModal;
    public successModal;
    public warningModal;
    public dangerModal;
    public infoModal;
    postTitle:any;
  
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
    sn:any[]; 
    Facebook: string = "";
    Twitter: string = "";
    Instagram: string = "";
    Youtube: string = "";

  
    postphoto: string = "assets/img/Coliving.jpg";
    imageInputLabel = "Choose file";

  private toasterService: ToasterService;

  public toasterconfig: ToasterConfig =
    new ToasterConfig({
      tapToDismiss: true,
      timeout: 3000,
      positionClass: "toast-top-center",
    });
  
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
        
        this.get_sn(); 
  
      }
    }
  
    get_photos() {
      // debugger;
       var creadoobj = { buildingid: 1 , userid: this.IDUSR };
       //debugger;
       this.heroService.ServicioPostPost("SeeMoreIndex", creadoobj).subscribe((value) => {
   

         switch (value.result) {
           case "Error":
             console.log("Ocurrio un error al cargar los catalogos: " + value.detalle);
             break;
           default:
             //debugger; 
             if (value.result == "Success") {
              //  debugger;
               this.posts = value.item;
               console.log(this.posts);
             }
         }
       });
     }
  
  
     passdata(data:any ){
       console.log(data);
      this.PostId = data.id ;
      this.postTitle =  data.title;
      console.log(this.postTitle);
     }
     updatesn(){
      var creadoobj = { id: this.sn[0].id, FacebookUrl: this.Facebook,  TwitterUrl: this.Twitter , InstagramUrl :this.Instagram, YoutubeUrl:this.Youtube};
      //debugger;
  
      this.heroService.ServicioPostPost("UpdateSocialNetworks", creadoobj).subscribe((value) => {
  
  
        switch (value.result) {
          case "Error":
            console.log("Ocurrio un error al cargar los catalogos: " + value.detalle);
           
            break;
          default:
            //debugger;
            if (value.result == "Success") {
              this.get_sn();
              this.showSuccess();
             
  
            }
        }
      });
     }
      
    get_sn() {
      // debugger;
       var creadoobj = { buildingid: 1 , userid: this.IDUSR };
       //debugger;
       this.heroService.ServicioPostPost("SeeSocialNetworks", creadoobj).subscribe((value) => {
   
   
         switch (value.result) {
           case "Error":
             console.log("Ocurrio un error al cargar los catalogos: " + value.detalle);
             this.showError(); 

             break;
           default:
             //debugger; 
             if (value.result == "Success") {
              //  debugger;
               this.sn = value.item;
               this.Facebook=this.sn[0].fb; 
               this.Twitter=this.sn[0].tt; 
               this.Youtube=this.sn[0].yt; 
               this.Instagram=this.sn[0].insta; 
             }
         }
       });
     }
     
     public loader = new LoaderComponent();
     updatephoto() {

      const close_button = document.getElementById('close_button');
      // debugger;
      if(this.imageInputLabel!="Choose file"){

      this.loader.showLoader();
      var creadoobj = { id: this.PostId, Photo: this.postphoto,  Position: this.PostId, title: this.postTitle };
      //debugger;
  
      this.heroService.ServicioPostPost("UpdateMoreIndex", creadoobj).subscribe((value) => {
  
  
        switch (value.result) {
          case "Error":
            console.log("Ocurrio un error al cargar los catalogos: " + value.detalle);
            this.showError(); 

            break;
          default:
            //debugger;
            if (value.result == "Success") {
              this.get_photos();
              
            this.postphoto=""; 
            this.imageInputLabel="Choose file";
            this.system_message.showMessage({
              kind: 'ok',
              time: 4777,
              message: {
                header: 'Content updated',
                text: 'Content has been updated successfully'
              }
            });
            }
        }

        close_button.click();

        setTimeout( () => this.loader.hideLoader(), 777);

      });    
    }
    else {
      this.showWarning();
    }  
 }
     
    prepareImages(e) {
      //debugger; 
      if (Utils.isDefined(e.srcElement.files)) {
        for (let f of e.srcElement.files) {
          //debugger;
          this.newImages.push(f);
        }
      }
      this.addImages();
  
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
     
  
    addImages() {
      let url: string = '';
      if (!Utils.isEmpty(this.newImages)) {
        for (let f of this.newImages) {
          
          this.imageInputLabel = f.name;
          this.heroService.UploadImgSuc(f).subscribe((r) => {
            if (Utils.isDefined(r)) {
              url = <string>r.message;
              //debugger;
              url = url.replace('/Imagenes', this.heroService.getURL() + 'Flip');
              //debugger;
              this.postphoto = url;
              //debugger;
              this.newImages = [];
            }
          })
        }
      }
    }


    public readImageData( event_data, dimension ):void {

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
                    root.prepareImages( event_data );
                    console.log('Si pasa => ', last_image );
  
                  } else {
  
                    root_event.value = "";
                    root.postphoto = last_image;
                    console.log('Aquiiiii => ', root.postphoto );
                    placeh_image_data.removeAttribute('src');
                    root.system_message.showMessage({
                      kind: 'error',
                      time: 4777,
                      message: {
                        header: 'Image Resolution',
                        text: 'Image Resolution is not valid'
                      }
                    });
  
                  }
  
              });
  
            }
  
            reader.readAsDataURL( file[0] );
  
      }
  
    }

  /*
   * Autor: Carlos Hernandez Hernandez
   * Contacto: carlos.hernandez@minimalist.com
   * Nombre: showImagesSpaces
   * Tipo: Funcion efecto colateral
   * Visto en: webadmin, desingindex, moreindex, homeindex
   * Parametros: id del espacio(contenedor, div, bloque, etc...) donde estan las imagenes actuales
   * Regresa: N/A
   * Descripcion: Cuando el usuario va editar imagenes, pero ya hay existentes estas se despliegan para que el usuario pueda visualizar
                  que es lo que esta a punto de editar 
   */
  public showImagesSpaces( id_image_space:string ):void {

    this.imageInputLabel = '';

    const IMAGE_SPACE = id_image_space,
          IMAGES_ON_SPACE = document.getElementById( IMAGE_SPACE ).querySelectorAll('img'),
          PLACEHOLDER_IMAGE = document.getElementsByClassName('placeholder_image');

          for( let image = 0; image < IMAGES_ON_SPACE.length; image +=1 ) {

            PLACEHOLDER_IMAGE[image].setAttribute('src', IMAGES_ON_SPACE[image].getAttribute('src'));
            PLACEHOLDER_IMAGE[image].parentElement.parentElement.getElementsByClassName('image_to_preview_name')[0].innerHTML = '';

            this.postphoto = IMAGES_ON_SPACE[image].getAttribute('src');

          }

  }

  /*
   * Autor: Carlos Hernandez Hernandez
   * Contacto: carlos.hernandez@minimalist.com
   * Nombre: validatingUrl
   * Tipo: Funcion de validacion de url
   * Visto en: moreindex
   * Parametros: Objeto del evento que es emitido en change
   * Regresa: N/A
   * Descripcion: Validar que la url sea existente, de otro caso mandar error o no dejar que se guarde
   */
  public validatingUrl( url_data:string, event:any ):void {  

    const url = url_data,
          event_data = event.target; 

    console.log( url );
    console.log( event_data.value.indexOf( url ) );
    console.log( event_data.value.indexOf('http') );
    console.log( event_data.value.indexOf('com') );

    if( event_data.value.indexOf( url ) != -1 && event_data.value.indexOf('http') != -1 && event_data.value.indexOf('com') != -1 ) {

      console.log('La url que estas escribiendo es completamebte logina');

    } else {

      event_data.value = "";
      console.log("Ver lo del toast");

    }

  }

  }
  