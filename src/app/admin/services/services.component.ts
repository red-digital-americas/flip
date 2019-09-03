import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatosService } from '../../../datos.service';
import { ToasterService, ToasterConfig } from 'angular2-toaster';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { PerksGuide, PerksCategory } from '../models/Perks';
import { Utils } from '../../utils/utils';
import { Service, ServicesFormGroup, ServicesFormGroupInitialValues } from '../models/Services';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss'],
  providers: [ToasterService]
})
export class ServicesComponent implements OnInit {
  
  IDUSR: string = "0";
  IDBUILD: string = "0";  
  public user: string[]; 

  servicesArray:Service[] = [];
  
  ////////////////////////////////////////////////////////
  // Form
  formGroup: FormGroup;    
  serviceModel:Service = new Service();

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

    this.formGroup = ServicesFormGroup;
    this.ResetForm();
    this.formGroup.controls.buildingIdCtrl.setValue(this.IDBUILD);
    this.GetServices();
  } 


  private GetServices() {
    let params = { buildingId: this.IDBUILD};
    this.heroService.service_general_get_with_params("Services", params).subscribe(
      (res)=> {
        if(res.result === "Success"){                              
          this.servicesArray = res.item;  
          console.log(this.servicesArray);
        } else if(res.result === "Error") { console.log("Ocurrio un error" + res.detalle); } 
        else { console.log("Error"); }
      }, (err)=> {console.log(err);}
    );
  }  

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// FORM
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////     
  public AddService () {
    this.serviceModel.ParseFromForm(this.formGroup.value);   
    // console.log(this.serviceModel);return;

    this.heroService.service_general_post("Services", this.serviceModel).subscribe(
      (res)=> {
        if(res.result === "Success"){      
          this.GetServices();      
          this.ResetForm();     
          this.toasterService.pop('success', 'Success ', 'Service created correctly.');                                     
        } else if(res.result === "Error") { 
          console.log("Ocurrio un error" + res.detalle); 
          this.toasterService.pop('danger', 'Error', res.detalle);
        } 
        else { console.log("Error"); }
      }, (err)=> {console.log(err); this.toasterService.pop('danger', 'Error', 'Error');}
    );        
  }

  public EditService (id:number) {    
    this.router.navigate(['service-edit', id])
  }

  public DeleteService (id:number) {        
    this.heroService.service_general_delete(`Services/${id}`).subscribe(
      (res)=> {
        if(res.result === "Success"){      
          this.GetServices();         
          this.toasterService.pop('success', 'Success ', 'Service deleted correctly.');
        } else if(res.result === "Error") { 
          console.log("Ocurrio un error" + res.detalle); 
          this.toasterService.pop('danger', 'Error', res.detalle);
        } 
        else { console.log("Error"); }
      }, (err)=> {console.log(err); this.toasterService.pop('danger', 'Error', "Error");}
    );            
  }

  private ResetForm() {           
    this.serviceModel = new Service();     
    this.formGroup.reset(ServicesFormGroupInitialValues);
    // this.formGroup.patchValue(ServicesFormGroupInitialValues);
    this.formGroup.controls.buildingIdCtrl.setValue(this.IDBUILD);
  }

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// LOAD IMAGES
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////  
  prepareImages(e, formControl) {     
    let file:File = e.srcElement.files[0];     
    if (file == undefined || file == null) { return; }            
    formControl.label.setValue(file.name);        
    this.heroService.UploadImgSuc(file).subscribe((r) => {
      if (Utils.isDefined(r)) {
        let url = <string>r.message;            
        url = url.replace('/Imagenes', this.heroService.getURL() + 'Flip'); 
        // url = "http://23.253.173.64:8088/PhotoPost/53481cbd-d5c4-479e-97c3-57e7938871c6.jpg";
        formControl.serverUrl.setValue(url);  
      }
    })        
  } 

  prepareIcon (e, formControl) {    
    let file:File = e.srcElement.files[0];     
    if (file == undefined || file == null) { return; }               

    let fr = new FileReader;
    fr.onload = () => {
      let img:any = new Image();
      img.onload = () => {                  
          if (img.width > 64 && img.height > 64) { return; }
          formControl.label.setValue(file.name);        
          this.heroService.UploadImgSuc(file).subscribe((r) => {
            if (Utils.isDefined(r)) {
              let url = <string>r.message;            
              url = url.replace('/Imagenes', this.heroService.getURL() + 'Flip'); 
              // url = "/assets/Assets-prototype-flipApp/gym.svg";
              formControl.serverUrl.setValue(url);  
            }
          }) 
      }      
      img.src = fr.result;
    }    

    fr.readAsDataURL(file);    
  }
}