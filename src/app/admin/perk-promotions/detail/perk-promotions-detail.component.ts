import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatosService } from '../../../../datos.service';
import { ToasterService, ToasterConfig } from 'angular2-toaster';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { PerksGuide, PerksCategory, PerkPromotion } from '../../models/Perks';


@Component({
  selector: 'app-perks-promotions-detail',
  templateUrl: './perk-promotions-detail.component.html',
  styleUrls: ['./perk-promotions-detail.component.scss'],
  providers: [ToasterService]
})
export class PerksPromotionDetailComponent implements OnInit {
  
  IDUSR: string = "0";  
  public user: string[]; 
  private promotionId:number;    // Params from route    
    
  promotionDetail:PerkPromotion = new PerkPromotion();

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
      this.GetPromotion();            
    }   
  } 

  public GetPromotion () {
    let params = { id: this.promotionId }    
    this.heroService.service_general_get_with_params("PerkPromotions/GetPromotions", params).subscribe(
      (res)=> {
        if(res.result === "Success"){                                          
          this.promotionDetail = res.item[0];
          console.log(this.promotionDetail);
          return;
        } else if(res.result === "Error") { 
          console.log("Ocurrio un error" + res.detalle); 
          this.toasterService.pop('danger', 'Error', res.detalle);
        } 
        else { console.log("Error"); }
      }, (err)=> {console.log(err); this.toasterService.pop('danger', 'Error', 'Error');}
    );        
  }

  public EditPromotion () {
    this.router.navigate(['perk-promotions-edit', this.promotionDetail.id]);
  }

  public DeletePromotion(){
    let perkId = this.promotionDetail.perkGuideId;
    this.heroService.service_general_delete(`PerkPromotions/${this.promotionDetail.id}`).subscribe(
      (res)=> {
        if(res.result === "Success"){      
            this.router.navigate(['perk-detail', perkId]); return;
        } else if(res.result === "Error") { 
          console.log("Ocurrio un error" + res.detalle); 
          this.toasterService.pop('danger', 'Error', res.detalle);
        } 
        else { console.log("Error"); }
      }, (err)=> {console.log(err); this.toasterService.pop('danger', 'Error', "Error");}
    );  
  }
}
