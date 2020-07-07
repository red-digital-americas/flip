import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatosService } from '../../../../datos.service';
import { ToasterService, ToasterConfig } from 'angular2-toaster';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { PerksGuide, PerksCategory, PerkPromotion } from '../../models/Perks';
import { Utils } from '../../../utils/utils';
import { LoaderComponent } from '../../../../ts/loader';
import { SystemMessage } from '../../../../ts/systemMessage';

@Component({
  selector: 'app-perks-detail',
  templateUrl: './perks-detail.component.html',
  styleUrls: ['./perks-detail.component.scss'],
  providers: [ToasterService]
})
export class PerksDetailComponent implements OnInit {

  public how_many_promos:number;
  
  IDUSR: string = "0";   
  public user: string[]; 

  private perkId:number;  // PArams from route
  perkDetail:PerksGuide;
  promotionsArray:PerkPromotion[] = [];
  
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
      this.perkId = this.route.snapshot.params['id'];    
      this.GetPerk();
      this.GetPromotions();
    }
  }

  goback() { window.history.back(); }
  
  private GetPerk() {
    let params = { id: this.perkId };
    this.heroService.service_general_get_with_params("PerkGuide/GetPerks", params).subscribe(
      (res)=> {
        if(res.result === "Success"){                              
          this.perkDetail = res.item[0];  
          console.log(this.perkDetail);
        } else if(res.result === "Error") { console.log("Ocurrio un error" + res.detalle); } 
        else { console.log("Error"); }
      }, (err)=> {console.log(err);}
    );
  }

  public EditPerk() {
    this.router.navigate([ 'perk-edit', this.perkId]);
  }

  public DeletePerk () {            
    this.heroService.service_general_delete(`PerkGuide/${this.perkId}`).subscribe(
      (res)=> {
        if(res.result === "Success"){      
          this.router.navigate(['perks', this.perkDetail.buildingId]);
        } else if(res.result === "Error") { 
          console.log("Ocurrio un error" + res.detalle); 
          this.toasterService.pop('danger', 'Error', res.detalle);
        } 
        else { console.log("Error"); }
      }, (err)=> {console.log(err); this.toasterService.pop('danger', 'Error', "Error");}
    );            
  }
  
  private GetPromotions () {
    let params = { perkGuideId: this.perkId };
    this.heroService.service_general_get_with_params("PerkPromotions/GetPerkPromotions", params).subscribe(
      (res)=> {
        if(res.result === "Success"){                              
          this.promotionsArray = res.item; 
          this.how_many_promos = this.promotionsArray.length 
          console.log(this.promotionsArray);
        } else if(res.result === "Error") { console.log("Ocurrio un error" + res.detalle); } 
        else { console.log("Error"); }
      }, (err)=> {console.log(err);}
    );
  }

  public AddPromotion() {    
    this.router.navigate(['perk-promotions-add', this.perkId])
  }

  public DetailPromotion(idPromotion:number) {
    this.router.navigate(['perk-promotions-detail', idPromotion])
  }

  public DeletePromotion(idPromotion:number){
    this.heroService.service_general_delete(`PerkPromotions/${idPromotion}`).subscribe(
      (res)=> {
        if(res.result === "Success"){      
          this.GetPromotions();         
          this.toasterService.pop('success', 'Success ', 'Promotion deleted correctly.');
        } else if(res.result === "Error") { 
          console.log("Ocurrio un error" + res.detalle); 
          this.toasterService.pop('danger', 'Error', res.detalle);
        } 
        else { console.log("Error"); }
      }, (err)=> {console.log(err); this.toasterService.pop('danger', 'Error', "Error");}
    );  
  }

























  //Autor: Carlos Enrique Hernandez Hernandez';

  public loader = new LoaderComponent();
  public system_message = new SystemMessage();

  public sendDataPromotion():void { 

    if( this.validatingFieldsFrom( this.data_promo  ) ) { 

      if( this.new_promo_button && !this.edit_promo_button ) {

        this.loader.showLoader(); 

        this.heroService.service_general_post("PerkPromotions/AddPromotion", this.data_promo )
            .subscribe( (response: any) => {

              if( response.result == 'Success' ) {

                this.GetPromotions();
                this.toggleSectionForm('hide');
                this.loader.hideLoader();
                this.system_message.showMessage({
                  kind: 'ok',
                  message: {
                    header: 'Promotion created',
                    text: 'Promotion has been created successfully.'
                  },
                  time: 2000
                });

              }

            }, (error: any) => {

              this.system_message.showMessage({
                kind: 'error',
                message: {
                  header: 'System Error',
                  text: 'Error WS => Add Promo'
                },
                time: 2000
              });

            });

      }

      if( !this.new_promo_button && this.edit_promo_button ) {

        this.loader.showLoader();

        this.heroService.service_general_put("PerkPromotions/EditPromotion", this.data_promo)
            .subscribe( (response: any) => {

              if( response.result == 'Success' ) {

                this.GetPromotions();
                this.toggleSectionForm('hide');
                this.loader.hideLoader();
                this.system_message.showMessage({
                  kind: 'ok',
                  message: {
                    header: 'Promotion edited',
                    text: 'Promotion has been edited successfully.'
                  },
                  time: 2000
                });

              }

            }, (error: any) => {

              this.system_message.showMessage({
                kind: 'error',
                message: {
                  header: 'System Error',
                  text: 'Error WS => Edit Promo.'
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
  
  /*
   * Autor: Carlos Hernandez Hernandez
   * Contacto: carlos.hernandez@minimalist.com
   * Nombre: toggleSectionForm
   * Tipo: Funcion | Funcion efecto colateral
   * Visto en: amenities, newsfeed, services, perks-detail
   * Parametros: Dependiendo el parametro, muestra el formulario para dar de alta o editar un objeto(amenidad) u oculta el formulario
   * Regresa: N/A
   * Descripcion: 
   */
  //public data_perk: DataPerk = new DataPerk();
  public show_dperk_form:boolean = false;
  public show_dperk_form_action:string = '';
  public data_promo: DataPromotion = new DataPromotion();
  public new_promo_button: boolean = false;
  public edit_promo_button: boolean = false;
  public toggleSectionForm( action_kind:string = 'hide', editable:any = {} ):void {

    switch( action_kind ) {

      case 'new':
        this.resetPromotionValidator();
        this.show_dperk_form = true;
        this.new_promo_button = true;
        this.edit_promo_button = false;
        this.data_promo.id = 0;
        this.data_promo.perkGuideId = this.perkId.toString();
        this.data_promo.name = '';
        this.data_promo.description = '';
        this.data_promo.startDate = '';
        this.data_promo.endDate = '';
        this.data_promo.photo = '../../../../assets/14.jpg';
        this.show_dperk_form_action = 'Add Promotion';
        break;

      case 'edit':
        this.resetPromotionValidator();
        this.show_dperk_form = true;
        this.data_promo.id = editable.id;
        this.data_promo.perkGuideId = this.perkId;
        this.new_promo_button = false;
        this.edit_promo_button = true;
        this.data_promo.name = editable.name;
        this.data_promo.description = editable.description;
        this.data_promo.startDate = this.dateWorker(editable.startDate, 'remove_time');
        this.data_promo.endDate = this.dateWorker(editable.endDate, 'remove_time');
        this.data_promo.photo = editable.photo;
        this.show_dperk_form_action = 'Edit Promotion';
        break;

      case 'hide':
        this.show_dperk_form = false;
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
  public promo_to_delete: any;
  public deleteThisPromo( element_data: any ):void {

    this.promo_to_delete = element_data;
    this.showModal();

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
   * Nombre: confirmDeleteElement
   * Tipo: Funcion 
   * Parametros: Abre popup para confirmar si se elimina el elemento o se cancela
   * Regresa: N/A
   * Descripcion: N/A
   */
  public confirmDeleteElement():void {

    this.loader.showLoader();

    this.heroService.service_general_delete(`PerkPromotions/${ this.promo_to_delete.id }`)
        .subscribe( (response: any) => {

          if( response.result == 'Success' ) {

            this.GetPromotions();
            this.showModal();
            this.loader.hideLoader();
            this.system_message.showMessage({
              kind: 'ok',
              message: {
                header: 'Promotion deleted',
                text: 'Promotion has been deleted successfully.'
              },
              time: 2000
            });

          }

        }, (error: any) => {

          this.system_message.showMessage({
            kind: 'error',
            message: {
              header: 'System Error',
              text: 'Error WS => Deleted promo'
            },
            time: 2000
          });

        });

  }

  public form_data: any = {
    no_name: false,
    no_desc: false,
    no_sdat: false,
    no_edat: false,
    no_phot: false
  }
  public validatingFieldsFrom( data_promo: DataPromotion ):boolean { 

    let result = false;

    data_promo.name == null || data_promo.name == '' ?
      this.form_data.no_name = true : this.form_data.no_name = false; 

    data_promo.description == null || data_promo.description == '' ?
      this.form_data.no_desc = true : this.form_data.no_desc = false;

    data_promo.startDate == null || data_promo.startDate == '' ?
      this.form_data.no_sdat = true : this.form_data.no_sdat = false;

    data_promo.endDate == null || data_promo.endDate == '' ?
      this.form_data.no_edat = true : this.form_data.no_edat = false;

    data_promo.photo == '../../../../assets/14.jpg' ? 
      this.form_data.no_phot = true : this.form_data.no_phot = false;

    for( let field in this.form_data ) {

      if( this.form_data[field] ) return;
      else result = true;

    }

    return result;

  }

  public resetPromotionValidator():void {

    this.form_data.no_name = false;
    this.form_data.no_desc = false;
    this.form_data.no_sdat = false;
    this.form_data.no_edat = false;
    this.form_data.no_phot = false;

  }

  /*
   * Autor: Carlos Hernandez Hernandez
   * Contacto: carlos.hernandez@minimalist.com
   * Nombre: validateImageUpload
   * Tipo: Funcion | Funcion efecto colateral
   * Visto en: communities, amenities, services, perks, perks detail
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
                        root_data.prepareImages( event_data );
                        id_image_container.classList.remove('no-image');

                      } else {

                        name_image_container.innerHTML = `
                          <span class="color-red">Image size must be <br /><span class="text-bold">${ dimensions_image }</span></span>`;
                        id_image_container.classList.add('no-image');

                      }
                      
                    });

            }

            reader.readAsDataURL( event.files[0] );

    }
    
  }

  public changeLevel( times:number = 0 ):void {

    window.history.back();

  }

  public validatingDateRange():void {

    const new_promo_end: any = document.getElementById('new_promo_end'),
          new_promo_start: any = document.getElementById('new_promo_start');

    if( new_promo_start.value == null || new_promo_start.value == '' ) {

      new_promo_end.value = "";
      new_promo_end.setAttribute('disabled', 'true');

    } else {

      new_promo_end.removeAttribute('disabled');
      new_promo_end.setAttribute('min', new_promo_start.value);
      new_promo_start.setAttribute('max', new_promo_end.value);

    }
    
  }

  public dateWorker(date_to_work:string, action:string = 'default'):string {

    let result:string = '';

    switch( action ) {

      case'default':
        break;

      case 'remove_time':
        let working = date_to_work.split('T');
            result = working[0];
        break;

    }

    return result;

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
            this.data_promo.photo = url;  
            this.newImages = [];
          }
        })
      }
    }
  }


}

class DataPromotion {
  id: number;
  name: string = '';
  description: string = '';
  startDate: string = '';
  endDate: string = '';
  photo: string = '';
  perkGuideId: any;
}