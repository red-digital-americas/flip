import { Component, OnInit, ViewChild } from '@angular/core';
import { DatosService } from '../../../../datos.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
    selector: 'general_tenantlist',
    templateUrl: './GeneralTenantList.component.html',
    styleUrls: ['./GeneralTenantList.component.scss']
}) export class GeneralTenantListComponent implements OnInit {

    constructor(
        public _services: DatosService,
        public _router: Router
    ) {}

    ngOnInit() {

        this.getTenantList();

    }

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;

    public table_colums: any[] = ['build','room','name','age','membership','dateInit','dateEnd','amountOutstanding','more'];

    public tenantList: any;
    public getTenantList():void {

        this._services.service_general_get('Tenant/getGeneralTenantList')
            .subscribe( (response: any) => {

                if( response.result == 'Sucess' ) {

                    this.tenantList = new MatTableDataSource(response.item);
                    this.tenantList.paginator = this.paginator;
                    this.tenantList.sort = this.sort;

                    console.log('List => ', response.item );

                }

            }, (error: any) => {

                console.log('Error GetList => ', error);

            })

    }

    public goToPage( the_page: string ):void {

        this._router.navigateByUrl( the_page );

    }

    public goToProfile( profile: any ):void {

        sessionStorage.setItem('id_section_active', '1');
        this.goToPage(`app-profile/${ profile.idUser }`);

    }

}