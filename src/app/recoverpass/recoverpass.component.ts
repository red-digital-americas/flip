import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { getStyle, hexToRgba } from '@coreui/coreui-pro/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { navItems } from './../_nav';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DatosService } from '../../datos.service';
import { HttpModule } from '@angular/http';
import { ToasterService, ToasterConfig } from 'angular2-toaster';

@Component({
  selector: 'app-dashboard',
  templateUrl: './recoverpass.component.html',
  styleUrls: ['../../scss/vendors/toastr/toastr.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [ToasterService]
})
  
export class RecoverpassComponent implements OnInit {

  constructor(private http: HttpModule,
    private heroService: DatosService,
    toasterService: ToasterService) {
    this.toasterService = toasterService;
  }



  ngOnInit() {
  }


  email: string;
  password: string;
  token: boolean;
  message: {};
  validar: boolean = false;


  private toasterService: ToasterService;

  public toasterconfig: ToasterConfig =
    new ToasterConfig({
      tapToDismiss: true,
      timeout: 3000,
      positionClass: "toast-top-center",
    });



  showSuccess() {
    this.toasterService.pop('success', 'Success ', 'Your new password its now in your email');
    window.location.href = "/#/login";
  }

  showError() {
    this.toasterService.pop('error', 'Error ', ' An unexpected error occurred');
  }

  showWarning() {
    this.toasterService.pop('warning', 'Warning Toaster', 'This is toaster description');
  }

  showInfo() {
    this.toasterService.pop('info', 'Info Toaster', 'This is toaster description');
  }

  showPrimary() {
    this.toasterService.pop('primary', 'Primary Toaster', 'This is toaster description');
  }


  public RecoverPass() {
    debugger;
    var creadoobj = { username: this.email };
    debugger;
    this.heroService.ServicioPostRecoverPass("RecoverPassword", creadoobj).subscribe((value) => {

      console.log(value);
      if (value.success == true ) {
        this.message = "Si este email existe en nuestro sistema, ya te enviamos una nueva contraseña";
        this.showSuccess(); 

      }
      else {
        debugger; 
        this.message = value.response;
        this.showError(); 
      }
    });


  }
  public gotologin() {
    window.location.href = "/login";

  }
}

