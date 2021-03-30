import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatosService } from '../../../datos.service';
import { Utils } from '../../utils/utils';
import { ToasterService, ToasterConfig } from 'angular2-toaster';

import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import bootstrapPlugin from '@fullcalendar/bootstrap'
import {DayBgRow, DayGrid, DayGridSeg, DayGridSlicer, DayGridView }  from '@fullcalendar/daygrid';
import { EventInput } from '@fullcalendar/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { BsComponentRef } from 'ngx-bootstrap/component-loader/bs-component-ref.class';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { DetalleComponent } from '../modals/detalle/detalle.component';
import { CrearComponent } from '../modals/crear/crear.component';
import * as moment from 'moment';
import { SystemMessage } from '../../../ts/systemMessage';
import { LoaderComponent } from '../../../ts/loader';



class ScheduleModel {
  public id:number;
  public Date;
  public TimeStart;
  public TimeEnd;
  public ActivityId:number;  
  constructor() {}
}

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss'],
  providers: [ToasterService]
})

export class ReservationsComponent implements OnInit {
  
  public toasterconfig: ToasterConfig = new ToasterConfig({ tapToDismiss: true, timeout: 3000, positionClass: "toast-top-center"});
  IDUSR: string = "0";
  IDBUILD: string = "0";
  
  amenitiesArray = [];
  amenitySelect;
  
  public section:string;
  
  constructor(  private router: Router, private heroService: DatosService, private route: ActivatedRoute,  
                private modalService: BsModalService, private toasterService: ToasterService           
  ) { }

  ngOnInit() {
    if (localStorage.getItem("user") == undefined) {
      this.router.navigate(['/login']);
    }
    else {      
      this.IDUSR = JSON.parse(localStorage.getItem("user")).id;
      this.IDBUILD = this.route.snapshot.params['id']; 
      this.getToday();      
      this.GetAmenities();         
      this.InitCalendarSetup();
      this.section = 'reservations';
    }
  }        

  private GetAmenities() {    
    this.heroService.service_general_get_with_params("Amenity", {idBuilding: this.IDBUILD}).subscribe(      
      (res)=> {
        if(res.result === "Success"){                    
          this.amenitiesArray = res.item;
          if (this.amenitiesArray.length <= 0) { return; }
          // this.amenitiesArray.push();
          this.amenitiesArray.push({id: 0, name: "All", description: "", buildingId: this.amenitiesArray[0].buildingId, photo: ""})
          this.amenitiesArray.sort((a, b) => a.id - b.id);
          this.amenitySelect = this.amenitiesArray[0].id;
          this.GetEvents();     
          console.log('AMENITIES', this.amenitiesArray);         
        } else if(res.result === "Error") { console.log("Ocurrio un error" + res.detalle); } 
        else { console.log("Error"); }
      },
      (err)=> {console.log(err);}
    );  
  }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  CALENDAR
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 
  @ViewChild('calendar', {read: FullCalendarComponent, static: true}) calendarComponent: FullCalendarComponent; 

  calendarPlugins = [dayGridPlugin, listPlugin, interactionPlugin, timeGridPlugin, bootstrapPlugin ];      
  calendarWeekends = true;  
  activeStart;
  activeEnd;

  calendarEvents: EventInput[] = [
    // { id: 10, title: 'Event Now', start: new Date() },
    // { id: 3, title: 'Evento A', start: new Date(), startEditable:true, durationEditable:true, overlap: false },    
    
    // areas where "Meeting" must be dropped
    // { groupId: 'availableForMeeting', start: '2019-06-11T10:00:00', end: '2019-06-11T16:00:00', rendering: 'background', color: '#00ff00'},
    // { groupId: 'availableForMeeting', start: '2019-06-13T10:00:00', end: '2019-06-13T16:00:00', rendering: 'background', color: '#00ff00'},
    // red areas where no events can be dropped
    // { start: '2019-06-24', end: '2019-06-28', overlap: false, rendering: 'background', color: '#ff9f89' },
    // { start: '2019-06-06', end: '2019-06-08', overlap: false, rendering: 'background', color: '#ff9f89' },
    // { start: '2019-06-01', end: '2019-06-04', overlap: false, rendering: 'background', color: '#0000ff' }
  ];

  schedulesArray = [];
  scheduleModel:ScheduleModel;    // For Modifications through Calendar handles Events  
  
