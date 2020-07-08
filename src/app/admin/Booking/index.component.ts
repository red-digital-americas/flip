import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DatosService } from '../../../datos.service';
import { Utils } from '../../utils/utils';
import { LoaderComponent } from '../../../ts/loader';
import { SystemMessage } from '../../../ts/systemMessage';

@Component({
    selector: 'bookingIndex',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.scss']
})
export class BookingIndexComponent implements OnInit {

    constructor(
        public router: Router,
        public services: DatosService
    ){}

    public loader = new LoaderComponent();
    public system_message = new SystemMessage();

    /*
    * Autor: Carlos Hernandez
    * Email: carlos.hernandez@minimalist.mx    
    * Name: toggleSectionForm
    * Params: accion a realizar, si es para editar el objeto
    * Return: NA
    * Description: Muestra el formulario con la accion seleccionada, lo olculta en caso de vacio
    * Variables Out: show_booking_form, booking_form_action
    */
    public show_booking_form:boolean = false;
    public booking_form_action:string = "";
    public new_build_button: boolean = false;
    public edit_build_button: boolean = false;
    public toggleSectionForm( action_kind:string = 'hide', editable:any = {} ):void {

        switch( action_kind ) {

            case 'new':
                this.show_booking_form = true;
                this.new_build_button = true;
                this.edit_build_button = false;
                this.resetSettings();
                this.booking_form_action = 'Add New Build';
            break;

            case 'edit': 
                this.show_booking_form = true;
                this.new_build_button = false;
                this.edit_build_button = true;
                this.resetSettings( editable.typeRoom.length );
                this.booking_data.id = editable.id;
                this.booking_data.name = editable.name;
                this.booking_data.description = editable.description;
                this.booking_data.direction = editable.direction;
                this.booking_data.latitude = editable.latitude;
                this.booking_data.longitude = editable.longitude;
                this.booking_data.status = editable.status;
                this.booking_data.photo = editable.photo;
                this.getRoomsToEdit(  editable.typeRoom );
                this.booking_form_action = 'Edit Build';
            break;

            case 'hide':
                this.resetSettings(0);
                this.show_booking_form = false;
            break;

            default:
            console.log('Ese caso no existe');
            break

        }

    }


    /*
    * Autor: Carlos Hernandez
    * Email: carlos.hernandez@minimalist.mx    
    * Name: goToBooking
    * Params: ib booking seleccionado, nombre del Booking seleccionado
    * Return: NA
    * Description: Va al contenido del booking seleccionado
    * Variables Out: NA  
    */
    public goToBooking( id_booking:number, booking_name:string ):void {

        sessionStorage.setItem('name_section_active', booking_name );
        sessionStorage.setItem('id_section_active', id_booking.toString() );
        sessionStorage.setItem('name_build', booking_name );
        this.router.navigateByUrl( `tenantList/${ id_booking }` );

    }

    public goToPage( page: string, extra_data: any = '' ):void {

        this.router.navigateByUrl( `${ page }/${ extra_data.id }` );

    }


   /*
    * Autor: Carlos Hernandez
    * Email: carlos.hernandez@minimalist.mx    
    * Name: requestIndexContent
    * Params: NA
    * Return: NA
    * Description: Inicia el servicio que general el primer contenido de la pagina
    * Variables Out: service_data, cards
    */
    private service_data = {
        buildingid: JSON.parse(localStorage.getItem("user")).buildingId, 
        userid: JSON.parse(localStorage.getItem("user")).id
    };
    public cards:any = [];
    public requestIndexContent():void {
        console.log('service_data =>', this.service_data);
        this.services.ServicioPostBuilds("SeeBuilding", this.service_data)
            .subscribe( (response:any) => {

                if( response.result === 'Success' ) this.cards = response.item;
                else {

                    console.log('Error en el servicio.');
                    console.log('Detalles => ');
                    console.log( response );

                } console.log( this.cards );

            });
            
    }


