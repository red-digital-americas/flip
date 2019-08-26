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
          this.perksArray = res.item;  
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
  private get perkGalleryCrtlArray() {
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
        url = "http://23.253.173.64:8088/PhotoPost/53481cbd-d5c4-479e-97c3-57e7938871c6.jpg";
        formControl.serverUrlCtrl.setValue(url);  
      }
    })        
  } 
}
