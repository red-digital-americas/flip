import { Component, OnInit, ViewChild, Input, forwardRef, TemplateRef, Output, EventEmitter } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
// import { ApiServices } from '../../../services/api.services';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

const INLINE_EDIT_CONTROL_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DetalleComponent),
  multi: true
};
@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
  providers: [
    // ApiServices,
    INLINE_EDIT_CONTROL_VALUE_ACCESSOR
  ]
})
export class DetalleComponent implements OnInit {    
  /////////////////////////////////////////////////////////
  // passed in initialState from reservations.component.ts
  id;  
  title;
  responseData;
  // @Output() action = new EventEmitter();
  
  // modalRef2: BsModalRef;

  constructor( public modalRef: BsModalRef, private modalService: BsModalService, 
    // private apiservices: ApiServices
  ) { }

  ngOnInit() {
    console.log(this.id, this.title);
    // this.apiservices.service_general_get("/AdministracionCuentas/GetAccountById/"+this.cveCliente).subscribe((res)=>{
    //   console.log(res);      
    // });
  }
  
  public onClickOK() {
    // this.action.emit(true); //Can send your required data here instead of true
    this.responseData = {id:1, name:'aaaaa', time:new Date()};
    this.modalRef.hide();
  }
  public onClickCANCEL() {
    // this.action.emit(false); //Can send your required data here instead of true
    this.responseData = false;
    this.modalRef.hide();    
  }

  // For another Modal
  // actualiza(template: TemplateRef<any>) {
  //   this.modalRef2 = this.modalService.show(template, { class: 'second' });
  //   this.modalRef.hide();
  //   this.modalRef = null;
  // }

}
