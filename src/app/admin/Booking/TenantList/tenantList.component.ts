import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatosService } from '../../../../datos.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

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

    displayedColumns: string[] = ['typeRoom', 'name', 'age', 'membership', 'dateInit', 'dateEnd', 'amountOutstanding', 'idUser'];
    tenantList;
    buildingId;
    public section: string;
    ngOnInit() {
        this.section = 'tenantList';
        this.buildingId = this.route.snapshot.paramMap.get('id');
        this.getTenantList(this.buildingId);
        
    }

    getTenantList(id) {
        let obj = { buildingId: id };
        this.services.service_general_get_with_params('Tenant/getTenantList', obj).subscribe((value) => {
            this.tenantList = new MatTableDataSource(value.item);
            console.info('Response', this.tenantList);
            this.tenantList.paginator = this.paginator;
            this.tenantList.sort = this.sort;
        });
    }

    viewDetail(id: number) {
        console.log('Id user', id);
        sessionStorage.setItem('name_section_active', 'Tenant Profile' );
        this.router.navigateByUrl( `app-profile/${ id }`, { state: { id: this.buildingId, name: 'TenantList To Profile' } });
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.tenantList.filter = filterValue.trim().toLowerCase();
        if (this.tenantList.paginator) {
          this.tenantList.paginator.firstPage();
        }
    }

}