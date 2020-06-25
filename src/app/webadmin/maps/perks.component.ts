import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatosService } from '../../../datos.service';
import { ToasterService, ToasterConfig } from 'angular2-toaster';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { PerksGuide, PerksCategory } from '../../admin/models/Perks';
import { Utils } from '../../utils/utils';
import { LoaderComponent } from '../../../ts/loader';
import { SystemMessage } from '../../../ts/systemMessage';

@Component({
  selector: 'app-maps',
  templateUrl: './perks.component.html',
  styleUrls: ['./perks.component.scss'],
  providers: [ToasterService]
})
export class MapsComponent implements OnInit {
  
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
      this.section = 'maps';         
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
    this.heroService.service_general_get_with_params("Map/GetMaps", params).subscribe(
      (res)=> {
        if(res.result === "Success"){                              
          this.perksArray = res.item;  console.table('Perks WS: ', this.perksArray); 
        } else if(res.result === "Error") { console.log("Ocurrio un error" + res.detalle); } 
        else { console.log("Error"); }
      }, (err)=> {console.log(err);}
    );
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

  map(id?: number) {
    this.router.navigate(['webadmin/maps/' + id])
  }

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// FORM
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////     
  private GetPerkCategories() {        
    this.heroService.service_general_get("PerkGuide/GetCategories").subscribe(
      (res)=> {
        if(res.result === "Success"){                              
          this.perkCategories = res.item; console.log('Catalogo => ', this.perkCategories);             
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
      (res)=> { console.log('Hay que mandar este => ', this.perkModel );
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
  prepareImages1(e, formControl) {     
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
  public loader = new LoaderComponent();
  public system_message = new SystemMessage();
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
  public new_perk_button: boolean = false;
  public edit_perk_button: boolean = false;
  public toggleSectionForm( action_kind:string = 'hide', editable:any = {} ):void {

    switch( action_kind ) {

      case 'new':
        this.clearAndInitScopers();
        this.show_perk_form = true;
        this.data_perk.id = 0;
        this.data_perk.buildingId = Number( this.IDBUILD );
        this.data_perk.name = '';
        this.data_perk.description = '';
        this.data_perk.streetAddress = '';
        this.data_perk.city = '';
        this.data_perk.stateProvincy = '';
        this.data_perk.zip = null;
        this.data_perk.country = '';
        this.data_perk.latitude = null;
        this.data_perk.longitude = null;
        this.data_perk.packCategoryId = -1;
        this.new_perk_button = true;
        this.edit_perk_button = false;
        this.data_perk.photo = '../../../assets/14.jpg';
        this.perk_form_action = 'New Map';
        break;

      case 'edit':
        this.clearAndInitScopers();
        this.show_perk_form = true;
        this.show_perk_form = true;
        this.data_perk.id = editable.id;
        this.data_perk.name = editable.name;
        this.data_perk.description = editable.description;
        this.data_perk.mapCategoryId = editable.mapCategoryId;
        this.data_perk.streetAddress = editable.streetAddress;
        this.data_perk.city = editable.city;
        this.data_perk.stateProvincy = editable.stateProvincy;
        this.data_perk.zip = editable.zip;
        this.data_perk.country = editable.country;
        this.data_perk.latitude = editable.latitude;
        this.data_perk.longitude = editable.longitude;
        this.data_perk.photo = editable.photo;
        this.new_perk_button = false;
        this.edit_perk_button = true;
        this.getPerkGallery( this.data_perk.id );
        this.perk_form_action = 'Edit Perk';
        break;

      case 'hide':
        this.show_perk_form = false;
        break;

      default:
        console.log('Ese caso no existe');
        break

    }

  }


  public sendPerkData():void {

    if( this.validatingFieldsFrom( this.data_perk ) ) {
   
      this.data_perk.mapGalleries = this.createImagesArray();
      debugger;
      if( this.new_perk_button && !this.edit_perk_button ) {

        this.loader.showLoader(); 

        this.heroService.service_general_post("Map/AddMap", this.data_perk)
            .subscribe( (response: any) => {

              if( response.result == 'Success' ) {

                this.GetPerks();
                this.toggleSectionForm('hide');
                setTimeout( () => { 
                  
                  this.loader.hideLoader(); 
                  this.system_message.showMessage({
                    kind: 'ok',
                    message: {
                      header: 'Perk created',
                      text: 'Perk has been created successfully.'
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
                  text: 'Error WS => Add Perk'
                },
                time: 2000
              });

            });

      }

      if( !this.new_perk_button && this.edit_perk_button ) {

        this.loader.showLoader(); 

        this.heroService.service_general_put("Map/UpdateMap", this.data_perk)
            .subscribe( (response: any) => {

              if( response.result == 'Success' ) {

                this.toggleSectionForm('hide');
                this.GetPerks();
                setTimeout( () => { 
                  
                  this.loader.hideLoader(); 
                  this.system_message.showMessage({
                    kind: 'ok',
                    message: {
                      header: 'Perk edited',
                      text: 'Perk has been edited successfully.'
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
                  text: 'Error WS => Edit Perk'
                },
                time: 2000
              });

            });

      }

    } else {

      this.system_message.showMessage({
        kind: 'error',
        message: {
          header: 'Form Data',
          text: 'All inputs must be filled to continue.'
        },
        time: 4777
      });

    }

  }


  public getPerkGallery( id_perk: number ):void {

    this.heroService.service_general_get_with_params("Map/GetMapsWithGallery", { id: id_perk })
        .subscribe( (response: any) => { 
console.log(response);
          if( response.item[0].mapGalleries.length != 0 ) this.images_in_gallery.shift();

          response.item[0].mapGalleries.forEach( (image_gallery: any) => {

            let new_image = {
              id: image_gallery.id,
              src: image_gallery.photo,
              can_delete: true,
              last_one: false
            };

            this.images_in_gallery.push( new_image );

          });

          this.images_in_gallery[0].can_delete = false;
          this.images_in_gallery[0].last_one = false;
          this.images_in_gallery[this.images_in_gallery.length -1].last_one = true;

        }, (error: any) => {

          console.log('Error WS Gallery');

        });

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
  public perk_to_delete: any;
  public deleteThisPerk( element_data: any ):void {

    this.perk_to_delete = element_data;
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

    this.heroService.service_general_delete(`Map/${ this.perk_to_delete.id }`)
        .subscribe( (response: any) => {

          if( response.result == 'Success' ) {

            this.GetPerks();
            this.showModal();
            this.loader.hideLoader(); 
            this.system_message.showMessage({
              kind: 'ok',
              message: {
                header: 'Perk Deleted',
                text: 'Perk has been deleted successfully.'
              },
              time: 2000
            });

          }

        }, (error: any) => {

          this.system_message.showMessage({
            kind: 'error',
            message: {
              header: 'System Error',
              text: 'Error WS => Deleted Perk'
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


  public form_data: any = {
    no_name: false,
    no_desc: false,
    no_cate: false,
    no_stre: false,
    no_city: false,
    no_stat: false,
    no_coun: false,
    no_zip: false,
    no_lati: false,
    no_long: false,
    no_phot: false
  }
  public validatingFieldsFrom( form_data: any ): boolean { 

    let result = false;

    form_data.name == null || form_data.name == '' ?
      this.form_data.no_name = true : this.form_data.no_name = false;
      
    form_data.description == null || form_data.description == '' ?
      this.form_data.no_desc = true : this.form_data.no_desc = false;

    form_data.mapCategoryId == null || form_data.mapCategoryId < 0 ?
      this.form_data.no_cate = true : this.form_data.no_cate = false;

    form_data.streetAddress == null || form_data.streetAddress == '' ?
      this.form_data.no_stre = true : this.form_data.no_stre = false;

    form_data.city == null || form_data.city == '' ?
      this.form_data.no_city = true : this.form_data.no_city = false;

    form_data.stateProvincy == null || form_data.stateProvincy == '' ?
      this.form_data.no_stat = true : this.form_data.no_stat = false;

    form_data.zip == null || form_data.zip < 0 ?
      this.form_data.no_zip = true : this.form_data.no_zip = false;

    form_data.country == null || form_data.country == '' ?
      this.form_data.no_coun = true : this.form_data.no_coun = false;

    form_data.latitude == null ?
      this.form_data.no_lati = true : this.form_data.no_lati = false;

    form_data.longitude == null ?
      this.form_data.no_long = true : this.form_data.no_long = false;

    form_data.photo == '../../../assets/14.jpg' || form_data.photo == '' ?
      this.form_data.no_phot = true : this.form_data.no_phot = false; 

    for( let field in this.form_data ) {

      if( this.form_data[field] ) return;
      else result = true;

    }

    return result;

  }


  public getGalleryImages( id_image: string ):void {

    const image_container = document.getElementById(id_image).parentElement.querySelector('img');
          
    setTimeout( () => {

      image_container.src = this.imagesOnGallery;

    }, 420);

  }


  public createImagesArray():any[] {

    const images_on_gallery = document.getElementById('images_on_gallery').querySelectorAll('img');

    let images_to_upload = [];

    images_on_gallery.forEach( (image: any) => {

      if( image.getAttribute('src') != '../../../assets/14.jpg' ) {

        let new_image = image.getAttribute('src');
            images_to_upload.push({photo: new_image}); 

      }

    });

    return images_to_upload;

  }

  public clearAndInitScopers():void {

    this.images_in_gallery = [];
    this.images_in_gallery.push( {id: 0, src: '../../../assets/14.jpg', can_delete: false, last_one: true} );
    this.form_data = {
      no_name: false,
      no_desc: false,
      no_cate: false,
      no_stre: false,
      no_city: false,
      no_stat: false,
      no_coun: false,
      no_zip: false,
      no_lati: false,
      no_long: false,
      no_phot: false
    };

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
  public validateImageUpload( event_data:any, dimensions_image:string, target_image:string, name_image:string, image_case: number ):void {

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

                      }, 420);
              
                    });

                    validating_image.then( ( image_data:any ) => { 

                      if( image_limit_width === image_data.width && image_limit_height === image_data.height ) {

                        id_image_container.setAttribute('src', image_data.image );
                        name_image_container.innerHTML = `<span class="image-name">${ event.files[0].name }</span>`;
                        id_image_container.classList.remove('no-image');

                        if( image_case  == 0 ) {

                            root_data.prepareImages( event_data );

                        } else {

                          root_data.prepareImagesG( event_data ); 

                        }

                        if( event.hasAttribute('gallery') ) root_data.getGalleryImages(event.getAttribute('id'));

                      } else {

                        //id_image_container.src = '../../../assets/14.jpg';
                        name_image_container.innerHTML = `
                          <span class="color-red">Image size must be <br /><span class="text-bold">${ dimensions_image }</span></span>`;
                        id_image_container.classList.add('no-image');
                        if( !event.hasAttribute('gallery') ) root_data.data_perk.photo = '../../../assets/14.jpg';

                      }
                      
                    });

            }

            reader.readAsDataURL( event.files[0] );

    }
    
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
    {id: 0, src: '../../../assets/14.jpg', can_delete: false, last_one: true}
  ];
  public addOneImageToGallery():void {

    let new_image = {
      id: 0,
      src: '../../../assets/14.jpg',
      can_delete: true,
      last_one: false
    };

    this.images_in_gallery.push( new_image );

    this.images_in_gallery.forEach( ( image:any, index ) => {

      image.id = index;
      image.last_one = false;

    });

    this.images_in_gallery[this.images_in_gallery.length - 1].last_one = true;

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

    this.images_in_gallery[this.images_in_gallery.length - 1].last_one = true;

  }

  //========================== C&PS
  public newImages: any[] = []
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
      for (let f of this.newImages) { 
        this.heroService.UploadImgSuc(f).subscribe((r) => {
          if (Utils.isDefined(r)) {
            url = <string>r.message;            
            url = url.replace('/Imagenes', this.heroService.getURL() + 'Flip');   
            this.data_perk.photo = url;  
            this.newImages = [];
          }
        })
      }
    }
  }

  public newImagesG: any[] = [];
  public imagesOnGallery: string;
  prepareImagesG(e) {     
    if (Utils.isDefined(e.srcElement.files)) {
      for (let f of e.srcElement.files) {        
        this.newImagesG.push(f);
        console.log( e.srcElement.files );
      }
    }
    this.addImagesG();
  }

  addImagesG() {
    let url: string = '';
    if (!Utils.isEmpty(this.newImagesG)) {
      for (let f of this.newImagesG) { console.log( this.newImagesG );
        this.heroService.UploadImgSuc(f).subscribe((r) => {
          if (Utils.isDefined(r)) {
            url = <string>r.message;            
            url = url.replace('/Imagenes', this.heroService.getURL() + 'Flip'); 
            console.log('Desde la galeria => ',url);   
            this.newImagesG = [];
            this.imagesOnGallery = url;
          }
        })
      }
    }
  }

}

class DataPerk {
  id: number;
  name: string = '';
  description: string = '';
  streetAddress: string = '';
  city: string = '';
  stateProvincy: string = '';
  zip: number;
  country: string = '';
  latitude: number;
  longitude: number;
  packCategoryId: number;
  buildingId: number;
  photo: string;
  galleryPerks: any;
  mapGalleries: any;
  mapCategoryId: number;
}