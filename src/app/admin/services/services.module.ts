import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';
import { ToasterModule } from 'angular2-toaster';
import { NavModule } from '../shared/nav/nav.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

import { ServicesComponent } from './services.component';
import { ServiceEditComponent } from './edit/service-edit.component';


const routes: Routes = [  
  { path: 'services/:id', component: ServicesComponent },  
  { path: 'service-edit/:id', component: ServiceEditComponent },
];
  
@NgModule({
  imports: [
    CommonModule,          
    ReactiveFormsModule,
    NgSelectModule,    
    RouterModule.forChild(routes), 
    NavModule,    
    ToasterModule,
    FormsModule     
  ],
  declarations: [
    ServicesComponent,
    ServiceEditComponent
  ]
})
export class ServicesComponentModule {}
  