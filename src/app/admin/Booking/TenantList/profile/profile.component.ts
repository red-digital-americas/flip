import { Component, OnInit } from '@angular/core';
import { DatosService } from '../../../../../datos.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { userInfo } from 'os';
import { isNullOrUndefined } from 'util';
import { Location } from '@angular/common';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(public services: DatosService, private route: ActivatedRoute, private location: Location) { }
  buildingId;
  infoUser;
  date = new FormControl(new Date());
  country;
  civilStatus;
  scholarShip;
  payementMethods;
  idUser;
  name = '';
  lastName = '';
  firstName = '';
  birth;
  email = '';
  phone = 0;
  pet = false;
  active = false;
  work = '';
  countrySelect = { id: NaN, name: 'Country' };
  civilSelect = { id: NaN, name: 'Civil Status' };
  scholarSelect =  { id: NaN, name: 'Scholarship' };
  facebook; aboutMe; instagram; twitter; photo;
  encryptSecretKey = 'Llave';
  ngOnInit() {
    this.idUser = this.route.snapshot.paramMap.get('id');
    console.log(this.location.getState());
    this.buildingId = this.location.getState();
    console.log(this.buildingId);
    this.getUser(this.idUser);
    this.getList();
  }
  getList() {
    this.services.service_general_get('Tenant/getCatalogsUser').subscribe((value) => {
      console.log(value);
      this.country = value.country;
      this.civilStatus = value.civilStatus;
      this.scholarShip = value.scholarShip;
      console.log('Country', this.country);
    });
  }

  async getUser(id) {
    const obj = { userId: id };
    this.services.service_general_get_with_params('Tenant/getTenantById', obj).subscribe((value) => {
      console.log(value.item[0]);
      console.log(this.date);
      this.infoUser = value.item[0];
      this.idUser = value.item[0].idUser;
      this.name = value.item[0].firstName;
      this.firstName = value.item[0].middleName;
      this.lastName = value.item[0].lastname;
      this.email = value.item[0].email;
      this.phone = value.item[0].phone;
      this.active = value.item[0].active ? true : false;
      this.facebook = value.item[0].facebook;
      this.work = value.item[0].workplace;

      this.countrySelect = isNullOrUndefined(value.item[0].country) ? 0 : value.item[0].country.id;
      console.log(this.countrySelect);

      this.civilSelect = isNullOrUndefined(value.item[0].civilStatus) ? 0 : value.item[0].civilStatus;
      console.log(this.civilSelect);

      this.scholarSelect = isNullOrUndefined(value.item[0].scholarship) ? 0 : value.item[0].scholarship.id;
      console.log(this.scholarSelect);

      this.pet = value.item[0].pet;
      this.aboutMe = value.item[0].aboutMe;
      this.instagram = value.item[0].instagram;
      this.twitter = value.item[0].twitter;
      this.photo = value.item[0].photo;
      this.date = new FormControl(value.item[0].dateBirth);

      this.payementMethods = value.item[0].payementMethods;
      for (let i = 0; i < this.payementMethods.length; i++) {
        this.payementMethods[i].number = this.decryptData(this.payementMethods[i].number);
      }
      console.log(this.payementMethods);
    });
  }

  sendBookingData() {
    const obj = {
      id: this.idUser,
      name: this.name,
      lastName: this.firstName,
      motherName: this.lastName,
      birth: this.date.value,
      email: this.email,
      phone: this.phone,
      active: this.active,
      workplace: this.work,
      aboutMe: this.aboutMe,
      instagramUrl: this.instagram,
      facebookUrl: this.facebook,
      twitterUrl: this.twitter,
      // userData: {
      //   civilStatusId: null,
      //   pet: false,
      //   scholarshipId: null,
      //   countryId: this.countrySelect,
      //   stateId: null,
      // }
    };
    console.log(obj);
    try {
      this.services.service_general_post('Tenant/updateUserTenant/' + this.buildingId.id + '/' + this.active, obj).subscribe((value) => {
        console.log(value);
      }, (error) => {
        console.log(error);
      } );
    } catch (error) {
      console.log(error);
    }
  }

  updateDataAddition() {
    const obj = {
      id: this.idUser,
      userData: {
          civilStatusId: this.civilSelect,
          pet: this.pet,
          scholarshipId: this.scholarSelect,
          countryId: this.countrySelect,
        }
    };
    console.log(obj);
    try {
      this.services.service_general_post('Tenant/updateUserAddTenant/' + this.buildingId.id , obj).subscribe((value) => {
        console.log(value);
      }, (error) => {
        console.log(error);
      } );
    } catch (error) {
      console.log(error);
    }
  }

  updateOrAddMethod(obj) {
    obj.number = this.encryptData(obj.number);
    if (obj.cvv !== obj.cvv) {
      obj.cvv = this.encryptData(obj.cvv);
    }
    console.log(obj);
    try {
      this.services.service_general_post('Tenant/CreateUpdateCreditCard/' , obj).subscribe((value) => {
        console.log(value);
      }, (error) => {
        console.log(error);
      } );
    } catch (error) {
      console.log(error);
    }
  }

  selectCountryOption(id) {
    //getted from event
    console.log(id);
    //getted from binding
    console.log(this.countrySelect);
  }

  selectCivilOption(id) {
    //getted from event
    console.log(id);
    //getted from binding
    console.log(this.civilSelect);
  }

  selectScholarshipOption(id) {
    //getted from event
    console.log(id);
    //getted from binding
    console.log(this.scholarSelect);
  }

  decryptData(data) {
    try {
      const bytes = CryptoJS.AES.decrypt(data, this.encryptSecretKey);
      if (bytes.toString()) {
        var decrypt = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      }

      return decrypt;
    } catch (e) { console.log(e); }
  }

  encryptData(data) {
    try {
      var crypt = CryptoJS.AES.encrypt(JSON.stringify(data), this.encryptSecretKey).toString();
      // console.log(this.crypt)
      // this.decryptData(this.crypt);
      return crypt;
    } catch (e) { console.log(e); }
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////////////

  public room_selected = 'Personal Data';

  public showSection(event_data, id_section: string): void {

    this.room_selected = id_section == 'personalData' ? 'Personal Data' : 'Additional Information';

    const event = event_data.target,
      tabs_in = document.getElementsByClassName('room-data__tab');

    if (!event.classList.contains('room-data__tab--active')) {

      resetTabsIn();
      sectionSelected(id_section);
      event.classList.add('room-data__tab--active');

    }

    function resetTabsIn() {

      for (let tab = tabs_in.length; tab--;) {

        tabs_in[tab].classList.remove('room-data__tab--active');

      }

    }

    function sectionSelected(section) {

      const rooms = document.getElementsByName('room-section');

      for (let room = rooms.length; room--;) {

        rooms[room].classList.add('display-none');

      }

      let section_to_show = document.getElementById(section);

      section_to_show.classList.remove('display-none');

    }

  }

}
