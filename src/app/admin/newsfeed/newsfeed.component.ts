import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatosService } from '../../../datos.service';
import { Utils } from '../../utils/utils';
import { ToasterService, ToasterConfig } from 'angular2-toaster';
import { MatDialog } from '@angular/material/dialog';
import { RoomModalComponent } from '../modals/room-modal/room-modal.component';

@Component({
  selector: 'app-newsfeed',
  templateUrl: './newsfeed.component.html',
  styleUrls: ['./newsfeed.component.scss'],  
   providers: [ToasterService]
})

export class NewsfeedComponent implements OnInit {


  constructor(private router: Router,
    private heroService: DatosService,
    private route: ActivatedRoute,
    toasterService: ToasterService,
    public dialog: MatDialog) {
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

  postphoto: string = "assets/img/Coliving.jpg";
  

  comment: string = "";

  public newImages: any[] = [];
  
  public section: string;

  ngOnInit() {
    if (localStorage.getItem("user") == undefined) {
      this.router.navigate(['/login']);
    }
    else {
      
      this.user = JSON.parse(localStorage.getItem("user"));
      console.log(this.user);
      this.IDUSR = JSON.parse(localStorage.getItem("user")).id;
      this.IDBUILD = this.route.snapshot.params['id'];
      this.IDBUILD = this.route.snapshot.params['id'];
      this.get_posts();
      //debugger;
      this.heroService.ServiceGetRooms(parseInt(this.IDBUILD)).subscribe(response=>{
        //debugger;
        
        this.get_posts();
      }, error =>{
        /*No se que onda con esto
        if(error = true){
          //debugger;
          const dialogRef = this.dialog.open(RoomModalComponent, {
            width: '512px',
            height: '512px',
            data: { buildId: this.IDBUILD }
          });

          dialogRef.afterClosed().subscribe(async rooms => {
            if(rooms == true)
              this.roomSuccess();
          });

        }*/
        console.log("Error", error)
      }); 
      
      this.section = "newsfeed";

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
    this.toasterService.pop('Success', 'Success ', 'Your post was published correctly ');
    
  }

  showWarning() {
    this.toasterService.pop('warning', 'Post Deleted', 'The post was deleted');
  }

  showError() {
    this.toasterService.pop('error', 'Error ', 'An unexpected error occurred ');
  }

  get_posts() {
   // 
    var creadoobj = { buildingid: this.route.snapshot.params['id'] , userid: this.IDUSR };
    // 
    this.heroService.ServicioPostPost("SeePost", creadoobj).subscribe((value) => {

      switch (value.result) {
        case "Error":
          console.log("Ocurrio un error al cargar los catalogos: " + value.detalle);
          break;
        case 'Success':
          // 
          if (value.result == "Success") {
             
            this.posts = value.item;
          }
      }
    });
  }

  addPost() {
    
    
    var creadoobj = { id: 0, title: this.posttitle, userid: this.IDUSR, PostText: this.posttext, photo: this.postphoto, BuildingId: this.route.snapshot.params['id'] };
    
    /*
     public int id { get; set; }
            public int userid { get; set; }
            public string title  { get; set; }
            public string comment { get; set; }

*/
    this.heroService.ServicioPostPost("PostPosts", creadoobj).subscribe((value) => {


      switch (value.result) {
        case "Error":
          console.log("Ocurrio un error al cargar los catalogos: " + value.detalle);
          this.showError(); 
          break;
        default:
          
          if (value.result == "Success") {
            this.get_posts();
             
            this.postphoto = "assets/img/Coliving.jpg";
            this.posttext = "";
            this.posttitle = "";
            this.showSuccess();


          }
      }
    });
  }

  prepareImages(e) {
     
    if (Utils.isDefined(e.srcElement.files)) {
      for (let f of e.srcElement.files) {
        
        this.newImages.push(f);
      }
    }
    this.addImages();

  }


  addImages() {
    let url: string = '';
    if (!Utils.isEmpty(this.newImages)) {
      for (let f of this.newImages) {
        this.heroService.UploadImgSuc(f).subscribe((r) => {
          if (Utils.isDefined(r)) {
            url = <string>r.message;
            
            url = url.replace('/Imagenes', this.heroService.getURL() + 'Flip');
            
            this.postphoto = url;
            
            this.newImages = [];
          }
        })
      }
    }
  }


  editPost(id: number) {
   //  
    this.router.navigate(['/editcomment/' + id])

  }
  deletePost(idpost: number) {
    ;
    var creadoobj = { id: idpost, title: "", userid: this.IDUSR, PostText: "", photo: "", BuildingId: this.route.snapshot.params['id'] };
    
    /*
     public int id { get; set; }
            public int userid { get; set; }
            public string title  { get; set; }
            public string comment { get; set; }

*/
    this.heroService.ServicioPostPost("DeletePost", creadoobj).subscribe((value) => {
      switch (value.result) {
        case "Error":
          console.log("Ocurrio un error al cargar los catalogos: " + value.detalle);
          this.showError();
          break;

        default:
          
          if (value.result == "Success") {
            this.get_posts();
            this.showWarning();
          }
      }
    }); }

    roomSuccess() {
      this.toasterService.pop('success', 'Success ', 'Rooms Saved'); 
    }

  //Autor: Carlos Enrique Hernandez Hernandez
  public show_post_form:boolean = false;
  public data_post: DataPost = new DataPost();
  public post_form_action:string = "";

  /*
   * Autor: Carlos Hernandez Hernandez
   * Contacto: carlos.hernandez@minimalist.com
   * Nombre: toggleSectionForm
   * Tipo: Funcion | Funcion efecto colateral
   * Visto en: amenities, newsfeed
   * Parametros: Dependiendo el parametro, muestra el formulario para dar de alta o editar un objeto(amenidad) u oculta el formulario
   * Regresa: N/A
   * Descripcion: 
   */
  public toggleSectionForm( action_kind:string = 'hide', editable:any = {} ):void {

    switch( action_kind ) {

      case 'new':
        this.show_post_form = true;
        this.data_post.title = '';
        this.data_post.description = '';
        this.data_post.photo = '../../../assets/14.jpg';
        this.post_form_action = 'Nuevo Post';
        break;

      case 'edit':
        this.show_post_form = true;
        this.data_post.title = editable.posttitle;
        this.data_post.description = editable.posttext;
        this.data_post.photo = editable.photo;
        this.post_form_action = 'Ediat Post';
        break;

      case 'hide':
        this.show_post_form = false;
        break;

      default:
        console.log('Ese caso no existe');
        break

    }

  }

  /*
   * Autor: Carlos Hernandez Hernandez
   * Contacto: carlos.hernandez@minimalist.com
   * Nombre: validateImageUpload
   * Tipo: Funcion | Funcion efecto colateral
   * Visto en: communities
   * Parametros: evento del input, dimensiones de la imagen, donde se va pre visualizar la masa, donde desplegara el nombre
   * Regresa: N/A
   * Descripcion: Cuando se le da clic al input y se selecciona la imagen esta valida que el tamaño sea el adecuado y la despliega el el 
   *              visualizador
   */
  public validateImageUpload( event_data:any, dimensions_image:string, target_image:string, name_image:string ):void {

    const event = event_data.target,
          dimensions_image_data = {
            get_dimensions: ( function() {

              const dimensions_split = dimensions_image.split('x'),
                    width = Number( dimensions_split[0] ),
                    height = Number( dimensions_split[1] );

              return {
                width: width,
                height: height
              }

            }())
          },
          image_limit_width = dimensions_image_data.get_dimensions.width,
          image_limit_height = dimensions_image_data.get_dimensions.height,
          id_image_container:any = document.getElementById( target_image ),
          name_image_container = document.getElementById( name_image ),
          native_image_uploaded = document.getElementById('image_real_dimension');

    if( event.files && event.files[0] ) {

      const reader = new FileReader();

            reader.onload = function(e:any) {

              const image_convert:any = e.target.result,
                    validating_image = new Promise( (resolve) => {

                      native_image_uploaded.setAttribute('src', image_convert);
                      
                      setTimeout( () => {

                        const native_image_dimension = {
                          image: image_convert,
                          width: native_image_uploaded.offsetWidth,
                          height: native_image_uploaded.offsetHeight
                        };

                        resolve( native_image_dimension );

                      }, 277);
              
                    });

                    validating_image.then( ( image_data:any ) => {

                      if( image_limit_width === image_data.width && image_limit_height === image_data.height ) {

                        id_image_container.setAttribute('src', image_data.image );
                        name_image_container.innerHTML = `<span class="image-name">${ event.files[0].name }</span>`;
                        id_image_container.classList.remove('no-image');

                      } else {

                        id_image_container.src = '../../../assets/14.jpg';
                        name_image_container.innerHTML = `La imagen debe medir <br /><span class="text-bold">${ dimensions_image }</span>`;
                        id_image_container.classList.add('no-image');

                      }
                      
                    });

            }

            reader.readAsDataURL( event.files[0] );

    }
    
  }

}


class DataPost {
  public title: String = '';
  public description: String = '';
  public photo: String = '';
}