import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReservationsComponent } from './reservations.component';
// import { CalendarModule } from 'angular-calendar';


@NgModule({
  imports: [
    CommonModule,
    // CalendarModule.forRoot()    
  ],
  // declarations: [ReservationsComponent],  
  // exports: [ReservationsComponent],  
})
export class ReservationsModule { }