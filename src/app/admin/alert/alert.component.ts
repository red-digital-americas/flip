import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatosService } from '../../../datos.service';
import { LoaderComponent } from '../../../ts/loader';
import { SystemMessage } from '../../../ts/systemMessage';
import { Utils } from '../../utils/utils';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})
export class AlertComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private heroService: DatosService,
  ) { }

  section: string;
  IDUSR: string = "0";
  IDBUILD: string = "0";
  user: string[];
  alerts: any[];

  public add_loader = new LoaderComponent;
  public show_post_form: boolean = false;
  public data_post: DataAlert = new DataAlert();
  public post_form_action: string = "";
  public system_message = new SystemMessage();
  public newImages: any[] = [];
  postphoto: string = "assets/img/Coliving.jpg";
  public forms_erros_found: any = {
    no_title: false,
    no_post: false,
    no_photo: false
  };

  ngOnInit() {
    if (localStorage.getItem("user") == undefined) {
      this.router.navigate(['/login']);
    }
    else {
      this.user = JSON.parse(localStorage.getItem("user"));
      this.IDUSR = JSON.parse(localStorage.getItem("user")).id;
      this.IDBUILD = this.route.snapshot.params['id'];
      this.IDBUILD = this.route.snapshot.params['id'];
      this.section = "alert";
      this.GetCategories();
    }
  }

  GetCategories() {
    this.heroService.service_general_get("Alerts/GetAlertCategorie").subscribe((value) => {
      switch (value.result) {
        case "Error":
          console.log("Ocurrio un error al cargar los catalogos: " + value.detalle);
          break;
        case 'Success':
          // 
          if (value.result == "Success") {

            this.alerts = value.item;
          }
      }
    });
  }

  public sendAlertData():void {
    console.info('DATA POST', this.data_post);
    if( this.validatingFieldsFrom( this.data_post ) ) {
      this.add_loader.showLoader();
      this.heroService.service_general_post("Alerts/AddAlertCategorie", this.data_post)
          .subscribe( (value: any) => {
            if( value.success || value.result == 'Success' ) {
              this.GetCategories();
              this.toggleSectionForm('hide');
              setTimeout( () => {
                this.add_loader.hideLoader();
                this.system_message.showMessage({
                  kind: 'ok',
                  time: 2500,
                  message: {
                    header: 'Alert has been created',
                    text: 'You can now see your alert.'
                  }
                });

              }, 407);
            }
          }, (error: any) => {
            console.log('Error en el servicio', error);
          });
    } else {
      this.system_message.showMessage({
        kind: 'error',
        time: 4777,
        message: {
          header: 'Form Data',
          text: 'All inputs must be fill to continue'
        }
      });
    }
  }

  public confirmDeleteElement(): void {
    this.add_loader.showLoader();
    this.heroService.service_general_delete_with_params("Alerts/DeleteAlertCategorie", this.data_post)
      .subscribe((response: any) => {
        if (response.success) {
          this.GetCategories();
          this.showModal();
          this.add_loader.hideLoader();
          this.system_message.showMessage({
            kind: 'ok',
            time: 2500,
            message: {
              header: 'Alert has been deleted',
              text: 'Your Alert has been delete succesfully.'
            }
          });
        }
      }, (error: any) => {
        console.log('Error en el servicio: ', error);
          this.GetCategories();
          this.showModal();
          this.add_loader.hideLoader();
          this.system_message.showMessage({
            kind: 'error',
            time: 2500,
            message: {
              header: 'Alert has been deleted',
              text: 'Your Alert has not been delete.'
            }
          });
      });
  }

  public validatingFieldsFrom( kind_data: DataAlert ): boolean { 
    let result: boolean = false;
    kind_data.name == null || kind_data.name == '' ? 
      this.forms_erros_found.no_title = true : this.forms_erros_found.no_title = false;
    kind_data.description == null || kind_data.description == '' ? 
      this.forms_erros_found.no_post = true : this.forms_erros_found.no_post = false;
    kind_data.icon == '../../../assets/14.jpg' || kind_data.icon == '' ? 
      this.forms_erros_found.no_photo = true : this.forms_erros_found.no_photo = false;
    if(
      !this.forms_erros_found.no_title &&
      !this.forms_erros_found.no_post &&
      !this.forms_erros_found.no_photo
    ) result = true;
    else result = false;
    return result;
  }

  public post_comments_section: boolean = false;
  public toggleSectionForm(action_kind: string = 'hide', editable: any = {}): void {
    console.info('DATA', editable);
    switch (action_kind) {
      case 'new':
        this.resetNewPostFormValidator();
        this.show_post_form = true;
        this.data_post.id = 0;
        this.data_post.name = '';
        this.data_post.description = '';
        this.data_post.icon = '../../../assets/14.jpg';
        this.post_form_action = 'New Alert';
        this.post_comments_section = false;
        break;

      case 'edit':
        this.resetNewPostFormValidator();
        this.show_post_form = true;
        this.data_post.id = editable.id;
        this.data_post.name = editable.name;
        this.data_post.description = editable.description;
        this.data_post.icon = editable.icon;
        this.post_form_action = 'Edit Alert';
        break;

      case 'delete':
        this.data_post.id = editable.id;
        this.data_post.name = editable.name;
        this.data_post.description = editable.description;
        this.data_post.icon = editable.icon;
        this.showModal();
        break;

      case 'hide':
        this.show_post_form = false;
        break;

      default:
        console.log('Ese caso no existe');
        break
    }
  }

  public resetNewPostFormValidator(): void {
    this.forms_erros_found.no_title = false;
    this.forms_erros_found.no_post = false;
    this.forms_erros_found.no_photo = false;
  }

  public page_modal: boolean = false;
  public modal_to_show: string;
  public showModal(section: string = 'default'): void {
    this.modal_to_show = section;
    !this.page_modal ? this.page_modal = true : this.page_modal = false;
  }

  public validateImageUpload(event_data: any, target_image: string, name_image: string): void {
    const event = event_data.target,
      // dimensions_image_data = {
      //   get_dimensions: (function () {
      //     const dimensions_split = dimensions_image.split('x'),
      //       width = Number(dimensions_split[0]),
      //       height = Number(dimensions_split[1]);
      //     return {
      //       width: width,
      //       height: height
      //     }
      //   }())
      // },
      // image_limit_width = dimensions_image_data.get_dimensions.width,
      // image_limit_height = dimensions_image_data.get_dimensions.height,
      id_image_container: any = document.getElementById(target_image),
      name_image_container = document.getElementById(name_image),
      native_image_uploaded = document.getElementById('image_real_dimension'),
      root_data = this;
    if (event.files && event.files[0]) {
      const reader = new FileReader();
      reader.onload = function (e: any) {
        console.info('DATA IMAGES', e.target.result);
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
          // if (image_limit_width === image_data.width && image_limit_height === image_data.height) {
            id_image_container.setAttribute('src', image_data.image);
            name_image_container.innerHTML = `<span class="image-name">${event.files[0].name}</span>`;
            id_image_container.classList.remove('no-image');
            root_data.prepareImages(event_data);
          // } else {
            //id_image_container.src = '../../../assets/14.jpg';
            //root_data.data_post.photo = '../../../assets/14.jpg';
            // name_image_container.innerHTML = `
            //             <span class="color-red">Image size must be <br /><span class="text-bold">${dimensions_image}px</span></span>`;
            // id_image_container.classList.add('no-image');
          // }
        });
      }
      reader.readAsDataURL(event.files[0]);
    }
  }

  prepareImages(e) {
    debugger;
    if (Utils.isDefined(e.srcElement.files)) {
      for (let f of e.srcElement.files) {
        this.newImages.push(f);
      }
    }
    this.addImages();
  }

  addImages() {
    debugger;
    let url: string = '';
    if (!Utils.isEmpty(this.newImages)) {
      for (let f of this.newImages) {
        this.heroService.UploadImgSuc(f).subscribe((r) => {
          if (Utils.isDefined(r)) {
            url = <string>r.message;
            url = url.replace('/Imagenes', this.heroService.getURL() + 'Flip');
            this.postphoto = url;
            this.data_post.icon = url;

            this.newImages = [];
          }
        })
      }
    }
  }

}

class DataAlert {
  public id: number = 0;
  public name: String = '';
  public description: String = '';
  public icon: String = '';
}
