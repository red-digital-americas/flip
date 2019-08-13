import { Component, OnInit, ViewChild, Input, forwardRef, TemplateRef, Output, EventEmitter } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { Utils } from '../../../utils/utils';
import { ActivatedRoute } from '@angular/router';
import { ToasterService, ToasterConfig } from 'angular2-toaster';
import { DatosService } from '../../../../datos.service';
import * as moment from 'moment';

class ScheduleModel {
  public Date;
  public TimeStart;
  public TimeEnd;
  public ActivityId:number;
  public Status:number = 0;
  constructor() {}
}

class ActivityModel {
  public Name:string = "";
  public Description:string = "";
  public Photo:string = "assets/img/Coliving.jpg";
  public QuoteMax:number = 30;
  public AmenityId:number;
  public Private:boolean = false;
  public UserId:number;
  public Status:number = 0;
  public Schedules:ScheduleModel[] = [];
  constructor() {}
}

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.scss'],
  providers: [ToasterService]
})
export class CrearComponent implements OnInit {    
  /////////////////////////////////////////////////////////
  // passed in initialState from reservations.component.ts
  dateProps;  //dateProps.date, dateProps.dateStr, dateProps.view.type = "dayGridMonth" | "timeGridWeek" | "timeGridDay"
  amenityIdProps;
  buildingIdProps;
  responseData;  

  ////////////////////////////////////////////////////////
  // CONFIGURATION
  imageInputLabel = "Choose file";
  showMin: boolean = false;
  showSec: boolean = false;
  isMeridian:boolean = false;
  minDate:Date = new Date();

  usersArray = [];

  ////////////////////////////////////////////////////////
  // Form
  datePicker;
  startTime;
  endTime;
  allDaySwitch = false;

  scheduleModel:ScheduleModel = new ScheduleModel();    // For this moment only supports 1 schedule
  acitivyModel:ActivityModel = new ActivityModel();
  public newImages: any[] = [];


  public toasterconfig: ToasterConfig = new ToasterConfig({
    tapToDismiss: true,
    timeout: 3000,
    positionClass: "toast-top-center",
  });
  
  constructor( public modalRef: BsModalRef, private modalService: BsModalService, private heroService: DatosService,
               private toasterService: ToasterService, private route: ActivatedRoute
  ) { }

  ngOnInit() {    
    this.datePicker = this.dateProps.date; 
    if (this.dateProps.view.type === 'timeGridWeek' || this.dateProps.view.type === 'timeGridDay') {
      this.startTime = moment(this.dateProps.dateStr).toDate();
      this.endTime = moment(this.startTime).add(1, 'hour').toDate();
    } else {
      this.startTime = moment(new Date()).add(1, 'hour').toDate();
      this.endTime = moment(new Date()).add(2, 'hour').toDate();
    }
    
    this.responseData = {result:false};    
    this.GetUsers();
  }

  GetUsers() {   
    var params = { buildingId: this.buildingIdProps};       
    this.heroService.service_general_get_with_params("Users", params).subscribe(
      (res)=> {
        if(res.result === "Success"){                    
          this.usersArray = res.item;     
          if (this.usersArray.length <= 0) { return; }  
          this.acitivyModel.UserId = this.usersArray[0].id;
        } else if(res.result === "Error") {
          console.log("Ocurrio un error" + res.detalle);
        } else {
          console.log("Error");
        }
      },
      (err)=> {console.log(err);}
    );        
  }
  
  public AddActivity() {            
    let date = moment(this.datePicker).format('YYYY/MM/DD');
    let startHour = moment(this.startTime).format('HH');
    let endHour = moment(this.endTime).format('HH');
    
    this.scheduleModel.Date = moment(this.datePicker).startOf('day').format('YYYY-MM-DDTHH:mm:ss');
    this.scheduleModel.TimeStart = moment(`${date} ${startHour}`, 'YYYY/MM/DD HH').format('YYYY-MM-DDTHH:mm:ss');
    this.scheduleModel.TimeEnd = moment(`${date} ${endHour}`, 'YYYY/MM/DD HH').format('YYYY-MM-DDTHH:mm:ss');

    if (this.allDaySwitch) {
      this.scheduleModel.TimeStart = moment(this.datePicker).startOf('day').format('YYYY-MM-DDTHH:mm:ss');
      this.scheduleModel.TimeEnd = moment(this.datePicker).startOf('day').add(1, 'day').format('YYYY-MM-DDTHH:mm:ss');
    }
    
    ///////// Adding the complementaryData to the activityModel ///////////////////
    this.acitivyModel.Schedules = [];
    this.acitivyModel.Schedules.push(this.scheduleModel);
    //this.acitivyModel.UserId = 4;                             // ALREADY ASOCIATED WITH NGMODEL, ONLY FOR REMINDER
    this.acitivyModel.AmenityId = this.amenityIdProps;
    
    console.log(this.acitivyModel);

    this.heroService.service_general_post("Activity", this.acitivyModel).subscribe(
      (res)=> {
        console.log(res);
        if(res.result === "Success"){          
          console.log(res.item);  
          this.responseData = {result:true, id:res.item.id, name:res.item.name};                
          this.modalRef.hide();
        } else if(res.result === "Error") {
          console.log(res.detalle);          
          this.toasterService.pop('danger', 'Error', res.detalle);
        } else { console.log("Error"); this.toasterService.pop('danger', 'Error', 'An error has been ocurred.'); }
      },
      (err)=> {console.log(err);}      
    );             
  }  

  TipoReservacion(tipoReservacion) { this.acitivyModel.Private = tipoReservacion; }

  prepareImages(e) {    
    if (Utils.isDefined(e.srcElement.files)) {
      for (let f of e.srcElement.files) {        
        this.newImages.push(f);
      }
    }
    this.addImages();
  }

  addImages() {
    let url: string = '';
    if (!Utils.isEmpty(this.newImages)) {
      for (let f of this.newImages) {        
        this.imageInputLabel = f.name;
        this.heroService.UploadImgSuc(f).subscribe((r) => {
          if (Utils.isDefined(r)) {
            url = <string>r.message;            
            url = url.replace('/Imagenes', this.heroService.getURL() + 'Flip');            
            this.acitivyModel.Photo = url;            
            this.newImages = [];
          }
        })
      }
    }
  }

}
