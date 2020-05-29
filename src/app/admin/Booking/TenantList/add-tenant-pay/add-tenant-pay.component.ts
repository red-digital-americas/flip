import { Component, OnInit } from '@angular/core';
import { LoaderComponent } from '../../../../../ts/loader';
import { SystemMessage } from '../../../../../ts/systemMessage';
import { Router, ActivatedRoute } from '@angular/router';
import { DatosService } from '../../../../../datos.service';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-add-tenant-pay',
  templateUrl: './add-tenant-pay.component.html',
  styleUrls: ['./add-tenant-pay.component.scss']
})
export class AddTenantPayComponent implements OnInit {

  constructor(
    private _service: DatosService,
    private route: ActivatedRoute,
    private _router: Router
  ) { }

  loader = new LoaderComponent();
  systemMessage = new SystemMessage();

  userId;
  encryptSecretKey = 'Llave';
  ccObj = {
    number: '',
    kind: '',
    id: 0,
    month: '',
    year: '',
    ccv: ''
  };
  tokenObj;
  builds_list: any[];
  visible_step: any = {
    step_1: true,
    step_2: false
  };

  build_selected = null;
  current_build: any;
  typesrooms_catalog: any[] = [];
  able_section_two = false;
  roomates_catalog: any[] = [];
  today = '';
  booking_post_data: BookingPostDetailModel = new BookingPostDetailModel();

  public additional_services_list: any[];
  public additional_services_section = false;
  public table_additional_services: any[] = ['icon', 'service', 'description', 'recurrent', 'once', 'able'];
  public additional_services_table: any;
  public additional_services_selected: any[] = [];
  public booking_data: BookingDetailModel = new BookingDetailModel();
  public table_services_resumen: any[] = ['icon','service','type','lapse','sdate','edate','ammount'];


  public bt_form_data: any = {
    no_sdat: false,
    no_edat: false,
    no_beds: false,
    no_rtyp: false,
    no_gend: false,
    no_smok: false,
    no_pets: false,
    no_room: false
  };

  ngOnInit() {
    this.getAddTenantData();
    this.getToday();
    this.userId = this.route.snapshot.paramMap.get('id');
    this.getMainCC(this.userId);
  }

  getMainCC(obj) {
    // this.loader.showLoader();
    let data = { idUser: obj };
    this._service.service_general_get_with_params('Booking/GetMainCreditCard/' + obj, data).subscribe((value) => {
      // this.loader.hideLoader();

      this.ccObj = value.item[0];
      console.log(value);
      console.log('CC', this.ccObj);
      this.ccObj.number = this.decryptData(this.ccObj.number);
      this.ccObj.kind = this.kindCardDetecter(this.ccObj.number);
    }, (error) => {
      // this.loader.hideLoader();
    });
  }

  PayBooking() {
    console.log(this.ccObj);
    var response;
    const card_data = {
      number: this.ccObj.number,
      expYear: Number(this.ccObj.year),
      expMonth: Number(this.ccObj.month),
      cvc: this.decryptData( this.ccObj.ccv ).toString(),
      id: this.ccObj.id
    };
    console.log(card_data);
    this._service.service_general_post('Stripe', card_data).subscribe((value) => {
      console.log('Stripe', value);
      this.booking_post_data.idUser = this.userId;
      this.booking_post_data.idMembership = this.membership_selected.id;
      this.booking_post_data.Booking.dateInitProgram = this.booking_data.startDate;
      this.booking_post_data.Booking.dateEndProgram = this.booking_data.finishDate;
      this.booking_post_data.Booking.idRommateType = this.booking_data.roomateFlip;
      this.booking_post_data.Booking.reservedBeds = Number(this.booking_data.totalBeds) + 1;
      this.booking_post_data.Booking.idRoom = this.room_selected.id;
      this.booking_post_data.aditionalBeds = this.beds_to_add;
      this.booking_post_data.serviceBooking = this.servicesModelWorker(this.all_services_selected);

      const obj = {
        booking: this.booking_post_data,
        creditCard: {
          id: this.ccObj.id
        },
        user: {
          id: this.userId
        },
        token: value.item,
        amount: this.booking_detail_total_ammount
      };
      console.log('DATA Booking', obj);
      return;
      this._service.service_general_post('Tenant/NewTenantExist', obj).subscribe((value) => {
        this.systemMessage.showMessage({
          kind: 'ok',
          message: {
            header: 'Success',
            text: 'Paid correct'
          },
          time: 2000
        });
        this.goToPage();
      }, (error) => {
        console.log('PostBooking', error);
        this.systemMessage.showMessage({
          kind: 'error',
          message: {
            header: 'Error',
            text: error.detalle
          },
          time: 2000
        });
      });
    }, (error) => {
      console.log('Stripe', error);
      this.systemMessage.showMessage({
        kind: 'error',
        message: {
          header: 'Credit Card Error',
          text: error
        },
        time: 2000
      });
    });
  }

