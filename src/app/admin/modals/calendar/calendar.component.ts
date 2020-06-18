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
    public route: ActivatedRoute
  ) { }

  @ViewChild('calendar', { read: FullCalendarComponent, static: true }) calendarCustom: FullCalendarComponent;

  calendarPlugins = [dayGridPlugin, listPlugin, interactionPlugin, timeGridPlugin];
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
  scheduleModel: ScheduleModel;    // For Modifications through Calendar handles Events  

  ngOnInit() {
    console.log('Enter');
    this.InitCalendarSetup();
  }

  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //  CALENDAR
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  GetEvents() {
    // let params = {buildingId: this.IDBUILD, amenityId: this.amenitySelect};        
    let params = { buildingId: 0, amenityId: 0, startDate: this.activeStart, endDate: this.activeEnd };
    this._services.service_general_get_with_params("Schedules", params).subscribe(
      (res) => {
        if (res.result === "Success") {
          console.log(res.item);
          this.schedulesArray = res.item;
          this.LoadEventsToCalendar(this.schedulesArray);
        } else if (res.result === "Error") {
          console.log("Ocurrio un error" + res.detalle);
        } else {
          console.log("Error");
        }
      },
      (err) => { console.log(err); }
    );
  }

  /////////////////////////////////// FULL CALENDAR INPUTS /////////////////////////////////////////////////////////////////
  // https://github.com/fullcalendar/fullcalendar-angular/blob/master/projects/fullcalendar/src/lib/fullcalendar-options.ts
  private InitCalendarSetup() {
    this.calendarCustom.eventAllow = this.handleEventAllow;
  }

  handleEventAllow(dropLocation, draggedEvent) {
    // console.log(draggedEvent.title , draggedEvent.id ,draggedEvent.start, draggedEvent.end);

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
    // return moment(dropLocation.start).isSameOrAfter(moment(), 'day');    
    return moment(dropLocation.start).isAfter(moment(), 'hour');
  }

  /////////////////////////////////// FULL CALENDAR OUTPUS/HANDLERS /////////////////////////////////////////////////////////
  handleDateClick(arg) {
    // console.log(arg.date, arg.dateStr, arg.view.type); //"dayGridMonth" "timeGridWeek" "timeGridDay"    
    // this.Crear(arg);    
  }

  handleEventClick(arg) {
    // console.log(arg.event.title, arg.event.id, arg.event.start, arg.event.end);    
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
    // console.log(info.view.type);
    // console.log(info.view.activeEnd, info.view.activeStart, info.view.currentEnd, info.view.currentStart); 
    this.activeStart = moment(info.view.activeStart).startOf('day').subtract(1, 'day').format('YYYY-MM-DDTHH:mm:ss');
    this.activeEnd = moment(info.view.activeEnd).endOf('day').format('YYYY-MM-DDTHH:mm:ss');

    let fcNextBtn = document.getElementsByClassName('fc-next-button')[0];
    let fcPrevBtn = document.getElementsByClassName('fc-prev-button')[0];

    if (moment(info.view.activeStart).isBefore(moment(), 'month')) {
      fcPrevBtn != undefined ? fcPrevBtn.setAttribute('disabled', 'true') : null;
    } else {
      fcPrevBtn != undefined ? fcPrevBtn.removeAttribute('disabled') : null;
    }

    if (moment(info.view.activeEnd).isAfter(moment().add(1, 'month'), 'month')) {
      fcNextBtn != undefined ? fcNextBtn.setAttribute('disabled', 'true') : null;
    } else {
      fcNextBtn != undefined ? fcNextBtn.removeAttribute('disabled') : null;
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

    events.forEach(ev => {
      this.calendarCustom.getApi().addEvent(this.ParseEvent(ev));
    });

    // this.calendarComponent.getApi().refetchEvents();
  }

  private ParseEvent(event: any) {
    let newEvent = {
      id: event.id,
      title: event.activity.name,
      start: event.timeStart,
      end: event.timeEnd,
      startEditable: true,
      durationEditable: true,
      overlap: false,
      backgroundColor: event.activity.private ? '#d8209e' : '#3788d8' 
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

          this.scheduleModel.Date = moment(arg.event.start).startOf('day').format('YYYY-MM-DDTHH:mm:ss');
          this.scheduleModel.TimeStart = moment(arg.event.start).format('YYYY-MM-DDTHH:mm:ss');
          this.scheduleModel.TimeEnd = moment(arg.event.end).format('YYYY-MM-DDTHH:mm:ss');
          this.scheduleModel.ActivityId = res.item[0].activity.id;
          // console.log(this.scheduleModel);
          this.UpdateSchedule(this.scheduleModel);
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

}
