import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DatosService } from '../../../datos.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { LoaderComponent } from '../../../ts/loader';
import { SystemMessage } from '../../../ts/systemMessage';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { EmailDetailComponent } from './email-detail/email-detail.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { FooterDetailComponent } from './footer-detail/footer-detail.component';

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss']
})
export class EmailComponent implements OnInit {

  constructor(
    public _services: DatosService,
    public _router: Router,
    public dialog: MatDialog,
    private modalService: BsModalService,
  ) { }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  mailList: any;
  displayedColumns: string[] = ['name', 'type', 'more'];
  loader = new LoaderComponent();
  systemMessage = new SystemMessage();
  modalRef: BsModalRef;
  ngOnInit() {
    this.getMails();
  }

  getMails() {
    this.loader.showLoader();
    this._services.service_general_get('Email/All/')
      .subscribe((response: any) => {
        this.loader.hideLoader();
        if (response.success === true) {
          this.mailList = new MatTableDataSource(response.result);
          this.mailList.paginator = this.paginator;
          this.mailList.sort = this.sort;
          console.log('List => ', response.result);
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
    this.mailList.filter = filterValue.trim().toLowerCase();
    if (this.mailList.paginator) {
      this.mailList.paginator.firstPage();
    }
  }

  viewDetail(element) {
    console.log('Obj ', element);
    if (element.type === 'Template') {
      this.modalRef = this.modalService.show(EmailDetailComponent, {
        initialState: { dataObj: element },
        class: 'modal-lg'
      });
    } else if (element.type === 'Footer'){
      this.modalRef = this.modalService.show(FooterDetailComponent, {
        initialState: { dataObj: element },
        class: 'modal-lg'
      });
    }
    this.modalRef.content.closeBtnName = 'Close';  
    
    let newSubscriber = this.modalService.onHide.subscribe(r=>{
      newSubscriber.unsubscribe();
      console.log('CrearResponse',this.modalRef.content.responseData);
      if (this.modalRef.content.responseData.result) { 
        //this.toasterService.pop('success', 'Success ', 'Your Activity was created correctly.');
        this.systemMessage.showMessage({
          kind: 'ok',
          time: 4777,
          message: {
            header: 'Template',
            text: 'Tu Template fue actualizada exitosamente.'
          }
        }); 
        this.getMails();
      }
    });  
  }

}
