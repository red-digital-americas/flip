import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommunitiesComponent } from './communities/communities.component';
import { NewsfeedComponent } from './newsfeed/newsfeed.component';
import { BuildingComponent } from './building/building.component';
import { EditcommentComponent } from './editcomment/editcomment.component';
import { ActivitiesComponent } from './activities/activities.component';
import { ReservationsComponent } from './reservations/reservations.component';
import { AmenitiesComponent } from './amenities/amenities.component';
import { EditAmenitiesComponent } from './amenities/edit/edit-amenities.component';
import { RoleGuardService } from '../guards/role-guard.service';
import { ChatComponent } from './chat/chat.component';

//CHH => Booking
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
import { DetailComponent } from './Booking/Membership/detail/detail.component';
import { RoomComponent } from './Booking/RoomCatalog/room/room.component';
import { RoomNewComponent } from './Booking/RoomCatalog/room-new/room-new.component';
import { MembershipNewComponent } from './Booking/Membership/membership-new/membership-new.component';

const routes: Routes = [
  { path: '', data: { title: 'AdminApp', expectedRole: [2,4] }, canActivate: [RoleGuardService],
    children: [
      { path: '', redirectTo: 'communities' },
      { path: 'newsfeed/:id', component: NewsfeedComponent, data: {title:'newsfeed'} },
      { path: 'communities', component: CommunitiesComponent, data: { title: 'Communities' } },
      { path: 'building/:id', component: BuildingComponent, data: {title:'Building'} },
      { path: 'editcomment/:id', component: EditcommentComponent, data: { title: 'Building' } },
      { path: 'activities/:id', component: ActivitiesComponent, data: { title: 'Activities' } },
      { path: 'amenities/:id', component: AmenitiesComponent, data: { title: 'Amenities' } },
      { path: 'editamenity/:id', component: EditAmenitiesComponent, data: { title: 'Amenities' } },
      { path: 'reservations/:id', component: ReservationsComponent, data: { title: 'Reservations' } },
      { path: 'chat/:id', component: ChatComponent, data: { title: 'Chat' } },

      //CHH => Booking 
      { path: 'booking', component: BookingIndexComponent, data: { title: 'Booking' } },
      { path: 'tenantList/:id', component: TenantListComponent, data: { title: 'Tenant List' } },
      { path: 'app-profile/:id/:booking', component: ProfileComponent, data: { title: 'Tenant Profile' } },
      { path: 'roomAvailavility/:id', component: RoomAvailavilityComponent, data: { id: 1, title: 'Room Availavility' } },
      { path: 'messages/:id', component: MessagesComponent, data: { title: 'Messages' } }, 
      { path: 'alerts/:id', component: AlertsComponent, data: { title: 'Alerts' } },
      { path: 'roomCatalog/:id', component: RoomCatalogComponent, data: { title: 'Room Catalog' } },
      { path: 'room/:id', component: RoomComponent, data: { title: 'Room' } },
      { path: 'roomNew/:id', component: RoomNewComponent, data: { title: 'New Room' } },
      { path: 'MembershipCatalog/:id', component: MembershipCatalogComponent, data: { title: 'Membership Catalog' } },
      { path: 'MembershipDetail/:id', component: DetailComponent, data:  { id: 1, title: 'MembershipDetail' } },
      { path: 'MembershipNew/:id', component: MembershipNewComponent, data:  { id: 1, title: 'MembershipDetail' } },
      { path: 'generalTenantlist', component: GeneralTenantListComponent, data: { title: 'General Tenantlist' } },
      { path: 'AddTenant', component: AddTenantComponent, data: { title: 'Add Tenant' } },
      { path: 'Users', component: UsersComponent, data: { title: 'Users' } },
      { path: 'Roles', component: RolesComponent, data: { title: 'Roles' } }, 
      { path: 'reservations', component: ProfileReservationsComponent, data: { title: 'Reservations' } }, 
      
      
      // { path: 'perks/:id', loadChildren: './perks/perks.module#PerksComponentModule' },
      { path: '', loadChildren: './perks/perks.module#PerksComponentModule', data: { title: 'Perks'} },
      { path: '', loadChildren: './services/services.module#ServicesComponentModule', data: { title: 'Services'}  }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
