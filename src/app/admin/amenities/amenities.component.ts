import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatosService } from '../../../datos.service';
import { Utils } from '../../utils/utils';
import { ToasterService, ToasterConfig } from 'angular2-toaster';
import { LoaderComponent } from '../../../ts/loader';
import { SystemMessage } from '../../../ts/systemMessage';


class AmenityRequestModel {
  public Name: string = "";
  public Description: string = "";  
  public Photo: string = "assets/img/Coliving.jpg"; 
  public BuildingId:number;
  constructor(buildingid) {
    this.BuildingId = buildingid;
  }
}

@Component({
  selector: 'app-amenities',
  templateUrl: './amenities.component.html',
  styleUrls: ['./amenities.component.scss'],
  providers: [ToasterService]
})
export class AmenitiesComponent implements OnInit {
  
  IDUSR: string = "0";
  IDBUILD: string = "0";  
  public user: string[];
  
  public section:string;

  amenityRequestModel:AmenityRequestModel;     
  public newImages: any[] = [];

  amenitiesArray = [];

  public toasterconfig: ToasterConfig = new ToasterConfig({
      tapToDismiss: true,
      timeout: 3000,
      positionClass: "toast-top-center",
  });

  constructor(  private router: Router, private heroService: DatosService, private route: ActivatedRoute,
                private toasterService: ToasterService
  ) { }

  ngOnInit() {
    if (localStorage.getItem("user") == undefined) {
      this.router.navigate(['/login']);
    }
    else {
      this.user = JSON.parse(localStorage.getItem("user"));
      console.log(this.user);
      this.IDUSR = JSON.parse(localStorage.getItem("user")).id;
      this.IDBUILD = this.route.snapshot.params['id']; 
      this.amenityRequestModel = new AmenityRequestModel(this.IDBUILD);
      this.GetAmenities();   
      this.section = 'amenities';     
    }
  }  

  showSuccess() { this.toasterService.pop('success', 'Success ', 'Your post was published correctly '); }  

  GetAmenities() {   
    var params = { idBuilding: this.route.snapshot.params['id'] };       
    this.heroService.service_general_get_with_params("Amenity", params).subscribe(
      (res)=> {
        if(res.result === "Success"){          
          // console.log(res.item);
          this.amenitiesArray = res.item;         
        } else if(res.result === "Error") {
          console.log("Ocurrio un error" + res.detalle);
        } else {
          console.log("Error");
        }
      },
      (err)=> {console.log(err);}
    );        
  }

  AddAmenity() {    
    // var params = {
    //   "Name": "aaa",
    //   "Description": "description lorem",
    //   "BuildingId": this.route.snapshot.params['id'],
    //   "Photo": this.postphoto
    // }
    console.log(this.amenityRequestModel);
    this.heroService.service_general_post("Amenity", this.amenityRequestModel).subscribe(
      (res)=> {
        if(res.result === "Success"){
          console.log('Aqui =>', this.amenityRequestModel );          
          // console.log(res.item);
          this.toasterService.pop('success', 'Success ', 'Your amenity was created correctly.');   
          this.GetAmenities();
          this.amenityRequestModel = new AmenityRequestModel(this.IDBUILD);
        } else if(res.result === "Error") {
          console.log("Ocurrio un error" + res.detalle);
          this.toasterService.pop('danger', 'Error ', 'An error has been ocurred.');
        } else {
          console.log("Error");
          this.toasterService.pop('danger', 'Error ', 'An error has been ocurred.');
        }
      },
      (err)=> {console.log(err);}
    );  
  }

  prepareImages(e) {     
    if (Utils.isDefined(e.srcElement.files)) {
      for (let f of e.srcElement.files) {        
        this.newImages.push(f);
        console.log( e.srcElement.files );
      }
    }
    this.addImages();
  }

  addImages() {
    let url: string = '';
    if (!Utils.isEmpty(this.newImages)) {
      for (let f of this.newImages) { console.log( this.newImages );
        this.heroService.UploadImgSuc(f).subscribe((r) => {
          if (Utils.isDefined(r)) {
            url = <string>r.message;            
            url = url.replace('/Imagenes', this.heroService.getURL() + 'Flip');            
            this.amenityRequestModel.Photo = url;  
            
            if( this.new_amenity_button ) {
              this.data_amenity.photo = url;  
            }

            if( this.edit_amenity_button ) {
              this.data_amenity_edit.photo = url;   
            }
            
            this.newImages = [];
          }
        })
      }
    }
  }

