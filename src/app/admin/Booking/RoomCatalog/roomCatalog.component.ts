import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatosService } from '../../../../datos.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
    selector: 'room-catalog',
    templateUrl: './roomCatalog.component.html',
    styleUrls: ['./roomCatalog.component.scss']
})
export class RoomCatalogComponent implements OnInit {

    public section: string;

    constructor(
        public router: Router,
        private route: ActivatedRoute,
        public services: DatosService,
    ) { }

    buildingId;
    roomList;
    displayedColumns: string[] = ['active', 'name', 'bed', 'description', 'typeRoom', 'id'];
    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;

    ngOnInit() {
        this.section = 'roomCatalog';
        this.buildingId = this.route.snapshot.paramMap.get('id');
        this.getRoomList(this.buildingId);
    }

    getRoomList(id) {
        const obj = { buildingId: id };
        this.services.service_general_get_with_params('Room/getRoom', obj).subscribe((value) => {
            console.log('Reponse Total ', value);
            this.roomList = new MatTableDataSource(value.item);
            console.log('Response', this.roomList);
            this.roomList.paginator = this.paginator;
            this.roomList.sort = this.sort;
        });
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.roomList.filter = filterValue.trim().toLowerCase();
        if (this.roomList.paginator) {
          this.roomList.paginator.firstPage();
        }
    }

    viewDetail(id: number) {
        console.log('Id Membership', id);
        this.router.navigateByUrl( `room/${ id }`, { state: { id: this.buildingId, name: 'TenantList To Profile' } });
    }

    goToPage() {
        this.router.navigateByUrl( `roomNew/${ this.buildingId }`, { state: { id: this.buildingId, name: 'TenantList To Profile' } });
    }

}
