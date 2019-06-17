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

import { ModalModule } from 'ngx-bootstrap/modal';
import { DetalleComponent } from './modals/detalle/detalle.component';
import { AmenitiesComponent } from './amenities/amenities.component';
import { NavModule } from './shared/nav/nav.module';


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
    FullCalendarModule,
    ModalModule.forRoot(),
    NavModule
  ],
  declarations: [
    CommunitiesComponent,  
    NewsfeedComponent, 
    BuildingComponent, 
    EditcommentComponent, 
    ActivitiesComponent,
    AmenitiesComponent,
    ReservationsComponent,
    DetalleComponent
  ],
  entryComponents: [
    DetalleComponent
  ]
})
export class AdminModule { }