  EditAmenity(id: number) {this.router.navigate(['/editamenity/' + id])}

  DeleteAmenity(id: number) {        
    this.heroService.service_general_delete(`Amenity/${id}`).subscribe(
      (res)=> {
        this.toasterService.pop('success', 'Success ', 'Your amenity was deleted correctly.');    
        this.GetAmenities();    
      },
      (err)=> {      
        this.toasterService.pop('danger', 'Error ', 'An error has been ocurred.');
      }
    ); 
  }































  //Editor: Carlos Enrique Hernandez Hernandez
  
  /* Welcomeback Mr. Anderson, We missed you! */
  public loader = new LoaderComponent();
  public system_message = new SystemMessage();
  public show_ammenity_form:boolean = false;
  public ammenity_form_action:string = "";


  /*
   * Autor: Carlos Hernandez Hernandez
   * Contacto: carlos.hernandez@minimalist.com
   * Nombre: toggleSectionForm
   * Tipo: Funcion | Funcion efecto colateral
   * Visto en: amenities, newsfeed, services, perks
   * Parametros: Dependiendo el parametro, muestra el formulario para dar de alta o editar un objeto(amenidad) u oculta el formulario
   * Regresa: N/A
   * Descripcion: 
   */
  public data_amenity: DataAmenity = new DataAmenity();
  public data_amenity_edit: DataAmenityEdit = new DataAmenityEdit();
  public new_amenity_button: boolean = false;
  public edit_amenity_button: boolean = false;
  public id_amenity: any;
  public toggleSectionForm( action_kind:string = 'hide', editable:any = {} ):void {

    switch( action_kind ) {

      case 'new':
        this.show_ammenity_form = true;
        this.data_amenity.BuildingId = this.IDBUILD;
        this.data_amenity.name = '';
        this.data_amenity.description = '';
        this.data_amenity.photo = '../../../assets/14.jpg';
        this.ammenity_form_action = 'New Ammenity';
        this.new_amenity_button = true;
        this.edit_amenity_button = false;
        break;

      case 'edit':
        this.show_ammenity_form = true;
        this.id_amenity = editable.id;
        this.data_amenity_edit.name = editable.name;
        this.data_amenity_edit.description = editable.description;
        this.data_amenity_edit.photo = editable.photo;
        this.ammenity_form_action = 'Edit Ammenity';
        this.new_amenity_button = false;
        this.edit_amenity_button = true;
        break;

      case 'delete': 
        this.showModal();
        break;

      case 'hide':
        this.show_ammenity_form = false;
        break;

      default:
        console.log('Ese caso no existe');
        break

    }

  }


  /*
   * Autor: Carlos Hernandez Hernandez
   * Contacto: carlos.hernandez@minimalist.com
   * Nombre: sendAmenityData
   * Tipo: Funcion 
   * Parametros: N/A
   * Regresa: N/A
   * Descripcion: Envia la informacion al servicio post 'Amenity'
   */
  public sendAmenityData():void {

    if(  this.new_amenity_button ) {

      if( this.validatingFieldsFrom( this.data_amenity ) ) {

        this.loader.showLoader();

        this.heroService.service_general_post("Amenity", this.data_amenity )
            .subscribe( (response: any) => {

              if( response.result == 'Success' ) {

                this.GetAmenities();
                this.toggleSectionForm('hide');
                setTimeout( () => {  

                  this.loader.hideLoader(); 
                  this.system_message.showMessage({
                    kind: 'ok',
                    message: {
                      header: 'Amenity has been created',
                      text: 'You can now see your amenity.'
                    },
                    time: 2000
                  });

                }, 407);

                }

            }, (error: any) => {

              this.system_message.showMessage({
                kind: 'error',
                message: {
                  header: 'System Error',
                  text: 'Error WS => New Amenity'
                },
                time: 2000
              });

            });

        }

    } else if ( this.edit_amenity_button ) {

      if( this.validatingFieldsFromEdit( this.data_amenity_edit ) ) {

        this.loader.showLoader();

        this.heroService.service_general_put(`Amenity/${this.id_amenity}`, this.data_amenity_edit)
            .subscribe( (response: any) => {

              if( response.result == 'Success' ) {

                this.GetAmenities();
                this.toggleSectionForm('hide');
                setTimeout( () => { 
                  
                  this.loader.hideLoader(); 
                  this.system_message.showMessage({
                    kind: 'ok',
                    message: {
                      header: 'Amenity has been edited',
                      text: 'Your amenity has been updated.'
                    },
                    time: 2000
                  });
                
                }, 407);

              }

            }, (error: any) => {

              this.system_message.showMessage({
                kind: 'error',
                message: {
                  header: 'System Error',
                  text: 'Error WS => Edit Amenity'
                },
                time: 2000
              });

            });

      }

    }

  }


