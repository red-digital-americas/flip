import { Component, OnInit } from '@angular/core';
import { Container } from '@angular/compiler/src/i18n/i18n_ast';
import { TabsComponent } from '../../../../ts/systemTabs';

@Component({
    selector: 'room-availavility',
    styleUrls: ['./room-availavility.component.scss'],
    templateUrl: './room-availavility.component.html'
})
export class RoomAvailavilityComponent implements OnInit {

    /*Autor: Carlos Enrique Hernandez Hernandez*/

    constructor() {}

    public section: string;
    public tabs_content = new TabsComponent('root');

    ngOnInit() {

        this.section = 'roomAvailavility';
        this.tabs_content.createTabsApp();

    }

}