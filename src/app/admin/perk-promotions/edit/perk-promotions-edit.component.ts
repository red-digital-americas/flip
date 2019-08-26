import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatosService } from '../../../../datos.service';
import { ToasterService, ToasterConfig } from 'angular2-toaster';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { PerksGuide, PerksCategory, PerkPromotion } from '../../models/Perks';
import { Utils } from '../../../utils/utils';
import * as moment from 'moment';

@Component({
  selector: 'app-perks-promotions-edit',
  templateUrl: './perk-promotions-edit.component.html',
  styleUrls: ['./perk-promotions-edit.component.scss'],
  providers: [ToasterService]
})
export class PerksPromotionEditComponent implements OnInit {
  
  IDUSR: string = "0";  
  public user: string[]; 
  private promotionId:number;    // Params from route    
  
  ////////////////////////////////////////////////////////
  // Form
  public minDate:Date = new Date();
  formGroup: FormGroup;  
  promotionModel:PerkPromotion = new PerkPromotion();

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
      this.promotionId = this.route.snapshot.params['id'];                  
    }

    this.formGroup = this._formBuilder.group({
      promotionNameCtrl: [, Validators.required],
      promotionDescriptionCtrl: [],
      promotionStartDateCtrl: [],
      promotionEndDateCtrl: [],
      promotionPhotoCtrl: this.AddGalleryFormGroup(),    
      promotionPerkGuideId: []
    });  
    
    this.GetPromotion();      
  } 

  public GetPromotion () {
    let params = { id: this.promotionId }    
    this.heroService.service_general_get_with_params("PerkPromotions/GetPromotions", params).subscribe(
      (res)=> {
        if(res.result === "Success"){                                  
            this.promotionModel.InstanceFromService(res.item[0]);                        
            this.promotionModel.ParseToForm(this.formGroup);
            // console.log(this.promotionModel);
            // console.log(this.formGroup.controls);
          return;
        } else if(res.result === "Error") { 
          console.log("Ocurrio un error" + res.detalle); 
          this.toasterService.pop('danger', 'Error', res.detalle);
        } 
        else { console.log("Error"); }
      }, (err)=> {console.log(err); this.toasterService.pop('danger', 'Error', 'Error');}
    );        
  }

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// FORM
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////     
  public UpdatePromotion () {
    this.promotionModel.ParseFromForm(this.formGroup.value);   
    // console.log(this.promotionModel);return;

    this.heroService.service_general_put("PerkPromotions/EditPromotion", this.promotionModel).subscribe(
      (res)=> {
        if(res.result === "Success"){                                
          // this.toasterService.pop('success', 'Success ', 'Promotion updated correctly.');   
          this.router.navigate(['perk-promotions-detail/', this.promotionId]);
          return;
        } else if(res.result === "Error") { 
          console.log("Ocurrio un error" + res.detalle); 
          this.toasterService.pop('danger', 'Error', res.detalle);
        } 
        else { console.log("Error"); }
      }, (err)=> {console.log(err); this.toasterService.pop('danger', 'Error', 'Error');}
    );        
  }

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// GALLERYCTRLARRAY
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////      
  private AddGalleryFormGroup () {    
    return this._formBuilder.group({
      labelCtrl: ['Choosed file'],
      photoCtrl: [],  
      serverUrlCtrl: []
    });    
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
}
