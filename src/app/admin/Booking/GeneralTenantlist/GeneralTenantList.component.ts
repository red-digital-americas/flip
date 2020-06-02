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

    loader = new LoaderComponent();
    systemMessage = new SystemMessage();

    pipe: DatePipe;
    filterForm = new FormGroup({
        fromDate: new FormControl()
    });
    arrivalFilter = new FormControl();
    globalFilter = '';
    get fromDate() { return this.filterForm.get('fromDate').value; }
    get toDate() { return this.filterForm.get('toDate').value; }

    public tenantList = new MatTableDataSource();
    public table_colums: any[] = [
        'build',
        'room',
        'typeRoom',
        'name',
        'membership',
        'dateInit',
        'dateEnd',
        'amountOutstanding',
        'totalBeds',
        'roomateFlip',
        'checkIn',
        'checkOut',
        'active',
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
        this.tenantList.filterPredicate = (data: PeriodicElement, filter: string) => {
            return data.dateInit === filter;
        };
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
