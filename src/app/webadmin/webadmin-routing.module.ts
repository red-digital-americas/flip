import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Routes,
  RouterModule
} from '@angular/router';
import { WebadminComponent } from './webadmin/webadmin.component';

import { TeamComponent } from './team/team.component';
import { JobsComponent } from './jobs/jobs.component';
import { PressComponent } from './press/press.component';
import { DesignComponent } from './design/design.component';
import { DesignindexComponent } from './designindex/designindex.component';
import { HomeammenitiesComponent } from './homeammenities/homeammenities.component';
import { HomegeneralComponent } from './homegeneral/homegeneral.component';
import { HomeindexComponent } from './homeindex/homeindex.component';
import { HomeroomsComponent } from './homerooms/homerooms.component';
import { HomeservicesComponent } from './homeservices/homeservices.component';
import { HomemenuComponent } from './homemenu/homemenu.component';
import { MoreindexComponent } from './moreindex/moreindex.component';

const routes: Routes = [
  {
    path: '', data: { title: 'Dashboard' },
    children: [
      { path: '', redirectTo: 'webadmin' },
      { path: 'webadmin', component: WebadminComponent, data: {title:'  Index'} },
      { path: 'design', component: DesignComponent, data: {title:'Design'} },
      { path: 'designindex', component: DesignindexComponent, data: {title:' Design Index'} },
      { path: 'homemenu', component: HomemenuComponent, data: {title:'  Home Ammenities'} },
      { path: 'homeammenities/:id', component: HomeammenitiesComponent, data: {title:'  Home Ammenities'} },
      { path: 'homegeneral/:id', component: HomegeneralComponent, data: {title:'  Home General'} },
      { path: 'homeindex/:id', component: HomeindexComponent, data: {title:'Home  Index'} },
      { path: 'homeroom/:id', component: HomeroomsComponent, data: {title:'  Home Room'} },
      { path: 'homeservices/:id', component: HomeservicesComponent, data: {title:'  Home Services'} },
      { path: 'moreindex', component: MoreindexComponent, data: {title:'  More Index '} },
      { path: 'team', component: TeamComponent, data: {title:'  Team'} },
      { path: 'jobs', component: JobsComponent, data: {title:'  Jobs'} },
      { path: 'press', component: PressComponent, data: {title:'  Press'} },      
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebadminRoutingModule { }
