import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'tenantList',
    templateUrl: './tenantList.component.html',
    styleUrls: ['./tenantList.component.scss']
}) export class TenantListComponent implements OnInit {

    public section:string;

    ngOnInit() {

        this.section = 'tenantList';

    }

}