  GetEvents() {  
    // let params = {buildingId: this.IDBUILD, amenityId: this.amenitySelect};        
    let params = {buildingId: this.IDBUILD, amenityId: this.amenitySelect, startDate: this.activeStart, endDate: this.activeEnd};      
    this.heroService.service_general_get_with_params("Schedules", params).subscribe(
      (res)=> {
        if(res.result === "Success"){   
          console.log(res.item);
          this.schedulesArray = res.item;
          this.LoadEventsToCalendar(this.schedulesArray);
        } else if(res.result === "Error") {
          console.log("Ocurrio un error" + res.detalle);          
        } else {
          console.log("Error");          
        }
      },
      (err)=> {console.log(err);}
    );  
  }

  /////////////////////////////////// FULL CALENDAR INPUTS /////////////////////////////////////////////////////////////////  
  // https://github.com/fullcalendar/fullcalendar-angular/blob/master/projects/fullcalendar/src/lib/fullcalendar-options.ts
  private InitCalendarSetup () {
    this.calendarComponent.eventAllow = this.handleEventAllow;        
  }

  handleEventAllow(dropLocation, draggedEvent) {          
    // console.log(draggedEvent.title , draggedEvent.id ,draggedEvent.start, draggedEvent.end); 
    
    //////// No permite mover eventos pasados ///////////////////////////////////////////////
    // if (moment(draggedEvent.start).isBefore(moment(), 'day')) { return false; }
    if (moment(draggedEvent.start).isSameOrBefore(moment(), 'hour')) { return false; }
    //////// Eventos con duración solo de un dia ////////////////////////////////////////////
    // if (moment(dropLocation.end).isAfter(moment(dropLocation.start), 'day')) { return false; }    
    if(moment(dropLocation.end).isAfter(moment(dropLocation.start), 'day')) {
      if (moment(dropLocation.end).isAfter(moment(dropLocation.start).startOf('day').add(1, 'day').add(1, 'second'), 'second')) { 
        return false; 
      }    
    }    
    //////// Fecha destino a mover debe ser hoy o posterior /////////////////////////////////                   
    // return moment(dropLocation.start).isSameOrAfter(moment(), 'day');    
    return moment(dropLocation.start).isAfter(moment(), 'hour');  
  }    

  /////////////////////////////////// FULL CALENDAR OUTPUS/HANDLERS /////////////////////////////////////////////////////////
  handleDateClick(arg) {       
    // console.log(arg.date, arg.dateStr, arg.view.type); //"dayGridMonth" "timeGridWeek" "timeGridDay"    
    this.Crear(arg);    
  }

  handleEventClick(arg) {
    // console.log(arg.event.title, arg.event.id, arg.event.start, arg.event.end);    
    this.VerDetalle(arg.event.id);
  }

  handleEventDrop(arg) {          
    // console.log(arg.event.title, arg.event.id, arg.event.start, arg.event.end);     
    this.GetScheudleById(arg);
  }

  handleEventResize(arg) {        
    // console.log(arg.event.title, arg.event.id, arg.event.start, arg.event.end);           
    this.GetScheudleById(arg);
    //this.GetEvents();             // Not necesary, already added in the NativeCalendarModel, refresh only needed when change amenity or calendarView(getDates with start/end filter)
  }

  handleSelect(arg) {
    // console.log(arg);
    // this.VerDetalle();
  }     

  handleDatesRender(info) {
    // console.log(info.view.type);
    // console.log(info.view.activeEnd, info.view.activeStart, info.view.currentEnd, info.view.currentStart); 
    this.activeStart = moment(info.view.activeStart).startOf('day').subtract(1, 'day').format('YYYY-MM-DDTHH:mm:ss');
    this.activeEnd = moment(info.view.activeEnd).endOf('day').format('YYYY-MM-DDTHH:mm:ss');

    let fcNextBtn = document.getElementsByClassName('fc-next-button')[0];
    let fcPrevBtn = document.getElementsByClassName('fc-prev-button')[0];
    
    if (moment(info.view.activeEnd).isBefore(moment().add(-4, 'month'), 'month')) { 
      fcPrevBtn != undefined ? fcPrevBtn.setAttribute('disabled', 'true') : null;
    } else {
      fcPrevBtn != undefined ? fcPrevBtn.removeAttribute('disabled') : null;
    }

    if (moment(info.view.activeEnd).isAfter(moment().add(6, 'month'), 'month')) { 
      fcNextBtn != undefined ? fcNextBtn.setAttribute('disabled', 'true') : null;
    } else {
      fcNextBtn != undefined ? fcNextBtn.removeAttribute('disabled') : null;
    }

    if (this.amenitySelect != undefined) {this.GetEvents();}    // Avoid error first time
  }

