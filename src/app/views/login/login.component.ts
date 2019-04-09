import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getStyle, hexToRgba } from '@coreui/coreui-pro/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { navItems } from './../../_nav';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DatosService } from '../../../datos.service';
import { HttpModule } from '@angular/http';




@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {
  constructor(private http: HttpModule,
    private heroService: DatosService,) { }



  ngOnInit() {
  }


  email: string;
  password: string;
  token: boolean;
  message: {};
  validar: boolean = false;


  public Login() {
    debugger; 
    var creadoobj = { username: this.email, password: this.password };
    this.heroService.ServicioPostLogin("CargarUsuario", creadoobj).subscribe((value) => {
      switch (value.token) {
        case "usuarios no existe":
          this.message = "Usuario y/o contraseña incorrecta";
          this.validar = true;
          break;
        case "password incorrecto":
          this.message = "Usuario y/o contraseña incorrecta";
          this.validar = true;
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
            localStorage.setItem("SystemTypeId", value.user.SystemTypeId);
            window.location.href = "/#/communities";

          }


      }
    });


  }
}

