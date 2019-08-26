import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';
import { ToasterModule } from 'angular2-toaster';
import { NavModule } from '../shared/nav/nav.module';
import { FormsModule } from '../../views/forms/forms.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

import { PerksComponent } from './perks.component';
import { PerksDetailComponent } from './detail/perks-detail.component';
import { PerksPromotionAddComponent } from '../perk-promotions/add/perk-promotions-add.component';
import { BsDatepickerModule } from 'ngx-bootstrap';

const routes: Routes = [
  // { path: '', component: PerksComponent },  
  { path: 'perks/:id', component: PerksComponent },
  { path: 'perk-detail/:id', component: PerksDetailComponent },
  { path: 'perk-promotions-add/:id', component: PerksPromotionAddComponent } 
];
  
@NgModule({
  imports: [
    CommonModule,          
    ReactiveFormsModule,
    NgSelectModule,
    BsDatepickerModule.forRoot(),
    RouterModule.forChild(routes), 
    NavModule,    
    ToasterModule,     
  ],
  declarations: [
    PerksComponent,
    PerksDetailComponent,
    PerksPromotionAddComponent
  ]
})
export class PerksComponentModule {}
  