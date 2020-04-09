import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatosService } from '../../../datos.service';
import { Utils } from '../../utils/utils';
import { ToasterService, ToasterConfig } from 'angular2-toaster';


class AmenityRequestModel {
  public Name: string = "";
  public Description: string = "";  
  public Photo: string = "assets/img/Coliving.jpg"; 
  public BuildingId:number;
  constructor(buildingid) {
    this.BuildingId = buildingid;
  }
}

class DataAmenity {
  public title: String = '';
  public description: String = '';
  public photo: String = '';
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
  public show_ammenity_form:boolean = false;
  public data_amenity: DataAmenity = new DataAmenity();
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
  public toggleSectionForm( action_kind:string = 'hide', editable:any = {} ):void {

    switch( action_kind ) {

      case 'new':
        this.show_ammenity_form = true;
        this.data_amenity.title = '';
        this.data_amenity.description = '';
        this.data_amenity.photo = '../../../assets/14.jpg';
        this.ammenity_form_action = 'Añadir Amenidad';
        break;

      case 'edit':
        this.show_ammenity_form = true;
        this.data_amenity.title = editable.name;
        this.data_amenity.description = editable.name;
        this.data_amenity.photo = editable.photo;
        this.ammenity_form_action = 'Editar Amenidad';
        break;

      case 'hide':
        this.show_ammenity_form = false;
        break;

      default:
        console.log('Ese caso no existe');
        break

    }

  }

  public sendAmenityData( event_data:any ):void {

    event_data.preventDefault();

    const event = event_data.target;

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
