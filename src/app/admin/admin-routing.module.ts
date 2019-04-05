import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Routes,
  RouterModule
} from '@angular/router';
import { CommunitiesComponent } from './communities/communities.component';
import { NewsfeedComponent } from './newsfeed/newsfeed.component';
import { BuildingComponent } from './building/building.component';

const routes: Routes = [
  {
    path: '',

    data: {
      title: 'Dashboard'
    },
    children: [
      {
        path: 'newsfeed/:id',
        component: NewsfeedComponent,
        data: {title:'newsfeed'}
      },
      {
        path: 'communities',
        component: CommunitiesComponent,
        data: { title: 'Communities' }

      },
      {
        path: 'building/:id',
        component: BuildingComponent,
        data: {title:'Building'}
      },

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
