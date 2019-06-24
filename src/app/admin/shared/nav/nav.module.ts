import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavComponent } from './nav.component';
import { RouterModule } from '@angular/router';
// import { CalendarModule } from 'angular-calendar';


@NgModule({
  imports: [
    CommonModule,    
    RouterModule
  ],
  declarations: [NavComponent],    
  exports:[NavComponent]
})
export class NavModule { }