    public getRoomsToEdit( rooms: any ): void {

        rooms.forEach( (room: any) => {

            let new_room = {
                id: room.id,
                name: room.type,
                cantidad: room.capacity,
                can_delete: false,
                last_one: false,
                input: room.type,
                select: room.description,
                active: room.active
            };
        
            this.rooms.push( new_room );

        });

        this.rooms[this.rooms.length -1].last_one = true;

    }


   /*
    * Autor: Carlos Hernandez
    * Email: carlos.hernandez@minimalist.mx    
    * Name: addNewRoom
    * Params: NA
    * Return: NA
    * Description: Agrega un nuevo cuarto al formulario
    * Variables Out: rooms
    */
    public rooms = [
        {id: 0, name: '', cantidad: null, can_delete: false, last_one: true, input: '', select: null}
    ];
    public addNewRoom():void {

        let new_room = {
            id: 0,
            name: '',
            cantidad: null,
            can_delete: true,
            last_one: false,
            input: '',
            select: '',
            active: false
        };

        this.rooms.push( new_room );

        this.rooms.forEach( (room:any, index:number) => {

            
            if( this.new_build_button && !this.edit_build_button ) {
                room.id = index;
            }

            if( !this.new_build_button && this.edit_build_button ) {
                
                if( room.id == 0 ) {

                    room.id = `tmp_${ index }`;

                }

            }

            room.last_one = false;

        });

        this.rooms[this.rooms.length -1].last_one = true;

    }


   /*
    * Autor: Carlos Hernandez
    * Email: carlos.hernandez@minimalist.mx    
    * Name: deleteThisRoom
    * Params: id del room que se desea eliminar
    * Return: NA
    * Description: elimina el cuarto seleccionado
    * Variables Out: NA
    */
    public deleteThisRoom( id_room:number, event_data ):void {

        if( this.new_build_button && !this.edit_build_button ) {

            this.rooms.splice( this.rooms.findIndex( (room:any) => room.id === id_room ), 1);
            this.rooms[this.rooms.length -1].last_one = true;

        }

        if( !this.new_build_button && this.edit_build_button ) {

            //Anteriormente se pensaba que se eliminarian los cuartos
            //this.deleteRoomService( event_data, id_room );

        }

    }


    public deleteRoomService( event_data: any, id_room: any ):void {

        const element = event_data.target.parentElement,
              element_id = element.querySelector('input').id,
              get_element_id = element_id.split('_')[element_id.split('_').length -1];

        this.room_to_delete = {
            idBuild: this.booking_data.id,
            type: element.querySelector('input').value,
            capacity: element.querySelector('select').value,
            active: false,
            id: Number( get_element_id )
          };

        if( this.room_to_delete.type == '' || this.room_to_delete.capacity == '' ) {

            this.rooms.splice( this.rooms.findIndex( (room:any) => room.id === id_room ), 1);
            this.rooms[this.rooms.length -1].last_one = true;

        } else this.confirmDeleteRoomModal();

    }

    /*
   * Autor: Carlos Hernandez Hernandez
   * Contacto: carlos.hernandez@minimalist.com
   * Nombre: showModal
   * Tipo: Funcion 
   * Parametros: NA
   * Regresa: N/A
   * Descripcion: Muestra y oculta el formulario de eliminar
   */
  public page_modal: boolean = false;
  public modal_to_show: string;
  public room_to_delete: any;
  public confirmDeleteRoomModal():void {

    !this.page_modal ? this.page_modal = true : this.page_modal = false; 

  }

  public confirmDeleteRoom():void {

    this.loader.showLoader();
    setTimeout( () => { this.loader.hideLoader(); this.confirmDeleteRoomModal(); }, 407);
    this.rooms.splice( this.rooms.findIndex( (room:any) => room.id === this.room_to_delete.id ), 1);
    this.rooms[this.rooms.length -1].last_one = true;

  }


