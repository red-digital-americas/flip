import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatosService } from '../../../../datos.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LoaderComponent } from '../../../../ts/loader';
import { SystemMessage } from '../../../../ts/systemMessage';

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
    ) {}

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
                      text: error.detalle
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

}