  public goToPage(the_page: string = ''): void {
    the_page !== '' ? this._router.navigateByUrl(the_page) : window.history.go(-2);
  }
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ///////////////// SECTION 1
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  public buildSelected(event_data: any): void {
    const build_selected = event_data.target;
    this.builds_list.forEach((build: any) => {
      if (build_selected.value == build.id) {
        this.build_selected = build.id;
        this.current_build = build;
        this.getTypeRoomCatalog();
        this.getRoomateTypeCatalog();
        this.able_section_two = false;
      }
    });
  }

  public getTypeRoomCatalog(): void {
    const ws_data = {
      buildingId: this.current_build.id
    };
    this._service.service_general_get_with_params('TypeRoom', ws_data)
      .subscribe((response: any) => {
        if (response.result == 'Success') {
          this.typesrooms_catalog = response.item;
        } else {
          this.systemMessage.showMessage({
            kind: 'error',
            time: 4777,
            message: {
              header: 'Fatal Error',
              text: 'Required data can not load correctly. Reload page or try later.'
            }
          });
        }
      }, (error: any) => {
        this.systemMessage.showMessage({
          kind: 'error',
          time: 4777,
          message: {
            header: 'Error Fatal',
            text: 'Can not load catalogs.'
          }
        });
      });
  }

  public getRoomateTypeCatalog(): void {
    this._service.service_general_get('Tenant/GetRoomate')
      .subscribe((response: any) => {
        if (response.result == 'Sucess') {
          this.roomates_catalog = response.item;
        } else {
          this.systemMessage.showMessage({
            kind: 'error',
            time: 4777,
            message: {
              header: 'Fatal Error',
              text: 'Required data can not load correctly. Reload page or try later.'
            }
          });
        }
      }, (error: any) => {
        this.systemMessage.showMessage({
          kind: 'error',
          time: 4777,
          message: {
            header: 'Error Fatal',
            text: 'Can not load catalogs.'
          }
        });
      });
  }

  public getAddTenantData(): void {
    this.loader.showLoader();
    this._service.service_general_get('Tenant/GetBuilds')
      .subscribe((response: any) => {
        if (response.result == 'Sucess') {
          this.builds_list = response.item;
        }
        this.loader.hideLoader();
      }, (error: any) => {
        this.systemMessage.showMessage({
          kind: 'error',
          time: 4777,
          message: {
            header: 'Fatal Error',
            text: 'Error Fatal'
          }
        });
      });
  }

  public getToday(): void {
    const date = new Date(),
      today = {
        day: date.getDate(),
        month: date.getMonth() + 1,
        year: date.getFullYear()
      },
      format_date = {
        day: function () {
          let day = today.day < 10 ? `0${today.day}` : today.day;
          return day;
        },
        month: function () {
          let month = today.month < 10 ? `0${today.month}` : today.month;
          return month;
        }
      },
      new_date = `${today.year}-${format_date.month()}-${format_date.day()}`;
    this.today = new_date;
  }

