import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../_nav';
import { Router } from '@angular/router';
import { DatosService } from '../../../datos.service';
import { ConsoleService } from '@ng-select/ng-select/ng-select/console.service';
import { interval, Subscription  } from 'rxjs';
import { SystemMessage } from '../../../ts/systemMessage';
import { BsModalService } from 'ngx-bootstrap/modal';
@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
})
export class AppLayoutComponent {
  public navItems;
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement = document.body;
  subscription: Subscription;
  public selectedSection:number;
  public navSections = []
  public dataUser;
  public userId;
  public systemTypeId = 0;
  constructor(
    private menuService: MenuService,
    private router: Router,
    public services: DatosService
  ) {
    this.changes = new MutationObserver((mutations) => {
      this.sidebarMinimized = document.body.classList.contains('sidebar-minimized');
    });

    this.changes.observe(<Element>this.element, {
      attributes: true
    });
    this.dataUser = JSON.parse(localStorage.getItem('user')).avatar;
    this.userId = JSON.parse(localStorage.getItem('user')).id;
    this.getActions(this.userId);
    const source = interval(60000);
    this.subscription = source.subscribe(val => this.getActions(this.userId));
    ////console.log(this.dataUser);
    if (localStorage.getItem("SystemTypeId") == undefined ) { return; }
    this.systemTypeId = parseInt(localStorage.getItem("SystemTypeId"));        
    // //console.log("AppLayout-SystemTypeId: "+systemTypeId);  
    this.navSections = this.menuService.CreateNavSections(this.systemTypeId);
    //console.log(this.navSections);
    let last_section = sessionStorage.getItem('lastSectionId');

    if( last_section != null || last_section != undefined  ) {

      this.navItems = this.menuService.CreateMenu(Number( last_section ));
      this.selectedSection = Number( last_section );

    } else {

      this.navItems = this.menuService.CreateMenu(this.navSections[0].id);
      this.selectedSection = this.navSections[0].id;

    }

  }

  actions;
  actionsCount = 0;
  alerts;
  alertsCount = 0;
  messages;
  messagesCount = 0;
  public system_message:SystemMessage = new SystemMessage();
  getActions(id: any) {
    let obj = { userId: id };
    this.services.service_general_get_with_params('UsersAdmin/GetAlerts', obj).subscribe((value) => {
      //console.log('ACTIONS', value);
      
      this.actions = value.actions;
      this.actionsCount = value.actions.length;

      this.alerts = value.alerts;
      this.alertsCount = value.alerts.length;
      if (value.alerts != null) {
        value.alerts.forEach(element => {
          if (element.showNow) {
            this.system_message.showMessage({
              kind: 'ok',
              time: 4777,
              message: {
                header: 'Nueva alerta',
                text: element.message
              }
            });
          }
        });
        
      }

      this.messages = value.messages;
      this.messagesCount = value.messages.length;
    })
  }
  GoSection (section : { id:number, name:string, url:string}) { 
    // //console.log(section);
    this.router.navigate([section.url]);
    this.navItems = this.menuService.CreateMenu(section.id);
    this.selectedSection = section.id;
    sessionStorage.setItem('lastSectionId', this.selectedSection.toString() );
    this.addPaddingWidthJS()
  }

  salir(): void {
    localStorage.clear();
    window.location.href = "/#/login";    
  }

  goMessage(element: any) {
    //console.log(element);
    sessionStorage.setItem('id_section_active', element.buildingId.toString() );
    sessionStorage.setItem('name_section_active', element.buildingName );
    sessionStorage.setItem('name_build', element.buildingName );
    localStorage.setItem('conversationId', JSON.stringify(element));
    this.router.navigateByUrl( `messages/${ element.buildingId }`, { state: { id: 1, name: 'UserList To Users-Detail' } });
  }

  goNotifications(element: any) {
    sessionStorage.setItem('id_section_active', element.buildingId.toString() );
    sessionStorage.setItem('name_section_active', element.buildingName );
    sessionStorage.setItem('name_build', element.buildingName );
    this.router.navigateByUrl( `alerts/${ element.buildingId }`, { state: { id: 1, name: 'UserList To Users-Detail' } });
  }

  goActions(element: any) {
    //console.log(element);
    sessionStorage.setItem('id_section_active', element.buildingId.toString() );
    sessionStorage.setItem('name_section_active', element.name );
    sessionStorage.setItem('name_build', element.name );
    sessionStorage.setItem('user_id', element.idUser.toString() );
    sessionStorage.setItem('booking_id', element.id);
    //console.log('Current URL', this.router.url);
    if (this.router.url === '/reservations') {
      window.location.reload();
    } else {
      this.router.navigateByUrl( 'reservations' );
    }
  }

  goToProfile(path) {
    this.router.navigateByUrl( `Users-Detail/${ path }`, { state: { id: 1, name: 'UserList To Users-Detail' } });
  }

  public addPaddingWidthJS():void {

    const find_sangrias: any = document.getElementsByClassName('sangria'),
          reduce: any = document.getElementsByClassName('reduce');

    setTimeout( () => {
      find_sangrias.forEach( (option: any) => { (function(){
          const root = option.parentElement;
          (function(){ root.style.paddingLeft = '10px' }())
        }());
      });
      reduce.forEach( (option: any) => { (function(){
        const root = option.parentElement;
        (function(){ root.click() }())
      }());
    });
    }, 77);

  }

  ngOnInit() {

    this.addPaddingWidthJS();
    
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