  Refresh() {       
    console.log(this.calendarComponent.getApi().view.type);
    console.log(this.calendarComponent.getApi().view.activeEnd, this.calendarComponent.getApi().view.activeStart, 
                this.calendarComponent.getApi().view.currentEnd, this.calendarComponent.getApi().view.currentStart);     
    this.GetEvents();
  }  

  private LoadEventsToCalendar(events:any) {
    this.calendarComponent.getApi().removeAllEvents();

    events.forEach(ev => {
      this.calendarComponent.getApi().addEvent(this.ParseEvent(ev));
    });

    // this.calendarComponent.getApi().refetchEvents();
  }

  private ParseEvent(event:any) {            
    let newEvent = { id: event.id, title: event.activity.name + ", " + event.user.name + " " + event.user.lastName + ", " + event.name , start: event.timeStart, end: event.timeEnd, startEditable:true, durationEditable:true, overlap: false, backgroundColor: event.activity.private ? '#d8209e' : '#3788d8' };
    return newEvent;
  }  

  ///////////////////////////////////////////////// SERVICIOS //////////////////////////////////////////////////////////////
  private UpdateSchedule(scheduleModel:ScheduleModel) {      
    this.heroService.service_general_put(`Schedules/${scheduleModel.id}`, scheduleModel).subscribe(
      (res)=> {                
        if(res.result === "Success"){          
          //console.log(res.item);                        
          //this.toasterService.pop('success', 'Success ', 'Your Activity was modified correctly.'); 
          this.system_message.showMessage({
            kind: 'ok',
            time: 3777,
            message: {
              header: 'Activity modified',
              text: 'Your Activity was modified correctly.'
            }
          });
        } else if(res.result === "Error") {
          // console.log(res.detalle);
          //this.toasterService.pop('danger', 'Error', res.detalle);
          this.system_message.showMessage({
            kind: 'error',
            time: 3777,
            message: {
              header: 'Error Activity',
              text: res.detalle
            }
          });
        } else { 
          this.system_message.showMessage({
            kind: 'error',
            time: 3777,
            message: {
              header: 'System Error',
              text: 'An error has been ocurred.'
            }
          });
          //console.log("Error"); this.toasterService.pop('danger', 'Error', 'An error has been ocurred.'); 
        }
      },
      (err)=> { console.log(err);}       
    ); 
  }

  private GetScheudleById(arg) {           
    this.heroService.service_general_get_with_params("Schedules", { id: arg.event.id }).subscribe(
      (res)=> {                
        if(res.result === "Success"){          
          // console.log(res.item);    
          this.scheduleModel = new ScheduleModel();
          this.scheduleModel = res.item[0];
          
          this.scheduleModel.Date = moment(arg.event.start).startOf('day').format('YYYY-MM-DDTHH:mm:ss');
          this.scheduleModel.TimeStart = moment(arg.event.start).format('YYYY-MM-DDTHH:mm:ss');
          this.scheduleModel.TimeEnd = moment(arg.event.end).format('YYYY-MM-DDTHH:mm:ss');
          this.scheduleModel.ActivityId = res.item[0].activity.id;
          // console.log(this.scheduleModel);
          this.UpdateSchedule(this.scheduleModel);
        } else if(res.result === "Error") {
          // console.log(res.detalle);
          this.toasterService.pop('danger', 'Error', res.detalle);
        } else { console.log("Error"); this.toasterService.pop('danger', 'Error', 'An error has been ocurred.'); }
      },
      (err)=> { console.log(err);}       
    ); 
  }


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  MODAL
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////  
  modalRef: BsModalRef;

  VerDetalle (id) {
    this.modalRef = this.modalService.show(DetalleComponent, {
      initialState: { idProps: id, buildingIdProps: this.IDBUILD, responseData: {} },
      class: 'modal-lg'
    });
    this.modalRef.content.closeBtnName = 'Close';  
    
    let newSubscriber = this.modalService.onHide.subscribe(r=>{
      newSubscriber.unsubscribe();
      console.log('DetalleResponse',this.modalRef.content.responseData);
      if(this.modalRef.content.responseData.action === 'Delete') {
        this.toasterService.pop('success', 'Success ', 'Your Activity was deleted correctly.');  
        this.GetEvents();
      } else if (this.modalRef.content.responseData.action === 'Edit') {
        this.toasterService.pop('success', 'Success ', 'Your Activity was modified correctly.');  
        this.GetEvents();
      }
    });      
  }  