  public removeAdditionalServiceSelected(service_selected: any): void {
    this.additional_services_table = this.additional_services_list.filter((service: any) => {
      if (service_selected.id == service.id) {
        service.active = true;
        this.additional_services_selected
          .splice(this.additional_services_selected.findIndex((service: any) => service.id == service_selected.id), 1);
      }
      if (service.active) {
        return service;
      }
    });
  }

  public formBookingDetailValidator(form_data: BookingDetailModel): boolean {

    let result: boolean = false;

    form_data.startDate == '' || form_data.startDate == undefined ?
      this.bt_form_data.no_sdat = true : this.bt_form_data.no_sdat = false;

    form_data.finishDate == '' || form_data.finishDate == undefined ?
      this.bt_form_data.no_edat = true : this.bt_form_data.no_edat = false;

    form_data.roomateFlip == null || form_data.roomateFlip == undefined ?
      this.bt_form_data.no_rtyp = true : this.bt_form_data.no_rtyp = false;

    form_data.pets == null || form_data.pets == undefined ?
      this.bt_form_data.no_pets = true : this.bt_form_data.no_pets = false;

    form_data.roomType == null || form_data.roomType == undefined ?
      this.bt_form_data.no_room = true : this.bt_form_data.no_room = false;

    form_data.smoke == null || form_data.smoke == undefined ?
      this.bt_form_data.no_smok = true : this.bt_form_data.no_smok = false;

    form_data.roomatePreferences == null || form_data.roomatePreferences == undefined ?
      this.bt_form_data.no_gend = true : this.bt_form_data.no_gend = false;

    form_data.totalBeds == null || form_data.totalBeds == undefined ?
      this.bt_form_data.no_beds = true : this.bt_form_data.no_beds = false;

    for (let field in this.bt_form_data) {
      if (this.bt_form_data[field]) return false;
      else result = true;
    }
    return result;
  }

  public memberships_cards: any[];
  public rooms_cards: any[];
  public getMembershipsAndRoomsData(): void {
    const tenant_data = {
      building: this.current_build.id,
      startDate: this.booking_data.startDate,
      finishDate: this.booking_data.finishDate,
      roomateFlip: this.booking_data.roomateFlip,
      pets: this.booking_data.pets,
      roomType: this.booking_data.roomType,
      smoke: this.booking_data.smoke,
      roomatePreferences: this.booking_data.roomatePreferences,
      totalBeds: this.booking_data.totalBeds
    };
    this.loader.showLoader();
    this._service.service_general_post('Tenant/PostValidateTenant', tenant_data)
      .subscribe((response: any) => {
        if (response.result == 'Sucess') {
          this.memberships_cards = response.membershipsAvaible;
          this.rooms_cards = response.roomsAvaible;
        } else {
          this.systemMessage.showMessage({
            kind: 'error',
            time: 4777,
            message: {
              header: 'Membersips & Rooms',
              text: 'Memberships and rooms can not load.'
            }
          });
        }
        this.loader.hideLoader();
      }, (error: any) => {
        this.systemMessage.showMessage({
          kind: 'error',
          time: 4777,
          message: {
            header: 'Fatal Error',
            text: 'Error Fatal'
          }
        });
      });
  }

  public room_selected: any = null;
  public selectThisRoom(room: any): void {
    this.room_selected = room;
    this.rooms_cards.forEach((card: any) => {
      card.id == this.room_selected.id ?
        card.active = true : card.active = false;
    });
    this.getAddiotionalServices();
  }

  public membership_selected: any = null;
  public selectThisMembership(membership: any): void {
    this.membership_selected = membership;
    this.memberships_cards.forEach((card: any) => {
      card.id == this.membership_selected.id ?
        card.active = true : card.active = false;
    });
    this.getAddiotionalServices();
  }

