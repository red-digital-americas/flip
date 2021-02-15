import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Utils } from '../../../utils/utils';
import { ActivatedRoute } from '@angular/router';
import { ToasterService, ToasterConfig } from 'angular2-toaster';
import { DatosService } from '../../../../datos.service';
import * as moment from 'moment';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { param } from 'jquery';
import { SystemMessage } from '../../../../ts/systemMessage';

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
  responseData;     // Response when close the modal, in order to inform reservation if we create or not an event

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
    //Form Configuration (Setup in ngOnInit)
    datePicker; // Date parse from dateProps
    startTime;  // StartTime for the inputs based in the selected space in fullCalendar (dateProps)
    endTime;    // EndTime for the inputs based in the selected space in fullCalendar (dateProps)

  allDaySwitch = false;
  formGroup: FormGroup;

  acitivyModel:ActivityModel = new ActivityModel();
  public newImages: any[] = [];

  public system_message:SystemMessage = new SystemMessage();

  public toasterconfig: ToasterConfig = new ToasterConfig({
    tapToDismiss: true,
    timeout: 3000,
    positionClass: "toast-top-center",
  });
  
  constructor( public modalRef: BsModalRef, private modalService: BsModalService, private heroService: DatosService,
               private toasterService: ToasterService, private route: ActivatedRoute, private _formBuilder: FormBuilder
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

    this.formGroup = this._formBuilder.group({
      activityNameCtrl: [, Validators.required],
      activityDescriptionCtrl: [''],
      activityUserIdCtrl: [, Validators.required],      
      schedulesCtrl: this._formBuilder.array(
        [this.AddScheduleFormGroup()], [Validators.required, this.OverlapScheduleValidation])
    });   

  }

  GetUsers() {   
    var params = { buildingId: this.buildingIdProps};       
    console.log("Aqui =====> ", params);
    this.heroService.service_general_get_with_params("Users", params).subscribe(
      (res)=> {
        if(res.result === "Success"){                    
          this.usersArray = res.item;     
          if (this.usersArray.length <= 0) { return; }  
          this.formGroup.controls.activityUserIdCtrl.setValue(this.usersArray[0].id);
          this.reservationData.UserId = this.usersArray[0].id;
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
    /////////// Loading the schedules from scheduleModel and activityModel ////////////////////////7    
    this.acitivyModel.Schedules = [];

    this.formGroup.controls.schedulesCtrl.value.forEach(schedule => {
      // console.log(schedule);
      let date = moment(schedule.dateCtrl).format('YYYY/MM/DD');
      let startHour = moment(schedule.startTimeCtrl).format('HH');
      let endHour = moment(schedule.endTimeCtrl).format('HH');        
      
      let scheduleModel:ScheduleModel = new ScheduleModel();
      scheduleModel.Date = moment(schedule.dateCtrl).startOf('day').format('YYYY-MM-DDTHH:mm:ss');
      scheduleModel.TimeStart = moment(`${date} ${startHour}`, 'YYYY/MM/DD HH').format('YYYY-MM-DDTHH:mm:ss');
      scheduleModel.TimeEnd = moment(`${date} ${endHour}`, 'YYYY/MM/DD HH').format('YYYY-MM-DDTHH:mm:ss');
      if (startHour == "00" && endHour == "00") { 
        scheduleModel.TimeEnd = moment(`${date} ${endHour}`, 'YYYY/MM/DD HH').add(1, 'day').format('YYYY-MM-DDTHH:mm:ss');
      }

      if (this.allDaySwitch) {
        scheduleModel.TimeStart = moment(schedule.dateCtrl).startOf('day').format('YYYY-MM-DDTHH:mm:ss');
        scheduleModel.TimeEnd = moment(schedule.dateCtrl).startOf('day').add(1, 'day').format('YYYY-MM-DDTHH:mm:ss');
      }
      
      // Falta la comprobacion del mismo dia que esta en el de abajo
      // this.acitivyModel.Schedules.forEach(s => {                
      //   if (moment(scheduleModel.TimeStart).isBefore(moment(s.TimeEnd)) && 
      //     moment(s.TimeStart).isBefore(moment(scheduleModel.TimeEnd))) {
      //     console.log("Translaping schedule"); return;
      //   }
      // })

      this.acitivyModel.Schedules.push(scheduleModel);
    });
            
    ///////// Adding the complementaryData to the activityModel ///////////////////    
    this.acitivyModel.Name = this.formGroup.controls.activityNameCtrl.value;
    this.acitivyModel.Description = this.formGroup.controls.activityDescriptionCtrl.value;
    this.acitivyModel.UserId = this.formGroup.controls.activityUserIdCtrl.value;
    this.acitivyModel.AmenityId = this.amenityIdProps;
    this.reservationData.AmenityId = this.acitivyModel.AmenityId;
    // if (this.acitivyModel.Private) { this.acitivyModel.Photo = "assets/img/Coliving.jpg"; }
    
    console.log('Model Old => ',this.acitivyModel);
    // return;

    this.heroService.service_general_post("Activity", this.acitivyModel).subscribe(
      (res)=> { console.log('Tienes que mandar => ', this.acitivyModel );
        console.log(res);
        if(res.result === "Success"){          
          console.log(res.item);  
          this.responseData = {result:true, id:res.item.id, name:res.item.name};                
          this.modalRef.hide();
        } else if(res.result === "Error") {
          console.log(res.detalle);          
          //this.toasterService.pop('danger', 'Error', res.detalle);
          this.system_message.showMessage({
            kind: 'error',
            time: 3777,
            message: {
              header: 'Event Error',
              text: res.detalle
            }
          });
        } else {
           console.log("Error"); 
           //this.toasterService.pop('danger', 'Error', 'An error has been ocurred.'); 
           this.system_message.showMessage({
            kind: 'error',
            time: 3777,
            message: {
              header: 'System Error',
              text: 'Please try later or contact support.'
            }
          });
          }
      },
      (err)=> {console.log(err);}      
    );       
  }  

  TipoReservacion(tipoReservacion) { 
    this.acitivyModel.Private = tipoReservacion; 

    // if (this.acitivyModel.Private) {
    //   this.formGroup.controls.activityNameCtrl.setValue('Reservado');
    //   this.formGroup.controls.activityDescriptionCtrl.setValue('Reservado');      
    // } else {
    //   this.formGroup.controls.activityNameCtrl.setValue('');
    //   this.formGroup.controls.activityDescriptionCtrl.setValue('');      
    // }
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
            this.responseData.photo = url;        
            this.newImages = [];
          }
        })
      }
    }
  }

  ///////////////////////////
  public get schedulesCrtlArray() {
    return this.formGroup.controls['schedulesCtrl'] as FormArray;
  }

  private AddScheduleFormGroup () {    
    return this._formBuilder.group({
      dateCtrl: [this.datePicker, Validators.required],
      startTimeCtrl: [this.startTime, Validators.required],
      endTimeCtrl: [this.endTime, Validators.required]
    });    
  }

  private OverlapScheduleValidation (schedulesArray:FormArray):any {
    // console.log(schedulesArray);
    // console.log(schedulesArray.value);        
       
    for(let i=0; i<schedulesArray.value.length; i++) {      
      for (let j=0; j<schedulesArray.value.length; j++){                
        if (i == j) { continue; }        
                        
        let iEndTime = moment(schedulesArray.value[i].endTimeCtrl);
        let jEndTime = moment(schedulesArray.value[j].endTimeCtrl);
        if (iEndTime.format('HH') == "00") { iEndTime.add(1, 'day') }
        if (jEndTime.format('HH') == "00") { jEndTime.add(1, 'day') }

        if (moment(schedulesArray.value[i].startTimeCtrl).isBefore(jEndTime) && 
          moment(schedulesArray.value[j].startTimeCtrl).isBefore(iEndTime) &&
          moment(schedulesArray.value[i].dateCtrl).isSame(moment(schedulesArray.value[j].dateCtrl), 'day')) {          
          return { overlap:true, schedule:schedulesArray.value[i] }
        }
      }    
    }
  
    return null;  // No overlap in schedules
  }

  public AddScheduleCtrl () {    
    this.schedulesCrtlArray.push(this.AddScheduleFormGroup());   
  }

  public RemoveScheduleCtrl () {    
    this.schedulesCrtlArray.removeAt(this.schedulesCrtlArray.length - 1);    
  }








  


  //Que paso ak con todo y 47
  public reservationData: ReservationData = new ReservationData(); 
  public reservationDate: ReservationDate = new ReservationDate();
  public sendReservationData():void {

      this.AddActivity();

      console.log('Old => ', this.acitivyModel );

      this.reservationData.UserId = this.acitivyModel.UserId;
      this.reservationData.AmenityId = this.acitivyModel.AmenityId;
      this.reservationData.Schedules = [{
        Date: "2020-04-29T00:00:00",
        Status: 0,
        TimeStart: "2020-04-29T00:00:00",
        TimeEnd: "2020-04-29T00:00:00"
      }];
      this.reservationData.Private == 'act' ? this.reservationData.Private  = true : this.reservationData.Private = false; 

      console.log('New => ', this.reservationData );

      this.heroService.service_general_post("Activity", this.reservationData)
          .subscribe( (response: any) => {
            
            if( response.result == 'Success' ) {

              this.modalRef.hide();

            } else {

              console.log('Error interno WS Add => ', response );

            }

          }, (error: any) => {

            console.log('Error => ',error);

          });

  }

  public form_data: any = {
    no_name: false,
    no_desc: false,
    no_host: false,
    no_date: false,
    no_hini: false,
    no_hend: false,
    no_kind: false,
    no_photo: false
  }
  public formFieldValidator():boolean {

    let result = false;



    return false;

  }

  /*
   * Autor: Carlos Hernandez Hernandez
   * Contacto: carlos.hernandez@minimalist.com
   * Nombre: validateImageUpload
   * Tipo: Funcion | Funcion efecto colateral
   * Visto en: communities, amenities, services
   * Parametros: evento del input, dimensiones de la imagen, donde se va pre visualizar la masa, donde desplegara el nombre
   * Regresa: N/A
   * Descripcion: Cuando se le da clic al input y se selecciona la imagen esta valida que el tamaño sea el adecuado y la despliega el el 
   *              visualizador
   */
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

                      } else {

                        id_image_container.src = '../../../assets/14.jpg';
                        name_image_container.innerHTML = `La imagen debe medir <br /><span class="text-bold">${ dimensions_image }</span>`;
                        id_image_container.classList.add('no-image');
                        root_data.reservationData.Photo = '../../../assets/14.jpg';  

                      }
                      
                    });

            }

            reader.readAsDataURL( event.files[0] );

    }
    
  }

}

class ReservationData {
  Name: string;
  Description: string;
  Photo: string;
  QuoteMax: number = 30;
  Private: any;
  Status: number = 0;
  Schedules: any;
  UserId: number;
  AmenityId: number;
}

class ReservationDate {
  Date: string;
  InitHour: string;
  EndHour: String;
}
