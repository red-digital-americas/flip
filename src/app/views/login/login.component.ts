import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { getStyle, hexToRgba } from '@coreui/coreui-pro/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
// import { navItems } from './../../_nav';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DatosService } from '../../../datos.service';
import { HttpModule } from '@angular/http';
import { ToasterService, ToasterConfig } from 'angular2-toaster';
import { MenuService } from '../../_nav';
import { SystemMessage } from '../../../ts/systemMessage';
import { LoaderComponent } from '../../../ts/loader';


@Component({
  selector: 'app-dashboard',
    templateUrl: 'login.component.html',
    styleUrls: ['../../../scss/vendors/toastr/toastr.scss','./login.component.scss'],
    encapsulation: ViewEncapsulation.None,
    providers: [ToasterService]
})
export class LoginComponent implements OnInit {
  constructor(
    private http: HttpModule,
    private heroService: DatosService,
    toasterService: ToasterService,
    private menuService:MenuService
  ) {
    this.toasterService = toasterService;
  }

  
  ngOnInit() {
    //Reset session
    sessionStorage.removeItem('lastSectionId');
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
    //this.toasterService.pop('success', 'Success ', 'You will be redirected ');        
    window.location.href = "/#"+this.menuService.GetFirstURLSection(parseInt(localStorage.getItem("SystemTypeId"))); // partial redirection
    // window.location.href = "/communities"; // full redirection (loading again page)
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







  
  //Autor: Carlos Enrique Hernandez Hernandez

  public system_message = new SystemMessage();
  public loader = new LoaderComponent();

  public login_action: boolean = true;
  public recoverPassword():void {

    this.login_action ? this.login_action = false : this.login_action = true; 

  }

  public pass_data: PassData = new PassData();
  public recoverPasswordAction(): void {

    if( this.passwordValidator( this.pass_data ) ) {

      this.heroService.ServicioPostRecoverPass("RecoverPassword", this.pass_data)
          .subscribe( (response: any) => { console.log( response );

            if( response.success ) {

              this.system_message.showMessage({
                kind: 'ok',
                message: {
                  header: 'Recover Pass',
                  text: `We will send you an email for next spets.`
                },
                time: 4000
              });  
              this.showSuccess(); 

            } else {

              this.system_message.showMessage({
                kind: 'error',
                message: {
                  header: 'Error recovering password',
                  text: `${ response.result }`
                },
                time: 2000
              });  

            }

          }, (error: any) => {

            this.system_message.showMessage({
              kind: 'error',
              message: {
                header: 'System Error',
                text: `Error WS => RecoverPassword`
              },
              time: 2000
            });  

          });

      console.log(this.pass_data);

    }

  }

  public user_data: UserData = new UserData();
  public loginEvent():void {

    if( this.validatorForm( this.user_data ) ) {

      this.loader.showLoader();

      this.heroService.ServicioPostLogin("CargarUsuario", this.user_data ).subscribe((value) => {
        console.log('Value => ', value);
        switch (value.token) {
          case "usuarios no existe":

            this.system_message.showMessage({
              kind: 'error',
              message: {
                header: 'Error',
                text: value.token
              },
              time: 2000
            });
            setTimeout( () => this.loader.hideLoader(), 1777);
            this.message = "Usuario y/o contraseña incorrecta";
            this.validar = true;
            break;
          case "password incorrecto":

            this.system_message.showMessage({
              kind: 'error',
              message: {
                header: 'Error',
                text: value.token
              },
              time: 4000
            });

            setTimeout( () => this.loader.hideLoader(), 1777);

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
              localStorage.setItem("SystemTypeId", value.user.systemTypeId);
              setTimeout( () => this.loader.hideLoader(), 1777);
              this.system_message.showMessage({
                kind: 'ok',
                message: {
                  header: 'Session Begins',
                  text: `¡Welcome back! ${ localStorage.getItem("name") } ${ localStorage.getItem("lastName") }`
                },
                time: 2000
              });  ;
              this.showSuccess();       
            }
        }
      

      }, (error: any) => {

        this.system_message.showMessage({
          kind: 'error',
          message: {
            header: 'Error',
            text: `Please come back soon or contact support`
          },
          time: 2000
        });  

        this.loader.hideLoader();

      });

    }

  }



  public form_data: any = {
    no_user: false,
    no_pass: false,
    no_val_mail: false
  }
  private validatorForm( current_data ):boolean {

    let result = false;

    current_data.username == null || current_data.username == '' ?
      this.form_data.no_user = true : this.form_data.no_user = false; 

    !this.isEmailValid( current_data.username ) ? 
      this.form_data.no_val_mail = true : this.form_data.no_val_mail = false;

    current_data.password == null || current_data.password == '' ?
      this.form_data.no_pass = true : this.form_data.no_pass = false;

    for( let field in this.form_data ) {

      if( this.form_data[field] ) return;
      else result = true;

    }

    return result;

  }

  public form_pass: any = {
    no_emai: false,
    no_val_mail: false
  }
  public passwordValidator( form_pass: PassData ):boolean {

    let result = false;

    form_pass.username == '' || form_pass.username == null ?
      this.form_pass.no_emai = true : this.form_pass.no_emai = false;

    !this.isEmailValid( form_pass.username ) ? 
      this.form_pass.no_val_mail = true : this.form_pass.no_val_mail = false;

    for( let field in this.form_pass ) {

      if( this.form_pass[field] ) return;
      else result = true;

    }

    return result;

  }


  public isEmailValid( email: string ): boolean {

    let result = false;

    const email_split = email.split('@'); 

    if( email_split.length > 1 ) {

      const email_nick_nosp = email_split[0].match(/[^a-zA-Z0-9.\-_]/),
            email_doma_nosp = email_split[1].match(/[^a-zA-Z0-9.]/);

      if( email_nick_nosp == null && email_doma_nosp == null ) {

        result = true;
  
      } else {
  
        result = false;
  
      }

    } else result = false;

    return result;

  }

}

class UserData {
  username: string = "";
  password: string = "";
}

class PassData {
  username: string = "";
}

