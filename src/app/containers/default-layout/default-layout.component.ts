import { Component, Input, OnInit } from '@angular/core';
// import { navItems } from './../../_nav';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent  {




  

  public sidebarMinimized = true;
  private changes: MutationObserver;
  public element: HTMLElement = document.body;
  // public navItems =  navItems

  constructor(private router: Router, ) {

    this.changes = new MutationObserver((mutations) => {
      this.sidebarMinimized = document.body.classList.contains('sidebar-minimized');
    });

    this.changes.observe(<Element>this.element, {
      attributes: true
    });
  }
  
}
