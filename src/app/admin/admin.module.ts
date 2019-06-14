import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { ToasterModule, ToasterService } from 'angular2-toaster/angular2-toaster';

import { AdminRoutingModule } from './admin-routing.module';

import { CommunitiesComponent } from './communities/communities.component';
import { NewsfeedComponent } from './newsfeed/newsfeed.component';
import { BuildingComponent } from './building/building.component';
import { EditcommentComponent } from './editcomment/editcomment.component';
import { ActivitiesComponent } from './activities/activities.component';
import { ReservationsComponent } from './reservations/reservations.component';

import { CalendarModule } from 'angular-calendar';
import { ChartsModule } from 'ng2-charts';
import { FullCalendarModule } from '@fullcalendar/angular';



@NgModule({
  imports: [
    FormsModule,
    ChartsModule,
    BsDropdownModule,
    ButtonsModule.forRoot(),
    AdminRoutingModule,
    CommonModule,    
    ToasterModule,
    CalendarModule.forRoot(),
    FullCalendarModule
  ],
  declarations: [
    CommunitiesComponent,  
    NewsfeedComponent, 
    BuildingComponent, 
    EditcommentComponent, 
    ActivitiesComponent,
    ReservationsComponent
  ]
})
export class AdminModule { }
