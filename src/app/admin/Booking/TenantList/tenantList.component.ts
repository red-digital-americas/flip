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
    selector: 'tenantList',
    templateUrl: './tenantList.component.html',
    styleUrls: ['./tenantList.component.scss']
})

export class TenantListComponent implements OnInit {

    constructor(
        public services: DatosService,
        public router: Router,
        private route: ActivatedRoute
    ) {
        this.pipe = new DatePipe('en');
     }

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;

    displayedColumns: string[] = [
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
        'checkIn',
        'checkOut',
        'active',
        // 'doCheckOut',
        // 'idUser',
        'showBooking'
    ];
    tenantList;
    buildingId;
    public section: string;

    loader = new LoaderComponent();
    systemMessage = new SystemMessage();

    show_page_modal = false;
    modal_to_show: string;
    userIdSelected;

    activeLs: ActiveModel[] = [
        {id: 0, name: 'Yes', value: true},
        {id: 1, name: 'No', value: false}
    ];

    pendingLs: ActiveModel[] = [
        {id: 0, name: 'Yes', value: true},
        {id: 1, name: 'No', value: false}
    ];

    ifCheckOutLs: ActiveModel[] = [
        {id: 0, name: 'Yes', value: true},
        {id: 1, name: 'No', value: false}
    ];

    filterForm = new FormGroup({
        fromDate: new FormControl(),
        toDate: new FormControl(),
        active: new FormControl(),
        pending: new FormControl(),
        ifCheckOut: new FormControl()
    });
    pipe: DatePipe;
    get fromDate() { return this.filterForm.get('fromDate').value; }
    get toDate() { return this.filterForm.get('toDate').value; }
    get active() { return this.filterForm.get('active').value; }
    get pending() { return this.filterForm.get('pending').value; }
    get ifCheckOut() { return this.filterForm.get('ifCheckOut').value; }

    ngOnInit() {
        this.section = 'tenantList';
        this.buildingId = this.route.snapshot.paramMap.get('id');
        this.getTenantList(this.buildingId);
    }

    public goToPage( to_where: string ):void {
        this.router.navigateByUrl( to_where );
    }

    getTenantList(id) {
        this.loader.showLoader();
        let obj = { buildingId: id };
        this.services.service_general_get_with_params('Tenant/getTenantList', obj).subscribe((value) => {
            this.tenantList = new MatTableDataSource(value.item);
            this.loader.hideLoader();
            console.info('Response', this.tenantList);
            this.tenantList.paginator = this.paginator;
            this.tenantList.sort = this.sort;
        });
    }

    viewDetail(id: number, idBooking: number) {
        console.log('Id user', id);
        this.router.navigateByUrl( `app-profile/${ id }/${ idBooking }`, { state: { id: this.buildingId, name: 'TenantList To Profile' } });
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.tenantList.filter = filterValue.trim().toLowerCase();
        if (this.tenantList.paginator) {
          this.tenantList.paginator.firstPage();
        }
    }

    public applyFilterPeriod() {
        const params = {
            activeBooking: this.active === null ? '' : this.active.value,
            dateInit: this.fromDate === null ? '' : this.pipe.transform(this.fromDate, 'MM/dd/yyyy'),
            dateEnd: this.toDate === null ? '' : this.pipe.transform(this.toDate, 'MM/dd/yyyy'),
            pending: this.pending === null ? '' : this.pending.value,
            ifCheckOut: this.ifCheckOut === null ? '' : this.ifCheckOut.value
        };
        console.log(params);
        this.loader.showLoader();
        this.services.service_general_get_with_params('Tenant/getGeneralTenantList', params)
            .subscribe( (response: any) => {
                this.loader.hideLoader();
                if ( response.result === 'Sucess' ) {
                    const data: PeriodicElement[] = response.item;
                    this.tenantList = new MatTableDataSource(data);
                    this.tenantList.paginator = this.paginator;
                    this.tenantList.sort = this.sort;

                    console.log('List => ', response.item );
                }
            }, (error: any) => {
                this.loader.hideLoader();
                console.log('Error GetList => ', error);
            });
    }

    public resetForm() {
        this.filterForm.reset();
        this.getTenantList(this.buildingId);
    }

    public showModal( to_show: string = 'default', userId ):void {
        !this.show_page_modal ? this.show_page_modal = true : this.show_page_modal = false;
        this.modal_to_show = to_show;
        this.userIdSelected = userId;
    }

    confirmCheckInOut() {
        const ws_data = {
            username: this.userIdSelected
        };
        this.loader.showLoader();
        this.services.service_general_post(`Profile/checkOut`, ws_data)
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
                    this.resetForm();
                    setTimeout(() => this.loader.hideLoader(), 1777);
                }
            }, (error: any) => {
                console.error('Error WS CIO => ', error);
            });
    }

    public viewBookingDetail( page: string, idUser, idBooking ):void {
        sessionStorage.setItem('user_id', idUser.toString() );
        sessionStorage.setItem('booking_id', idBooking);
        this.router.navigateByUrl( page );
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
