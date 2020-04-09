import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatosService } from '../../../datos.service';
import { ToasterService, ToasterConfig } from 'angular2-toaster';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { PerksGuide, PerksCategory } from '../models/Perks';
import { Utils } from '../../utils/utils';

@Component({
  selector: 'app-perks',
  templateUrl: './perks.component.html',
  styleUrls: ['./perks.component.scss'],
  providers: [ToasterService]
})
export class PerksComponent implements OnInit {
  
  IDUSR: string = "0";
  IDBUILD: string = "0";  
  public user: string[]; 

  public section:string;

  perksArray:PerksGuide[] = [];
  
  ////////////////////////////////////////////////////////
  // Form
  formGroup: FormGroup;
  perkCategories:PerksCategory[] = [];
  perkModel:PerksGuide = new PerksGuide();

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
      this.section = 'perks';         
    }

    this.formGroup = this._formBuilder.group({
      perkNameCtrl: [, Validators.required],
      perkDescriptionCtrl: [''],
      perkStreetAddressCtrl: [''],
      perkCityCtrl: [''],
      perkStateProvincyCtrl: [''],
      perkZipCtrl: [''],
      perkCountryCtrl: [''],
      perkLatitudeCtrl: [''],
      perkLongitudeCtrl: [''],
      perkCategoryIdCtrl: [''],
      perkPhotoCtrl: this.AddGalleryFormGroup(),
      perkBuildingIdCtrol: [parseInt(this.IDBUILD)],             
      perkGalleryCtrl: this._formBuilder.array(
      [this.AddGalleryFormGroup()], [Validators.required])
    });

    this.GetPerks();
    this.GetPerkCategories();
  } 


  private GetPerks() {
    let params = { buildingId: this.IDBUILD};
    this.heroService.service_general_get_with_params("PerkGuide/GetPerks", params).subscribe(
      (res)=> {
        if(res.result === "Success"){                              
          this.perksArray = res.item;  console.table('Perks WS: ', this.perksArray); 
        } else if(res.result === "Error") { console.log("Ocurrio un error" + res.detalle); } 
        else { console.log("Error"); }
      }, (err)=> {console.log(err);}
    );
  }  

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// FORM
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////     
  private GetPerkCategories() {        
    this.heroService.service_general_get("PerkGuide/GetCategories").subscribe(
      (res)=> {
        if(res.result === "Success"){                              
          this.perkCategories = res.item;               
          this.formGroup.controls.perkCategoryIdCtrl.setValue(this.perkCategories[0].id);
        } else if(res.result === "Error") { console.log("Ocurrio un error" + res.detalle); } 
        else { console.log("Error"); }
      }, (err)=> {console.log(err);}
    );
  }

  public AddPerk () {
    this.perkModel.ParseFromForm(this.formGroup.value);   
    // console.log(this.perkModel);return;

    this.heroService.service_general_post("PerkGuide/AddPerk", this.perkModel).subscribe(
      (res)=> {
        if(res.result === "Success"){      
          this.GetPerks();      
          this.ResetForm();     
          this.toasterService.pop('success', 'Success ', 'Perk created correctly.');                                     
        } else if(res.result === "Error") { 
          console.log("Ocurrio un error" + res.detalle); 
          this.toasterService.pop('danger', 'Error', res.detalle);
        } 
        else { console.log("Error"); }
      }, (err)=> {console.log(err); this.toasterService.pop('danger', 'Error', 'Error');}
    );        
  }

  public DetailPerk(id:number) {    
    this.router.navigate(['perk-detail', id])
  }

  public DeletePerk (id:number) {        
    this.heroService.service_general_delete(`PerkGuide/${id}`).subscribe(
      (res)=> {
        if(res.result === "Success"){      
          this.GetPerks();         
          this.toasterService.pop('success', 'Success ', 'Perk deleted correctly.');
        } else if(res.result === "Error") { 
          console.log("Ocurrio un error" + res.detalle); 
          this.toasterService.pop('danger', 'Error', res.detalle);
        } 
        else { console.log("Error"); }
      }, (err)=> {console.log(err); this.toasterService.pop('danger', 'Error', "Error");}
    );            
  }

  private ResetForm() {   
    this.formGroup.reset();
    this.formGroup.reset();                              
    this.perkModel = new PerksGuide(); 
    this.formGroup = this._formBuilder.group({
      perkNameCtrl: [, Validators.required],
      perkDescriptionCtrl: [''],
      perkStreetAddressCtrl: [''],
      perkCityCtrl: [''],
      perkStateProvincyCtrl: [''],
      perkZipCtrl: [''],
      perkCountryCtrl: [''],
      perkLatitudeCtrl: [''],
      perkLongitudeCtrl: [''],
      perkCategoryIdCtrl: [this.perkCategories[0].id],
      perkPhotoCtrl: this.AddGalleryFormGroup(),
      perkBuildingIdCtrol: [parseInt(this.IDBUILD)],             
      perkGalleryCtrl: this._formBuilder.array(
      [this.AddGalleryFormGroup()], [Validators.required])
    });
  }

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// GALLERYCTRLARRAY
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////     
  public get perkGalleryCrtlArray() {
    return this.formGroup.controls['perkGalleryCtrl'] as FormArray;
  }

  private AddGalleryFormGroup () {    
    return this._formBuilder.group({
      labelCtrl: ['Choose file'],
      photoCtrl: [, Validators.required],  
      serverUrlCtrl: []
    });    
  }

  public AddGalleryCtrl () {    
    this.perkGalleryCrtlArray.push(this.AddGalleryFormGroup());   
  }

  public RemoveGalleryCtrl () {    
    this.perkGalleryCrtlArray.removeAt(this.perkGalleryCrtlArray.length - 1);    
  }

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// LOAD IMAGES
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////  
  prepareImages(e, formControl) {     
    let file = e.srcElement.files[0];    
    if (file == undefined || file == null) { return; }
    
    formControl.labelCtrl.setValue(file.name);        
    this.heroService.UploadImgSuc(file).subscribe((r) => {
      if (Utils.isDefined(r)) {
        let url = <string>r.message;            
        url = url.replace('/Imagenes', this.heroService.getURL() + 'Flip'); 
        // url = "http://23.253.173.64:8088/PhotoPost/53481cbd-d5c4-479e-97c3-57e7938871c6.jpg";
        formControl.serverUrlCtrl.setValue(url);  
      }
    })        
  } 


  //Autor: Carlos Enrique Hernandez Hernandez
  public show_perk_form:boolean = false;
  public perk_form_action:string = "";

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
  public data_perk: DataPerk = new DataPerk();
  public toggleSectionForm( action_kind:string = 'hide', editable:any = {} ):void {

    switch( action_kind ) {

      case 'new':
        this.show_perk_form = true;
        this.data_perk.name = '';
        this.data_perk.description = '';
        this.data_perk.streetAddress = '';
        this.data_perk.city = '';
        this.data_perk.stateProvincy = '';
        this.data_perk.zip = null;
        this.data_perk.country = '';
        this.data_perk.latitude = null;
        this.data_perk.longitude = null;
        this.data_perk.photo = '../../../assets/14.jpg';
        this.perk_form_action = 'Añadir Perk';
        break;

      case 'edit':
        this.show_perk_form = true;
        this.show_perk_form = true;
        this.data_perk.name = editable.name;
        this.data_perk.description = editable.description;
        this.data_perk.streetAddress = editable.streetAddress;
        this.data_perk.city = editable.city;
        this.data_perk.stateProvincy = editable.stateProvincy;
        this.data_perk.zip = editable.zip;
        this.data_perk.country = editable.country;
        this.data_perk.latitude = editable.latitude;
        this.data_perk.longitude = editable.longitude;
        this.data_perk.photo = editable.photo;
        this.perk_form_action = 'Editar Perk';
        break;

      case 'hide':
        this.show_perk_form = false;
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
   * Visto en: communities, amenities, services, perks
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

  /*
   * Autor: Carlos Hernandez Hernandez
   * Contacto: carlos.hernandez@minimalist.com
   * Nombre: showGalleryForm
   * Tipo: Funcion | Funcion efecto colateral
   * Visto en: perks
   * Parametros: evento que muestra la galeria
   * Regresa: N/A
   * Descripcion: 
   */
  public show_gallery_container:boolean = false;
  public showGalleryForm():void {

    this.show_gallery_container ?
      this.show_gallery_container = false :
      this.show_gallery_container = true;

  }


  /*
   * Autor: Carlos Hernandez Hernandez
   * Contacto: carlos.hernandez@minimalist.com
   * Nombre: addOneImageToGallery
   * Tipo: Funcion | Funcion efecto colateral
   * Visto en: perks
   * Parametros: evento que añade un contenedor a la galeria
   * Regresa: N/A
   * Descripcion: 
   */
  public images_in_gallery:any = [
    {id: 0, src: '../../../assets/14.jpg', can_delete: false}
  ];
  public addOneImageToGallery():void {

    let new_image = {
      id: 0,
      src: '../../../assets/14.jpg',
      can_delete: true
    };

    this.images_in_gallery.push( new_image );

    this.images_in_gallery.forEach( ( image:any, index ) => {

      image.id = index;

    });

    console.log( this.images_in_gallery );

  }


  /*
   * Autor: Carlos Hernandez Hernandez
   * Contacto: carlos.hernandez@minimalist.com
   * Nombre: deleteImageFromGallery
   * Tipo: Funcion | Funcion efecto colateral
   * Visto en: perks
   * Parametros: id del objeto a eliminar
   * Regresa: N/A
   * Descripcion: elimina un contenedor de la galeria 
   */
  public deleteImageFromGallery( id:number ):void {

    this.images_in_gallery.splice( this.images_in_gallery.findIndex( (image:any) => {  image.id === id } ), 1);

  }

}

class DataPerk {
  id: number;
  name: string;
  description: string;
  streetAddress: string;
  city: string;
  stateProvincy: string;
  zip: number;
  country: string;
  latitude: number;
  longitude: number;
  packCategoryId: number;
  buildingId: number;
  photo: string;
  galleryPerks: Array<{photo: string}>
}