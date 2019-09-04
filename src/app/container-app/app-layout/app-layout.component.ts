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
    // systemTypeId = 0;
    console.log("AppLayout-SystemTypeId: "+systemTypeId);  
    this.navSections = this.menuService.CreateNavSections(systemTypeId);    
    this.navItems = this.menuService.CreateMenu(this.navSections[0].id);
  }
  
  GoSection (section : { id:number, name:string, url:string}) { 
    console.log(section);
    this.router.navigate([section.url]);
    this.navItems = this.menuService.CreateMenu(section.id);
  }

  salir(): void {
    localStorage.clear();
    window.location.href = "/login";    
  }
}
