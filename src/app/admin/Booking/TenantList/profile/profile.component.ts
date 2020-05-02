import { Component, OnInit } from '@angular/core';
import { DatosService } from '../../../../../datos.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { userInfo } from 'os';
import { isNullOrUndefined } from 'util';
import { Location } from '@angular/common';
import * as CryptoJS from 'crypto-js';
import { SystemMessage } from '../../../../../ts/systemMessage';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(
    public services: DatosService, 
    private route: ActivatedRoute, 
    private location: Location
  ) {}


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

    this.initProfileApp();

    this.section = 'tenantList';
    this.idUser = this.route.snapshot.paramMap.get('id');
    //console.log(this.location.getState());
    this.buildingId = this.location.getState();
    //console.log(this.buildingId);
    this.getUser(this.idUser);
    this.getList();

  }
  getList() {
    this.services.service_general_get('Tenant/getCatalogsUser').subscribe((value) => {
      //console.log(value);
      this.country = value.country;
      this.civilStatus = value.civilStatus;
      this.scholarShip = value.scholarShip;
      //console.log('Country', this.country);
    });
  }

  async getUser(id) {
    const obj = { userId: id }; 
    this.services.service_general_get_with_params('Tenant/getTenantById', obj).subscribe((value) => {
      //console.log(value.item[0]);
      //console.log(this.date);
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
      //console.log(this.countrySelect);

      this.civilSelect = isNullOrUndefined(value.item[0].civilStatus) ? 0 : value.item[0].civilStatus;
      //console.log(this.civilSelect);

      this.scholarSelect = isNullOrUndefined(value.item[0].scholarship) ? 0 : value.item[0].scholarship.id;
      //console.log(this.scholarSelect);

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
      //console.log(this.payementMethods);
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
    //console.log(obj);
    try {
      this.services.service_general_post('Tenant/updateUserTenant/' + this.buildingId.id + '/' + this.active, obj).subscribe((value) => {
        //console.log(value);
      }, (error) => {
        //console.log(error);
      } );
    } catch (error) {
      //console.log(error);
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
    //console.log(obj);
    try {
      this.services.service_general_post('Tenant/updateUserAddTenant/' + this.buildingId.id , obj).subscribe((value) => {
        //console.log(value);
      }, (error) => {
        //console.log(error);
      } );
    } catch (error) {
      //console.log(error);
    }
  }

  updateOrAddMethod(obj) {
    obj.number = this.encryptData(obj.number);
    if (obj.cvv !== obj.cvv) {
      obj.cvv = this.encryptData(obj.cvv);
    }
    //console.log(obj);
    try {
      this.services.service_general_post('Tenant/CreateUpdateCreditCard/' , obj).subscribe((value) => {
        //console.log(value);
      }, (error) => {
        //console.log(error);
      } );
    } catch (error) {
      //console.log(error);
    }
  }

  selectCountryOption(id) {
    //getted from event
    //console.log(id);
    //getted from binding
    //console.log(this.countrySelect);
  }

  selectCivilOption(id) {
    //getted from event
    //console.log(id);
    //getted from binding
    //console.log(this.civilSelect);
  }

  selectScholarshipOption(id) {
    //getted from event
    //console.log(id);
    //getted from binding
    //console.log(this.scholarSelect);
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



















  














  /// Carlos Enrique Hernandez
  /* Welcomeback Mr. Anderson we missed you. */ 
  public profile_data: ProfileDTO = new ProfileDTO();
  public section: string;
  public system_message: SystemMessage = new SystemMessage();
  public tenant_id: string;

  public country_catalogo: [];
  public civilStatus_catalogo: [];
  public scholarship_catalogo: [];
  public id_user_selected: number;
  public initProfileApp(): void {

    const get_catalogos = new Promise( (resolve: any) =>  {

      this.services.service_general_get('Tenant/getCatalogsUser')
          .subscribe( (response: any) => {

          if( response.result == 'Sucess' ) {

            this.country_catalogo = response.country;
            this.civilStatus_catalogo = response.civilStatus;
            this.scholarship_catalogo = response.scholarShip;

            resolve( true );

          } else {

            resolve( false );

          }

      });

    });

    get_catalogos.then( (catalogos_gotted: boolean) => {

      if( catalogos_gotted ) {

        this.tenant_id = this.route.snapshot.paramMap.get('id');

        const user_data = { userId: this.tenant_id };

        this.services.service_general_get_with_params('Tenant/getTenantById', user_data )
            .subscribe( (response: any) => {

              if( response.result == 'Sucess' ) {

                const user_data = response.item[0];

                console.log('User Data => ', user_data);

                this.profile_data.name = user_data.firstName;
                this.profile_data.lastName = user_data.lastname;
                this.profile_data.avatar = user_data.photo;
                this.profile_data.motherName = user_data.middleName;
                this.profile_data.birth = user_data.dateBirth;
                this.profile_data.phone = user_data.phone;
                this.profile_data.email = user_data.email;
                this.profile_data.twitterUrl = user_data.twitter;
                this.profile_data.facebookUrl = user_data.facebook;
                this.profile_data.userData.civilStatusId = user_data.civilStatus;
                this.profile_data.userData.scholarshipId = user_data.scholarship.id;
                this.profile_data.userData.pet = user_data.pet;
                this.profile_data.active = user_data.active;
                this.profile_data.clientKind = false;

                console.log( this.profile_data );

              } else {

                //Mandar mensaje de que no pudo obtener dicho usuario y ver que hace

              }

            }, (error: any) => {

              console.log('Error en el servicio de getTenantById => ', error);

            });

      } else {

        //Error al cargar los catalogos no puede continuar

      }

    });

  }


  public sendProfileData():void {

    console.log('Los campos estan completos => ', this.validatingProfileData( this.profile_data ) );

  }


  public toggleKindClientForm( section_to_show: boolean ): void {

    section_to_show ? 
      this.profile_data.clientKind = false : 
      this.profile_data.clientKind = true;

    this.form_required.no_bname = false;
    this.form_required.no_bacti = false;
    this.form_required.no_btrad = false;
    this.form_required.no_brfc = false;
    this.form_required.no_bfirm = false;
    this.form_required.no_bphon = false;

  }


  public form_required: any = {
    no_name: false,
    no_lnam: false,
    no_snam: false,
    no_mail: false,
    no_phon: false,
    no_bname: false,
    no_bacti: false,
    no_btrad: false,
    no_brfc: false,
    no_bfirm: false,
    no_bphon: false
  }
  private validatingProfileData( form_data: ProfileDTO ):boolean {


    let result: boolean;

    console.log('Para validar => ', form_data);

    form_data.name == '' || form_data.name == null ? 
      this.form_required.no_name = true : this.form_required.no_name = false;

    form_data.lastName == '' || form_data.name == null ? 
      this.form_required.no_lnam = true : this.form_required.no_lnam = false;

    form_data.motherName == '' || form_data.motherName == null ? 
      this.form_required.no_snam = true : this.form_required.no_snam = false;

    form_data.phone == '' || form_data.phone == null ? 
      this.form_required.no_phon = true : this.form_required.no_phon = false;

    form_data.email == '' || form_data.email == null ? 
      this.form_required.no_email = true : this.form_required.no_email = false;

    form_data.userTaxData.name == '' || form_data.userTaxData.name == null ? 
        this.form_required.no_bname = true : this.form_required.no_bname = false;

    form_data.userTaxData.activity == '' || form_data.userTaxData.activity == null ? 
      this.form_required.no_bacti = true : this.form_required.no_bacti = false;

    form_data.userTaxData.tradeName == '' || form_data.userTaxData.tradeName == null ? 
      this.form_required.no_btrad = true : this.form_required.no_btrad = false;

    form_data.userTaxData.rfc == '' || form_data.userTaxData.rfc == null ? 
      this.form_required.no_brfc = true : this.form_required.no_brfc = false;

    form_data.userTaxData.legalRepresentative == '' || form_data.userTaxData.legalRepresentative == null ? 
      this.form_required.no_bfirm = true : this.form_required.no_bfirm = false;

    form_data.userTaxData.phone == '' || form_data.userTaxData.legalRepresentative == null ? 
      this.form_required.no_bphon = true : this.form_required.no_bphon = false;

    if(
      !this.form_required.no_name &&
      !this.form_required.no_lnam &&
      !this.form_required.no_snam &&
      !this.form_required.no_phon &&
      !this.form_required.no_mail &&
      !this.profile_data.clientKind 
    ) result = true;
    else result = false;

    if(
      !this.form_required.no_name &&
      !this.form_required.no_lnam &&
      !this.form_required.no_snam &&
      !this.form_required.no_phon &&
      !this.form_required.no_mail &&
      !this.form_required.no_bacti &&
      !this.form_required.no_btrad &&
      !this.form_required.no_brfc &&
      !this.form_required.no_bfirm &&
      !this.form_required.no_bphon &&
      !this.profile_data.clientKind &&
      this.form_required.no_bname 
    ) result = true;
    else result = false;

    console.log('Validados => ', this.form_required );

    return result;

  }

}


class ProfileDTO {
  id: number;
  name: string = '';
  lastName: string = '';
  motherName: string = '';
  birth: string = '';
  linkedInUrl: string = '';
  twitterUrl: string = '';
  facebookUrl: string = '';
  instagramUrl: string = '';
  email: string = '';
  clientKind: boolean;
  rfc: string = '';
  phone: string = '';
  active: boolean;
  systemTypeId: number;
  password: string = '';
  avatar: string = '';
  userData: {
    pet: boolean,
    scholarshipId: number,
    civilStatusId: number,
    cars: number,
    howMuchMax: number,
    howMuchMin: number,
    rent: boolean,
    genderId: number
  } = {
    pet: false,
    scholarshipId: -1,
    civilStatusId: -1,
    cars: 0,
    howMuchMax: 0,
    howMuchMin: 0,
    rent: false,
    genderId: 0
  };
  userTaxData: {
    name: string,
    activity: string,
    tradeName: string,
    legalRepresentative: string,
    phone: string,
    rfc: string
  } = {
    name: '',
    activity: '',
    tradeName: '',
    legalRepresentative: '',
    phone: '',
    rfc: ''
  }
}
