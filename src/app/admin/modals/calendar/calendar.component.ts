import { Component, OnInit, ViewChild } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';

import {DayBgRow, DayGrid, DayGridSeg, DayGridSlicer, DayGridView } from '@fullcalendar/daygrid';
import { EventInput } from '@fullcalendar/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import * as moment from 'moment';

import { Router, ActivatedRoute } from '@angular/router';
import { DatosService } from '../../../../datos.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { CalendarDetailComponent } from '../calendar-detail/calendar-detail.component';

class ScheduleModel {
    public id: number;
    public Date;
    public TimeStart;
    public TimeEnd;
    public ActivityId: number;
    constructor() {}
}


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  constructor(
    public _services: DatosService,
    public _router: Router,
    public route: ActivatedRoute,
    public modalRef: BsModalRef,
    private modalService: BsModalService
  ) { }

  @ViewChild('calendar', { read: FullCalendarComponent, static: true }) calendarCustom: FullCalendarComponent;

  calendarPlugins = [dayGridPlugin, listPlugin, interactionPlugin, timeGridPlugin];
  calendarWeekends = true;
  activeStart;
  activeEnd;
  endDate = new Date();

  calendarEvents: EventInput[] = [
    // { id: 10, title: 'Event Now', start: '2020-06-20', end: '2020-06-28' },
    // { id: 10, title: 'Event Now', start: '2020-06-10', end: '2020-06-22', color: '#00ff00' },
    // { id: 3, title: 'Evento A', start: new Date(), startEditable:true, durationEditable:true, overlap: false },    
    // { id: 5, title: 'Evento B', start: new Date(), startEditable:true, durationEditable:true, overlap: false },    

    // // areas where "Meeting" must be dropped
    // { groupId: 'availableForMeeting', start: new Date(), end: this.endDate.getDate() + 10, rendering: 'background', color: '#00ff00'},
    // { groupId: 'availableForMeeting', start: '2019-06-13T10:00:00', end: '2019-06-13T16:00:00', rendering: 'background', color: '#00ff00'},
    // // red areas where no events can be dropped
    // { start: '2019-06-24', end: '2019-06-28', overlap: false, rendering: 'background', color: '#ff9f89' },
    // { start: '2019-06-06', end: '2019-06-08', overlap: false, rendering: 'background', color: '#ff9f89' },
    // { start: '2019-06-01', end: '2019-06-04', overlap: false, rendering: 'background', color: '#0000ff' }
  ];

  schedulesArray = [];
  scheduleModel: ScheduleModel;    // For Modifications through Calendar handles Events

  show_page_modal = false;
  modal_to_show: string;
  userIdSelected;

  amenitiesArray = [];
  amenitySelect;

  userInfo = {
    name: '',
    timeStart: '',
    timeEnd: '',
    roomate: '',
    membership: '',
    beds: '',
    idUser: ''
  };
  roomId;
  buildingId;

  ngOnInit() {
    console.log('Enter');
    this.GetAmenities();
    this.InitCalendarSetup();
  }

  private GetAmenities() {
    this._services.service_general_get_with_params('Amenity', {idBuilding: this.buildingId}).subscribe(
      (res) => {
        if (res.result === 'Success') {
          this.amenitiesArray = res.item;
          if (this.amenitiesArray.length <= 0) { return; }

          this.amenitySelect = this.amenitiesArray[0].id;
          this.GetEvents();
        } else if (res.result === 'Error') { console.log('Ocurrio un error' + res.detalle); } else { console.log('Error'); }
      },
      (err) => {console.log(err); }
    );
  }

  public showModal( to_show: string = 'default', userId ): void {
    // this.modalRef = this.modalService.show(CalendarDetailComponent, {
    //     initialState: { responseData: {} },
    //     class: 'modal-lg'
    //   });
    //   this.modalRef.content.closeBtnName = 'Close';
    if (userId !== undefined) {
      const params ={
        tenant: userId
      }
      this._services.service_general_get_with_params('Room/GetTenantByRoom', params).subscribe(
        (res) => {
          console.log('Tenant', res);
          this.userInfo = res.item;
         });
    }
    !this.show_page_modal ? this.show_page_modal = true : this.show_page_modal = false;
    this.modal_to_show = to_show;
    this.userIdSelected = userId;
}

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //  CALENDAR
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  GetEvents() {
    // let params = {buildingId: this.IDBUILD, amenityId: this.amenitySelect};        
    const params = { room: this.roomId };
    this._services.service_general_get_with_params('Room/GetScheduleByRoom', params).subscribe(
      (res) => {
        if (res.result === 'Success') {
          console.log('Item', res.item);
          this.schedulesArray = res.item;
          console.log('scheduleArray', this.schedulesArray);
          this.LoadEventsToCalendar(this.schedulesArray);
        } else if (res.result === 'Error') {
          console.log('Ocurrio un error' + res.detalle);
        } else {
          console.log('Error');
        }
      },
      (err) => { console.log(err); }
    );
  }

  /////////////////////////////////// FULL CALENDAR INPUTS /////////////////////////////////////////////////////////////////
  // https://github.com/fullcalendar/fullcalendar-angular/blob/master/projects/fullcalendar/src/lib/fullcalendar-options.ts
  private InitCalendarSetup() {
    // console.log('Init Calendar');
    this.calendarCustom.eventAllow = this.handleEventAllow;
    // console.log(this.calendarCustom);
  }

  handleEventAllow(dropLocation, draggedEvent) {
    console.log(draggedEvent.title , draggedEvent.id ,draggedEvent.start, draggedEvent.end);

    //////// No permite mover eventos pasados ///////////////////////////////////////////////
    // if (moment(draggedEvent.start).isBefore(moment(), 'day')) { return false; }
    if (moment(draggedEvent.start).isSameOrBefore(moment(), 'hour')) { return false; }
    //////// Eventos con duración solo de un dia ////////////////////////////////////////////
    // if (moment(dropLocation.end).isAfter(moment(dropLocation.start), 'day')) { return false; }
    if (moment(dropLocation.end).isAfter(moment(dropLocation.start), 'day')) {
      if (moment(dropLocation.end).isAfter(moment(dropLocation.start).startOf('day').add(1, 'day').add(1, 'second'), 'second')) {
        return false;
      }
    }
    //////// Fecha destino a mover debe ser hoy o posterior /////////////////////////////////                   
    return moment(dropLocation.start).isSameOrAfter(moment(), 'day');    
    // return moment(dropLocation.start).isAfter(moment(), 'hour');
  }

  /////////////////////////////////// FULL CALENDAR OUTPUS/HANDLERS /////////////////////////////////////////////////////////
  handleDateClick(arg) {
    // console.log(arg.date, arg.dateStr, arg.view.type); //"dayGridMonth" "timeGridWeek" "timeGridDay"    
    // this.Crear(arg);    
  }

  handleEventClick(arg) {
    // console.log('detail', arg.event);
    this.showModal('detail', arg.event.id);
    // this.VerDetalle(arg.event.id);
  }

  handleEventDrop(arg) {
    // console.log(arg.event.title, arg.event.id, arg.event.start, arg.event.end);     
    this.GetScheudleById(arg);
  }

  handleEventResize(arg) {
    // console.log(arg.event.title, arg.event.id, arg.event.start, arg.event.end);           
    this.GetScheudleById(arg);
    //this.GetEvents();            
    // Not necesary, already added in the NativeCalendarModel, refresh only needed when change amenity or calendarView(getDates with start/end filter)
  }

  handleSelect(arg) {
    // console.log(arg);
    // this.VerDetalle();
  }

  handleDatesRender(info) {
    // console.log(info.view);
    // console.log('handleDatesRender', info.view.activeEnd, info.view.activeStart, info.view.currentEnd, info.view.currentStart); 
    this.activeStart = moment(info.view.activeStart).startOf('day').subtract(1, 'day').format('YYYY-MM-DDTHH:mm:ss');
    this.activeEnd = moment(info.view.activeEnd).endOf('day').format('YYYY-MM-DDTHH:mm:ss');

    let fcNextBtn = document.getElementsByClassName('fc-next-button')[0];
    let fcPrevBtn = document.getElementsByClassName('fc-prev-button')[0];
    console.log('Moment', moment().add(-12, 'month'));
    if (moment(info.view.activeStart).isBefore(moment().add(-6, 'month'), 'month')) {
      fcPrevBtn !== undefined ? fcPrevBtn.setAttribute('disabled', 'true') : null;
    } else {
      fcPrevBtn !== undefined ? fcPrevBtn.removeAttribute('disabled') : null;
    }

    if (moment(info.view.activeEnd).isAfter(moment().add(6, 'month'), 'month')) {
      fcNextBtn !== undefined ? fcNextBtn.setAttribute('disabled', 'true') : null;
    } else {
      fcNextBtn !== undefined ? fcNextBtn.removeAttribute('disabled') : null;
    }

    // if (this.amenitySelect != undefined) {this.GetEvents();}    // Avoid error first time
  }

  Refresh() {
    console.log(this.calendarCustom.getApi().view.type);
    console.log(this.calendarCustom.getApi().view.activeEnd, this.calendarCustom.getApi().view.activeStart,
      this.calendarCustom.getApi().view.currentEnd, this.calendarCustom.getApi().view.currentStart);
    this.GetEvents();
  }

  private LoadEventsToCalendar(events: any) {
    this.calendarCustom.getApi().removeAllEvents();
    console.log('LoadEventsToCalendar', events);
    events.forEach(ev => {
      console.log('element before', ev);
      let dattmp = new Date(ev.timeEnd);
      dattmp.setDate(dattmp.getDate() + 2);
      let dd = ('0' + dattmp.getDate()).slice(-2);
      let mm = ('0' + (dattmp.getMonth() + 1)).slice(-2);
      let y = dattmp.getFullYear();
    
      let someFormattedDate = y + '-' + mm + '-' + dd;

      ev.timeEnd = someFormattedDate;
      console.log('date', someFormattedDate);
      console.log('element after', ev);
      this.calendarCustom.getApi().addEvent(this.ParseEvent(ev));
    });

    document.getElementsByClassName('modal-dialog')[0].classList.remove('modal-lg');
    const element:any = document.getElementsByClassName('modal-dialog')[0];
          element.style.minWidth = "920px";
          window.dispatchEvent(new Event('resize'));


    // this.calendarCustom.getApi().refetchEvents();
  }

  private ParseEvent(event: any) {
    let newEvent = {
      id: event.id,
      title: event.name,
      start: event.timeStart,
      end: event.timeEnd,
      beds: event.beds,
      startEditable: true,
      durationEditable: true,
      overlap: false,
      backgroundColor: event.roomate === 'Romate FLIP' ? '#4ac1ba' : '#fccd0a'
    };
    return newEvent;
  }

  ///////////////////////////////////////////////// SERVICIOS //////////////////////////////////////////////////////////////
  private UpdateSchedule(scheduleModel: ScheduleModel) {
    this._services.service_general_put(`Schedules/${scheduleModel.id}`, scheduleModel).subscribe(
      (res) => {
        if (res.result === "Success") {
          //console.log(res.item);                        
          //   this.toasterService.pop('success', 'Success ', 'Your Activity was modified correctly.'); 
        } else if (res.result === "Error") {
          // console.log(res.detalle);
          //   this.toasterService.pop('danger', 'Error', res.detalle);
        } else {
          console.log("Error");
          // this.toasterService.pop('danger', 'Error', 'An error has been ocurred.'); 
        }
      },
      (err) => { console.log(err); }
    );
  }

  private GetScheudleById(arg) {
    this._services.service_general_get_with_params("Schedules", { id: arg.event.id }).subscribe(
      (res) => {
        if (res.result === "Success") {
          // console.log(res.item);    
          this.scheduleModel = new ScheduleModel();
          this.scheduleModel = res.item[0];
          console.log('timeStart', moment(arg.event.start).format('YYYY-MM-DDTHH:mm:ss'));
          console.log('timeEnd', moment(arg.event.end).format('YYYY-MM-DDTHH:mm:ss'));
          this.scheduleModel.Date = moment(arg.event.start).startOf('day').format('YYYY-MM-DDTHH:mm:ss');
          this.scheduleModel.TimeStart = moment(arg.event.start).format('YYYY-MM-DDTHH:mm:ss');
          this.scheduleModel.TimeEnd = moment(arg.event.end).format('YYYY-MM-DDTHH:mm:ss');
          this.scheduleModel.ActivityId = res.item[0].activity.id;
          console.log(this.scheduleModel);
          this.UpdateSchedule(this.scheduleModel);
        } else if (res.result === "Error") {
          console.log(res.detalle);
          //   this.toasterService.pop('danger', 'Error', res.detalle);
        } else {
          console.log("Error");
          // this.toasterService.pop('danger', 'Error', 'An error has been ocurred.'); 
        }
      },
      (err) => { console.log(err); }
    );
  }

  public viewDetail(page: string, idUser, idBooking) {
    sessionStorage.setItem('user_id', idUser.toString() );
    sessionStorage.setItem('booking_id', idBooking);
    this._router.navigateByUrl( page );
    this.showModal('', undefined);
    this.modalRef.hide();
  }

}
