import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatosService } from '../../../../datos.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
    selector: 'membership-catalog',
    templateUrl: './memberShipCatalog.component.html',
    styleUrls: ['./memberShipCatalog.component.scss']
}) export class MembershipCatalogComponent implements OnInit {

    public section: string;

    constructor(
        public router: Router,
        private route: ActivatedRoute,
        public services: DatosService,
        ) {}

    displayedColumns: string[] = ['name', 'price', 'description', 'room', 'services', 'id'];
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;
    buildingId;
    membershipList;

    ngOnInit() {
        this.section = 'MembershipCatalog';
        this.buildingId = this.route.snapshot.paramMap.get('id');
        console.log('BuildingId ', this.buildingId);
        this.getMembershipList(this.buildingId);
    }

    getMembershipList(id) {
        let obj = { buildingId: id };
        this.services.service_general_get_with_params('Membership/GetMemberships', obj).subscribe((value) => {
            console.log('Reponse Total ', value);
            this.membershipList = new MatTableDataSource(value.item);
            console.info('Response', this.membershipList);
            this.membershipList.paginator = this.paginator;
            this.membershipList.sort = this.sort;
        });
    }

    viewDetail(id: number) {
        console.log('Id Membership', id);
        this.router.navigateByUrl( `MembershipDetail/${ id }`, { state: { id: this.buildingId, name: 'TenantList To Profile' } });
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.membershipList.filter = filterValue.trim().toLowerCase();
        if (this.membershipList.paginator) {
          this.membershipList.paginator.firstPage();
        }
    }

    goToPage() {
        this.router.navigateByUrl( `MembershipNew/${ this.buildingId }`, { state: { id: this.buildingId, name: 'TenantList To Profile' } });
    }
}
