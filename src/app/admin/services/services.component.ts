import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatosService } from '../../../datos.service';
import { ToasterService, ToasterConfig } from 'angular2-toaster';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { PerksGuide, PerksCategory } from '../models/Perks';
import { Utils } from '../../utils/utils';
import { Service, ServicesFormGroup, ServicesFormGroupInitialValues } from '../models/Services';
import { LoaderComponent } from '../../../ts/loader';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss'],
  providers: [ToasterService]
})
export class ServicesComponent implements OnInit {
  
  IDUSR: string = "0";
  IDBUILD: string = "0";  
  public user: string[]; 

  servicesArray:Service[] = [];
  
  ////////////////////////////////////////////////////////
  // Form
  formGroup: FormGroup;    
  serviceModel:Service = new Service();

  public section:string;

  constructor(private router: Router, private heroService: DatosService, private route: ActivatedRoute,
     private toasterService: ToasterService, private _formBuilder: FormBuilder
  ) { }

  ngOnInit() { 
    if (localStorage.getItem("user") == undefined) {
      this.router.navigate(['/login']);
    }
    else {
      this.user = JSON.parse(localStorage.getItem("user"));      
      this.IDUSR = JSON.parse(localStorage.getItem("user")).id;
      this.IDBUILD = this.route.snapshot.params['id'];      
      this.section = 'services';            
    }

    this.formGroup = ServicesFormGroup;
    this.ResetForm();
    this.formGroup.controls.buildingIdCtrl.setValue(this.IDBUILD);
    this.GetServices();
  } 


  private GetServices() {
    let params = { buildingId: this.IDBUILD};
    this.heroService.service_general_get_with_params("Services", params).subscribe(
      (res)=> {
        if(res.result === "Success"){                              
          this.servicesArray = res.item;  
          console.log(this.servicesArray);
        } else if(res.result === "Error") { console.log("Ocurrio un error" + res.detalle); } 
        else { console.log("Error"); }
      }, (err)=> {console.log(err);}
    );
  }  

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// FORM
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////     
  public AddService () {
    this.serviceModel.ParseFromForm(this.formGroup.value);   
    // console.log(this.serviceModel);return;

    this.heroService.service_general_post("Services", this.serviceModel).subscribe(
      (res)=> {
        if(res.result === "Success"){      
          this.GetServices();      
          this.ResetForm();     
          this.toasterService.pop('success', 'Success ', 'Service created correctly.');                                     
        } else if(res.result === "Error") { 
          console.log("Ocurrio un error" + res.detalle); 
          this.toasterService.pop('danger', 'Error', res.detalle);
        } 
        else { console.log("Error"); }
      }, (err)=> {console.log(err); this.toasterService.pop('danger', 'Error', 'Error');}
    );        
  }

  public EditService (id:number) {    
    this.router.navigate(['service-edit', id])
  }

  public DeleteService (id:number) {        
    this.heroService.service_general_delete(`Services/${id}`).subscribe(
      (res)=> {
        if(res.result === "Success"){      
          this.GetServices();         
          this.toasterService.pop('success', 'Success ', 'Service deleted correctly.');
        } else if(res.result === "Error") { 
          console.log("Ocurrio un error" + res.detalle); 
          this.toasterService.pop('danger', 'Error', res.detalle);
        } 
        else { console.log("Error"); }
      }, (err)=> {console.log(err); this.toasterService.pop('danger', 'Error', "Error");}
    );            
  }

