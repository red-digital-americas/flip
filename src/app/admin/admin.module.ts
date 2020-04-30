import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { ToasterModule } from 'angular2-toaster/angular2-toaster';
import { StripeModule } from "stripe-angular"


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
import { MessageUsersComponent } from './modals/message-users/message-users/message-users.component';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatDialogModule} from '@angular/material/dialog';
import { Autoresize } from './shared/directives/autoresize.directive';
import {MatInputModule} from '@angular/material/input';
import { RoomModalComponent } from './modals/room-modal/room-modal.component';

//CHH Booking
import { BookingIndexComponent } from './Booking/index.component';
import { TenantListComponent } from './Booking/TenantList/tenantList.component';
import { BookingNavbarComponent } from './Booking/NavbarBooking/booking-navbar.component';
import { RoomAvailavilityComponent } from './Booking/RoomAvailavility/room-availavility.component';
import { MessagesComponent } from './Booking/Messages/messages.component';
import { AlertsComponent } from './Booking/Alerts/alerts.component';
import { RoomCatalogComponent } from './Booking/RoomCatalog/roomCatalog.component';
import { MembershipCatalogComponent } from './Booking/Membership/memberShipCatalog.component';
import { GeneralTenantListComponent } from './Booking/GeneralTenantlist/GeneralTenantList.component';
import { AddTenantComponent } from './Booking/AddTenant/AddTenant.component';
import { UsersComponent } from './Booking/Users/Users.component';
import { RolesComponent } from './Booking/Roles/Roles.component';
import { ProfileComponent } from './Booking/TenantList/profile/profile.component';
import { ProfileReservationsComponent } from './Booking/TenantList/Reservations/Reservations.component';


import { PaymentComponent } from './payment/payment.component';
import { Module as StripeModule } from "stripe-angular"

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
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatCheckboxModule,
    [ StripeModule.forRoot("pk_test_WiAYJgrEz6XKxL2MwKD89oqO00bfPcrlOF") ]
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
    ChatComponent,
    MessageUsersComponent,
    Autoresize,
    RoomModalComponent,
    BookingIndexComponent,
    TenantListComponent,
    BookingNavbarComponent,
    RoomAvailavilityComponent,
    MessagesComponent,
    AlertsComponent,
    RoomCatalogComponent,
    MembershipCatalogComponent,
    GeneralTenantListComponent,
    AddTenantComponent,
    UsersComponent,
    RolesComponent,
    ProfileComponent,
    ProfileReservationsComponent
  ],
  entryComponents: [
    DetalleComponent,
    CrearComponent,
    InviteComponent,
    MessageUsersComponent,
    RoomModalComponent
  ],
  exports:[Autoresize]
})
export class AdminModule { }
