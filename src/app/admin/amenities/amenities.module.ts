import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AmenitiesComponent } from './amenities.component';
import { EditAmenitiesComponent } from './edit/edit-amenities.component';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [AmenitiesComponent, EditAmenitiesComponent]
})
export class AmenitiesModule { }
