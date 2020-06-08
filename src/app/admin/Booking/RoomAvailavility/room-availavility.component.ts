import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatosService } from '../../../../datos.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LoaderComponent } from '../../../../ts/loader';
import { SystemMessage } from '../../../../ts/systemMessage';
import { FormGroup, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
    selector: 'room-availavility',
    styleUrls: ['./room-availavility.component.scss'],
    templateUrl: './room-availavility.component.html'
})
export class RoomAvailavilityComponent implements OnInit {

    /*Autor: Carlos Enrique Hernandez Hernandez*/

    constructor(
        public _services: DatosService,
        public _router: Router,
        public route: ActivatedRoute
    ) {
        this.pipe = new DatePipe('en');
    }

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;

    displayedColumns: string[] = [
        'room',
        'beds',
        'disponibility',
        'reservationsActive',
        'dateUnemployment',
        'amountStanding',
        'roomateFlip',
        'status',
        'viewMore',
        'addBooking'
    ];
    roomList: any;
    buildingId;

    loader = new LoaderComponent();
    systemMessage = new SystemMessage();

    public section: string;

    activeLs: ActiveModel[] = [
        {id: 0, name: 'Yes', value: true},
        {id: 1, name: 'No', value: false}
      ];
    filterForm = new FormGroup({
        fromDate: new FormControl(),
        toDate: new FormControl(),
        active: new FormControl(),
        noBeds: new FormControl()
    });
    pipe: DatePipe;
    get fromDate() { return this.filterForm.get('fromDate').value; }
    get toDate() { return this.filterForm.get('toDate').value; }
    get active() { return this.filterForm.get('active').value; }
    get noBeds() { return this.filterForm.get('noBeds').value; }

    public form_required: any = {
        no_fromData: false,
        no_toDate: false
      };

    ngOnInit() {
        this.section = 'roomAvailavility';
        this.buildingId = this.route.snapshot.paramMap.get('id');
        this.getRoomList(this.buildingId);
    }

    getRoomList(id: any) {
        let obj = { buildongId: id };
        this.loader.showLoader();
        this._services.service_general_get_with_params('Room/getAvailabilityRoom', obj)
            .subscribe( (response: any) => {
                this.loader.hideLoader();
                if ( response.result === 'Success' ) {
                    this.roomList = new MatTableDataSource(response.item);
                    this.roomList.paginator = this.paginator;
                    this.roomList.sort = this.sort;
                    console.log('List => ', response.item );
                }
            }, (error: any) => {
                this.loader.hideLoader();
                console.log('Error GetList => ', error);
                this.systemMessage.showMessage({
                    kind: 'error',
                    message: {
                      header: 'Error',
                      text: error
                    },
                    time: 2000
                  });
            });
    }

    public applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.roomList.filter = filterValue.trim().toLowerCase();
        if (this.roomList.paginator) {
          this.roomList.paginator.firstPage();
        }
    }

    roomDetail (element: any) {
        console.log('Element', element);
        this._router.navigateByUrl( `roomDetail/${ element.id }`, { state: { id: 1, name: 'To Detail' } });
    }

    public goToPage( to_where: string ):void {
        this._router.navigateByUrl( to_where );
    }

    public applyFilterPeriod() {
        console.log('Active', this.active);
        console.log('this.fromDate', this.fromDate);
        console.log('this.toDate', this.toDate);
        if (this.fromDate != null || this.toDate != null) {
            console.log('VALIDATE');
            if (this.validateForm()) {
                const params = {
                    buildongId: this.buildingId,
                    roomate: this.active === null ? '' : this.active.value,
                    startDate: this.fromDate === null ? '' : this.pipe.transform(this.fromDate, 'MM/dd/yyyy'),
                    endDate: this.toDate === null ? '' : this.pipe.transform(this.toDate, 'MM/dd/yyyy'),
                    beds: this.noBeds === null ? '' : this.noBeds
                };
                console.log(params);
                this.loader.showLoader();
                this._services.service_general_get_with_params('Room/getAvailabilityRoom', params)
                    .subscribe((response: any) => {
                        this.loader.hideLoader();
                        this.filterForm.reset();
                        this.form_required.no_fromData = false;
                        this.form_required.no_toDate = false;
                        if (response.result === 'Success') {
                            this.roomList = new MatTableDataSource(response.item);
                            this.roomList.paginator = this.paginator;
                            this.roomList.sort = this.sort;
                            console.log('List => ', response.item);
                        }
                    }, (error: any) => {
                        this.loader.hideLoader();
                        console.log('Error GetList => ', error);
                        this.filterForm.reset();
                        this.form_required.no_fromData = false;
                        this.form_required.no_toDate = false;
                        this.systemMessage.showMessage({
                            kind: 'error',
                            message: {
                                header: 'Error',
                                text: error
                            },
                            time: 2000
                        });
                    });
            } else {
                return;
            }
        } else {
            const params = {
                buildongId: this.buildingId,
                roomate: this.active === null ? '' : this.active.value,
                startDate: this.fromDate === null ? '' : this.pipe.transform(this.fromDate, 'MM/dd/yyyy'),
                endDate: this.toDate === null ? '' : this.pipe.transform(this.toDate, 'MM/dd/yyyy'),
                beds: this.noBeds === null ? '' : this.noBeds
            };
            console.log(params);
            this.loader.showLoader();
            this._services.service_general_get_with_params('Room/getAvailabilityRoom', params)
                .subscribe((response: any) => {
                    this.loader.hideLoader();
                    this.filterForm.reset();
                    this.form_required.no_fromData = false;
                    this.form_required.no_toDate = false;
                    if (response.result === 'Success') {
                        this.roomList = new MatTableDataSource(response.item);
                        this.roomList.paginator = this.paginator;
                        this.roomList.sort = this.sort;
                        console.log('List => ', response.item);
                    }
                }, (error: any) => {
                    this.loader.hideLoader();
                    this.filterForm.reset();
                    this.form_required.no_fromData = false;
                    this.form_required.no_toDate = false;
                    console.log('Error GetList => ', error);
                    this.systemMessage.showMessage({
                        kind: 'error',
                        message: {
                            header: 'Error',
                            text: error
                        },
                        time: 2000
                    });
                });
        }
    }

    public resetForm() {
        this.filterForm.reset();
        this.getRoomList(this.buildingId);
    }

    private validateForm (): boolean {
        let result: boolean;
        this.form_required.no_fromData = this.fromDate === '' || this.fromDate === null ? true : false;
        this.form_required.no_toDate = this.toDate === '' || this.toDate === null ? true : false;
        if (!this.form_required.no_fromData &&
            !this.form_required.no_toDate
            ) {
              console.log('true', this.form_required);
              result = true;
            } else {
              console.log('false', this.form_required);
              result = false;
            }
        return result;
    }

}

export interface PeriodicElement {
    name: string;
    position: number;
    weight: number;
    symbol: string;
    build: string;
    room: string;
    typeRoom: string;
    membership: string;
    dateInit: string;
    dateEnd: string;
    amountOutstanding: string;
    totalBeds: string;
    roomateFlip: string;
    checkIn: string;
    checkOut: string;
    active: string;
    more: string;
}

export interface ActiveModel {
    id: number;
    name: string;
    value: boolean;
}
