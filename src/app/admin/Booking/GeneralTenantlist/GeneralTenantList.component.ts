import { Component, OnInit, ViewChild, AfterContentInit } from '@angular/core';
import { DatosService } from '../../../../datos.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { LoaderComponent } from '../../../../ts/loader';
import { SystemMessage } from '../../../../ts/systemMessage';
import { FormGroup, FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { DataSource } from '@angular/cdk/table';

@Component({
    selector: 'general_tenantlist',
    templateUrl: './GeneralTenantList.component.html',
    styleUrls: ['./GeneralTenantList.component.scss']
}) export class GeneralTenantListComponent implements OnInit {

    constructor(
        public _services: DatosService,
        public _router: Router
    ) {
        this.pipe = new DatePipe('en');
        this.getTenantList();
        sessionStorage.removeItem('name_build');
    }

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

    loader = new LoaderComponent();
    systemMessage = new SystemMessage();

    pipe: DatePipe;
    filterForm = new FormGroup({
        fromDate: new FormControl(),
        toDate: new FormControl(),
        active: new FormControl(),
        pending: new FormControl(),
        ifCheckOut: new FormControl()
    });
    arrivalFilter = new FormControl();
    globalFilter = '';
    get fromDate() { return this.filterForm.get('fromDate').value; }
    get toDate() { return this.filterForm.get('toDate').value; }
    get active() { return this.filterForm.get('active').value; }
    get pending() { return this.filterForm.get('pending').value; }
    get ifCheckOut() { return this.filterForm.get('ifCheckOut').value; }

    show_page_modal = false;
    modal_to_show: string;
    userIdSelected;
    bookingSelected;

    public tenantList = new MatTableDataSource();
    public table_colums: any[] = [
        'name',
        'build',
        'room',
        'typeRoom',
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
        'more'
    ];

    filteredValues = {
        build: '',
        room: '',
        typeRoom: '',
        name: '',
        membership: '',
        dateInit: '',
        dateEnd: '',
        amountOutstanding: '',
        totalBeds: '',
        roomateFlip: '',
        checkIn: '',
        checkOut: '',
        active: '',
        more: ''
    };

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, {static: true}) sort: MatSort;

    ngOnInit() {
        // this.tenantList.filterPredicate = (data: PeriodicElement, filter: string) => {
        //     return data.dateInit === filter;
        // };
    }

    public getTenantList():void {
        this.loader.showLoader();
        this._services.service_general_get('Tenant/getGeneralTenantList')
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

    public goToPage( the_page: string ):void {
        this._router.navigateByUrl( the_page );
    }

    public viewBookingDetail( page: string, idUser, idBooking, fullName ): void {
        sessionStorage.setItem('user_id', idUser.toString() );
        sessionStorage.setItem('booking_id', idBooking);
        sessionStorage.setItem('fullName', fullName);
        this._router.navigateByUrl( page );
    }

    public goToProfile( profile: any ):void { 
        sessionStorage.setItem('id_section_active', profile.id );
        sessionStorage.setItem('name_section_active', profile.build );
        sessionStorage.setItem('name_build', profile.build );
        this.goToPage(`app-profile/${ profile.idUser }/${ profile.idBooking }`);
    }

    public applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        console.log('FILTER VALUE', filterValue);
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
        this._services.service_general_get_with_params('Tenant/getGeneralTenantList', params)
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
        this.getTenantList();
    }

    public showModal( to_show: string = 'default', userId, idBooking ): void {
        !this.show_page_modal ? this.show_page_modal = true : this.show_page_modal = false;
        this.modal_to_show = to_show;
        this.userIdSelected = userId;
        this.bookingSelected = idBooking;
    }

    confirmCheckInOut() {
        const ws_data = {
            username: this.userIdSelected,
            booking: this.bookingSelected
        };
        this.loader.showLoader();
        this._services.service_general_post(`Profile/checkOutAdmin`, ws_data)
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
                    this.showModal('', 0, 0);
                    this.resetForm();
                    setTimeout(() => this.loader.hideLoader(), 1777);
                }
            }, (error: any) => {
                console.error('Error WS CIO => ', error);
            });
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