  public getAddiotionalServices(): void {
    if (this.room_selected != null && this.membership_selected != null) {
      this.additional_services_section = true;
      this.joinAllMyServices();
      const ws_data = {
        idMembership: this.membership_selected.id,
        idBuilding: this.current_build.id
      };
      this._service.service_general_get_with_params('Tenant/GetServices', ws_data)
        .subscribe((response: any) => {
          if (response.result == 'Sucess') {
            this.additional_services_list = response.services;
            this.additional_services_list.forEach((service: any) => {
              service.active = true;
            });
            this.additional_services_table = this.additional_services_list;
          }
        }, (error: any) => {
          this.systemMessage.showMessage({
            kind: 'error',
            time: 4777,
            message: {
              header: 'Fatal Error',
              text: 'Error Fatal'
            }
          });
        });
    }
  }

  public all_services_selected: any[] = [];
  public total_services_ammount: number = 0;
  public booking_detail_total_ammount: number = 0;
  public joinAllMyServices(): void {
    this.all_services_selected = [];
    this.current_build.services.forEach((service: any) => {
      service.type_service = 'Included';
      service.lapse = '1';
      service.startDate = this.booking_data.startDate;
      service.endDate = this.booking_data.finishDate;
      service.total_ammount = 0;
      this.all_services_selected.push(service);
    });
    this.additional_services_selected.forEach((service: any) => {
      service.type_service = 'Extra';
      this.all_services_selected.push(service);
    });
    this.all_services_selected.forEach((service) => {
      this.total_services_ammount += service.total_ammount;
    });
    this.booking_detail_total_ammount = this.getTotalAmmount() + this.total_services_ammount;
  }

  public show_modal_content: string = '';
  public show_modal: boolean = false;
  public showModal(section: string = 'deafult'): void {
    !this.show_modal ?
      this.show_modal = true : this.show_modal = false;
    this.show_modal_content = section;
  }

  public ableDateSelection(id_date_start: string, id_date_end: string, extra: string = ''): void {
    const date_start: any = document.getElementById(id_date_start),
      date_end: any = document.getElementById(id_date_end);
    if (date_start.value != '' && date_end.value == '') {
      date_end.removeAttribute('disabled');
      date_end.setAttribute('min', date_start.value);
    } else if (date_start.value != '' && date_end.value != '') {
      date_end.value = '';
      date_end.setAttribute('min', date_start.value);
      switch (extra) {
        case 'booking':
          this.booking_data.finishDate = '';
          break;
      }
    }
  }

  public show_beds_section: boolean = false;
  public beds_to_add: any[] = [];
  public setBedsSelected(event_data: any): any {
    this.beds_to_add = [];
    const root_event = event_data.target;
    if (root_event.value != 0) {
      this.show_beds_section = true;
      for (let bed = 0; bed < root_event.value; bed += 1) {
        const add_new_bed = {
          email: '',
          lastName: '',
          motherName: '',
          name: '',
          birth: this.today,
          idBooking: null,
          active: null,
          phone: null,
          genderId: null
        };
        this.beds_to_add.push(add_new_bed);
      }
    } else {
      this.show_beds_section = false;
    }
  }

  public validateBookingDetailForm(): void {
    this.room_selected = null;
    this.membership_selected = null;
    this.additional_services_section = false
    const validations_booking_detail = {
      form_booking_detail: this.formBookingDetailValidator(this.booking_data),
      form_booking_beds: this.bedsFormValidator()
    }
    if (validations_booking_detail.form_booking_detail && validations_booking_detail.form_booking_beds) {
      this.getMembershipsAndRoomsData();
      this.ableBookingDetail(true);
    } else {
      this.systemMessage.showMessage({
        kind: 'error',
        time: 4777,
        message: {
          header: 'Required data',
          text: 'All inputs must be filled to continue.'
        }
      });
    }
  }

