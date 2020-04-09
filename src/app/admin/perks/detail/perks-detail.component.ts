import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatosService } from '../../../../datos.service';
import { ToasterService, ToasterConfig } from 'angular2-toaster';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { PerksGuide, PerksCategory, PerkPromotion } from '../../models/Perks';
import { Utils } from '../../../utils/utils';

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
  public toggleSectionForm( action_kind:string = 'hide', editable:any = {} ):void {

    switch( action_kind ) {

      case 'new':
        this.show_dperk_form = true;
        this.show_dperk_form_action = 'Añadir Promoción';
        break;

      case 'edit':
        this.show_dperk_form = true;
        this.show_dperk_form_action = 'Editar Promoción';
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

  public changeLevel( times:number = 0 ):void {

    window.history.back();

  }


}