   /*
    * Autor: Carlos Hernandez
    * Email: carlos.hernandez@minimalist.mx    
    * Name: sendBookingData
    * Params: NA
    * Return: NA
    * Description: Envia la informacion del formulario al end point correspondiente
    * Variables Out: NA
    */
    public booking_data: BookingData = new BookingData();
    public sendBookingData():void {
debugger;
        if( this.validatingNewBuildFields( this.booking_data ) ) {

            if( this.new_build_button && !this.edit_build_button ) { 

                this.booking_data.typeroom = this.getRoomsData('new');

                this.loader.showLoader(); 

                this.services.ServiceSaveBuilding( this.booking_data )
                    .subscribe( ( response: any ) => { 

                        if( response.result == 'Success' ) {

                            this.requestIndexContent();
                            this.toggleSectionForm('hide');
                            this.resetSettings();
                            setTimeout( () => { 
                                
                                this.loader.hideLoader(); 
                                this.system_message.showMessage({
                                    kind: 'ok',
                                    message: {
                                      header: 'Build created',
                                      text: 'Build has been created successfully.'
                                    },
                                    time: 2000
                                  });
                            
                            }, 407);

                        }
        
                    }, (error: any) => {
        
                        this.system_message.showMessage({
                            kind: 'error',
                            message: {
                              header: 'System Error',
                              text: 'Error WS => AddBuild'
                            },
                            time: 2000
                          });
        
                    });

            }

            if( !this.new_build_button && this.edit_build_button ) {

                this.booking_data.typeroom = this.getRoomsData('edit');

                this.loader.showLoader(); 

                this.services.ServicioEditBuild( this.booking_data )
                    .subscribe( (response: any) => { 

                        if( response.result == 'Success' ) {

                            this.requestIndexContent();
                            this.toggleSectionForm('hide');
                            this.resetSettings();
                            setTimeout( () => { 
                                
                                this.loader.hideLoader(); 
                                this.system_message.showMessage({
                                    kind: 'ok',
                                    message: {
                                      header: 'Build uploaded',
                                      text: 'Build has been uploaded successfully.'
                                    },
                                    time: 2000
                                  });
                            
                            }, 407);

                        }

                    }, (error: any) => {

                        this.system_message.showMessage({
                            kind: 'error',
                            message: {
                              header: 'System Error',
                              text: 'Error WS => Edit Build'
                            },
                            time: 2000
                          });

                    });

            }

        } else {

            this.sendPageToTop();

            this.system_message.showMessage({
                kind: 'error',
                message: {
                  header: 'Inputs required',
                  text: 'All inputs must be fill to continue'
                },
                time: 4777
              });

        }

    }


    public getRoomsData( for_action: string ):Array<any> {

        let rooms_added = [];

        const rooms_container = document.getElementById('rooms_added'),
              get_rooms = rooms_container.querySelectorAll('[room="added"]');

        switch ( for_action ) {

            case 'new':

                    get_rooms.forEach( (room: any) => {

                        let input = room.querySelectorAll('input')[0],
                            select = room.querySelectorAll('textarea')[0];
                        
                        if( input.value != '' && !select.value != null ) {
        
                            let new_room = {
                                type: input.value,
                                description: select.value,
                                active: true
                            };
        
                            rooms_added.push( new_room );
        
                        }
        
                    }); 

                break;

            case 'edit':

                    get_rooms.forEach( (room: any) => {

                        let input = room.querySelectorAll('input')[0],
                            select = room.querySelectorAll('textarea')[0],
                            active = room.querySelectorAll('input')[1],
                            get_id_token = (function () {
                                    const input_sample = input.id.split('_'),
                                          input_id = input_sample[input_sample.length -1],
                                          find_tmp_id = input_sample[input_sample.length -2],
                                          is_tmp_id = find_tmp_id == 'tmp' ? true : false;

                                    return {
                                        id: input_id,
                                        valid_id: is_tmp_id 
                                    };
                                }());

                        if( input.value != '' && !select.value != null ) {
    
                            let new_room = {
                                type: input.value,
                                description: select.value,
                                active: active.checked,
                                idBuild: this.booking_data.id
                            };

                            if( !get_id_token.valid_id ) new_room['id'] =  Number( get_id_token.id );
        
                            rooms_added.push( new_room );
        
                        }

                    }); 

                break;

        }

        return rooms_added;

    }