  private ResetForm() {           
    this.serviceModel = new Service();     
    this.formGroup.reset(ServicesFormGroupInitialValues);
    // this.formGroup.patchValue(ServicesFormGroupInitialValues);
    this.formGroup.controls.buildingIdCtrl.setValue(this.IDBUILD);
  }

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// LOAD IMAGES
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////  
  /*prepareImages(e, formControl) {     
    let file:File = e.srcElement.files[0];     
    if (file == undefined || file == null) { return; }            
    formControl.label.setValue(file.name);        
    this.heroService.UploadImgSuc(file).subscribe((r) => {
      if (Utils.isDefined(r)) {
        let url = <string>r.message;            
        url = url.replace('/Imagenes', this.heroService.getURL() + 'Flip'); 
        formControl.serverUrl.setValue(url);  
      }
    })        
  } 

  prepareIcon (e, formControl) {    
    let file:File = e.srcElement.files[0];     
    if (file == undefined || file == null) { return; }               

    let fr = new FileReader;
    fr.onload = () => {
      let img:any = new Image();
      img.onload = () => {                  
          if (img.width > 64 && img.height > 64) { return; }
          formControl.label.setValue(file.name);        
          this.heroService.UploadImgSuc(file).subscribe((r) => {
            if (Utils.isDefined(r)) {
              let url = <string>r.message;            
              url = url.replace('/Imagenes', this.heroService.getURL() + 'Flip'); 
              // url = "/assets/Assets-prototype-flipApp/gym.svg";
              formControl.serverUrl.setValue(url);  
            }
          }) 
      }      
      img.src = fr.result;
    }    

    fr.readAsDataURL(file);    
  }*/


















  //Autor: Carlos Hernandez Hernandez
  public loader = new LoaderComponent();
  public show_service_form:boolean = false;
  public service_form_action:string = '';

