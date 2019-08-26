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
import { PerksPromotionDetailComponent } from '../perk-promotions/detail/perk-promotions-detail.component';
import { PerksPromotionEditComponent } from '../perk-promotions/edit/perk-promotions-edit.component';
import { PerksEditComponent } from './edit/perks-edit.component';

const routes: Routes = [
  // { path: '', component: PerksComponent },  
  { path: 'perks/:id', component: PerksComponent },
  { path: 'perk-detail/:id', component: PerksDetailComponent },
  { path: 'perk-edit/:id', component: PerksEditComponent },
  { path: 'perk-promotions-add/:id', component: PerksPromotionAddComponent },
  { path: 'perk-promotions-detail/:id', component: PerksPromotionDetailComponent },
  { path: 'perk-promotions-edit/:id', component: PerksPromotionEditComponent },
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
    PerksPromotionAddComponent,
    PerksPromotionDetailComponent,
    PerksPromotionEditComponent,
    PerksEditComponent
  ]
})
export class PerksComponentModule {}
  