import { Component, OnInit, ViewChild, Input, forwardRef, TemplateRef, Output, EventEmitter } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { ToasterService, ToasterConfig } from 'angular2-toaster';
import { Utils } from '../../../utils/utils';
import { DatosService } from '../../../../datos.service';
import { InviteComponent } from '../invite/invite.component';
import * as moment from 'moment';

class ScheduleModel {
  public Id:number;
  public Date;
  public TimeStart;
  public TimeEnd; 
  //public Status:number;   
  constructor() {}
}

class ActivityModel {
  public Id:number;
  public Name:string;
  public Description:string;
  public Photo:string;
  public QuoteMax:number;
  public AmenityId:number;
  public Private:boolean;
  public UserId:number;
  public Status:number;
  public Schedules:ScheduleModel[] = [];
  constructor() {}
}

class InviteModel {
  public userid:number;
  public inviteidList:number[];
  public idActivity:number;
  public inviteMessage:string = "";
}

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.scss'],
  providers: [ToasterService]
})
export class DetalleComponent implements OnInit {    
  /////////////////////////////////////////////////////////
  // passed in initialState from reservations.component.ts
  idProps;  
  buildingIdProps;  
  responseData;
  
  ///////////////////////////////////////////
  // DETALLE VIEW
  eventDetail;    
  booksArray = [];

  ///////////////////////////////////////////
  // EDIT VIEW
  isEditVisible = false;
  showEditBtn = false;
  showInvite = false;
    ////////////////////////////////////////////////////////
    // CONFIGURATION
    imageInputLabel = "Choose file";
    showMin: boolean = false;
    showSec: boolean = false;
    isMeridian:boolean = false;
    minDate:Date = new Date();  
    ////////////////////////////////////////////////////////
    // Form
    datePicker;
    startTime:Date;
    endTime:Date;
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
               private toasterService: ToasterService
  ) { }

  ngOnInit() {    
    this.responseData = {action:'None'};
    var params = { "id": this.idProps };
    //debugger;
    this.heroService.service_general_get_with_params("Schedules", params).subscribe((res) => {
      //debugger;
      // console.log(res.item);
      if (res.result === "Success") {
        if (res.item.length < 0) {
          return;
        }
        this.eventDetail = res.item[0];
        console.log("info evento => ", this.eventDetail);
        this.isPastEvent();
        // this.isAllDayEvent();
      }
      else if (res.result === "Error") {
        console.log("Ocurrio un error" + res.detalle);
      }
      else {
        console.log("Error");
      }
    }, (err) => { console.log(err); });   
        
    this.heroService.service_general_get_with_params("Books", {scheduleId: this.idProps}).subscribe(
      (res)=> {
        console.log('Bef ===> ',res);
        if(res.result === "Success"){                    
          this.booksArray = res.item;
          this.LoadInvitableUsers();
          // this.booksArray.push(res.item[0]);this.booksArray.push(res.item[0]);this.booksArray.push(res.item[0]);this.booksArray.push(res.item[0]);this.booksArray.push(res.item[0]);this.booksArray.push(res.item[0]);this.booksArray.push(res.item[0]);
        } else if (res.result === "Error") { console.log("Ocurrio un error" + res.detalle); } 
        else { console.log("Error");}
      },
      (err)=> {console.log(err);}
    ); 

       
  }

  public Edit() {
    this.isEditVisible = !this.isEditVisible;
    //////////// LOAD editDetail into activityModel (model that will be sent to service) ///////////////
    this.acitivyModel.Id = this.eventDetail.activity.id;
    this.acitivyModel.Name = this.eventDetail.activity.name;
    this.acitivyModel.Description = this.eventDetail.activity.description;
    this.acitivyModel.Photo= this.eventDetail.activity.photo;
    this.acitivyModel.QuoteMax = this.eventDetail.activity.quoteMax;
    this.acitivyModel.AmenityId = this.eventDetail.activity.amenityId;
    this.acitivyModel.Private = this.eventDetail.activity.private;
    this.acitivyModel.UserId = this.eventDetail.activity.userId;
    this.acitivyModel.Status = this.eventDetail.activity.status;
    
    this.datePicker = moment(this.eventDetail.date).toDate();
    this.startTime = this.eventDetail.timeStart;
    this.endTime = this.eventDetail.timeEnd;
    this.scheduleModel.Id = this.eventDetail.id;
  }
  
  public Update() {                   
    ///////// Servidor le aumenta +5 horas por la zona horaria ////////////////////
    let date = moment(this.datePicker).format('YYYY/MM/DD');
    let startHour = moment(this.startTime).format('HH');
    let endHour = moment(this.endTime).format('HH');    
        
    this.scheduleModel.Date = moment(this.datePicker).startOf('day').format('YYYY-MM-DDTHH:mm:ss');
    this.scheduleModel.TimeStart = moment(`${date} ${startHour}`, 'YYYY/MM/DD HH').format('YYYY-MM-DDTHH:mm:ss');
    this.scheduleModel.TimeEnd = moment(`${date} ${endHour}`, 'YYYY/MM/DD HH').format('YYYY-MM-DDTHH:mm:ss');
    if (startHour == "00" && endHour == "00") { 
      this.scheduleModel.TimeEnd = moment(`${date} ${endHour}`, 'YYYY/MM/DD HH').add(1, 'day').format('YYYY-MM-DDTHH:mm:ss');
    }

    if (this.allDaySwitch) {
      this.scheduleModel.TimeStart = moment(this.datePicker).startOf('day').format('YYYY-MM-DDTHH:mm:ss');
      this.scheduleModel.TimeEnd = moment(this.datePicker).startOf('day').add(1, 'day').format('YYYY-MM-DDTHH:mm:ss');
    }
    
    ///////// Adding the complementaryData to the activityModel ///////////////////
    this.acitivyModel.Schedules = [];        
    this.acitivyModel.Schedules.push(this.scheduleModel);            
    console.log(this.acitivyModel);               
    // return;
    this.heroService.service_general_put(`Activity/${this.acitivyModel.Id}`, this.acitivyModel).subscribe(
      (res)=> {        
        // console.log(res);
        // this.responseData = {action:'Edit'};        

        if(res.result === "Success"){          
          console.log(res.item);  
          // this.responseData = {result:true, id:res.item.id, name:res.item.name};                
          this.responseData = {action:'Edit'};  
          this.modalRef.hide();
        } else if(res.result === "Error") {
          console.log(res.detalle, res.item);
          this.toasterService.pop('danger', 'Error', res.detalle);
        } else { console.log("Error"); this.toasterService.pop('danger', 'Error', 'An error has been ocurred.'); }

      },
      (err)=> { console.log(err);}       
    );        
  }
  
  public Delete() {    
    if (!confirm('Would you like to delete this event?')) { return;}    

    let params = this.eventDetail.activity.id;        
    this.heroService.service_general_delete(`Activity/${params}`).subscribe(
      (res)=> {        
        console.log(res);
        this.responseData = {action:'Delete'};        
      },
      (err)=> {
        console.log(err);
      },
      () => { this.modalRef.hide(); }      
    );
  }     

  private isPastEvent () {
    this.showEditBtn = moment(this.eventDetail.timeStart).isAfter(moment(), 'hour');
    this.showInvite = moment(this.eventDetail.timeStart).isAfter(moment(), 'hour');
  } 

  private isAllDayEvent () {
    this.allDaySwitch = true;
    if(moment(this.eventDetail.timeEnd).isAfter(moment(this.eventDetail.timeStart), 'day')) {
      if (moment(this.eventDetail.timeEnd).isAfter(moment(this.eventDetail.timeStart).startOf('day').add(1, 'day').add(1, 'second'), 'second')) {         
        this.allDaySwitch = false;
      }    
    } else {this.allDaySwitch = false;}      
  }

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

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  MODAL INVITE
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////  
// https://ng-select.github.io/ng-select#/templates    

