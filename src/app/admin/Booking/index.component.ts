import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DatosService } from '../../../datos.service';
import { Utils } from '../../utils/utils';
import { LoaderComponent } from '../../../ts/loader';

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
                this.resetSettings();
                this.show_booking_form = true;
                this.new_build_button = true;
                this.edit_build_button = false;
                this.booking_form_action = 'Nuevo Edificio';
            break;

            case 'edit':
                this.resetSettings();
                this.show_booking_form = true;
                this.new_build_button = false;
                this.edit_build_button = true;
                this.booking_data.id = editable.id;
                this.booking_data.name = editable.name;
                this.booking_data.description = editable.description;
                this.booking_data.direction = editable.direction;
                this.booking_data.latitude = editable.latitude;
                this.booking_data.longitude = editable.longitude;
                this.booking_data.photo = editable.photo;
                this.getRoomsToEdit(  editable.typeRoom );
                this.booking_form_action = 'Editar Edificio';
            break;

            case 'hide':
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
        this.router.navigateByUrl( `tenantList/${ id_booking }` );

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
        buildingid: JSON.parse(localStorage.getItem("user")).id, 
        userid: JSON.parse(localStorage.getItem("user")).buildingId
    };
    public cards:any = [];
    public requestIndexContent():void {
        
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

        this.rooms = [];

        rooms.forEach( (room: any) => {

            let new_room = {
                id: room.id,
                name: room.type,
                cantidad: room.capacity,
                can_delete: true,
                last_one: false,
                input: room.type,
                select: Number( room.capacity )
            };
        
            this.rooms.push( new_room );

        });

        this.rooms[0].can_delete = false;
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
            select: ''
        };

        this.rooms.push( new_room );

        this.rooms.forEach( (room:any, index:number) => {

            room.id = index;
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

        this.rooms.splice( this.rooms.findIndex( (room:any) => room.id === id_room ), 1);

        this.rooms[this.rooms.length -1].last_one = true;

        if( !this.new_build_button && this.edit_build_button ) {

            const element = event_data.target.parentElement,
                  element_id = element.querySelector('input').id,
                  get_element_id = element_id.split('_')[element_id.split('_').length -1],
                  delete_data = {
                    idBuild: this.booking_data.id,
                    type: element.querySelector('input').value,
                    capacity: element.querySelector('select').value,
                    active: false,
                    id: Number( get_element_id )
                  };

            console.log( delete_data );

            this.services.ServicioEditBuild( delete_data )
                .subscribe( (response: any) => {

                    console.log(response);

                }, (error: any) => {

                    console.log('Error Delete Room => ', error);

                });

        }

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

        if( this.validatingNewBuildFields( this.booking_data ) ) {
                
            this.booking_data.typeroom = this.getRoomsData();

            if( this.new_build_button && !this.edit_build_button ) {

                this.loader.showLoader(); 

                this.services.ServiceSaveBuilding( this.booking_data )
                    .subscribe( ( response: any ) => {

                        if( response.result == 'Success' ) {

                            this.requestIndexContent();
                            this.toggleSectionForm('hide');
                            this.resetSettings();
                            setTimeout( () => { this.loader.hideLoader(); }, 407);

                        }
        
                    }, (error: any) => {
        
                        console.log('Erro WS NewBuild',error);
        
                    });

            }

            if( !this.new_build_button && this.edit_build_button ) {

                this.loader.showLoader(); 

                this.services.ServicioEditBuild( this.booking_data )
                    .subscribe( (response: any) => {

                        if( response.result == 'Success' ) {

                            this.requestIndexContent();
                            this.toggleSectionForm('hide');
                            this.resetSettings();
                            setTimeout( () => { this.loader.hideLoader(); }, 407);

                        }
                        console.log( response );

                    }, (error: any) => {

                        console.log('Error Edit Build => ', error);

                    });

            }

        }

    }


    public espacios_habitaciones = [1,2,3,4,5,6,7,8,9,10];
    public getRoomsData():Array<any> {

        let rooms_added = [];

        const rooms_container = document.getElementById('rooms_added'),
              get_rooms = rooms_container.querySelectorAll('[room="added"]');

              get_rooms.forEach( (room: any) => {

                let input = room.querySelector('input'),
                    select = room.querySelector('select');
                
                if( input.value != '' && !select.value != null ) {

                    let new_room = {
                        type: input.value,
                        capacity: select.value,
                        active: true
                    };

                    rooms_added.push( new_room );

                }

              });

        return rooms_added;

    }

    public resetSettings():void {
        this.booking_data.name = null;
        this.booking_data.description = null;
        this.booking_data.direction = null;
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
        this.rooms = [
            {id: 0, name: '', cantidad: null, can_delete: false, last_one: true, input: '', select: ''}
        ];
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


    /** Welcomeback Mr. Anderson We missed you... */
    ngOnInit() {

        if (localStorage.getItem("user") == undefined) this.router.navigate(['/login']);
        else {

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
    name: string;
    description: string;
    status: boolean = true;
    direction: string;
    longitude: number;
    latitude: number;
    photo: string = '../../../assets/14.jpg';
    typeroom: any;
}

