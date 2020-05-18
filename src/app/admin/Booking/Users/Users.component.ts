import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatosService } from '../../../../datos.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LoaderComponent } from '../../../../ts/loader';
import { SystemMessage } from '../../../../ts/systemMessage';

@Component({
    selector: 'users',
    templateUrl: './Users.component.html',
    styleUrls: ['./Users.component.scss']
}) export class UsersComponent implements OnInit {

    constructor(
        public _services: DatosService,
        public _router: Router
    ) {}

    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: true }) sort: MatSort;

    displayedColumns: string[] = ['active', 'name', 'email', 'systemType', 'rfc', 'birth', 'more'];
    userList: any;

    loader = new LoaderComponent();
    systemMessage = new SystemMessage();

    ngOnInit() {
        this.getUserList();
    }

    getUserList() {
        this.loader.showLoader();
        this._services.service_general_get('UsersAdmin/')
            .subscribe( (response: any) => {
                this.loader.hideLoader();
                if ( response.result === 'Success' ) {
                    this.userList = new MatTableDataSource(response.item);
                    this.userList.paginator = this.paginator;
                    this.userList.sort = this.sort;
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
        this.userList.filter = filterValue.trim().toLowerCase();
        if (this.userList.paginator) {
          this.userList.paginator.firstPage();
        }
    }

    viewDetail(element) {
        console.log('Id User', element);
        this._router.navigateByUrl( `Users-Detail/${ element.id }`, { state: { id: 1, name: 'UserList To Users-Detail' } });
    }

    goToPage() {
        this._router.navigateByUrl( `Users-New/`, { state: { id: 1, name: 'UserList To Users-New' } });
    }
}
