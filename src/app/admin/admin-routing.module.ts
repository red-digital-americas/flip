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

      // { path: 'perks/:id', loadChildren: './perks/perks.module#PerksComponentModule' },
      { path: '', loadChildren: './perks/perks.module#PerksComponentModule', data: { title: 'Perks'} },
      { path: '', loadChildren: './services/services.module#ServicesComponentModule', data: { title: 'Services'}  },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
