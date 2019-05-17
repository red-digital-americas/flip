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

const routes: Routes = [
  {
    path: '',

    data: {
      title: 'Dashboard'
    },
    children: [
        {
          path: '',
         redirectTo: 'webadmin'
        },
      {
        path: 'webadmin',
        component: WebadminComponent,
        data: {title:'  Index'}
      },
      {
        path: 'team',
        component: TeamComponent,
        data: {title:'  Team'}
      },
      {
        path: 'jobs',
        component: JobsComponent,
        data: {title:'  Jobs'}
      },
      {
        path: 'press',
        component: PressComponent,
        data: {title:'  Press'}
      },
      

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WebadminRoutingModule { }
