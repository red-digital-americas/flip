import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { DatosService } from '../../../../datos.service';
import { Utils } from '../../../utils/utils';
import { ToasterService, ToasterConfig } from 'angular2-toaster';


class AmenityRequestModel {
    public name: string = "";
    public description: string = "";  
    public photo: string = "assets/img/Coliving.jpg";  
    constructor() {}
}

@Component({
  selector: 'app-edit-amenities',
  templateUrl: './edit-amenities.component.html',
  styleUrls: ['./edit-amenities.component.scss'],
  providers: [ToasterService]
})
export class EditAmenitiesComponent implements OnInit {
  public toasterconfig: ToasterConfig = new ToasterConfig({ tapToDismiss: true, timeout: 3000, positionClass: "toast-top-center",});                    
  private idAmenity;  

  amenityRequestModel:AmenityRequestModel = new AmenityRequestModel();      
  public newImages: any[] = [];    

  constructor(  private router: Router, private heroService: DatosService, private route: ActivatedRoute,
                private toasterService: ToasterService
  ) { }

  ngOnInit() {
    if (localStorage.getItem("user") == undefined) {
      this.router.navigate(['/login']);
    }
    else {      
      this.idAmenity = this.route.snapshot.params['id'];
      this.GetAmenities();        
    }
  }    

  GetAmenities() {   
    var params = { id: this.route.snapshot.params['id'] };       
    this.heroService.service_general_get_with_params("Amenity", params).subscribe(
      (res)=> {
        if(res.result === "Success"){                    
          this.amenityRequestModel = res.item[0];              
        } else if(res.result === "Error") {
          console.log("Ocurrio un error" + res.detalle);          
        } else {
          console.log("Error");
        }
      },
      (err)=> {console.log(err);}
    );        
  }

  EditAmenity() {             
    this.heroService.service_general_put(`Amenity/${this.idAmenity}`, this.amenityRequestModel).subscribe(
      (res)=> {
        if(res.result === "Success"){                     
          this.router.navigate(['/amenities', res.item.buildingId]); 
        } else if(res.result === "Error") {
          console.log("Ocurrio un error" + res.detalle);
        } else {
          console.log("Error");
        }
      },
      (err)=> {console.log(err);}
    ); 
  }

  prepareImages(e) {    
    if (Utils.isDefined(e.srcElement.files)) {
      for (let f of e.srcElement.files) {        
        this.newImages.push(f);
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
            this.amenityRequestModel.photo = url;            
            this.newImages = [];
          }
        })
      }
    }
  }  

}
