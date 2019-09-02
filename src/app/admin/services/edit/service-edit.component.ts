import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatosService } from '../../../../datos.service';
import { ToasterService, ToasterConfig } from 'angular2-toaster';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Service, ServicesFormGroup, ServicesFormGroupInitialValues } from '../../models/Services';
import { Utils } from '../../../utils/utils';

@Component({
  selector: 'app-service-edit',
  templateUrl: './service-edit.component.html',
  styleUrls: ['./service-edit.component.scss'],
  providers: [ToasterService]
})
export class ServiceEditComponent implements OnInit {
  
  IDUSR: string = "0";    
  public user: string[]; 
  private serviceId:number;
  
  serviceDetail:Service = new Service();
  
  ////////////////////////////////////////////////////////
  // Form
  formGroup: FormGroup;    
  // serviceModel:Service = new Service();

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
      this.serviceId = this.route.snapshot.params['id'];                  
    }

    this.formGroup = ServicesFormGroup;    
    this.ResetForm();
    this.GetService();
  } 

  private GetService() {
    let params = { id: this.serviceId};
    this.heroService.service_general_get_with_params("Services", params).subscribe(
      (res)=> {
        if(res.result === "Success"){                              
          
          this.serviceDetail.InstanceFromService(res.item[0]);
          this.serviceDetail.ParseToForm(this.formGroup);
          // console.log(this.serviceDetail);
        } else if(res.result === "Error") { console.log("Ocurrio un error" + res.detalle); } 
        else { console.log("Error"); }
      }, (err)=> {console.log(err);}
    );
  }  

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// FORM
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////     
  public UpdateService () {
    this.serviceDetail.ParseFromForm(this.formGroup.value);   
    // console.log(this.serviceDetail);return;

    this.heroService.service_general_put("Services", this.serviceDetail).subscribe(
      (res)=> {
        if(res.result === "Success"){    
          this.ResetForm();  
          this.router.navigate(['services', this.serviceDetail.buildingId])
          this.toasterService.pop('success', 'Success ', 'Service created correctly.');                                     
        } else if(res.result === "Error") { 
          console.log("Ocurrio un error" + res.detalle); 
          this.toasterService.pop('danger', 'Error', res.detalle);
        } 
        else { console.log("Error"); }
      }, (err)=> {console.log(err); this.toasterService.pop('danger', 'Error', 'Error');}
    );        
  }  

  private ResetForm() {               
    this.formGroup.reset(ServicesFormGroupInitialValues);    
  }

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// LOAD IMAGES
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////  
  prepareImages(e, formControl) {     
    let file = e.srcElement.files[0];    
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
}