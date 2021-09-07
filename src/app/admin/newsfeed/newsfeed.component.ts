import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatosService } from '../../../datos.service';
import { Utils } from '../../utils/utils';
import { ToasterService, ToasterConfig } from 'angular2-toaster';
import { MatDialog } from '@angular/material/dialog';
import { RoomModalComponent } from '../modals/room-modal/room-modal.component';
import { root } from 'rxjs/internal/util/root';
import { LoaderComponent } from '../../../ts/loader';
import { SystemMessage } from '../../../ts/systemMessage';

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
            this.data_post.photo = url;
            
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

*/  console.log('El objeto que envia', creadoobj);
    this.heroService.ServicioPostPost("DeletePost", creadoobj).subscribe((value) => { 
      console.log( creadoobj );
      console.log( value );
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
  public add_loader = new LoaderComponent;
  public show_post_form:boolean = false;
  public data_post: DataPost = new DataPost();
  public post_form_action:string = "";
  public system_message = new SystemMessage();


  /*
   * Autor: Carlos Hernandez Hernandez
   * Contacto: carlos.hernandez@minimalist.com
   * Nombre: showModal
   * Tipo: Funcion 
   * Parametros: NA
   * Regresa: N/A
   * Descripcion: Muestra y oculta el formulario de eliminar
   */
  public page_modal: boolean = false;
  public modal_to_show: string;
  public showModal( section: string = 'default' ):void {

    this.modal_to_show = section;
    !this.page_modal ? this.page_modal = true : this.page_modal = false; 

  }


  /*
   * Autor: Carlos Hernandez Hernandez
   * Contacto: carlos.hernandez@minimalist.com
   * Nombre: sendPostData
   * Tipo: Funcion 
   * Parametros: NA
   * Regresa: N/A
   * Descripcion: Envia la informacion del post al End-Point: servidorUrl + 'Post/' 
   */
  public sendPostData():void {

    if( this.validatingFieldsFrom( this.data_post ) ) {

      this.add_loader.showLoader();

      this.heroService.ServicioPostPost("PostPosts", this.data_post)
          .subscribe( (value: any) => {

            if( value.success || value.result == 'Success' ) {

              this.get_posts();
              this.toggleSectionForm('hide');
              setTimeout( () => {

                this.add_loader.hideLoader();
                this.system_message.showMessage({
                  kind: 'ok',
                  time: 2500,
                  message: {
                    header: 'Post has been created',
                    text: 'You can now see your post.'
                  }
                });

              }, 407);

            }

          }, (error: any) => {

            console.log('Error en el servicio', error);

          });

    } else {

      this.system_message.showMessage({
        kind: 'error',
        time: 4777,
        message: {
          header: 'Form Data',
          text: 'Todos los campos deben estar llenas para continuar'
        }
      });

    }

  }
  

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
  public post_comments_section: boolean = false;
  public toggleSectionForm( action_kind:string = 'hide', editable:any = {} ):void {

    switch( action_kind ) {

      case 'new':
        this.resetNewPostFormValidator();
        this.show_post_form = true;
        this.data_post.id = 0;
        this.data_post.title = '';
        this.data_post.PostText = '';
        this.data_post.photo = '../../../assets/14.jpg';
        this.data_post.userid = this.IDUSR;
        this.data_post.BuildingId = this.route.snapshot.params['id'];
        this.post_form_action = 'New Post';
        this.post_comments_section = false;
        break;

      case 'edit':
        this.resetNewPostFormValidator();
        this.show_post_form = true;
        this.data_post.id = editable.idpost;
        this.data_post.title = editable.posttitle;
        this.data_post.PostText = editable.posttext;
        this.data_post.photo = editable.photo;
        this.data_post.userid = this.IDUSR;
        this.data_post.BuildingId = this.route.snapshot.params['id'];
        this.post_form_action = 'Edit Post';
        this.post_comments_section = true;
        this.getCommentsPost();
        break;

      case 'delete': 
        this.data_post.id = editable.idpost;
        this.data_post.title = editable.posttitle;
        this.data_post.PostText = editable.posttext;
        this.data_post.photo = editable.photo;
        this.data_post.userid = this.IDUSR;
        this.data_post.BuildingId = this.route.snapshot.params['id'];
        this.showModal();
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
   * Nombre: toggleSectionForm
   * Tipo: Funcion 
   * Parametros: N/A
   * Regresa: N/A
   * Descripcion: Servicio que manda un post de un nuevo comentario
   */
  public comment_data: string = '';
  public addNewComment():void {

    if( this.validatingCommentData() ) {

      this.add_loader.showLoader();

      const new_comment = {
        Id: 0,
        PostId: this.data_post.id,
        UserId: this.IDUSR,
        Comment1: this.comment_data
      };
  
      this.heroService.ServicioPostPost('PostComment', new_comment)
          .subscribe( (response: any) => {
    
            if( response.success ) {
    
              this.comment_data = '';
              this.add_loader.hideLoader();
              this.getCommentsPost();
              this.system_message.showMessage({
                kind: 'ok',
                time: 2500,
                message: {
                  header: 'Comment has been created',
                  text: 'Your Comment has been created succesfully.'
                }
              });
    
            } else {
    
              console.log('Error en Comentario agregado');
    
            }
    
          }, (error: any) => {
    
            console.log('Error en el servicio: ', error);
    
          });

    } else {

      this.system_message.showMessage({
        kind: 'error',
        time: 4777,
        message: {
          header: 'Form Data',
          text: 'Comment must be fill to continue'
        }
      });

    }

  }


  /*
   * Autor: Carlos Hernandez Hernandez
   * Contacto: carlos.hernandez@minimalist.com
   * Nombre: validatingCommentData
   * Tipo: Funcion 
   * Parametros: N/A
   * Regresa: N/A
   * Descripcion: Funcion que valida si el comentario ya tiene algo de texto
   */
  public form_comment_errors: any = {
    no_comment: false
  }; 
  public validatingCommentData(): boolean { console.log( this.comment_data );

    let result: boolean = false;

    this.comment_data == '' || this.comment_data == null ? 
      this.form_comment_errors.no_comment = true : this.form_comment_errors.no_comment = false;

    !this.form_comment_errors.no_comment ? result = true : result = false;

    return result;

  }

  /*
   * Autor: Carlos Hernandez Hernandez
   * Contacto: carlos.hernandez@minimalist.com
   * Nombre: toggleSectionForm
   * Tipo: Funcion 
   * Parametros: N/A
   * Regresa: N/A
   * Descripcion: Servicio que manda un post de un nuevo comentario
   */
  public comment_to_delete: any;
  public deleteThisComment( element_data: any ):void {

    this.comment_to_delete = element_data;
    this.showModal('delete_comment');

  }


  /*
   * Autor: Carlos Hernandez Hernandez
   * Contacto: carlos.hernandez@minimalist.com
   * Nombre: toggleSectionForm
   * Tipo: Funcion 
   * Parametros: N/A
   * Regresa: N/A
   * Descripcion: Servicio ocupa el servicio para borrar el comentario
   */
  public confirmDeleteComment():void {

    this.add_loader.showLoader();

    const comment_data = {
      PostId: this.comment_to_delete.idpost,
      userid: this.IDUSR,
      Id: this.comment_to_delete.postid
    };
    
    this.heroService.ServicioPostPost("DeleteComment", comment_data)
        .subscribe( (response: any) => {

          if( response.success ) {

            this.showModal();
            this.getCommentsPost();
            this.add_loader.hideLoader();
            this.system_message.showMessage({
              kind: 'ok',
              time: 2500,
              message: {
                header: 'Comment has been deleted',
                text: 'Your Comment has been delete succesfully.'
              }
            });

          } else {

            console.log('Error en el servicio: Eliminar DeleteComment');

          }

        }, (error: any) => {

          console.log('Error en servicio de borrar comentario: ', error);

        });

  }


  /*
   * Autor: Carlos Hernandez Hernandez
   * Contacto: carlos.hernandez@minimalist.com
   * Nombre: confirmDeleteElement
   * Tipo: Funcion 
   * Parametros: Abre popup para confirmar si se elimina el elemento o se cancela
   * Regresa: N/A
   * Descripcion: N/A
   */
  public postComments: any;
  public getCommentsPost():void {

    const getCommentsFrom = {
      idpost: this.data_post.id,
      userid: this.IDUSR
    }; 

    this.heroService.ServicioPostPost("SeeComment", getCommentsFrom)
      .subscribe( (response: any) => {

        if( response.result == 'Success' ) {

          this.postComments = response.item;

        } else {

          this.postComments = null;

        }

      }, (error: any) => {

        console.log('Error en servico => ', error);

      });

  }


  /*
   * Autor: Carlos Hernandez Hernandez
   * Contacto: carlos.hernandez@minimalist.com
   * Nombre: confirmDeleteElement
   * Tipo: Funcion 
   * Parametros: Abre popup para confirmar si se elimina el elemento o se cancela
   * Regresa: N/A
   * Descripcion: N/A
   */
  public confirmDeleteElement():void {

    this.add_loader.showLoader();

    this.heroService.ServicioPostPost("DeletePost", this.data_post)
        .subscribe( ( response: any ) => {

          if( response.success ) {

            this.get_posts();
            this.showModal();
            this.add_loader.hideLoader();
            this.system_message.showMessage({
              kind: 'ok',
              time: 2500,
              message: {
                header: 'Post has been deleted',
                text: 'Your Post has been delete succesfully.'
              }
            });

          }

        }, (error: any) => {

          console.log('Error en el servicio: ', error);

        });

  }
  

  /*
   * Autor: Carlos Hernandez Hernandez
   * Contacto: carlos.hernandez@minimalist.com
   * Nombre: validatingFieldsFrom
   * Tipo: Funcion 
   * Parametros: Valida que los campos no esten vacios o no exista la foto de placeholder
   * Regresa: N/A
   * Descripcion: N/A
   */
  public forms_erros_found: any = {
    no_title: false,
    no_post: false,
    no_photo: false
  };
  public validatingFieldsFrom( kind_data: DataPost ): boolean { 

    let result: boolean = false;

    kind_data.title == null || kind_data.title == '' ? 
      this.forms_erros_found.no_title = true : this.forms_erros_found.no_title = false;

    kind_data.PostText == null || kind_data.PostText == '' ? 
      this.forms_erros_found.no_post = true : this.forms_erros_found.no_post = false;

    kind_data.photo == '../../../assets/14.jpg' || kind_data.photo == '' ? 
      this.forms_erros_found.no_photo = true : this.forms_erros_found.no_photo = false;

    if(
      !this.forms_erros_found.no_title &&
      !this.forms_erros_found.no_post &&
      !this.forms_erros_found.no_photo
    ) result = true;
    else result = false;

    return result;

  }

  public resetNewPostFormValidator():void {

    this.forms_erros_found.no_title = false;
    this.forms_erros_found.no_post = false;
    this.forms_erros_found.no_photo = false;

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
          native_image_uploaded = document.getElementById('image_real_dimension'),
          root_data = this;

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
                        root_data.prepareImages( event_data );

                      } else {

                        //id_image_container.src = '../../../assets/14.jpg';
                        //root_data.data_post.photo = '../../../assets/14.jpg';
                        name_image_container.innerHTML = `
                        <span class="color-red">Image size must be <br /><span class="text-bold">${ dimensions_image }px</span></span>`;
                        id_image_container.classList.add('no-image');

                      }
                      
                    });

            }

            reader.readAsDataURL( event.files[0] );

    }
    
  }

}


class DataPost {
  public id: number = 0;
  public title: String = '';
  public PostText: String = '';
  public photo: String = '';
  public userid: any;
  public BuildingId: string = '';
}