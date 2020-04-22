import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../_nav';
import { Router } from '@angular/router';



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

  constructor(
    private menuService:MenuService,
    private router:Router
  ) {
    this.changes = new MutationObserver((mutations) => {
      this.sidebarMinimized = document.body.classList.contains('sidebar-minimized');
    });
   
    this.changes.observe(<Element>this.element, {
      attributes: true
    });

    if (localStorage.getItem("SystemTypeId") == undefined ) { return; }
    let systemTypeId = parseInt(localStorage.getItem("SystemTypeId"));        
    // console.log("AppLayout-SystemTypeId: "+systemTypeId);  
    this.navSections = this.menuService.CreateNavSections(systemTypeId);

    let last_section = sessionStorage.getItem('lastSectionId');

    if( last_section != null || last_section != undefined  ) {

      this.navItems = this.menuService.CreateMenu(Number( last_section ));
      this.selectedSection = Number( last_section );

    } else {

      this.navItems = this.menuService.CreateMenu(this.navSections[0].id);
      this.selectedSection = this.navSections[0].id;

    }

  }
  
  GoSection (section : { id:number, name:string, url:string}) { 
    // console.log(section);
    this.router.navigate([section.url]);
    this.navItems = this.menuService.CreateMenu(section.id);
    this.selectedSection = section.id;
    sessionStorage.setItem('lastSectionId', this.selectedSection.toString() );
  }

  salir(): void {
    localStorage.clear();
    window.location.href = "/#/login";    
  }
}
