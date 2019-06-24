import { Component, OnInit, ViewChild, Input, forwardRef, TemplateRef, Output, EventEmitter } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ToasterService, ToasterConfig } from 'angular2-toaster';
import { Utils } from '../../../utils/utils';
import { DatosService } from '../../../../datos.service';
import * as moment from 'moment';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.scss'],
  providers: [ToasterService]
})
export class InviteComponent implements OnInit {    
  /////////////////////////////////////////////////////////
  // passed from detalle.component.ts (modal)
  idProps;    
  responseData;
  

  constructor( public modalRef: BsModalRef, private heroService: DatosService,               
  ) { }

  ngOnInit() {    
    this.responseData = {action:'None'};

    var params = { "id": this.idProps };
    this.heroService.service_general_get_with_params("Schedules", params).subscribe(
      (res)=> {
        // console.log(res.item);
        if(res.result === "Success"){          
          if (res.item.length < 0) { return; }
          
        } else if (res.result === "Error") { console.log("Ocurrio un error" + res.detalle); } 
        else { console.log("Error");}
      },
      (err)=> {console.log(err);}
    );   
     
  }  

  Invitar () {
    console.log(this.idProps);
    this.responseData = {action:'Invite'};
    this.modalRef.hide();
  }
    
}