  public ableBookingDetail(to_edit: boolean): void {
    if (to_edit) {
      this.able_section_two = true;
    } else {
      this.able_section_two = false;
    }
  }

  public bedsFormValidator(): boolean {
    let result = true;
    const beds: any = document.querySelectorAll('[bed="additional"]');
    beds.forEach((bed: any, index: number) => {
      const bed_inputs = bed.querySelectorAll('input'),
        bed_select = bed.querySelectorAll('select'),
        bed_in = this.beds_to_add[index];
      bed_in.idBooking = this.current_build.id;
      bed_in.active = true;
      bed_inputs[0].value == '' ?
        bed_in.name = 'no_data' : bed_in.name = bed_inputs[0].value;
      bed_inputs[1].value == '' ?
        bed_in.lastName = 'no_data' : bed_in.lastName = bed_inputs[0].value;
      bed_inputs[2].value == '' ?
        bed_in.motherName = 'no_data' : bed_in.motherName = bed_inputs[2].value;
      bed_select[0].value == '0' ?
        bed_in.genderId = 'no_data' : bed_in.genderId = bed_select[0].value;
      bed_inputs[3].value == '' ?
        bed_in.email = 'no_data' : bed_in.email = bed_inputs[3].value;
      bed_inputs[4].value == '' ?
        bed_in.phone = 'no_data' : bed_in.phone = bed_inputs[4].value;
    });
    this.beds_to_add.forEach((bed: any) => {
      if (
        bed.name == 'no_data' ||
        bed.lastName == 'no_data' ||
        bed.motherName == 'no_data' ||
        bed.genderId == 'no_data' ||
        bed.email == 'no_data' ||
        bed.phone == 'no_data'
      ) result = false;
      bed.phone = Number(bed.phone);
    });
    return result;
  }

  public getTotalBeds(beds: string): number {
    const num_beds = Number(beds);
    return num_beds + 1;
  }

  public getNameRoomateType(id_roomtype: string): string {
    let result: string = 'No Data';
    this.roomates_catalog.forEach((roomate: any) => {
      if (roomate.id == Number(id_roomtype)) {
        result = roomate.roomateType1;
      }
    });
    return result;
  }

  public getDaysReserved(): number {
    const start_date: any = new Date(this.booking_data.startDate),
      end_date: any = new Date(this.booking_data.finishDate),
      diff_time = Math.abs(start_date - end_date),
      diff_days = Math.ceil(diff_time / (1000 * 60 * 60 * 24));
    return diff_days;
  }

  public getTotalAmmount(): number {
    const days_reserved = this.getDaysReserved(),
      beds_reserved = this.getTotalBeds(this.booking_data.totalBeds.toString()),
      price_membership = this.membership_selected.price,
      total = (price_membership * days_reserved) * beds_reserved;
    return total;
  }

  public iHaveCompletedStep(step_completed: number): void {
    if (step_completed == 0) {
      this.visible_step.step_1 = false;
      this.visible_step.step_2 = true;
      this.visible_step.step_3 = false;
    }
    if (step_completed == 1) {
      this.visible_step.step_1 = false;
      this.visible_step.step_2 = false;
      this.visible_step.step_3 = true;
    }
    if (step_completed == 4) {
      this.visible_step.step_1 = true;
      this.visible_step.step_2 = false;
      this.visible_step.step_3 = false;
    }
    if (step_completed == 5) {
      this.visible_step.step_1 = false;
      this.visible_step.step_2 = true;
      this.visible_step.step_3 = false;
    }

    if (step_completed == 2) {
    }
  }

