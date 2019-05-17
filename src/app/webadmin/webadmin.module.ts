import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { WebadminComponent } from './webadmin/webadmin.component';
import { WebadminRoutingModule } from './webadmin-routing.module';
import { ToasterModule, ToasterService } from 'angular2-toaster/angular2-toaster';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TeamComponent } from './team/team.component';
import { JobsComponent } from './jobs/jobs.component';
import { PressComponent } from './press/press.component';





@NgModule({
  imports: [
    FormsModule,
    ChartsModule,
    BsDropdownModule,
    ButtonsModule.forRoot(),
    WebadminRoutingModule,
    CommonModule,
    ModalModule.forRoot(),
    
    
    ToasterModule,
  ],
  declarations: [WebadminComponent, TeamComponent, JobsComponent, PressComponent]
})
export class WebadminModule { }
