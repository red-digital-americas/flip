import { Component, OnInit, ViewChild, Input, forwardRef, TemplateRef, Output, EventEmitter } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToasterService, ToasterConfig } from 'angular2-toaster';
import { Utils } from '../../../utils/utils';
import { DatosService } from '../../../../datos.service';
//import { InviteComponent } from '../invite/invite.component';
import * as moment from 'moment';
import { SystemMessage } from '../../../../ts/systemMessage';
import { LoaderComponent } from '../../../../ts/loader';

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
    loader = new LoaderComponent();
    ////////////////////////////////////////////////////////
    // Form
    datePicker;
    startTime:Date;
    endTime:Date;
    allDaySwitch = false;

    scheduleModel:ScheduleModel = new ScheduleModel();    // For this moment only supports 1 schedule
    acitivyModel:ActivityModel = new ActivityModel();
    public newImages: any[] = [];
    public system_message: SystemMessage = new SystemMessage();


  public toasterconfig: ToasterConfig = new ToasterConfig({
    tapToDismiss: true,
    timeout: 3000,
    positionClass: "toast-top-center",
  });

  constructor( public modalRef: BsModalRef, private modalService: BsModalService, private heroService: DatosService,
               private toasterService: ToasterService
  ) { }

  ngOnInit() {    
    this.loader.showLoader();
    this.responseData = {action:'None'};
    var params = { "id": this.idProps };
    this.heroService.service_general_get_with_params("Books", {scheduleId: this.idProps}).subscribe(
      (res)=> {
       // console.log('Books Lis ===> ',res);
        if(res.result === "Success"){  
          this.booksArray = res.item;
          this.heroService.service_general_get_with_params("Schedules", params).subscribe((res) => {  
            if (res.result === "Success") {
              this.loader.hideLoader(); 
              if (res.item.length < 0) {
                return;
              }
              this.eventDetail = res.item[0];
             // console.log("Schedule detail => ", this.eventDetail);
              this.isPastEvent();
              this.LoadInvitableUsers();
            }
            else if (res.result === "Error") {
              this.loader.hideLoader(); 
              console.log("Ocurrio un error" + res.detalle);
            }
            else {
              this.loader.hideLoader(); 
              console.log("Error");
            }
          }, (err) => { 
            this.loader.hideLoader(); 
            console.log(err); 
          }); 
        } 
        else if (res.result === "Error") 
        {
          this.loader.hideLoader(); 
          console.log("Ocurrio un error" + res.detalle);
        } 
        else { 
          this.loader.hideLoader(); 
          console.log("Error");
        }
      },
      (err)=> {
        console.log(err);
        this.loader.hideLoader(); 
      }
    );   
  }

public RefrescarListaInvitados()
{
  this.heroService.service_general_get_with_params("Books", {scheduleId: this.idProps}).subscribe(
    (res)=> {
      console.log('Books Lis ===> ',res);
      if(res.result === "Success"){  
        this.booksArray = res.item;
      } 
      else if (res.result === "Error") 
      { 
        console.log("Ocurrio un error" + res.detalle);
      } 
      else { 
        console.log("Error");
      }
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
    //console.log(this.acitivyModel);               
    // return;
    this.loader.showLoader(); 
    this.heroService.service_general_put(`Activity/${this.acitivyModel.Id}`, this.acitivyModel).subscribe(
      (res)=> {      
        if(res.result === "Success"){          
          console.log(res.item);  
          // this.responseData = {result:true, id:res.item.id, name:res.item.name};                
          this.responseData = {action:'Edit'};  
          this.modalRef.hide();
          this.loader.hideLoader(); 
        } else if(res.result === "Error") {
          this.loader.hideLoader(); 
          //console.log(res.detalle, res.item);
          //this.toasterService.pop('danger', 'Error', res.detalle);
          this.system_message.showMessage({
            kind: 'error',
            time: 4777,
            message: {
              header: 'Error',
              text: res.detalle
            }
          });
        } else { 
          this.loader.hideLoader(); 
          this.system_message.showMessage({
            kind: 'error',
            time: 4777,
            message: {
              header: 'Error',
              text: 'An Error has ocurred'
            }
          });

         }

      },
      (err)=> { 
        this.loader.hideLoader(); 
        console.log(err);
      }       
    );        
  }
  
  public Delete() {    

    if (!confirm('¿ Estas seguro de eliminar el Evento ?')) { return;}  
    let params = this.eventDetail.activity.id;  
    this.loader.showLoader();       
    this.heroService.service_general_delete(`Activity/${params}`).subscribe(
      (res)=> {        
        this.loader.hideLoader(); 
        this.responseData = {action:'Delete'};        
      },
      (err)=> {
        this.loader.hideLoader(); 
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
        this.loader.showLoader(); 
        this.heroService.UploadImgSuc(f).subscribe((r) => {
          if (Utils.isDefined(r)) {
            this.loader.hideLoader(); 
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
    if (this.selectedUsers.length <= 0) {

      this.system_message.showMessage({
        kind: 'error',
        time: 3777,
        message: {
          header: 'Completar',
          text: 'Por favor seleccione usuarios.'
        }
      });
      
      return;
    }

    this.inviteModel.idActivity = this.eventDetail.activity.id;
    this.inviteModel.inviteidList = this.selectedUsers;
    this.inviteModel.userid = this.eventDetail.activity.userId;        
    this.SentInvites();
  }   

  LoadInvitableUsers() {      
    this.heroService.service_general_get_with_params("Users", {
                                                    buildingId: this.buildingIdProps, 
                                                    dateInit: this.eventDetail.timeStart,
                                                    dateEnd:this.eventDetail.timeEnd}).subscribe(
      (res)=> {
        // console.log(res.item);
        console.log('Here ===> ', res);
        if(res.result === "Success"){                    
          this.usersBuildingArray = res.item;                       
          this.usersBuildingArray = this.usersBuildingArray.filter(user => {                        
            return !this.booksArray.map(book => book.user.id).includes(user.id); 
          });
          this.usersBuildingArray = this.usersBuildingArray.filter(x => x.id !== this.eventDetail.activity.userId);
        } else if (res.result === "Error") { console.log("Ocurrio un error" + res.detalle); } 
        else { console.log("Error");}
      },
      (err)=> {console.log(err);}
    );  
  }  

  private SentInvites() {
    this.loader.showLoader();
    this.heroService.service_general_post("Message/SentInviteActivity", this.inviteModel).subscribe(
      (res)=> {
        this.loader.hideLoader();
        if(res.result === "Success"){                    
          this.selectedUsers = [];
          this.system_message.showMessage({
            kind: 'ok',
            time: 4777,
            message: {
              header: 'Invitaciones Enviadas',
              text: 'Los invitados recibirán un mensaje.'
            }
          });
          this.RefrescarListaInvitados();
          //this.modalRef.hide();
        } else if (res.result === "Error") { 
          console.log("Ocurrio un error" + res.detalle); 
          this.system_message.showMessage({
            kind: 'error',
            time: 4777,
            message: {
              header: 'Error',
              text: 'Por favor intente mas tarde.'
            }
          });
        } 
        else {
          this.system_message.showMessage({
            kind: 'error',
            time: 4777,
            message: {
              header: 'Error',
              text: 'Por favor intente mas tarde.'
            }
          });
        }
      },
      (err)=> {
        this.system_message.showMessage({
          kind: 'error',
          time: 4777,
          message: {
            header: 'Error',
              text: 'Por favor intente mas tarde.'
          }
        });
      }
    );
  }
}