    public resetSettings( rooms_in: number = 0 ):void {

        this.booking_data.name = '';
        this.booking_data.description = '';
        this.booking_data.direction = '';
        this.booking_data.latitude = null;
        this.booking_data.longitude = null;

        this.form_data = {
            no_name: false,
            no_desc: false,
            no_dire: false,
            no_long: false,
            no_lati: false,
            no_phot: false
        }

        this.booking_data.photo = '../../../assets/14.jpg';
        
        if( this.new_build_button && !this.edit_build_button ) {

            this.rooms = [
                {id: 0, name: '', cantidad: null, can_delete: false, last_one: true, input: '', select: ''}
            ];

        }


        if( !this.new_build_button && this.edit_build_button ) {

            if( rooms_in == 0) {

                this.rooms = [
                    {id: 0, name: '', cantidad: null, can_delete: false, last_one: true, input: '', select: ''}
                ];

            } else {

                this.rooms.shift();

            }

        }

    }

    public form_data: any = {
        no_name: false,
        no_desc: false,
        no_dire: false,
        no_long: false,
        no_lati: false,
        no_phot: false
    }
    public validatingNewBuildFields( form_data: BookingData ):boolean {

        let result = false;

        form_data.name == '' || form_data.name == null ?
            this.form_data.no_name = true : this.form_data.no_name = false; 

        form_data.description == '' || form_data.description == null ?
            this.form_data.no_desc = true : this.form_data.no_desc = false; 

        form_data.direction == '' || form_data.direction == null ?
            this.form_data.no_dire = true : this.form_data.no_dire = false; 

        form_data.latitude == null ?
            this.form_data.no_lati = true : this.form_data.no_lati = false; 

        form_data.longitude == null ?
            this.form_data.no_long = true : this.form_data.no_long = false;

        form_data.photo == '' || form_data.photo == '../../../assets/14.jpg' ?
            this.form_data.no_phot = true : this.form_data.no_phot = false; 

        for( let field in this.form_data ) {

            if( this.form_data[field] ) return;
            else result = true;
    
        }

        return result;

    }
    

   /*
    * Autor: Carlos Hernandez Hernandez
    * Contacto: carlos.hernandez@minimalist.com
    * Nombre: validateImageUpload
    * Tipo: Funcion | Funcion efecto colateral
    * Visto en: communities, amenities, services, perks
    * Parametros: evento del input, dimensiones de la imagen, donde se va pre visualizar la masa, donde desplegara el nombre
    * Regresa: N/A
    * Descripcion: Cuando se le da clic al input y se selecciona la imagen esta valida que el tamaño sea el adecuado y la despliega el el 
    *              visualizador
    */
    public images_upload: any; 
    public validateImageUpload( event_data:any, dimensions_image:string, target_image:string, name_image:string ):void {

        this.images_upload = event_data;

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
            native_image_uploaded = document.getElementById('image_real_dimension_nb'),
            root = this;

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

                        }, 777);
                
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
                            root.booking_data.photo = '../../../assets/14.jpg';

                        }
                        
                        });

                }

                reader.readAsDataURL( event.files[0] );

        }
        
    }

    public sendPageToTop():void {

        window.scrollTo(0,0);

    }

    /** Welcomeback Mr. Anderson We missed you... */
    ngOnInit() {

        if (localStorage.getItem("user") == undefined) this.router.navigate(['/login']);
        else {

            sessionStorage.removeItem('id_section_active');
            sessionStorage.removeItem('name_build');
            this.requestIndexContent();

        }
        
    }

    // Esta funcion no me gusta para nada
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
                this.booking_data.photo = url;            
                this.newImages = [];
                }
            })
            }
        }
    }
    //Aqui termina ese jale
}

class BookingData {
    id: number;
    name: string = '';
    description: string = '';
    status: boolean;
    direction: string = '';
    longitude: number;
    latitude: number;
    photo: string = '../../../assets/14.jpg';
    typeroom: any;
}