  public form_amenity: any = {
    no_name: false,
    no_desc: false,
    no_photo: false
  };
  public validatingFieldsFrom( form_data: DataAmenity ): boolean {

    let result = false; 

    form_data.name == null || form_data.name == '' ?
      this.form_amenity.no_name = true : this.form_amenity.no_name = false; 

    form_data.description == null || form_data.description == '' ? 
      this.form_amenity.no_desc = true : this.form_amenity.no_desc = false;

    form_data.photo == '../../../assets/14.jpg' || form_data.photo == '' ?
      this.form_amenity.no_photo = true : this.form_amenity.no_photo = false;

    !this.form_amenity.no_name && !this.form_amenity.no_desc && !this.form_amenity.no_photo ?
      result = true : result = false; 

    return result;

  }


  public validatingFieldsFromEdit( form_data: DataAmenityEdit ) {

    let result = false;

    form_data.name == null || form_data.name == '' ?
      this.form_amenity.no_name = true : this.form_amenity.no_name = false; 

    form_data.description == null || form_data.description == '' ? 
      this.form_amenity.no_desc = true : this.form_amenity.no_desc = false;

    form_data.photo == '../../../assets/14.jpg' || form_data.photo == '' ?
      this.form_amenity.no_photo = true : this.form_amenity.no_photo = false;

    !this.form_amenity.no_name && !this.form_amenity.no_desc && !this.form_amenity.no_photo ?
      result = true : result = false; 

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
  public amenity_to_delete: any;
  public deleteThisAmenity( element_data: any ):void {

    this.amenity_to_delete = element_data;
    this.showModal();

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

    this.loader.showLoader();

    this.heroService.service_general_delete(`Amenity/${ this.amenity_to_delete.id }`)
        .subscribe( (response: any) => {

          this.GetAmenities();
          this.showModal();
          this.loader.hideLoader();
          this.system_message.showMessage({
            kind: 'ok',
            message: {
              header: 'Amenity has been deleted',
              text: 'The amenity has been deleted successfully.'
            },
            time: 2000
          });

        }, (error: any) => {

          this.system_message.showMessage({
            kind: 'error',
            message: {
              header: 'System Error',
              text: 'Error WS => Delete Amenity'
            },
            time: 2000
          });

        });

  }

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
   * Nombre: validateImageUpload
   * Tipo: Funcion | Funcion efecto colateral
   * Visto en: communities, amenities, services
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

                      } else {

                        id_image_container.src = '../../../assets/14.jpg';
                        root_data.data_amenity.photo = '../../../assets/14.jpg';
                        root_data.data_amenity_edit.photo = '../../../assets/14.jpg';
                        name_image_container.innerHTML = `La imagen debe medir <br /><span class="text-bold">${ dimensions_image }</span>`;
                        id_image_container.classList.add('no-image');

                      }
                      
                    });

            }

            reader.readAsDataURL( event.files[0] );

    }
    
  }

}

class DataAmenity {
  public BuildingId: any;
  public name: String = '';
  public description: String = '';
  public photo: String = '';
}

class DataAmenityEdit {
  public name: string = '';
  public description: string = '';
  public photo: string = '';
}
