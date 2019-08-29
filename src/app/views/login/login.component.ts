import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { getStyle, hexToRgba } from '@coreui/coreui-pro/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { navItems } from './../../_nav';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DatosService } from '../../../datos.service';
import { HttpModule } from '@angular/http';
import { ToasterService, ToasterConfig } from 'angular2-toaster';


@Component({
  selector: 'app-dashboard',
    templateUrl: 'login.component.html',
    styleUrls: ['../../../scss/vendors/toastr/toastr.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [ToasterService]
})
export class LoginComponent implements OnInit {
  constructor(
    private http: HttpModule,
    private heroService: DatosService,
    toasterService: ToasterService) {
    this.toasterService = toasterService;
  }

  
  ngOnInit() {
  }

  error = null;

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
    this.toasterService.pop('success', 'Success ', 'You will be redirected ');
    window.location.href = "/#/communities";
  }

  showError() {
    this.toasterService.pop('error', 'Error ', 'Your User or Password are incorrect ');
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



  public Login() {    
    var creadoobj = { username: this.email, password: this.password };
    this.heroService.ServicioPostLogin("CargarUsuario", creadoobj).subscribe((value) => {
      switch (value.token) {
        case "usuarios no existe":
          this.message = "Usuario y/o contraseña incorrecta";
          this.validar = true;
          this.showError();
          break;
        case "password incorrecto":
          this.message = "Usuario y/o contraseña incorrecta";
          this.validar = true;
          this.showError();
          break;
        default:
          if (value.token != "usuarios no existe" || value.token != "password incorrecto") {
            localStorage.setItem("token", value.token);
            localStorage.setItem("user", JSON.stringify((value.user)));
            localStorage.setItem("inicial", value.user.name.substring(0, 1));
            localStorage.setItem("name", value.user.name);
            localStorage.setItem("lastName", value.user.lastName);
            localStorage.setItem("email", value.user.email);
            localStorage.setItem("id", value.user.id);
            localStorage.setItem("buildingid", value.user.buildingId);
            localStorage.setItem("SystemTypeId", value.user.systemTypeId);
            this.showSuccess(); 
          

          }


      }
    });


  }
  public recoverpass() {
    window.location.href = "/#/recoverpass";

  }
}

