import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getStyle, hexToRgba } from '@coreui/coreui-pro/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
// import { navItems } from './../../_nav';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DatosService } from '../../../datos.service';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Building } from '../models/building';
import { ModalMLComponent } from '../../../ts/modal_ml';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { PerkCategoryComponent } from '../modals/perk-category/perk-category.component';

@Component({
  templateUrl: 'communities.component.html',
  styleUrls: ['./communities.component.scss']


})
export class CommunitiesComponent implements OnInit {

  posts: any[];
  email: string;
  password: string;
  token: boolean;
  message: {};
  validar: boolean = false;
  idpost: any;
  IDUSR: string = "0";
  IDBUILD: string = "0";
  buildButton = false;
  public user: string[];
  submitted: boolean = false;
  nrooms: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  typeNumber: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  BuildModel: Building;
  photo: any;
  buildingForm: FormGroup;

  public modalMLComponent = new ModalMLComponent();
  public new_rooms = [
    {room: 0, desc: '', room_queantity: 0, can_delete: false}
  ];

  constructor(private router: Router,
    private heroService: DatosService,
    private _formBuilder: FormBuilder,
    private modalService: BsModalService){ 
  
    }

  modalRef: BsModalRef;

  ngOnInit() {
    if (localStorage.getItem("user") == undefined) {
      this.router.navigate(['/login']);
    }
    else {

      this.buildingForm = this._formBuilder.group({
        name: ['', Validators.required],
        direction: ['', Validators.required],
        description: ['', Validators.required],
        photo: ['', Validators.required],
        status: ['',],
        longitud: [],
        latitud: [],
        // roomsNumber: [''],
        // rooms: new FormArray([]),
        typeNumber: [''],
        typeRoom: new FormArray([])
      });

      this.user = JSON.parse(localStorage.getItem("user"));
      console.log(this.user);
      this.IDUSR = JSON.parse(localStorage.getItem("user")).id;
      this.IDBUILD = JSON.parse(localStorage.getItem("user")).buildingId;
      this.get_builds();
      this.modalMLComponent.openModalSelected();
    }
  }

  get_builds() {
    // 
    var creadoobj = { buildingid: this.IDBUILD, userid: this.IDUSR };

    this.heroService.ServicioPostBuilds("SeeBuilding", creadoobj).subscribe((value) => {
      switch (value.result) {
        case "Error":
          console.log("Ocurrio un error al cargar los catalogos: " + value.detalle);
          break;
        default:
          if (value.result == "Success") {
            this.posts = value.item;
            console.log('Aqui ===> ', this.posts);
          }
      }
    });
  }

  AddBuilding() {
    this.buildButton = true;
  }

  gotonewsfeed(id: number, name:string) {
    this.router.navigate(['/newsfeed/' + id])
    sessionStorage.setItem('community_select', name);
  }

  get f() { return this.buildingForm.controls; }
  get t() { return this.f.rooms as FormArray; }
  get formType() { return this.f.typeRoom as FormArray; }
  onChangeRooms(e) {
    //debugger;
    const roomsNumber = parseInt(e.target.value) || 0;
    if (this.t.length < roomsNumber) {
      for (let i = this.t.length; i < roomsNumber; i++) {
        this.t.push(this._formBuilder.group({
          name: ['', Validators.required],
          description: ['', [Validators.required]],
          price: ['', Validators.required],
          typeRoom: ['']

        }));
      }
    } else {
      for (let i = this.t.length; i >= roomsNumber; i--) {
        this.t.removeAt(i);
      }
    }
  }
  onChangeType(e) {
    //debugger;
    const typeNumber = parseInt(e.target.value) || 0;
    if (this.formType.length < typeNumber) {
      for (let i = this.formType.length; i < typeNumber; i++) {
        this.formType.push(this._formBuilder.group({
          type: ['', Validators.required],
          capacity: ['', [Validators.required]],
        }));
      }
    } else {
      for (let i = this.formType.length; i >= typeNumber; i--) {
        this.formType.removeAt(i);
      }
    }
  }

  onSubmit() {

    //debugger;
    this.submitted = true;
    this.BuildModel = this.buildingForm.value;
    this.BuildModel.status = true;
    this.BuildModel.id = 0;

    this.heroService.ServiceSaveBuilding(this.buildingForm.value).subscribe(response => {
      //debugger;
      console.log( this.buildingForm );
    }, error => {
      //debugger;
      alert("Error al guardar")
    });
    // stop here if form is invalid
    // if (this.buildingForm.invalid) {
    //     return;
    // }

    // display form values on success
    // alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.buildingForm.value, null, 4));
  }
  uploadPhoto(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = (imageRender: any) => {
        this.buildingForm.controls["photo"] = imageRender.target.result;
        this.photo= imageRender.target.result;
        // this.equipment.comercialInvoice = imageRender.target.result;
      }
    }
  }

  cancel(){
    this.buildingForm.reset();
    this.buildButton = false;
  }

  /*
   * Autor: Carlos Hernandez Hernandez
   * Contacto: carlos.hernandez@minimalist.com
   * Nombre: buildNewRoom
   * Tipo: Funcion 
   * Visto en: communities
   * Parametros: N/A
   * Regresa: N/A
   * Descripcion: Cuando da click en la + para añadir un objeto(room), esta lo añade al objeto(rooms) que itera en el for 
   */
  public buildNewRoom():void {

    const new_room = {room: 0, desc: '', room_queantity: 0, can_delete: true};

    this.new_rooms.push( new_room );

    this.new_rooms.forEach( ( room:any, index:number ) => {

      room.room = index;

    });

  }

  /*
   * Autor: Carlos Hernandez Hernandez
   * Contacto: carlos.hernandez@minimalist.com
   * Nombre: deleteRoomSeletcted
   * Tipo: Funcion 
   * Visto en: communities
   * Parametros: id del objeto room que se desea remover
   * Regresa: N/A
   * Descripcion: Cuando da click en la X para eliminar el objeto(room), esta lo remueve del objeto(rooms) que itera en el for 
   */
  public deleteRoomSeletcted( id_room:number ):void {

    this.new_rooms.splice( this.new_rooms.findIndex( ( room ) => room.room === id_room ), 1);

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
          native_image_uploaded = document.getElementById('image_real_dimension');

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

                      }
                      
                    });

            }

            reader.readAsDataURL( event.files[0] );

    }
    
  }

}