// inviteModal:BsModalRef  
 // Invite () {    
  //   this.inviteModal = this.modalService.show(InviteComponent, {
  //     initialState: { idProps: 9999, responseData: {} },
  //     class: 'modal-lg'
  //   });
  //   this.inviteModal.content.closeBtnName = 'Close';                   
  // }  

  usersBuildingArray = [];    
  selectedUsers = [];
  inviteModel:InviteModel = new InviteModel();
  
  selectAll() { this.selectedUsers = this.usersBuildingArray.map(x => x.id); }
  unselectAll() { this.selectedUsers = []; }

  Invite () {    
    if (this.selectedUsers.length <= 0) { return; }

    this.inviteModel.idActivity = this.eventDetail.activity.id;
    this.inviteModel.inviteidList = this.selectedUsers;
    this.inviteModel.userid = this.eventDetail.activity.userId;        
    this.SentInvites();
  }   

  LoadInvitableUsers() {       
    this.heroService.service_general_get_with_params("Users", {buildingId: this.buildingIdProps, dateInit: this.eventDetail.timeStart,dateEnd:this.eventDetail.timeEnd}).subscribe(
      (res)=> {
        // console.log(res.item);
        console.log('Here ===> ', res);
        if(res.result === "Success"){                    
          this.usersBuildingArray = res.item;                       
          this.usersBuildingArray = this.usersBuildingArray.filter(user => {                        
            return !this.booksArray.map(book => book.user.id).includes(user.id); 
          });         
        } else if (res.result === "Error") { console.log("Ocurrio un error" + res.detalle); } 
        else { console.log("Error");}
      },
      (err)=> {console.log(err);}
    );  
  }  

  private SentInvites() {
    this.heroService.service_general_post("Message/SentInviteActivity", this.inviteModel).subscribe(
      (res)=> {
        console.log(res);
        if(res.result === "Success"){                    
          this.selectedUsers = [];
          this.toasterService.pop('success', 'Success', 'Invitations sent.');
        } else if (res.result === "Error") { 
          console.log("Ocurrio un error" + res.detalle); 
          this.toasterService.pop('danger', 'Error', 'Error Sending invites.');
        } 
        else { console.log("Error"); this.toasterService.pop('danger', 'Error', 'Error Sending invites.');}
      },
      (err)=> {console.log(err); this.toasterService.pop('danger', 'Error', 'Error Sending invites.');}
    );
  }
}
