import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DatosService } from '../../../../../datos.service';
import { LoaderComponent } from '../../../../../ts/loader';
import { SystemMessage } from '../../../../../ts/systemMessage';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.scss']
})
export class RoomDetailComponent implements OnInit {

  section;
  roomId;
  roomData = {
    amountStanding: 0,
    beds: 0,
    dateUnemployment: '01/01/0001',
    disponibility: 0,
    floor: '',
    id: 0,
    pending: 0,
    reservationsActive: 0,
    room: '',
    roomateFlip: true,
    smoke: true,
    status: true
  };
  roomObj = {
    id: 0,
    name: '',
    description: '',
    totalBeds: 0,
    typeRoom: '',
    membershipRelationship: []
  };

  displayinactive = true;
  displayActive = true;
  displayMembership = true;

  /////////////////////////// MEMBERSHIPS ////////////////////////////
  membershipRelationshipObj;
  membershipDisplayColumns: string[] = [
    'room',
    'name',
    'description',
    'price'
  ];

  ////////////////////////// ACTIVE //////////////////////////////////
  activeTotal = 0;
  activeTotalPending = 0;
  activeLenght;
  activeObj;
  activeDisplayedColumns: string[] = [
    'name',
    'room',
    'membership',
    'dateInit',
    'dateEnd',
    'amountOutstanding',
    'pendingBilled',
    'totalBeds',
    'roomateFlip',
    'status',
    'active',
    'checkIn',
    'checkOut',
    // 'idUser',
    'showBooking'
];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  ////////////////////////// INACTIVE ///////////////////////////////
  inactiveObj;
  inactiveTotal = 0;
  inactiveTotalPending = 0;
  inactiveDisplayedColumns: string[] = [
    'name',
    'room',
    'membership',
    'dateInit',
    'dateEnd',
    'amountOutstanding',
    'pendingBilled',
    'totalBeds',
    'roomateFlip',
    'status',
    'active',
    'checkIn',
    'checkOut',
    // 'idUser',
    'showBooking'
    ];
  @ViewChild(MatPaginator, { static: true }) paginatorInactive: MatPaginator;
  @ViewChild(MatSort, { static: true }) sortInactive: MatSort;

  loader = new LoaderComponent();
  systemMessage = new SystemMessage();

  show_page_modal = false;
  modal_to_show: string;
  userIdSelected;

  /////////////////////////
  // ACTIVE
  ////////////////////////
  ifCheckOutLs: ActiveModel[] = [
      {id: 0, name: 'Yes', value: true},
      {id: 1, name: 'No', value: false}
  ];
  pendingLs: ActiveModel[] = [
      {id: 0, name: 'Yes', value: true},
      {id: 1, name: 'No', value: false}
  ];
  filterActiveForm = new FormGroup({
      pending: new FormControl(),
      ifCheckOut: new FormControl()
  });
  get pending() { return this.filterActiveForm.get('pending').value; }
  get ifCheckOut() { return this.filterActiveForm.get('ifCheckOut').value; }
  /////////////////////////
  // END ACTIVE
  ////////////////////////
  // INACTIVE
  ///////////////////////
  ifCheckOutILs: ActiveModel[] = [
    {id: 0, name: 'Yes', value: true},
    {id: 1, name: 'No', value: false}
  ];
  pendingILs: ActiveModel[] = [
      {id: 0, name: 'Yes', value: true},
      {id: 1, name: 'No', value: false}
  ];
  filterInactiveForm = new FormGroup({
      pending: new FormControl(),
      ifCheckOut: new FormControl()
  });
  get pendingI() { return this.filterInactiveForm.get('pendingI').value; }
  get ifCheckOutI() { return this.filterInactiveForm.get('ifCheckOutI').value; }
  /////////////////////////
  // END INACTIVE
  ////////////////////////

  constructor(
    public _services: DatosService,
    public _router: Router,
    public route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.section = 'roomAvailavility';
    this.roomData = JSON.parse(sessionStorage.getItem('roomData'));
    console.log('ROOM DATA', this.roomData);
    this.roomId = this.route.snapshot.paramMap.get('id');
    this.getRoomDetail(this.roomId);
  }

