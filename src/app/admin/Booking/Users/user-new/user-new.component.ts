import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';
import { DatosService } from '../../../../../datos.service';
import { LoaderComponent } from '../../../../../ts/loader';
import { SystemMessage } from '../../../../../ts/systemMessage';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { Utils } from '../../../../utils/utils';
import { get } from 'https';

@Component({
  selector: 'app-user-new',
  templateUrl: './user-new.component.html',
  styleUrls: ['./user-new.component.scss']
})
export class UserNewComponent implements OnInit {

  userId;
  userObj = {
    id: 0,
    name: '',
    password: '',
    lastName: '',
    motherName: '',
    avatar: '',
    systemTypeId: '',
    phone: '',
    cellPhone: '',
    workplace: '',
    aboutMe: '',
    active: true,
    birth: '',
    rfc: '',
    email: ''
  };

  systemType = [{ id: NaN, name: 'System type'}];

  loader = new LoaderComponent();
  systemMessage = new SystemMessage();

  public form_required: any = {
    no_name: false,
    no_lastName: false,
    no_motherName: false,
    no_password: false,
    no_email: false,
    no_phone: false,
    no_cellphone: false,
    no_workplace: false,
    no_aboutMe: false,
    no_rfc: false,
    perkPhotoCtrl: this._formBuilder.group({ labelCtrl: ['Choose file'], photoCtrl: [], serverUrlCtrl: [] }),
  };

  systemTypeInitial;

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    public services: DatosService,
    private _formBuilder: FormBuilder,
    private _location: Location
  ) { }

  ngOnInit() {
    this.getSystemTypeLs(1);
  }

  getSystemTypeLs(systemId) {
    this.loader.showLoader();
    let params = { id: systemId};
    this.services.service_general_get_with_params('UsersAdmin/Catalogs', params).subscribe((value) => {
      this.systemType = value.item;
      console.log('Reponse Memberships ', this.systemType);
      this.loader.hideLoader();
    });
  }

  update(): void {
    if (this.validateDataForm()) {
      this.loader.showLoader();
      console.log('User Object', this.userObj);
      this.callUpdateService();
    } else {
      this.systemMessage.showMessage({
        kind: 'error',
        message: {
          header: 'Error',
          text: 'Form incomplete'
        },
        time: 2400
      });
    }
  }

  callUpdateService() {
    this.services.service_general_post('UsersAdmin', this.userObj).subscribe((value) => {
      this.loader.hideLoader();
      switch (value.result) {
        case 'Success':
          this.systemMessage.showMessage({
            kind: 'ok',
            message: {
              header: 'Success',
              text: 'Update Successfully'
            },
            time: 2000
          });
          this._location.back();
        break;
      }
    });
  }

  private validateDataForm(): boolean {
    let result: boolean;
    this.form_required.no_name = this.userObj.name === '' || this.userObj.name === null ? true : false;
    this.form_required.no_lastName = this.userObj.lastName === '' || this.userObj.lastName === null ? true : false;
    this.form_required.no_motherName = this.userObj.motherName === '' || this.userObj.motherName === null ? true : false;
    this.form_required.no_password = this.userObj.password === '' || this.userObj.password === null ? true : false;
    this.form_required.no_email = this.userObj.email === '' || this.userObj.email === null ? true : false;
    this.form_required.no_phone = this.userObj.phone === '' || this.userObj.phone === null || this.userObj.phone.length < 8 ? true : false;
    this.form_required.no_cellphone = this.userObj.cellPhone === '' || this.userObj.cellPhone === null || this.userObj.cellPhone.length < 8 ? true : false;
    this.form_required.no_workplace = this.userObj.workplace === '' || this.userObj.workplace === null ? true : false;
    this.form_required.no_aboutMe = this.userObj.aboutMe === '' || this.userObj.aboutMe === null ? true : false;
    this.form_required.no_rfc = this.userObj.rfc === '' || this.userObj.rfc === null ? true : false;
    if (!this.form_required.no_name && 
      !this.form_required.no_lastName && 
      !this.form_required.motherName && 
      !this.form_required.no_password && 
      !this.form_required.no_email && 
      !this.form_required.no_phone &&
      !this.form_required.no_cellphone &&
      !this.form_required.no_workplace &&
      !this.form_required.no_aboutMe &&
      !this.form_required.no_rfc
      ) {
        console.log('true', this.form_required);
        result = true;
      } else {
        console.log('false', this.form_required);
        result = false;
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
    if ( event.files && event.files[0] ) {
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
                        root_data.prepareImages(event_data);
                      } else {
                        id_image_container.src = '../../../assets/14.jpg';
                        root_data.userObj.avatar = '../../../assets/14.jpg';
                        name_image_container.innerHTML = `La imagen debe medir <br /><span class="text-bold">${ dimensions_image }</span>`;
                        id_image_container.classList.add('no-image');
                        root_data.systemMessage.showMessage({
                          kind: 'error',
                          message: {
                            header: 'Error',
                            text: `La imagen debe medir <br /><span class="text-bold">${ dimensions_image }</span>`
                          },
                          time: 4800
                        });
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
            this.userObj.avatar = url;
            console.log('Update image', this.userObj);
            this.newImages = [];
          }
        });
      }
    }
  }

}
