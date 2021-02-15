import { Component, OnInit, ViewChild } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DatosService } from '../../../../datos.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { LoaderComponent } from '../../../../ts/loader';
import { SystemMessage } from '../../../../ts/systemMessage';
import { MatTableDataSource } from '@angular/material/table';
import { Utils } from '../../../utils/utils';

@Component({
  selector: 'app-perk-category',
  templateUrl: './perk-category.component.html',
  styleUrls: ['./perk-category.component.scss']
})
export class PerkCategoryComponent implements OnInit {

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  displayedColumns: string[] = [
    'name',
    'asociate',
    'edit',
    'eliminate',
  ];
  categoriesList: any;

  loader = new LoaderComponent();
  systemMessage = new SystemMessage();

  show_page_modal = false;
  modal_to_show: string;
  userIdSelected = {
    id: 0,
    name: '',
    icon: ''
  };

  userVoidSelected = {
    id: 0,
    name: '',
    icon: ''
  };

  name_form:  any = {
    no_name: false,
  };

  public newImages: any[] = [];

  constructor(
    public modalRef: BsModalRef,
    private modalService: BsModalService,
    public _services: DatosService,
    public _router: Router,
    public route: ActivatedRoute,
  ) { }

  ngOnInit() {
    this.getCategoriesList();
  }

  getCategoriesList() {
    this.loader.showLoader();
    this._services.service_general_get('PerkCategory')
        .subscribe( (response: any) => {
            this.loader.hideLoader();
            if ( response.result === 'Success' ) {
                this.categoriesList = new MatTableDataSource(response.item);
                this.categoriesList.paginator = this.paginator;
                this.categoriesList.sort = this.sort;
                console.log('List => ', response.item );
            }
        }, (error: any) => {
            this.loader.hideLoader();
            console.log('Error GetList => ', error);
            this.systemMessage.showMessage({
                kind: 'error',
                message: {
                  header: 'Error',
                  text: error
                },
                time: 2000
              });
        });
  }

  showModal(to_show: string = 'default', userId) {
    if (userId !== undefined) {
      const params = {
        tenant: userId
      };
    }
    !this.show_page_modal ? this.show_page_modal = true : this.show_page_modal = false;
    this.modal_to_show = to_show;
    this.userIdSelected = userId;
    console.log(this.userIdSelected);
  }

  update() {
    this.loader.showLoader();
    const obj = {
      id: this.userIdSelected.id,
      name: this.userIdSelected.name,
      icon: this.userIdSelected.icon
    };
    console.log('DATA UPLOAD', obj);
    this._services.service_general_post('PerkCategory', obj)
      .subscribe((response: any) => {
        this.loader.hideLoader();
        if (response.result === 'Success') {
          this.userIdSelected.icon = '';
          this.userIdSelected.name = '';
          this.userIdSelected.id = 0;
          this.showModal('', this.userIdSelected);
          this.getCategoriesList();
        }
      }, (error: any) => {
        this.loader.hideLoader();
        console.log('Error GetList => ', error);
        this.systemMessage.showMessage({
          kind: 'error',
          message: {
            header: 'Error',
            text: error
          },
          time: 2000
        });
      });
  }

  add() {
    this.loader.showLoader();
    const obj = {
      id: 0,
      name: this.userIdSelected.name,
      icon: this.userIdSelected.icon
    };
    this._services.service_general_post('PerkCategory', obj)
      .subscribe((response: any) => {
        this.loader.hideLoader();
        if (response.result === 'Success') {
          this.getCategoriesList();
          this.userIdSelected.icon = '';
          this.userIdSelected.name = '';
          this.userIdSelected.id = 0;
          this.showModal('', this.userIdSelected);
        }
      }, (error: any) => {
        this.loader.hideLoader();
        console.log('Error GetList => ', error);
        this.systemMessage.showMessage({
          kind: 'error',
          message: {
            header: 'Error',
            text: error
          },
          time: 2000
        });
      });
  }

  delete() {
    this.loader.showLoader();
    this._services.service_general_delete(`PerkCategory/${this.userIdSelected.id}`)
      .subscribe((response: any) => {
        this.loader.hideLoader();
        if (response.result === 'Success') {
          this.getCategoriesList();
          this.showModal('', 0);
        }
      }, (error: any) => {
        this.loader.hideLoader();
        console.log('Error GetList => ', error);
        this.systemMessage.showMessage({
          kind: 'error',
          message: {
            header: 'Error',
            text: error
          },
          time: 2000
        });
      });
  }

  /////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////// UPLOAD IMAGE

  public validateImageUpload(event_data: any, dimensions_image: string, target_image: string, name_image: string): void {
    const event = event_data.target,
      dimensions_image_data = {
        get_dimensions: (function () {
          const dimensions_split = dimensions_image.split('x'),
            width = Number(dimensions_split[0]),
            height = Number(dimensions_split[1]);
          return {
            width: width,
            height: height
          };
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
            }, 277);
          });
        validating_image.then((image_data: any) => {
          if (image_limit_width === image_data.width && image_limit_height === image_data.height) {
            id_image_container.setAttribute('src', image_data.image);
            name_image_container.innerHTML = `<span class="image-name">${event.files[0].name}</span>`;
            id_image_container.classList.remove('no-image');
          } else {
            id_image_container.src = '../../../assets/14.jpg';
            root_data.userIdSelected.icon = '../../../assets/14.jpg';
            name_image_container.innerHTML = `La imagen debe medir <br /><span class="text-bold">${dimensions_image}</span>`;
            id_image_container.classList.add('no-image');
          }
        });
      };
      reader.readAsDataURL(event.files[0]);
    }
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
        this._services.UploadImgSuc(f).subscribe((r) => {
          if (Utils.isDefined(r)) {
            url = <string>r.message;
            url = url.replace('/Imagenes', this._services.getURL() + 'Flip');
            this.userIdSelected.icon = url;
            console.log('Image Upload', this.userIdSelected);
            this.newImages = [];
          }
        });
      }
    }
  }

}
