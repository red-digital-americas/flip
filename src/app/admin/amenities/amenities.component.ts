import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatosService } from '../../../datos.service';
import { Utils } from '../../utils/utils';
import { ToasterService, ToasterConfig } from 'angular2-toaster';

@Component({
  selector: 'app-amenities',
  templateUrl: './amenities.component.html',
  styleUrls: ['./amenities.component.scss'],
  providers: [ToasterService]
})

export class AmenitiesComponent implements OnInit {
  
  posts: any[];
  email: string;
  password: string;
  token: boolean;
  message: {};
  validar: boolean = false;
  idpost: any;
  IDUSR: string = "0";
  IDBUILD: string = "0";
  PostId: number ;
  posttext: string = "";
  posttitle: string = "";
  public user: string[];

  postphoto: string = "assets/img/Coliving.jpg";
  comment: string = "";
  public newImages: any[] = [];


  amenitiesArray = [];

  public toasterconfig: ToasterConfig = new ToasterConfig({
      tapToDismiss: true,
      timeout: 3000,
      positionClass: "toast-top-center",
  });

  constructor(  private router: Router, private heroService: DatosService, private route: ActivatedRoute,
                private toasterService: ToasterService
  ) { }

  ngOnInit() {
    if (localStorage.getItem("user") == undefined) {
      this.router.navigate(['/login']);
    }
    else {
      this.user = JSON.parse(localStorage.getItem("user"));
      console.log(this.user);
      this.IDUSR = JSON.parse(localStorage.getItem("user")).id;
      this.IDBUILD = this.route.snapshot.params['id']; 
      this.GetAmenities();        
    }
  }  

  showSuccess() { this.toasterService.pop('success', 'Success ', 'Your post was published correctly '); }  

  GetAmenities() {   
    var params = { idBuilding: this.route.snapshot.params['id'] };       
    this.heroService.service_general_get_with_params("Amenity", params).subscribe(
      (res)=> {
        if(res.result === "Success"){          
          // console.log(res.item);
          this.amenitiesArray = res.item;         
        } else if(res.result === "Error") {
          console.log("Ocurrio un error" + res.detalle);
        } else {
          console.log("Error");
        }
      },
      (err)=> {console.log(err);}
    );        
  }

  AddAmenity() {    
    var params = {
      "Name": "aaa",
      "Description": "description lorem",
      "BuildingId": this.route.snapshot.params['id'],
      "Photo": "ruta"
    }
    this.heroService.service_general_post("Amenity", params).subscribe(
      (res)=> {
        if(res.result === "Success"){          
          // console.log(res.item);
          this.toasterService.pop('success', 'Success ', 'Your amenity was created correctly.');   
          this.GetAmenities();
        } else if(res.result === "Error") {
          console.log("Ocurrio un error" + res.detalle);
          this.toasterService.pop('danger', 'Error ', 'An error has been ocurred.');
        } else {
          console.log("Error");
          this.toasterService.pop('danger', 'Error ', 'An error has been ocurred.');
        }
      },
      (err)=> {console.log(err);}
    );  
  }

  prepareImages(e) {
    debugger; 
    if (Utils.isDefined(e.srcElement.files)) {
      for (let f of e.srcElement.files) {
        debugger;
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
            debugger;
            url = url.replace('/Imagenes', this.heroService.getURL() + 'Flip');
            debugger;
            this.postphoto = url;
            debugger;
            this.newImages = [];
          }
        })
      }
    }
  }


  EditAmenity(id: number) {this.router.navigate(['/editcomment/' + id])}

  DeleteAmenity(id: number) {        
    this.heroService.service_general_delete(`Amenity/${id}`).subscribe(
      (res)=> {
        this.toasterService.pop('success', 'Success ', 'Your amenity was deleted correctly.');    
        this.GetAmenities();    
      },
      (err)=> {      
        this.toasterService.pop('danger', 'Error ', 'An error has been ocurred.');
      }
    ); 
  }

}
