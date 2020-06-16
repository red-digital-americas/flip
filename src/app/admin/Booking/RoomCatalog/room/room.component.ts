import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';
import { DatosService } from '../../../../../datos.service';
import { LoaderComponent } from '../../../../../ts/loader';
import { SystemMessage } from '../../../../../ts/systemMessage';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { Utils } from '../../../../utils/utils';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.scss']
})
export class RoomComponent implements OnInit {

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    public services: DatosService,
    private _formBuilder: FormBuilder,
    private _location: Location
  ) { }

  public section: string;
  roomId;
  roomObj = {
    active: true,
    smoke: true,
    buildingId: 0,
    description: '',
    id: 0,
    imageRooms: [],
    name: '',
    price: 0,
    typeRoomId: 0,
    totalBeds: 0,
    floor: ''
  };
  imageRooms;
  typeRoomList;

  loader = new LoaderComponent();
  systemMessage = new SystemMessage();

  public images_in_gallery:any = [
    {id: 0, src: '../../../assets/14.jpg', can_delete: false, last_one: true}
  ];

  public form_required: any = {
    no_name: false,
    no_description: false,
    no_price: false,
    no_floor: false,
    perkPhotoCtrl: this._formBuilder.group({ labelCtrl: ['Choose file'], photoCtrl: [], serverUrlCtrl: [] }),
  };

  ngOnInit() {
    this.section = 'roomCatalog';
    this.roomId = this.route.snapshot.paramMap.get('id');
    this.getRoom(this.roomId);
  }

  getRoom (id) {
    let obj = { roomId: id };
    this.loader.showLoader();
    this.services.service_general_get_with_params('Room/getRoomById', obj).subscribe((value) => {
      this.roomObj = value.item;
      console.log('Reponse Room ', this.roomObj);

      if( value.item.imageRooms.length != 0 ) this.images_in_gallery.shift();
          value.item.imageRooms.forEach( (image_gallery: any) => {
            let new_image = {
              id: image_gallery.id,
              src: image_gallery.photoUrl,
              can_delete: true,
              last_one: false
            };
            this.images_in_gallery.push( new_image );

          });
          
          this.images_in_gallery[0].can_delete = false;
          this.images_in_gallery[0].last_one = false;
          this.images_in_gallery[this.images_in_gallery.length -1].last_one = true;

          console.log('Gallery Images', this.images_in_gallery);
      // this.getServices(value.item.building, value.item.id);
      this.getTypeRooms(value.item.buildingId);
      // for (let o = 0; o < this.membershipObj.membershipIndices.length; o++) {
      //   this.membershipObj.membershipIndices[o].id = null;
      // }
      this.loader.hideLoader();
    });
  }

  getTypeRooms(id) {
    let obj = { buildingId: id };
    this.services.service_general_get_with_params('Room/getTypeRoom', obj).subscribe((value) => {
      this.typeRoomList = value.item;
      console.log('Reponse Type Room ', this.typeRoomList);
    });
  }

  update () {
    if (this.validateDataForm()) {
      this.loader.showLoader();
      let gallery: any[] = [];
      this.images_in_gallery.forEach(element => {
        let data = {
          id: 0,
          idRoom: this.roomObj.id,
          active: true,
          photoUrl: element.src
        };
        gallery.push(data);
      });
      console.log('New Gallery', gallery);
      this.roomObj.imageRooms = gallery;
      this.services.service_general_post('Room/editRoom', this.roomObj).subscribe((value) => {
        this.form_required.no_price = false;
        this.form_required.no_name = false;
        this.form_required.no_description = false;
        this.loader.hideLoader();
        switch(value.result) {
          case 'Success':
            this.systemMessage.showMessage({
              kind: 'ok',
              message: {
                header: value.detalle,
                text: 'The Room has been update successfully.'
              },
              time: 2000
            });
            this._location.back();
            break;
        }
      });
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

  private validateDataForm(): boolean {
    let result: boolean;
    this.form_required.no_floor = this.roomObj.floor === '' || this.roomObj.floor === null ? true : false;
    this.form_required.no_price = this.roomObj.totalBeds === 0 || this.roomObj.totalBeds === null ? true : false;
    this.form_required.no_name = this.roomObj.name === '' || this.roomObj.name === null ? true : false;
    this.form_required.no_description = this.roomObj.description === '' || this.roomObj.description === null ? true : false;
    
    if (!this.form_required.no_name &&
      !this.form_required.no_price &&
      !this.form_required.no_description &&
      !this.form_required.no_floor
      ) {
        console.log('true', this.form_required);
        result = true;
      } else {
        console.log('false', this.form_required);
        result = false;
      }
    return result;
  }

  public addOneImageToGallery():void {
    let new_image = {
      id: 0,
      src: '../../../assets/14.jpg',
      can_delete: true,
      last_one: false
    };
    this.images_in_gallery.push( new_image );
    this.images_in_gallery.forEach( ( image: any, index ) => {
      image.id = index;
      image.last_one = false;
    });
    this.images_in_gallery[this.images_in_gallery.length - 1].last_one = true;
  }

  public getGalleryImages( id_image: string ):void {
    const image_container = document.getElementById(id_image).parentElement.querySelector('img');
    setTimeout( () => {
      image_container.src = this.imagesOnGallery;
    }, 420);
  }

  public validateImageUpload(event_data: any, dimensions_image: string, target_image: string, name_image: string, image_id: any): void {
    const event = event_data.target,
      dimensions_image_data = {
        get_dimensions: (function () {
          const dimensions_split = dimensions_image.split('x'),
            width = Number(dimensions_split[0]),
            height = Number(dimensions_split[1]);
          return {
            width: width,
            height: height
          }
        }())
      },
      image_limit_width = dimensions_image_data.get_dimensions.width,
      image_limit_height = dimensions_image_data.get_dimensions.height,
      id_image_container: any = document.getElementById(target_image),
      name_image_container = document.getElementById(name_image),
      native_image_uploaded = document.getElementById('image_real_dimension'),
      root_data = this;

    if (event.files && event.files[0]) {
      const reader = new FileReader();
      reader.onload = function (e: any) {
        const image_convert: any = e.target.result,
          validating_image = new Promise((resolve) => {
            native_image_uploaded.setAttribute('src', image_convert);
            setTimeout(() => {
              const native_image_dimension = {
                image: image_convert,
                width: native_image_uploaded.offsetWidth,
                height: native_image_uploaded.offsetHeight
              };
              resolve(native_image_dimension);
            }, 420);
          });
        validating_image.then((image_data: any) => {
          if (image_limit_width === image_data.width && image_limit_height === image_data.height) {
            id_image_container.setAttribute('src', image_data.image);
            name_image_container.innerHTML = `<span class="image-name">${event.files[0].name}</span>`;
            id_image_container.classList.remove('no-image');
            if (event.hasAttribute('gallery')) { root_data.getGalleryImages(event.getAttribute('id')); }
            console.log('si cumple', root_data.images_in_gallery);
            console.log('si cumple', event_data);
            console.log('si cumple', image_id);
            root_data.prepareImagesG(event_data, image_id);
          } else {
            id_image_container.src = '../../../assets/14.jpg';
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
            // if( !event.hasAttribute('gallery') ) root_data.data_perk.photo = '../../../../../assets/14.jpg';

          }
        });
      };
      reader.readAsDataURL(event.files[0]);
    }
  }

  public newImagesG: any[] = [];
  public imagesOnGallery: string;
  prepareImagesG(e, index) {     
    if (Utils.isDefined(e.srcElement.files)) {
      for (let f of e.srcElement.files) {        
        this.newImagesG.push(f);
        console.log( e.srcElement.files );
      }
    }
    this.addImagesG(index);
  }

  addImagesG(indices) {
    console.log('Index', indices);
    let url: string = '';
    if (!Utils.isEmpty(this.newImagesG)) {
      for (let f of this.newImagesG) { console.log( this.newImagesG );
        this.services.UploadImgSuc(f).subscribe((r) => {
          if (Utils.isDefined(r)) {
            url = <string>r.message;
            url = url.replace('/Imagenes', this.services.getURL() + 'Flip'); 
            console.log('Desde la galeria => ', url);
            this.newImagesG = [];
            this.imagesOnGallery = url;
            this.images_in_gallery.forEach(element => {
              element.src = element.id === indices ? url : element.src;
            });
            console.log(url);
          }
        })
      }
    }
  }

  public deleteImageFromGallery( id ): void {
    // console.log('Gallery array', this.images_in_gallery);
    // console.log('Item to delete', id);
    let index = this.images_in_gallery.indexOf(id);
    // console.log('Id to delete', index);
    this.images_in_gallery.splice(index, 1);
    this.images_in_gallery[this.images_in_gallery.length - 1].last_one = true;
    this.images_in_gallery[0].can_delete = false;
    // console.log(this.images_in_gallery);
  }

}