  public sendServiceData():void { 

    if( this.validatingServiceForm( this.data_service ) ) {

      if( this.new_service_action ) {

        this.loader.showLoader();

        this.heroService.service_general_post("Services", this.data_service)
            .subscribe( (response: any) => {

              if( response.result == 'Success' ) {

                this.GetServices();
                this.toggleSectionForm('hide');
                setTimeout( () => { this.loader.hideLoader(); }, 407);

              }

              }, (error: any) => {

                console.log('Error en respuesta servicio NEWSERVICE', error );

              });

      }

      if( this.edit_service_action  ) {

        this.loader.showLoader();

        this.heroService.service_general_put("Services", this.data_service)
            .subscribe( (response: any) => {

              if( response.result == 'Success' ) {

                this.GetServices();
                this.toggleSectionForm('hide');
                setTimeout( () => { this.loader.hideLoader(); }, 407);

              }

            }, (error: any) => {

              console.log('Error en el servico EDITARSERVICE', error);

            });

      }

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
  public service_to_delete: any;
  public deleteThisService( element_data: any ):void {

    this.service_to_delete = element_data;
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

    this.heroService.service_general_delete(`Services/${ this.service_to_delete.id }`)
        .subscribe( (response: any) => { console.log( response );

          if( response.result == 'Success' ) {

            this.GetServices();
            this.showModal();
            this.loader.hideLoader();

          }

        }, (error: any) => {

          console.log('Error en el servicio de eliminar => ', error);

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

  public form_service: any = {
    no_name: false,
    no_desc: false,
    no_prov: false,
    no_pric: false,
    no_puni: false,
    no_icon: false,
    no_phot: false
  };
  public validatingServiceForm( form_data: DataService ): boolean { 

    let result = false;

    form_data.name == '' || form_data.name == null ?
      this.form_service.no_name = true : this.form_service.no_name = false; 

    form_data.description == '' || form_data.description == null ?
      this.form_service.no_desc = true : this.form_service.no_desc = false;

    form_data.provider == '' || form_data.provider == null ?
      this.form_service.no_prov = true : this.form_service.no_prov = false;

    form_data.price == null ?
      this.form_service.no_pric = true : this.form_service.no_pric = false;

    form_data.priceUnit == null ?
      this.form_service.no_puni = true : this.form_service.no_puni = false;

    form_data.photo == '' || form_data.photo == '../../../assets/14.jpg' ?
      this.form_service.no_phot = true : this.form_service.no_phot = false;

    form_data.icon == '' || form_data.icon == '../../../assets/14.jpg' ?
      this.form_service.no_icon = true : this.form_service.no_icon = false;

    !this.form_service.no_name && !this.form_service.description && !this.form_service.no_prov &&
    !this.form_service.no_pric && !this.form_service.no_puni && !this.form_service.no_phot &&
    !this.form_service.no_icon ? result = true : result = false;

    return result;

  }

  /*
   * Autor: Carlos Hernandez Hernandez
   * Contacto: carlos.hernandez@minimalist.com
   * Nombre: toggleSectionForm
   * Tipo: Funcion | Funcion efecto colateral
   * Visto en: amenities, newsfeed, services
   * Parametros: Dependiendo el parametro, muestra el formulario para dar de alta o editar un objeto(amenidad) u oculta el formulario
   * Regresa: N/A
   * Descripcion: 
   */
  public data_service: DataService = new DataService();
  public new_service_action: boolean = false;
  public edit_service_action: boolean = false;
  public toggleSectionForm( action_kind:string = 'hide', editable:any = {} ):void {

    switch( action_kind ) {

      case 'new':
        this.show_service_form = true;
        this.data_service.buildingId = Number( this.IDBUILD );
        this.data_service.name = '';
        this.data_service.description = '';
        this.data_service.provider = '';
        this.data_service.price = null;
        this.data_service.priceUnit = null;
        this.data_service.icon = '../../../assets/14.jpg';
        this.data_service.photo = '../../../assets/14.jpg';
        this.new_service_action = true;
        this.edit_service_action = false;
        this.service_form_action = 'Añadir Servicio';
        break;

      case 'edit':
        this.show_service_form = true;
        this.data_service.buildingId = Number( this.IDBUILD );
        this.data_service.id = editable.id;
        this.data_service.name = editable.name;
        this.data_service.description = editable.description;
        this.data_service.provider = editable.provider;
        this.data_service.price = editable.price;
        this.data_service.priceUnit = editable.priceUnit;
        this.data_service.icon = editable.icon;
        this.data_service.photo = editable.photo;
        this.new_service_action = false;
        this.edit_service_action = true;
        this.service_form_action = 'Editar Servicio';
        break;

      case 'hide':
        this.show_service_form = false;
        break;

      case 'delete': 
        this.showModal();
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
                        name_image_container.innerHTML = `La imagen debe medir <br /><span class="text-bold">${ dimensions_image }</span>`;
                        id_image_container.classList.add('no-image');
                        if( event.id == 'nueva_comunidad_img' ) root_data.data_service.photo = '../../../assets/14.jpg'; 
                        if( event.id == 'nueva_comunidadi_img' ) root_data.data_service.icon = '../../../assets/14.jpg'; 

                      }
                      
                    });

            }

            reader.readAsDataURL( event.files[0] );

    }
    
  }

  //Images =================>
  public newImages: any[] = [];
  prepareImages(e) {     
    if (Utils.isDefined(e.srcElement.files)) {
      for (let f of e.srcElement.files) {        
        this.newImages.push(f);
        console.log( e.srcElement.files );
      }
    }
    this.addImages();
  }

  prepareIcon(e) {
    if (Utils.isDefined(e.srcElement.files)) {
      for (let f of e.srcElement.files) {        
        this.newImages.push(f);
        console.log( e.srcElement.files );
      }
    }
    this.addIcon();
  }

  addImages() {
    let url: string = '';
    if (!Utils.isEmpty(this.newImages)) {
      for (let f of this.newImages) { console.log( this.newImages );
        this.heroService.UploadImgSuc(f).subscribe((r) => {
          if (Utils.isDefined(r)) {
            url = <string>r.message;            
            url = url.replace('/Imagenes', this.heroService.getURL() + 'Flip');            
            this.data_service.photo = url; 
            this.newImages = [];
          }
        })
      }
    }
  }

  addIcon() {
    let url: string = '';
    if (!Utils.isEmpty(this.newImages)) {
      for (let f of this.newImages) { console.log( this.newImages );
        this.heroService.UploadImgSuc(f).subscribe((r) => {
          if (Utils.isDefined(r)) {
            url = <string>r.message;            
            url = url.replace('/Imagenes', this.heroService.getURL() + 'Flip');            
            this.data_service.icon = url;
            this.newImages = [];
          }
        })
      }
    }
  }
  

}

class DataService {
  id: number;
  name: string = '';
  description: string = '';
  icon: string;
  photo: string;
  provider: string = '';
  price: number;
  priceUnit: number;
  buildingId: number;
}