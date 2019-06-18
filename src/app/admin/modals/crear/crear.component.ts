import { Component, OnInit, ViewChild, Input, forwardRef, TemplateRef, Output, EventEmitter } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { DatosService } from '../../../../datos.service';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.scss']  
})
export class CrearComponent implements OnInit {    
  /////////////////////////////////////////////////////////
  // passed in initialState from reservations.component.ts
  dateProps;
  responseData;  

  showMin: boolean = false;
  showSec: boolean = false;
  isMeridian:boolean = false;
  datePicker;
  startTime: Date = new Date();
  endTime: Date = new Date();
  
  constructor( public modalRef: BsModalRef, private modalService: BsModalService, private heroService: DatosService
  ) { }

  ngOnInit() {    
    this.datePicker = this.dateProps; 
  }
  
  public onClickOK() {    
    this.responseData = {id:1, name:'aaaaa', time:new Date()};
    this.modalRef.hide();
  }  
}
