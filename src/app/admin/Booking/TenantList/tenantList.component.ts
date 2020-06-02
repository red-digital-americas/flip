import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatosService } from '../../../../datos.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LoaderComponent } from '../../../../ts/loader';
import { SystemMessage } from '../../../../ts/systemMessage';

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
    ) { }

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;

    displayedColumns: string[] = ['room', 'typeRoom', 'name', 'membership', 'dateInit', 'dateEnd', 'amountOutstanding', 'totalBeds', 'roomateFlip', 'checkIn', 'checkOut', 'active', 'idUser'];
    tenantList;
    buildingId;
    public section: string;

    loader = new LoaderComponent();
    systemMessage = new SystemMessage();

    ngOnInit() {
        this.section = 'tenantList';
        this.buildingId = this.route.snapshot.paramMap.get('id');
        this.getTenantList(this.buildingId);
        
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

}