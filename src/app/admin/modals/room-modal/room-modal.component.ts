import { Component, OnInit, Inject } from '@angular/core';
import { DatosService } from '../../../../datos.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToasterService } from 'angular2-toaster';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { TypeRoom } from '../../models/building';
import { RoomDTO } from '../../models/RoomDTO';

@Component({
  selector: 'app-room-modal',
  templateUrl: './room-modal.component.html',
  styleUrls: ['./room-modal.component.scss']
})
export class RoomModalComponent implements OnInit {

  roomsForm: FormGroup;
  typeRoom: TypeRoom;
  nrooms: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  constructor(public dialogRef: MatDialogRef<RoomModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private heroService: DatosService,
    private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.roomsForm = this._formBuilder.group({
      roomsNumber: [''],
      rooms: new FormArray([])
    });
    debugger;
    this.heroService.ServiceGetTypeRooms(this.data.buildId).subscribe(response =>{
      debugger;
      console.log(response);
      this.typeRoom = JSON.parse(response._body);
      console.log("roomsType", this.typeRoom);
      
    });
  }
  get f() { return this.roomsForm.controls; }
  get t() { return this.f.rooms as FormArray; }

  onChangeRooms(e) {
    debugger;
    const roomsNumber = parseInt(e.target.value) || 0;
    if (this.t.length < roomsNumber) {
      for (let i = this.t.length; i < roomsNumber; i++) {
        this.t.push(this._formBuilder.group({
          name: ['', Validators.required],
          description: ['', [Validators.required]],
          price: ['', Validators.required],
          buildingId:[this.data.buildId],
          typeRoomId:['', Validators.required]
        }));
      }
    } else {
      for (let i = this.t.length; i >= roomsNumber; i--) {
        this.t.removeAt(i);
      }
    }
  }

  onSubmit(){
    debugger;
    let listRooms = new Array<RoomDTO>();
     listRooms = this.roomsForm.value.rooms;
     
    console.log(listRooms);
    this.heroService.ServiceSaveRooms(listRooms).subscribe(response =>{
      this.dialogRef.close(true);

    });

  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
