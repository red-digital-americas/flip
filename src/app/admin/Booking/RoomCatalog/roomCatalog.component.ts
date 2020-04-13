import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'room-catalog',
    templateUrl: './roomCatalog.component.html',
    styleUrls: ['./roomCatalog.component.scss']
})
export class RoomCatalogComponent implements OnInit {

    public section: string;

    constructor() {}

    ngOnInit() {

        this.section = 'roomCatalog';

    }

}