  public completeBookingsDetail(): void {
    this.booking_post_data.idUser = this.userId;
    this.booking_post_data.idMembership = this.membership_selected.id;
    this.booking_post_data.Booking.dateInitProgram = this.booking_data.startDate;
    this.booking_post_data.Booking.dateEndProgram = this.booking_data.finishDate;
    this.booking_post_data.Booking.idRommateType = this.booking_data.roomateFlip;
    this.booking_post_data.Booking.reservedBeds = Number(this.booking_data.totalBeds) + 1;
    this.booking_post_data.Booking.idRoom = this.room_selected.id;
    this.booking_post_data.aditionalBeds = this.beds_to_add;
    this.booking_post_data.serviceBooking = this.servicesModelWorker(this.all_services_selected);

    const obj = {
      booking: this.booking_post_data,
      creditCard: {
        id: this.ccObj.id
      },
      user: {
        id: this.userId
      },
      token: '',
      amount: ''
    };
    console.log('DATA Booking', obj);
    return;
    this.loader.showLoader();
    this._service.service_general_post('Tenant/PostBooking', this.booking_post_data)
      .subscribe((response: any) => {
        if (response.result == 'Sucess') {
          this.systemMessage.showMessage({
            kind: 'ok',
            time: 4777,
            message: {
              header: 'Booking detail created',
              text: 'Booking detail has been created successfully.'
            }
          });
          this.iHaveCompletedStep(0);
          setTimeout(() => this.loader.hideLoader(), 1777);
        }
      }, (error: any) => {
        this.systemMessage.showMessage({
          kind: 'error',
          time: 4777,
          message: {
            header: 'Fatal Error',
            text: 'Error Fatal'
          }
        });
        setTimeout(() => this.loader.hideLoader(), 1777);
      });
    console.log('Service completed => ', this.booking_post_data);
  }

  public servicesModelWorker(services: any): any {
    let services_worked: any[] = [];
    services.forEach((service: any) => {
      const service_model = {
        idService: service.id,
        dateStart: service.startDate,
        dateEnd: service.endDate,
        recurrent: service.lapse,
        fromMembership: this.membership_selected.id,
        amount: service.total_ammount,
        idUserPaymentService: 0,
        idUserPaymentServiceNavigation: {
          id: 0,
          idCreditCard: null,
          idServiceBooking: 0,
          payment: 0,
          paymentDate: ''
        }
      };
      services_worked.push(service_model);
    });
    return services_worked;
  }

  public selectingAdditionalServices( service_selected: any ):void {
        this.additional_services_table = this.additional_services_list.filter( (service: any) => {
            if( service_selected.id == service.id ) {
                service.active = false;
                this.additional_services_selected.push( service );
            }
            if( service.active ) {
                return service;
            }
        });
    }

  public getAdditionalServicesSelected(): void {
    if (this.validateAdditionalServices()) {
      this.systemMessage.showMessage({
        kind: 'ok',
        time: 4777,
        message: {
          header: 'Additional services added',
          text: 'Additional services has been added successfully.'
        }
      });
      this.joinAllMyServices();
      this.showModal();
    } else {
      this.systemMessage.showMessage({
        kind: 'error',
        time: 4777,
        message: {
          header: 'Required data',
          text: 'All inputs must be filled to continue.'
        }
      });
    }
  }

  public validateAdditionalServices(): boolean {
    let result: boolean = true;
    const additional_services = document.getElementById('form_services_added'),
      additional_service: any = additional_services.querySelectorAll('[service="added"]');
    additional_service.forEach((service_add: any) => {
      const inputs = service_add.querySelectorAll('input'),
        select = service_add.querySelectorAll('select'),
        sDate = inputs[0].value,
        eDate = inputs[1].value,
        lapse = select[0].value,
        id_service = inputs[0].id.split('_')[inputs[0].id.split('_').length - 1];
      this.additional_services_selected.forEach((service_find: any) => {
        if (service_find.id == id_service) {
          service_find.startDate = sDate;
          service_find.endDate = eDate;
          service_find.lapse = lapse;
          service_find.validator = {
            no_sdat: false,
            no_edat: false,
            no_laps: false,
          }
          service_find.startDate == '' ?
            service_find.validator.no_sdat = true :
            service_find.validator.no_sdat = false;
          service_find.endDate == '' ?
            service_find.validator.no_edat = true :
            service_find.validator.no_edat = false;
          service_find.lapse == '' ?
            service_find.validator.no_laps = true :
            service_find.validator.no_laps = false;
        }
      });
    });
    this.additional_services_selected.forEach((service: any) => {
      for (let field in service.validator) {
        if (service.validator[field]) {
          result = false;
        }
      }
    });
    return result;
  }

