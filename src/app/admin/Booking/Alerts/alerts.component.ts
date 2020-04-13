import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'alerts',
    templateUrl: './alerts.component.html',
    styleUrls: ['./alerts.component.scss']
})
export class AlertsComponent implements OnInit {

    public section: string;

    constructor() {}

    ngOnInit() {

        this.section = 'alerts';

    }

}