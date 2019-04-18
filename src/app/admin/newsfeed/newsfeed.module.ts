import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsfeedComponent } from './newsfeed.component';
import { ToasterModule, ToasterService } from 'angular2-toaster/angular2-toaster';


@NgModule({
  imports: [
    CommonModule,
    ToasterModule,
    ToasterService,
  ],
  declarations: [NewsfeedComponent]
})
export class NewsfeedModule { }
