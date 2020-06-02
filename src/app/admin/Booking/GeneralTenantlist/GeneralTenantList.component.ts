import { Component, OnInit, ViewChild } from '@angular/core';
import { DatosService } from '../../../../datos.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { LoaderComponent } from '../../../../ts/loader';
import { SystemMessage } from '../../../../ts/systemMessage';

@Component({
    selector: 'general_tenantlist',
    templateUrl: './GeneralTenantList.component.html',
    styleUrls: ['./GeneralTenantList.component.scss']
}) export class GeneralTenantListComponent implements OnInit {

    constructor(
        public _services: DatosService,
        public _router: Router
    ) {}

    loader = new LoaderComponent();
    systemMessage = new SystemMessage();


    ngOnInit() {

        this.getTenantList();

        sessionStorage.removeItem('name_build');

    }

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;

    public table_colums: any[] = ['build','room', 'typeRoom','name','membership','dateInit','dateEnd','amountOutstanding', 'totalBeds', 'roomateFlip', 'checkIn', 'checkOut','more'];

    public tenantList: any;
    public getTenantList():void {
        this.loader.showLoader();
        this._services.service_general_get('Tenant/getGeneralTenantList')
            .subscribe( (response: any) => {
                this.loader.hideLoader();
                if( response.result == 'Sucess' ) {
                    this.tenantList = new MatTableDataSource(response.item);
                    this.tenantList.paginator = this.paginator;
                    this.tenantList.sort = this.sort;

                    console.log('List => ', response.item );

                }

            }, (error: any) => {
                this.loader.hideLoader();
                console.log('Error GetList => ', error);

            })

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
        this.tenantList.filter = filterValue.trim().toLowerCase();
        if (this.tenantList.paginator) {
          this.tenantList.paginator.firstPage();
        }
    }

}