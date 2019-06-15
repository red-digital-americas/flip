import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatosService } from '../../../datos.service';
import { Utils } from '../../utils/utils';

import dayGridPlugin from '@fullcalendar/daygrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';

import {DayBgRow, DayGrid, DayGridSeg, DayGridSlicer, DayGridView }  from '@fullcalendar/daygrid';
import { EventInput } from '@fullcalendar/core';
import { FullCalendarComponent } from '@fullcalendar/angular';

import { BsComponentRef } from 'ngx-bootstrap/component-loader/bs-component-ref.class';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { DetalleComponent } from '../modals/detalle/detalle.component';
import { setDate } from 'ngx-bootstrap/chronos/utils/date-setters';



@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.scss']  
})

export class ReservationsComponent implements OnInit {
  
  posts: any[];
  email: string;
  password: string;
  token: boolean;
  message: {};
  validar: boolean = false;
  idpost: any;
  IDUSR: string = "0";
  IDBUILD: string = "0";
  PostId: number ;
  posttext: string = "";
  posttitle: string = "";
  public user: string[];

  postphoto: string = "assets/img/Coliving.jpg";
  comment: string = "";
  public newImages: any[] = [];  
  
  constructor(  private router: Router, private heroService: DatosService, private route: ActivatedRoute,  
                private modalService: BsModalService              
  ) { }

  ngOnInit() {
    if (localStorage.getItem("user") == undefined) {
      this.router.navigate(['/login']);
    }
    else {
      this.user = JSON.parse(localStorage.getItem("user"));
      console.log(this.user);
      this.IDUSR = JSON.parse(localStorage.getItem("user")).id;
      this.IDBUILD = this.route.snapshot.params['id'];              
    }
  }        


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  CALENDAR
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
 
 @ViewChild('calendar', {read: FullCalendarComponent, static: true}) calendarComponent: FullCalendarComponent; 

  calendarPlugins = [dayGridPlugin, listPlugin, interactionPlugin, timeGridPlugin];      
  calendarWeekends = true;  

  calendarEvents: EventInput[] = [
    { id: 10, title: 'Event Now', start: new Date() },
    { id: 3, title: 'Evento A', start: new Date(), startEditable:true, durationEditable:true, overlap: false },    
    
    // areas where "Meeting" must be dropped
    // { groupId: 'availableForMeeting', start: '2019-06-11T10:00:00', end: '2019-06-11T16:00:00', rendering: 'background', color: '#00ff00'},
    // { groupId: 'availableForMeeting', start: '2019-06-13T10:00:00', end: '2019-06-13T16:00:00', rendering: 'background', color: '#00ff00'},
    // red areas where no events can be dropped
    // { start: '2019-06-24', end: '2019-06-28', overlap: false, rendering: 'background', color: '#ff9f89' },
    // { start: '2019-06-06', end: '2019-06-08', overlap: false, rendering: 'background', color: '#ff9f89' },
    // { start: '2019-06-01', end: '2019-06-04', overlap: false, rendering: 'background', color: '#0000ff' }
  ];

  handleDateClick(arg) {
    console.log(arg);
  
    this.VerDetalle();

    // if (confirm('Would you like to add an event to ' + arg.dateStr + ' ?')) {
    //   this.calendarEvents = this.calendarEvents.concat({ // add new event data. must create new array
    //     title: 'New Event',
    //     start: arg.date,
    //     allDay: arg.allDay
    //   })
    // }
  }

  handleEventClick(arg) {
    console.log(arg.event.title, arg.event.id, arg.event.start, arg.event.end);    
    this.VerDetalle();
  }

  handleEventDrop(arg) {    
    console.log(arg.event.title, arg.event.id, arg.event.start, arg.event.end);  
  }

  handleSelect(arg) {
    console.log(arg);
    // this.VerDetalle();
  }

  someMethod() {        
    let calendarApi = this.calendarComponent.getApi();    
    calendarApi.next();    
  }

  AddEvent () {
    let newEvent = { id: 20, title: 'Evento B', start: new Date(), startEditable:true, durationEditable:true, overlap: false };
    // this.calendarEvents = this.calendarEvents.concat(newEvent);        

    this.calendarComponent.getApi().addEvent(newEvent);    // no lo borra al agregar uno nuevo pero no el arreglo
    
    // this.calendarEvents.push(newEvent);        
    // this.calendarComponent.getApi().removeAllEvents();
    // this.calendarComponent.getApi().addEventSource(this.calendarEvents);

    console.log(this.calendarEvents);
    // console.log("EventSources: ", this.calendarComponent.getApi().getEventSources());
    console.log(this.calendarComponent.getApi().getEvents());
      
    
    console.log("AddEvent");
  }

  RefreshEvents() {
    // this.calendarComponent.getApi().getEvents();
    this.calendarComponent.getApi().refetchEvents();
  }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  MODAL
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////  
  modalRef: BsModalRef;

  VerDetalle(id=0){
    this.modalRef = this.modalService.show(DetalleComponent, {
      initialState: { id: 0, title: "Detalle de Usuario", responseData: {} },
      class: 'modal-lg'
    });
    this.modalRef.content.closeBtnName = 'Close';  
    
    let newSubscriber = this.modalService.onHide.subscribe(r=>{
      newSubscriber.unsubscribe();
      console.log('DATA',this.modalRef.content.responseData);
    });      
  }  

  Crear () {}

}


