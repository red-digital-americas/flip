import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DatosService } from '../../../../../datos.service';
import { LoaderComponent } from '../../../../../ts/loader';
import { SystemMessage } from '../../../../../ts/systemMessage';

@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.scss']
})
export class RoomDetailComponent implements OnInit {

  section;
  roomId;
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
    'checkIn',
    'checkOut',
    'active',
    'idUser',
    'showBooking'
];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  ////////////////////////// INACTIVE ///////////////////////////////
  inactiveObj;
  inactiveTotal = 0;
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
    'checkIn',
    'checkOut',
    'active',
    'idUser',
    'showBooking'
    ];
  @ViewChild(MatPaginator, { static: true }) paginatorInactive: MatPaginator;
  @ViewChild(MatSort, { static: true }) sortInactive: MatSort;

  loader = new LoaderComponent();
  systemMessage = new SystemMessage();

  constructor(
    public _services: DatosService,
    public _router: Router,
    public route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.section = 'roomAvailavility';
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
      });
      this.activeObj = new MatTableDataSource(value.item.active);
      this.activeObj.paginator = this.paginator;
      this.activeObj.sort = this.sort;

      value.item.inactive.forEach(element => {
        this.inactiveTotal = this.inactiveTotal + element.amountOutstanding;
        this.inactiveTotal = this.inactiveTotal +
                          (element.membership !== null ? element.membership.priceMembership : 0);
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

}
