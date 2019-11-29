import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { ToasterModule } from 'angular2-toaster/angular2-toaster';


import { AdminRoutingModule } from './admin-routing.module';

import { CalendarModule } from 'angular-calendar';
import { ChartsModule } from 'ng2-charts';
import { FullCalendarModule } from '@fullcalendar/angular';

import { ModalModule } from 'ngx-bootstrap/modal';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';

import { NgSelectModule } from '@ng-select/ng-select';

import { NavModule } from './shared/nav/nav.module';
import { CommunitiesComponent } from './communities/communities.component';
import { BuildingComponent } from './building/building.component';
////////////////////////////////////////////////////////////////////////////
import { NewsfeedComponent } from './newsfeed/newsfeed.component';
import { EditcommentComponent } from './editcomment/editcomment.component';
////////////////////////////////////////////////////////////////////////////
import { AmenitiesComponent } from './amenities/amenities.component';
import { EditAmenitiesComponent } from './amenities/edit/edit-amenities.component';
///////////////////////////////////////////////////////////////////////////
import { ActivitiesComponent } from './activities/activities.component';
///////////////////////////////////////////////////////////////////////////
import { ReservationsComponent } from './reservations/reservations.component';
import { DetalleComponent } from './modals/detalle/detalle.component';
import { CrearComponent } from './modals/crear/crear.component';
import { InviteComponent } from './modals/invite/invite.component';
import { ChatComponent } from './chat/chat.component';
import { MaterialModule } from '../material/material.module';
import { MatCardModule } from '@angular/material/card';


@NgModule({
  imports: [    
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    BsDropdownModule,
    ButtonsModule.forRoot(),
    AdminRoutingModule,
    CommonModule,    
    ToasterModule,
    CalendarModule.forRoot(),
    FullCalendarModule,
    ModalModule.forRoot(),
    NavModule,
    NgSelectModule,  
    FormsModule,
    MatCardModule
  ],
  declarations: [
    CommunitiesComponent,  
    NewsfeedComponent, 
    BuildingComponent, 
    EditcommentComponent, 
    ActivitiesComponent,
    AmenitiesComponent,
    EditAmenitiesComponent,
    ReservationsComponent,
    DetalleComponent,
    CrearComponent,
    InviteComponent,
    ChatComponent
  ],
  entryComponents: [
    DetalleComponent,
    CrearComponent,
    InviteComponent,
  ]
})
export class AdminModule { }