  Crear (arg) { 
    console.log('Arg => ', arg);   
    //"dayGridMonth" "timeGridWeek" "timeGridDay"
    if(moment(arg.date).isBefore(moment(new Date()), 'day') && this.calendarComponent.getApi().view.type === 'dayGridMonth') { 
      this.calendarComponent.getApi().unselect(); return; 
    }   
    if( moment(arg.date).isSameOrBefore(moment(new Date()), 'hour') && 
        (this.calendarComponent.getApi().view.type === 'timeGridWeek' || 
        this.calendarComponent.getApi().view.type === 'timeGridDay' ) ) { 
      this.calendarComponent.getApi().unselect(); return; 
    }     

    this.modalRef = this.modalService.show(CrearComponent, {
      initialState: { dateProps: arg, amenityIdProps: this.amenitySelect, buildingIdProps: this.IDBUILD, responseData: {} },
      class: 'modal-lg'
    });
    this.modalRef.content.closeBtnName = 'Close';  
    
    let newSubscriber = this.modalService.onHide.subscribe(r=>{
      newSubscriber.unsubscribe();
      console.log('CrearResponse',this.modalRef.content.responseData);
      if (this.modalRef.content.responseData.result) { 
        //this.toasterService.pop('success', 'Success ', 'Your Activity was created correctly.');
        this.system_message.showMessage({
          kind: 'ok',
          time: 4777,
          message: {
            header: 'Activity created',
            text: 'Your Activity has been created correctly.'
          }
        });  
        this.GetEvents();
      }
    });      
  }
  
  ///////////////////////////////////////////////
  /////////// Holis ////////////////////////
  ////////////////////////////// Crayolis /////////
  ///////////////////////////////////////////////
  public system_message:SystemMessage = new SystemMessage();
  public host_list: any[] = [];
  public getHostCatalog():void {

    let params = {buildingId: this.IDBUILD};
  
    this.heroService.service_general_get_with_params("Users", params)
        .subscribe( (response: any) => {

          if( response.result == "Success" ) {

            this.host_list = response.item;

          }

        }, (error: any) => {

          this.system_message.showMessage({
            kind: 'error',
            time: 4777,
            message: {
              header: 'System Error',
              text: 'Users Catalog has not been loaded.'
            }
          });

        });

  }

  public show_modal:boolean = false;
  public showModal():void {

    this.reservation_data = new NewReservationModel();

    !this.show_modal ? 
      this.show_modal = true :
      this.show_modal = false;

    this.getHostCatalog();

  }

  public updateKindReservation( status:boolean = true ):void {

    this.reservation_data.Private = status;

  }

  public reservation_data: NewReservationModel = new NewReservationModel();
  public loader: LoaderComponent = new LoaderComponent();
  public newEventTrigger():void {

    this.reservation_data.Schedules[0].TimeStart = `${ this.reservation_data.Schedules[0].Date } ${ this.time_start }`;
    this.reservation_data.Schedules[0].TimeEnd = `${ this.reservation_data.Schedules[0].Date } ${ this.time_end }`;

    if( this.newEventFormValidator() ) {

      this.reservation_data.AmenityId = this.amenitySelect;
      this.newReserversationWS();

    } else {

      this.system_message.showMessage({
        kind: 'error',
        time: 4777,
        message: {
          header: 'Form Data',
          text: 'All inputs must be filled to continue'
        }
      });

    }    

  }

  public time_start:string = '';
  public time_end:string = '';
  public hourWorker( event_data: any, status:boolean = true ):void {
 
    const event = event_data.target;

    if( status ) {

      this.time_start = event.value;

    } else {

      this.time_end = event.value;

    }

  }

  public newReserversationWS():void {

    this.heroService.service_general_post("Activity", this.reservation_data)
        .subscribe( (response: any) => {

          console.log('Response del activity => ', response);

          if( response.result == "Success" ) {

            this.loader.showLoader();

            this.system_message.showMessage({
              kind: 'ok',
              time: 4777,
              message: {
                header: 'Event created',
                text: 'Event has been created successfully'
              }
            });

            this.showModal();
            this.Refresh();
            
            setTimeout( () => this.loader.hideLoader(), 1777);

          } else {

            this.system_message.showMessage({
              kind: 'error',
              time: 4777,
              message: {
                header: 'Event not created',
                text: response.detalle
              }
            });

          }

        }, (error: any) => {

          this.system_message.showMessage({
            kind: 'error',
            time: 4777,
            message: {
              header: 'System Error',
              text: 'Event can not be created, please contact support or try later.'
            }
          });

        });

  }

