import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { CommunitiesComponent } from './communities/communities.component';
import { NewsfeedComponent } from './newsfeed/newsfeed.component';
import { AdminRoutingModule } from './admin-routing.module';
import { BuildingComponent } from './building/building.component';
import { ToasterModule, ToasterService } from 'angular2-toaster/angular2-toaster';

import { EditcommentComponent } from './editcomment/editcomment.component';



@NgModule({
  imports: [
    FormsModule,
    ChartsModule,
    BsDropdownModule,
    ButtonsModule.forRoot(),
    AdminRoutingModule,
    CommonModule,
    
    ToasterModule,
  ],
  declarations: [CommunitiesComponent,  NewsfeedComponent, BuildingComponent, EditcommentComponent]
})
export class AdminModule { }
