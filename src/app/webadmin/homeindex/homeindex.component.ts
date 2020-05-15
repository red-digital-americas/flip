import { Component, OnInit } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Router, ActivatedRoute } from '@angular/router';
import { DatosService } from '../../../datos.service';
import { ToasterService ,ToasterConfig} from 'angular2-toaster';
import { Utils } from '../../utils/utils';
import { LoaderComponent } from '../../../ts/loader';
import { SystemMessage } from '../../../ts/systemMessage';

@Component({
  selector: 'app-homeindex',
  templateUrl: './homeindex.component.html',
  styleUrls: ['./homeindex.component.scss']
})
export class HomeindexComponent implements OnInit {

  public system_message: SystemMessage = new SystemMessage();
     
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
  IDBUILD:number = 0;
  PostId: number ;
  posttext: string = "";
  posttitle: string = "";

  title: string = "";
  imageInputLabel = "Choose file";

  direction: string = "";
  comming = false;
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
      this.IDBUILD = parseInt(this.route.snapshot.params['id']); 
      this.get_photos();
      

    }
  }

  
  private toasterService: ToasterService;

  public toasterconfig: ToasterConfig =
    new ToasterConfig({
      tapToDismiss: true,
      timeout: 3000,
      positionClass: "toast-top-center",
    });

      
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
     this.heroService.ServicioPostPost("SeeHomeIndex", creadoobj).subscribe((value) => {
 
 
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


   passdata(id:any , title:any , direction:any ){
    this.PostId = id ; 
    this.title=title;
    this.direction=direction; 
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
  
   public loader = new LoaderComponent();
   updatephoto() {

    const close_button = document.getElementById('close_button');
    // debugger;
     if (this.imageInputLabel != "Choose file") {

       this.loader.showLoader();

       var creadoobj = { id: this.PostId, Photo: this.postphoto, Title: this.title, Direction: this.direction, IsComming: this.comming,  Position: this.PostId };

    this.heroService.ServicioPostPost("UpdateHomeIndex", creadoobj).subscribe((value) => {


      switch (value.result) {
        case "Error":
          console.log("Ocurrio un error al cargar los catalogos: " + value.detalle);
          this.showError(); 
          break;
        default:
          //debugger;
          if (value.result == "Success") {
            this.get_photos();
            this.title="";
            this.direction="";
            
            this.postphoto=""; 
            this.imageInputLabel="Choose file";
            this.system_message.showMessage({
              kind: 'ok',
              time: 4777,
              message: {
                header: 'Content Updated',
                text: 'Content has been updated successfully.'
              }
            });
          }
      }

      this.loader.hideLoader();

      close_button.click();

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

}
