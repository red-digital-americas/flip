import { Component, OnInit, ViewChild, Input, forwardRef, TemplateRef, Output, EventEmitter } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { DatosService } from '../../../../datos.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss']  
})
export class DetalleComponent implements OnInit {    
  /////////////////////////////////////////////////////////
  // passed in initialState from reservations.component.ts
  idProps;    
  responseData;

  eventDetail;

  constructor( public modalRef: BsModalRef, private modalService: BsModalService, private heroService: DatosService    
  ) { }

  ngOnInit() {
    console.log(this.idProps);
    // TODO Change this for the real service that brings info of events   
    var params = { "iduser": 4, "id": 2 };
    this.heroService.service_general_post("Activity/GetListActivities", params).subscribe(
      (res)=> {
        if(res.result === "Success"){                    
          this.eventDetail = res.item[1];
        } else if (res.result === "Error") { console.log("Ocurrio un error" + res.detalle); } 
        else { console.log("Error");}
      },
      (err)=> {console.log(err);}
    );    
  }
  
  public Edit() {    
    // TODO Servicio para editar evento

    this.responseData = {id:1, name:'aaaaa', time:new Date()};
    this.modalRef.hide();
  }
  public Delete() {    
    if (!confirm('Would you like to delete this event?')) { return;}    

    // TODO Servicio eliminar evento

    this.responseData = false;
    this.modalRef.hide();    
  }  
}
