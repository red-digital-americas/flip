import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'room-availavility',
    styleUrls: ['./room-availavility.component.scss'],
    templateUrl: './room-availavility.component.html'
})
export class RoomAvailavilityComponent implements OnInit {

    public section: string;

    ngOnInit() {

        this.section = 'roomAvailavility';

    }

}