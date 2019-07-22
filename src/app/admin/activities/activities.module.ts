import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivitiesComponent } from './activities.component';
import { ToasterModule } from 'angular2-toaster/angular2-toaster';


@NgModule({
  imports: [
    CommonModule,
    ToasterModule,
    // ToasterService,
  ],
  declarations: []
})
export class ActivitiesModule { }
