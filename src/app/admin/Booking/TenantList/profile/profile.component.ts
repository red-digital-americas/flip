import { Component, OnInit } from '@angular/core';
import { DatosService } from '../../../../../datos.service';
import { ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { userInfo } from 'os';
import { isNullOrUndefined } from 'util';
import { Location } from '@angular/common';
import * as CryptoJS from 'crypto-js';
import { SystemMessage } from '../../../../../ts/systemMessage';
import { TabsComponent } from '../../../../../ts/systemTabs';
import { Utils } from '../../../../utils/utils';
import { LoaderComponent } from '../../../../../ts/loader';

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
    this.tabs.createTabsApp();



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
        console.log('Credit card model => ', obj);
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
  public tabs = new TabsComponent('root');
  public system_message: SystemMessage = new SystemMessage();
  public loader: LoaderComponent = new LoaderComponent();
  public profile_data: ProfileDTO = new ProfileDTO();
  public section: string;
  public tenant_id: string;

  public country_catalogo: [];
  public civilStatus_catalogo: [];
  public scholarship_catalogo: [];
  public companyType_catalogo: [];
  public genderList_catalogo: [];
  public stateCountry_catalogo: [];
  public relationship_catalogo: [];
  public id_user_selected: number;
  public initProfileApp(): void {

    const get_catalogos = new Promise( (resolve: any) =>  {

      this.services.service_general_get('Tenant/getCatalogsUser')
          .subscribe( (response: any) => {

          if( response.result == 'Sucess' ) { 

            this.country_catalogo = response.country;
            this.civilStatus_catalogo = response.civilStatus;
            this.scholarship_catalogo = response.scholarShip;
            this.companyType_catalogo = response.companyTypeList; 
            this.genderList_catalogo = response.genderList;
            this.relationship_catalogo = response.relationship;

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

        this.services.service_general_get_with_params('Profile/GetProfileById', user_data )
            .subscribe( (response: any) => {

              if( response.result == 'Sucess' ) {

                const user_data = response.item[0];

                this.profile_data = user_data;
                this.profile_data.id = Number( this.tenant_id );
                delete user_data.userData.id;
                delete user_data.userTaxData.id;

                const country_data = {countryId: user_data.userData.countryId};

                this.services.service_general_get_with_params('Tenant/getStateListById', country_data)
                    .subscribe( (response: any) => {

                      if( response.result == 'Sucess' ) {

                        this.stateCountry_catalogo = response.item;

                      }

                    }, (error: any) => {

                      console.log('Error WS getStateListById => ', error);

                    });

              }

            }, (error: any) => {

              console.log('Error en el servicio de getTenantById => ', error);

            });

      } 

    });

  }


  public sendProfileData():void {

    if( this.validatingProfileData( this.profile_data ) ) {

      this.loader.showLoader();

      this.services.service_general_post('Profile/'  ,this.profile_data)
          .subscribe( (response: any) => {

            if( response.result == "Sucess" ) {

              this.system_message.showMessage({
                kind: 'ok',
                time: 4777,
                message: {
                  header: 'Profile saved.',
                  text: 'Profile has been saved successfully'
                }
              });

              setTimeout( () => { this.loader.hideLoader(); }, 1277);

            }

          }, (error: any) => {

            this.system_message.showMessage({
              kind: 'error',
              time: 2400,
              message: {
                header: 'System Error',
                text: 'Error WS => Add Profile'
              }
            });

            setTimeout( () => { this.loader.hideLoader(); }, 1277);

          });

    } else this.system_message.showMessage({
      kind: 'error',
      time: 2400,
      message: {
        header: 'Formulario incompleto',
        text: 'El formulario no esta completo'
      }
    });

  }

  
  public income_data: IncomeDTO = new IncomeDTO(); 
  public getIncomeData():void {

    this.income_data.id = this.profile_data.id;

    const id_user = {userId: this.profile_data.id };

    this.services.service_general_get_with_params('Profile/getIncome', id_user)
        .subscribe( (response: any) => {

          if( response.result == 'Sucess' ) {

            const root_data = response.item;

            this.income_data = root_data;

          }

        }, (error: any) => {

          console.log('Error WS GetIncome => ', error);

        });

  }

  public sendIncomeData():void {

    this.loader.showLoader();

    this.services.service_general_post('Profile/AddOrEditIncome', this.income_data)
        .subscribe( (response: any) => {

          if( response.result == 'Sucess' ) {

            this.system_message.showMessage({
              kind: 'ok',
              time: 4777,
              message: {
                header: 'Income saved.',
                text: 'Income has been saved successfully'
              }
            });

            setTimeout( () => this.loader.hideLoader(), 1277);

          }

        }, (error: any) => {

          console.log('Error Servicio PostIncome => ', error);

        });

  }


  public reference_data: ReferenceDTO = new ReferenceDTO();
  public getReferenceData():void {

    const user_data = {userId: this.profile_data.id};

    this.services.service_general_get_with_params('Profile/getReference', user_data)
        .subscribe( (response: any) => {

          if( response.result == 'Sucess' ) {

            this.reference_data = response.item;

          }

        }, (error: any) => {

          console.log('Error GetReference => ', error);

        });

  }


  public sendReferencesData():void {

    this.loader.showLoader();

    this.services.service_general_post('Profile/AddOrEditReference', this.reference_data)
        .subscribe( (response: any) => {

          if( response.result == 'Sucess' ) {

            this.system_message.showMessage({
              kind: 'ok',
              time: 4777,
              message: {
                header: 'Reference saved.',
                text: 'Reference has been saved successfully.'
              }
            });

            setTimeout( () => this.loader.hideLoader(), 1777);

          }

        }, (error: any) => {

          console.log('Error en Post Reference => ', error);

        });

  }

  public payment_cards: [];
  public card_data: CardDTO = new CardDTO();
  public getPaymentData():void {

    const user_data = {userId: this.profile_data.id};

    this.show_payment_form = false;

    this.services.service_general_get_with_params('Tenant/getCreditCard', user_data)
        .subscribe( (response: any) => {

          if( response.result == 'Sucess' ) {

            this.payment_cards = response.item; 

            this.payment_cards.forEach( (card: any) => {

              card.number = this.decryptData( card.number ).toString();
              card.ccv = this.decryptData( card.ccv ).toString();

            });

          } 

        }, (error: any) => {

          console.log('Error Get Payment Data => ', error);

        });

  }

  public sendCardData():void {

    this.card_data.number = this.encryptData( this.card_data.number );
    this.card_data.ccv = this.encryptData( this.card_data.ccv );

    this.loader.showLoader();

    this.services.service_general_post('Tenant/CreateUpdateCreditCard/' , this.card_data)
        .subscribe( (response: any) => {

          if( response.result == 'Success' ) {

            this.system_message.showMessage({
              kind: 'ok',
              time: 4777,
              message: {
                header: 'Credit card updated.',
                text: 'Credit card has been updated successfully.'
              }
            });

            this.getPaymentData();
            this.show_payment_form = false;

            setTimeout( () => this.loader.hideLoader(), 1277);

          } 

        }, (error: any) => {

          console.log('Error WS Creditcard => ', error);

        });

  }

  public show_payment_form: boolean = false;
  public showPaymentForm( paymentData: CardDTO = null ):void {

    !this.show_payment_form ? 
      this.show_payment_form = true:
      this.show_payment_form = false;

    this.card_data = paymentData;

    if( this.card_data == null ) {

      this.card_data = new CardDTO();
      this.card_data.userId = this.profile_data.id;
      delete this.card_data.id;

    }

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
      this.profile_data.clientKind  
    ) {

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
        !this.form_required.no_bname &&
        !this.form_required.no_bacti &&
        !this.form_required.no_btrad &&
        !this.form_required.no_brfc &&
        !this.form_required.no_bfirm &&
        !this.form_required.no_bphon
      ) result = true;
      else result = false;

    }

    return result;

  }

  /*
   * Autor: Carlos Hernandez Hernandez
   * Contacto: carlos.hernandez@minimalist.com
   * Nombre: validateImageUpload
   * Tipo: Funcion | Funcion efecto colateral
   * Visto en: communities
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
                        root_data.profile_data.avatar = '../../../assets/14.jpg';
                        name_image_container.innerHTML = `La imagen debe medir <br /><span class="text-bold">${ dimensions_image }</span>`;
                        id_image_container.classList.add('no-image');

                      }
                      
                    });

            }

            reader.readAsDataURL( event.files[0] );

    }
    
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
        this.services.UploadImgSuc(f).subscribe((r) => {
          if (Utils.isDefined(r)) {
            url = <string>r.message;
            
            url = url.replace('/Imagenes', this.services.getURL() + 'Flip');
            
            this.profile_data.avatar = url;
            
            this.newImages = [];
          }
        })
      }
    }
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
    car: number,
    howMuchMax: number,
    howMuchMin: number,
    rent: boolean,
    genderId: number
  } = {
    pet: false,
    scholarshipId: -1,
    civilStatusId: -1,
    car: null,
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

class IncomeDTO {
  id: number;
  income: {
    nameEmployer: string,
    industry: string,
    contactNumber: string,
    tenureId: number,
    creditHistory: boolean,
    splitRent: boolean,
    companyTypeId: number,
    employeeId: number,
    jobPosition: string,
    mainSource: string,
    monthlyIncome: number,
    billLastYear: number,
    companyYearStart: string,
    branchoffice: string,
    streetHo: string,
    NumberHo: string,
    intNumberHo: string,
    cityHo: string
  } = {
    nameEmployer: '',
    industry: '',
    contactNumber: '',
    tenureId: null,
    creditHistory: false,
    splitRent: false,
    companyTypeId: null,
    employeeId: null,
    jobPosition: '',
    mainSource: '',
    monthlyIncome: null,
    billLastYear: null,
    companyYearStart: null,
    branchoffice: '',
    streetHo: '',
    NumberHo: '',
    intNumberHo: '',
    cityHo: ''
  }
}

class ReferenceDTO {
  id: number;
  reference: {
    name: string,
    firstName: string,
    lastName: string,
    firstRent: boolean,
    relationshipId: number,
    mail: string,
    phone: string,
    nameLandlord: string,
    phoneLandLord: string,
    emailLandLord: string
  } = {
    name: '',
    firstName: '',
    lastName: '',
    firstRent: false,
    relationshipId: null,
    mail: '',
    phone: '',
    nameLandlord: '',
    phoneLandLord: '',
    emailLandLord: ''
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
}