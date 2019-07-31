import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { WebadminComponent } from './webadmin/webadmin.component';
import { WebadminRoutingModule } from './webadmin-routing.module';
import { ToasterModule, ToasterService } from 'angular2-toaster/angular2-toaster';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TeamComponent } from './team/team.component';
import { JobsComponent } from './jobs/jobs.component';
import { PressComponent } from './press/press.component';
import { DesignComponent } from './design/design.component';
import { DesignindexComponent } from './designindex/designindex.component';
import { MoreindexComponent } from './moreindex/moreindex.component';
import { HomeindexComponent } from './homeindex/homeindex.component';
import { HomeservicesComponent } from './homeservices/homeservices.component';
import { HomeammenitiesComponent } from './homeammenities/homeammenities.component';
import { HomeroomsComponent } from './homerooms/homerooms.component';
import { HomegeneralComponent } from './homegeneral/homegeneral.component';
import { ImageCropperModule } from 'ngx-image-cropper';

import { ChartsModule } from 'ng2-charts';




@NgModule({
  imports: [
    FormsModule,
    ChartsModule,
    BsDropdownModule,
    ButtonsModule.forRoot(),
    WebadminRoutingModule,
    CommonModule,
    ModalModule.forRoot(),
    ImageCropperModule,
    
    ToasterModule.forRoot(),
  ],
  declarations: [WebadminComponent, TeamComponent, JobsComponent, PressComponent, DesignComponent, DesignindexComponent, MoreindexComponent, HomeindexComponent, HomeservicesComponent, HomeammenitiesComponent, HomeroomsComponent, HomegeneralComponent]
})
export class WebadminModule { }