  public updateLapseService(event_data: any, service: any) {
    const event_root: any = event_data.target;
    service.lapse = event_root.value;
    if (service.startDate != '' && service.endDate != '') {
      service.lapse == '1' ?
        service.total_ammount = service.price * service.day_diff :
        service.total_ammount = service.priceUnit * service.day_diff;
    }
  }

  public getAdditionalServiceAmmount(event_data: any, date_position: number, service: any): void {
    const root_event: any = event_data.target;
    date_position == 0 ?
      service.startDate = root_event.value :
      service.endDate = root_event.value;
    if (service.startDate != '' && service.endDate) {
      const days_diff = getDaysDifference(service.startDate, service.endDate);
      service.day_diff = days_diff == 0 ? 1 : days_diff;
      if (service.lapse != '') {
        service.lapse == '1' ?
          service.total_ammount = service.price * service.day_diff :
          service.total_ammount = service.priceUnit * service.day_diff;
      }
    }
    function getDaysDifference(sDate, eDate): number {
      const start_date: any = new Date(sDate),
        end_date: any = new Date(eDate),
        diff_time = Math.abs(start_date - end_date),
        diff_days = Math.ceil(diff_time / (1000 * 60 * 60 * 24));
      return diff_days + 1;
    }
  }


  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////// UTILS
  /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  decryptData(data) {
    try {
      const bytes = CryptoJS.AES.decrypt(data, this.encryptSecretKey);
      if (bytes.toString()) {
        var decrypt = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      }

      return decrypt;
    } catch (e) { console.log(e); }
  }

  public card_data: CardDTO = new CardDTO();
  public kindCardDetecter(card_number: string): any {
    let card_kind = '';
    const visa_regex = new RegExp("^4[0-9]{12}(?:[0-9]{3})?$"),
      mcard_regex = new RegExp("^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$"),
      american_regex = new RegExp("^3[47][0-9]{13}$");
    if (visa_regex.test(card_number) &&
      card_number.length >= 13 &&
      card_number.length <= 16) card_kind = 'visa';
    if (mcard_regex.test(card_number) &&
      card_number.length == 16) card_kind = 'mcard';

    if (american_regex.test(card_number) &&
      card_number.length == 15) card_kind = 'american';
    this.card_data.kind = card_kind;
    return card_kind;

  }

}

class CardDTO {
  active: boolean;
  ccv: string = '';
  id: number = null;
  main: any;
  membershipBookings: any;
  month: string = '';
  name: string = '';
  number: string = '';
  user: any;
  userId: number = null;
  userPaymentServices: any;
  year: string = '';
  kind: string = '';
}

class BookingDetailModel {
  building: number = null;
  startDate: string = '';
  finishDate: string = '';
  roomateFlip: number = null;
  pets: boolean = null;
  roomType: number = null;
  smoke: boolean = null;
  roomatePreferences: boolean = null;
  totalBeds: number = null;
}

class BookingPostDetailModel {
  idUser: number;
  idMembership: number;
  Booking: {
      dateInitProgram: string;
      dateEndProgram: string;
      idRommateType: number;
      reservedBeds: number;
      idRoom: number;
  } = {
      dateInitProgram: '',
      dateEndProgram: '',
      idRommateType: 0,
      reservedBeds: 0,
      idRoom: 0
  };
  amount: number;
  serviceBooking: any;
  aditionalBeds: any;
}