  getRoomDetail(id: any) {
    this.loader.showLoader();
    let params = { roomId: id };
    this._services.service_general_get_with_params('Room/GetRoomDetail', params).subscribe((value) => {
      console.log('Response', value);
      this.loader.hideLoader();
      this.roomObj = value.item.room;
      this.membershipRelationshipObj = new MatTableDataSource(value.item.room.membershipRelationship);

      this.activeLenght = value.item.active.length;
      value.item.active.forEach(element => {
        this.activeTotal = this.activeTotal + element.amountOutstanding;
        this.activeTotal = this.activeTotal +
                          (element.membership !== null ? element.membership.priceMembership : 0);
        this.activeTotalPending = this.activeTotalPending + element.pending;
      });
      this.activeObj = new MatTableDataSource(value.item.active);
      this.activeObj.paginator = this.paginator;
      this.activeObj.sort = this.sort;

      value.item.inactive.forEach(element => {
        this.inactiveTotal = this.inactiveTotal + element.amountOutstanding;
        this.inactiveTotal = this.inactiveTotal +
                          (element.membership !== null ? element.membership.priceMembership : 0);
        this.inactiveTotalPending = this.inactiveTotalPending + element.pending;

      });
      this.inactiveObj = new MatTableDataSource(value.item.inactive);
      this.inactiveObj.paginator = this.paginatorInactive;
      this.inactiveObj.sort = this.sortInactive;

      this.displayMembership = value.item.room.membershipRelationship.length === 0 ? false : true;
      this.displayActive = value.item.inactive.length === 0 ? false : true;
      this.displayinactive = value.item.active.length === 0 ? false : true;
      console.log('Displays', this.displayMembership, this.displayActive, this.displayinactive);
    }, (error) => {
      this.loader.hideLoader();
      console.log('Error', error);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.activeObj.filter = filterValue.trim().toLowerCase();
    if (this.activeObj.paginator) {
      this.activeObj.paginator.firstPage();
    }
  }

  applyFilterInactive(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.inactiveObj.filter = filterValue.trim().toLowerCase();
    if (this.inactiveObj.paginator) {
      this.inactiveObj.paginator.firstPage();
    }
  }

  viewDetail(element: any) {
    sessionStorage.setItem('user_id', element.idUser);
    sessionStorage.setItem('booking_id', element.idBooking);
    this._router.navigateByUrl('reservations');
  }

  public viewBookingDetail( page: string, idUser, idBooking ):void {
    sessionStorage.setItem('user_id', idUser.toString() );
    sessionStorage.setItem('booking_id', idBooking);
    this._router.navigateByUrl( page );
  }

  public showModal( to_show: string = 'default', userId ): void {
    !this.show_page_modal ? this.show_page_modal = true : this.show_page_modal = false;
    this.modal_to_show = to_show;
    this.userIdSelected = userId;
  }

  confirmCheckInOut() {
    const ws_data = {
      username: this.userIdSelected
    };
    console.log('Check Out', ws_data);
    this.loader.showLoader();
    this._services.service_general_post(`Profile/checkOut`, ws_data)
      .subscribe((response: any) => {
        if (response.result === 'Success') {
          this.systemMessage.showMessage({
            kind: 'ok',
            time: 4200,
            message: {
              header: `Check out successfully.`,
              text: `You have been Check out successfully`
            }
          });
          this.showModal('', 0);
          setTimeout(() => this.loader.hideLoader(), 1777);
        }
      }, (error: any) => {
        console.error('Error WS CIO => ', error);
      });
      this.getRoomDetail(this.roomId);
  }

  filterTable(ifActive: any) {
    const data = {
      roomId: this.roomId,
      pending: this.pending === null ? '' : this.pending.value,
      ifCheckOut: this.ifCheckOut === null ? '' : this.ifCheckOut.value,
      active: ifActive
    };
    console.log(data);
    this.loader.showLoader();
    this._services.service_general_get_with_params(`Room/GetFilterRoom`, data)
      .subscribe((response: any) => {
        this.loader.hideLoader();
        this.filterActiveForm.reset();
        if (response.result === 'Success') {
          if (ifActive === true) {
            this.activeObj = new MatTableDataSource(response.item);
            this.activeObj.paginator = this.paginator;
            this.activeObj.sort = this.sort;
            // this.displayActive = response.item.length === 0 ? false : true;
          } else {
            this.inactiveObj = new MatTableDataSource(response.item);
            this.inactiveObj.paginator = this.paginatorInactive;
            this.inactiveObj.sort = this.sortInactive;
          }
        }
      }, (error: any) => {
        this.loader.hideLoader();
        console.error('Error WS CIO => ', error);
      });
  }

}

export interface ActiveModel {
  id: number;
  name: string;
  value: boolean;
}
