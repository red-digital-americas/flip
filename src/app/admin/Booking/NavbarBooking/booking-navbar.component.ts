import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: 'booking-navbar',
    templateUrl: './booking-navbar.component.html',
    styleUrls: ['./booking-navbar.component.scss']
}) export class BookingNavbarComponent implements OnInit {

    @Input() public section:string;
    
    public section_name: string;
    public navbar_options = [
        {name: 'Reservations', id: 'tenantList', active: true},
        {name: 'Room Availability', id: 'roomAvailavility', active: false},
        {name: 'Events', id: 'reservations', active: false},
        {name: 'Messages', id: 'messages', active: false},
        {name: 'Alerts', id: 'alerts', active: false},
        //{name: 'Room Catalog', id: 'roomCatalog', active: false},
        //{name: 'Merbership Catalog', id: 'MembershipCatalog', active: false}
    ];

    constructor(
        public router: Router,
        public router_data: ActivatedRoute
    ) {}

    public goToPage( to_where:string = 'default' ):void {

        const id_path = sessionStorage.getItem('id_section_active');

        if( to_where != 'default' ) {

            id_path == null || id_path == undefined ? 
                this.router.navigateByUrl( 'booking' ) : 
                this.router.navigateByUrl( `${ to_where }/${ id_path }` );

        } else {

            this.router.navigateByUrl( 'booking' );

        }

    }

    public activeOptionStyle( option_selected:string ):void {

        this.navbar_options.forEach( (navbar_item:any) => { 

            if( navbar_item.id === option_selected ) {

                navbar_item.active = true;
                this.section_name = sessionStorage.getItem('name_section_active');

            } else {

                navbar_item.active = false;

            }

        });

    }

    ngOnInit() {

        this.activeOptionStyle( this.section );

    }

}