  public event_form_validator: any = {
    no_name: false,
    no_desc: false,
    no_host: false,
    no_date: false,
    no_shou: false,
    no_ehou: false,
    no_phot: false
  }
  public newEventFormValidator():boolean {

    let result:boolean = false;

    this.reservation_data.Name == '' ? 
      this.event_form_validator.no_name = true : 
      this.event_form_validator.no_name = false;
      
    this.reservation_data.Description == '' ? 
      this.event_form_validator.no_desc = true : 
      this.event_form_validator.no_desc = false; 

    this.reservation_data.UserId == 0 ? 
      this.event_form_validator.no_host = true : 
      this.event_form_validator.no_host = false; 

    this.reservation_data.Photo == '' ? 
      this.event_form_validator.no_phot = true : 
      this.event_form_validator.no_phot = false; 

    this.reservation_data.Schedules[0].Date == '' ? 
      this.event_form_validator.no_date = true : 
      this.event_form_validator.no_date = false;
      
    this.reservation_data.Schedules[0].TimeStart == '' ? 
      this.event_form_validator.no_shou = true : 
      this.event_form_validator.no_shou = false; 

    this.reservation_data.Schedules[0].TimeEnd == '' ? 
      this.event_form_validator.no_ehou = true : 
      this.event_form_validator.no_ehou = false; 

    for( let item in this.event_form_validator ) {

      if( this.event_form_validator[item] ) {

        return false;

      } else result = true;

    }

    return result;

  }

  public validateImageUpload( event_data:any, dimensions_image:string, target_image:string, name_image:string ):void {

    const event = event_data.target,
          dimensions_image_data = {
            get_dimensions: ( function() {

              const dimensions_split = dimensions_image.split('x'),
                    width = Number( dimensions_split[0] ),
                    height = Number( dimensions_split[1] );

              return {
                width: width,
                height: height
              }

            }())
          },
          image_limit_width = dimensions_image_data.get_dimensions.width,
          image_limit_height = dimensions_image_data.get_dimensions.height,
          id_image_container:any = document.getElementById( target_image ),
          name_image_container = document.getElementById( name_image ),
          native_image_uploaded = document.getElementById('image_real_dimension'),
          root_data = this;

    if( event.files && event.files[0] ) {

      const reader = new FileReader();

            reader.onload = function(e:any) {

              const image_convert:any = e.target.result,
                    validating_image = new Promise( (resolve) => {

                      native_image_uploaded.setAttribute('src', image_convert);
                      
                      setTimeout( () => {

                        const native_image_dimension = {
                          image: image_convert,
                          width: native_image_uploaded.offsetWidth,
                          height: native_image_uploaded.offsetHeight
                        };

                        resolve( native_image_dimension );

                      }, 277);
              
                    });

                    validating_image.then( ( image_data:any ) => {

                      if( image_limit_width === image_data.width && image_limit_height === image_data.height ) {
                        
                        id_image_container.setAttribute('src', image_data.image );
                        name_image_container.innerHTML = `<span class="image-name">${ event.files[0].name }</span>`;
                        id_image_container.classList.remove('no-image');
                        root_data.prepareImages( event_data );

                      } else {

                        id_image_container.src = '../../../assets/14.jpg';
                        root_data.reservation_data.Photo = '';
                        name_image_container.innerHTML = `Image must be <br /><span class="text-bold">${ dimensions_image }px</span>`;
                        id_image_container.classList.add('no-image');

                      }
                      
                    });

            }

            reader.readAsDataURL( event.files[0] );

    }
    
}

public today: string = '';
  public getToday():void {

      const date = new Date(),
            today = {
                day: date.getDate(),
                month: date.getMonth() + 1,
                year: date.getFullYear()
            },
            format_date = {
                day: function() {

                  let day = today.day < 10 ? `0${today.day}` : today.day;

                  return day;

                },
                month: function() {

                  let month = today.month < 10 ? `0${today.month}` : today.month;

                  return month;

                }
            },
            new_date = `${ today.year }-${ format_date.month() }-${ format_date.day() }`;
            
      this.today = new_date;

  }

public newImages: any[] = [];
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
        this.heroService.UploadImgSuc(f).subscribe((r) => {
        if (Utils.isDefined(r)) {
            url = <string>r.message;
            
            url = url.replace('/Imagenes', this.heroService.getURL() + 'Flip');
            this.reservation_data.Photo = url;
            
            this.newImages = [];
        }
        })
    }
    }
}
  
}

class NewReservationModel {
  Name: string = '';
  Description: string = '';
  Photo: string = '';
  QuoteMax: number = 30;
  Private: boolean = false;
  Status: number = 0;
  Schedules: any = [new ReservationSchedule];
  UserId: number = 0;
  AmenityId: number = 0;
}

class ReservationSchedule {
  Date: string = '';
  Status: number = 0;
  TimeEnd: String = '';
  TimeStart: String = '';
}

