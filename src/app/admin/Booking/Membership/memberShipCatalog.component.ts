import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'membership-catalog',
    templateUrl: './memberShipCatalog.component.html',
    styleUrls: ['./memberShipCatalog.component.scss']
}) export class MembershipCatalogComponent implements OnInit {

    public section: string;

    constructor() {}

    ngOnInit() {

        this.section = 'MembershipCatalog';

    }

}