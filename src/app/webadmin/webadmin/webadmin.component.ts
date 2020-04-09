import { Component, OnInit } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Router, ActivatedRoute } from '@angular/router';
import { DatosService } from '../../../datos.service';
import { ToasterService, ToasterConfig } from 'angular2-toaster';
import { Utils } from '../../utils/utils';
import { setTime } from 'ngx-bootstrap/chronos/utils/date-setters';
import { resolve } from 'dns';


@Component({
  selector: 'app-webadmin',
  templateUrl: './webadmin.component.html',
  styleUrls: ['./webadmin.component.scss']
})
export class WebadminComponent implements OnInit {

  
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
  postphoto: any[]=[];

  imageInputLabel = "Choose file";
  imageInputLabeltwo = "Choose file";

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
     this.heroService.ServicioPostPost("SeeIndex", creadoobj).subscribe((value) => {
 
 
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
     this.PostId = id;
     this.imageInputLabel = "Choose file";
     this.imageInputLabeltwo = "Choose file";
   }
   
   updatephoto() {
    // debugger;

    if(this.imageInputLabel!="Choose file"&&this.imageInputLabeltwo!="Choose file"){
      var creadoobj = { id: this.PostId, BackPhoto: this.postphoto[1], FrontPhoto: this.postphoto[0], Position: this.PostId };
      debugger;
  
      this.heroService.ServicioPostPost("UpdateIndex", creadoobj).subscribe((value) => {
  
  
        switch (value.result) {
          case "Error":
            console.log("Ocurrio un error al cargar los catalogos: " + value.detalle);
            this.showError(); 
            break;
          default:
            debugger;
            if (value.result == "Success") {
              this.get_photos();
             
             
              this.postphoto=[]; 
              this.imageInputLabel="Choose file";
              this.imageInputLabeltwo="Choose file";

              this.showSuccess();
              //location.reload();
            }
        }
      });    
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
    //this.newImages = []
    if (Utils.isDefined(e.srcElement.files)) {
      for (let f of e.srcElement.files) {
        this.heroService.UploadImgSuc(f).subscribe((r) => {
          console.log(r);
          if (indice == 0) {
            this.imageInputLabel = f.name;
            this.postphoto[indice] = r.message;
          }
          if (indice == 1) {
            this.imageInputLabeltwo = f.name;
            this.postphoto[indice] = r.message;
          }
          
          //if (Utils.isDefined(r)) {
          //  url = <string>r.message;
          //  //debugger;
          //  url = url.replace('/Imagenes', this.heroService.getURL() + 'Flip');
          //  debugger;
          //  this.postphoto[indice]=(url);
          //  debugger;
          //}
        })
      }
    }
    //this.addImages(indice);

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
        this.heroService.UploadImgSuc(f).subscribe((r) => {
          console.log(r);
          //if (Utils.isDefined(r)) {
          //  url = <string>r.message;
          //  //debugger;
          //  url = url.replace('/Imagenes', this.heroService.getURL() + 'Flip');
          //  debugger;
          //  this.postphoto[indice]=(url);
          //  debugger;
          //}
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
          };

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

                } else {

                  root.toasterService.pop('warning', 'Warning Toaster', 'El tamaño de la imagen es incorrecto.');
                  root_event.value = "";
                  placeh_image_data.removeAttribute('src');

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

    const IMAGE_SPACE = id_image_space,
          IMAGES_ON_SPACE = document.getElementById( IMAGE_SPACE ).querySelectorAll('img'),
          PLACEHOLDER_IMAGE = document.getElementsByClassName('placeholder_image');

          for( let image = 0; image < IMAGES_ON_SPACE.length; image +=1 ) {

            PLACEHOLDER_IMAGE[image].setAttribute('src', IMAGES_ON_SPACE[image].getAttribute('src'));
            PLACEHOLDER_IMAGE[image].parentElement.parentElement.getElementsByClassName('image_to_preview_name')[0].innerHTML = '';

          }

  }

}
