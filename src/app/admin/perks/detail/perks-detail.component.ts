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
  
  private GetPromotions () {
    let params = { perkGuideId: this.perkId };
    this.heroService.service_general_get_with_params("PerkPromotions/GetPerkPromotions", params).subscribe(
      (res)=> {
        if(res.result === "Success"){                              
          this.promotionsArray = res.item;  
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
}
