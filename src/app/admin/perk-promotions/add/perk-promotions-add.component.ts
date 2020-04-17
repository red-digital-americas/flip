import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatosService } from '../../../../datos.service';
import { ToasterService, ToasterConfig } from 'angular2-toaster';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { PerksGuide, PerksCategory, PerkPromotion } from '../../models/Perks';
import { Utils } from '../../../utils/utils';
import * as moment from 'moment';

@Component({
  selector: 'app-perks-promotions-add',
  templateUrl: './perk-promotions-add.component.html',
  styleUrls: ['./perk-promotions-add.component.scss'],
  providers: [ToasterService]
})
export class PerksPromotionAddComponent implements OnInit {
  
  IDUSR: string = "0";  
  public user: string[]; 
  private perkId:number;    // Params from route    
  
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
      this.perkId = this.route.snapshot.params['id'];                  
    }

    this.formGroup = this._formBuilder.group({
      promotionNameCtrl: [, Validators.required],
      promotionDescriptionCtrl: [''],
      promotionStartDateCtrl: [new Date()],
      promotionEndDateCtrl: [moment().add(1, 'day').toDate()],
      promotionPhotoCtrl: this.AddGalleryFormGroup(),    
      promotionPerkGuideId: [this.perkId]
    });    
  } 

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// FORM
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////     
  public AddPerk () {
    this.promotionModel.ParseFromForm(this.formGroup.value);   
    // console.log(this.promotionModel);return;

    this.heroService.service_general_post("PerkPromotions/AddPromotion", this.promotionModel).subscribe(
      (res)=> { console.log('Tienes que mandar esto => ', this.promotionModel );
        if(res.result === "Success"){                                
          // this.toasterService.pop('success', 'Success ', 'Perk created correctly.');   
          this.router.navigate(['perk-detail', this.perkId]);
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
      labelCtrl: ['Choose file'],
      photoCtrl: [, Validators.required],  
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
