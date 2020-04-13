import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'messages',
    templateUrl: './messages.component.html',
    styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

    public section: string;

    constructor() {}

    ngOnInit() {

        this.section = 'messages';

    }

}