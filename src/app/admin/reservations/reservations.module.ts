import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CalendarModule } from 'angular-calendar';

import { ReservationsComponent } from './reservations.component';


@NgModule({
  imports: [
    CommonModule,
    CalendarModule.forRoot()
  ],
  declarations: [ReservationsComponent],    
})
export class ReservationsModule { }