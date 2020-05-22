import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../_nav';
import { Router } from '@angular/router';
import { DatosService } from '../../../datos.service';


@Component({
  selector: 'app-app-layout',
  templateUrl: './app-layout.component.html',
})
export class AppLayoutComponent {
  public navItems;
  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement = document.body;

  public selectedSection:number;
  public navSections = []
  public dataUser;
  public userId;
  constructor(
    private menuService: MenuService,
    private router: Router,
    public services: DatosService,
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
    console.log(this.dataUser);
    if (localStorage.getItem("SystemTypeId") == undefined ) { return; }
    let systemTypeId = parseInt(localStorage.getItem("SystemTypeId"));        
    // console.log("AppLayout-SystemTypeId: "+systemTypeId);  
    this.navSections = this.menuService.CreateNavSections(systemTypeId);
    console.log(this.navSections);
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
  getActions(id: any) {
    let obj = { userId: id };
    this.services.service_general_get_with_params('UsersAdmin/GetAlerts', obj).subscribe((value) => {
      console.log('ACTIONS', value);
      
      this.actions = value.actions;
      this.actionsCount = value.actions.length;

      this.alerts = value.alerts;
      this.alertsCount = value.alerts.length;

      this.messages = value.messages;
      this.messagesCount = value.messages.length;
    })
  }
  GoSection (section : { id:number, name:string, url:string}) { 
    // console.log(section);
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

}
