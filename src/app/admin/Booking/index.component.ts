import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { DatosService } from '../../../datos.service';
import { Utils } from '../../utils/utils';

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
    public toggleSectionForm( action_kind:string = 'hide', editable:any = {} ):void {

        switch( action_kind ) {

            case 'new':
            this.show_booking_form = true;
            this.booking_form_action = 'Nuevo Edificio';
            break;

            case 'edit':
            this.show_booking_form = true;
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

                }

                console.log( this.cards );

            });
            
    }


   /*
    * Autor: Carlos Hernandez
    * Email: carlos.hernandez@minimalist.mx    
    * Name: showRoomsForms
    * Params: NA
    * Return: NA
    * Description: Muestra el formulario de Añadir cuartos de ser requerido
    * Variables Out: show_rooms_form
    */
    public show_rooms_form:boolean = false;
    public showRoomsForms():void {

        !this.show_rooms_form ?
            this.show_rooms_form = true : this.show_rooms_form = false;

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
        {id: 0, name: '', cantidad: null, can_delete: false}
    ];
    public addNewRoom():void {

        let new_room = {
            id: 0,
            name: '',
            cantidad: null,
            can_delete: true
        };

        this.rooms.push( new_room );

        this.rooms.forEach( (room:any, index:number) => {

            room.id = index;

        });

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
    public deleteThisRoom( id_room:number ):void {

        this.rooms.splice( this.rooms.findIndex( (room:any) => room.id === id_room ), 1);

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

        /*
        this.booking_data.name = 'Carlos';
        this.booking_data.description = 'Hola este es el edificio';
        this.booking_data.status = true;
        this.booking_data.direction = 'Esta es la direccion del edificio';
        this.booking_data.longitude = 100;
        this.booking_data.latitude = 200;
        this.booking_data.photo = '';
        this.booking_data.typeroom = [
            {type: 'uno', capacity: 10}
        ];*/

        //Falata la foto
        // Los cuartos 
        // Validar campos

        const validating_data = new Promise( (resolve: any) => {

            const are_rooms_completed = this.validateRoomsData();

                  resolve( are_rooms_completed );

        });

        validating_data.then( (rooms_completed: boolean) => {

            if( rooms_completed ) {

                this.booking_data.typeroom = this.rooms;

                console.log( this.booking_data );

            }

        });

        
        
        /*this.services.ServiceSaveBuilding( this.booking_data ).subscribe( ( response: any ) => {

            console.log( response );

        }, (error: any) => {

            console.log(error);

        });*/

        console.log( this.booking_data );

    }


    public espacios_habitaciones = [1,2,3,4,5,6,7,8,9,10];
    public validateRoomsData():boolean {

        const rooms_added_container = document.getElementById('room_added'),
              rooms = rooms_added_container.querySelectorAll('.room');

        let result: boolean = false;

        for( let room = 0; room < rooms.length; room += 1) {

            const inputs = rooms[room].querySelectorAll('input'),
                  selects = rooms[room].querySelectorAll('select');

            if( inputs.length == selects.length ) {

                for( let field = 0; field < inputs.length; field += 1) {
                    
                    if( inputs[field].value != '' && selects[field].value  != null ) {

                        this.rooms[room].name = inputs[field].value;
                        this.rooms[room].cantidad = selects[field].value;

                        if( rooms.length - 1 == room ) return true;

                    } else {
                        
                        console.log('Completa los campos y dale estilos donde falten');
                        return false;

                    }

                }

            } else {

                console.log('Error inesperado en el sistema, los campos no coinciden');

            }

        }

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
            console.log( e.srcElement.files );
          }
        }
        this.addImages();
    }

    addImages() {
        let url: string = '';
        if (!Utils.isEmpty(this.newImages)) {
            for (let f of this.newImages) { console.log( this.newImages );
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
    name: string;
    description: string;
    status: boolean = true;
    direction: string;
    longitude: number = null;
    latitude: number = null;
    photo: string = '';
    typeroom: any;
}