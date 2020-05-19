import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatosService } from '../../../../../datos.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { LoaderComponent } from '../../../../../ts/loader';
import { SystemMessage } from '../../../../../ts/systemMessage';
import {Location} from '@angular/common';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  constructor(
    public router: Router,
    private route: ActivatedRoute,
    public services: DatosService,
    private _location: Location
  ) { }

  membershipID;
  public section: string;
  membershipObj = {
    id: 0,
    description: '',
    membershipIndices: [],
    building: 0,
    name: '',
    price: 0,
    typeRoomId: 0,
  };
  servicesList;
  typeRoomList;

  loader = new LoaderComponent();
  systemMessage = new SystemMessage();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  public table_adding_services: any[] = ['icon', 'service', 'description', 'recurrent', 'once', 'select'];

  public form_required: any = {
    no_name: false,
    no_description: false,
    no_price: false
  }

  ngOnInit() {
    this.section = 'MembershipCatalog';
    this.membershipID = this.route.snapshot.paramMap.get('id');
    this.getMembership(this.membershipID);
  }

  getMembership (id) {
    let obj = { membershipId: id };
    this.services.service_general_get_with_params('Membership', obj).subscribe((value) => {
      this.membershipObj = value.item;
      console.log('Reponse Memberships ', this.membershipObj);
      this.getServices(value.item.building, value.item.id);
      this.getTypeRooms(value.item.building);
      for (let o = 0; o < this.membershipObj.membershipIndices.length; o++) {
        this.membershipObj.membershipIndices[o].id = null;
      }
    });
  }

  getServices(id, idM) {
    this.loader.showLoader();
    let obj = { membershipId: idM, buildingId: id };
    this.services.service_general_get_with_params('Membership/GetServices', obj).subscribe((value) => {
      console.log('Data services', value.item);
      this.servicesList = new MatTableDataSource(value.item);
      console.log('Reponse Services ', this.servicesList);
      this.servicesList.paginator = this.paginator;
      this.servicesList.sort = this.sort;
      this.membershipObj.membershipIndices.forEach(element => {
        value.item.forEach(item => {
          if (item.id === element.serviceId) {
            this.selectingServices(item);
          }
        });
      });
      this.loader.hideLoader();
    });
  }

  getTypeRooms(id) {
    let obj = { buildingId: id };
    this.services.service_general_get_with_params('TypeRoom', obj).subscribe((value) => {
      this.typeRoomList = value.item;
      console.log('Reponse Type Room ', this.typeRoomList);
    });
  }

  checkedservice(id) {
    debugger
    this.membershipObj.membershipIndices.forEach(element => {
      if (element.serviceId === id) {
        return true;
      } else {
        return false;
      }
    });
  }

  services_selected: any[] = [];
  selectingServices(service_data: any) {
    const finder = (service: any) => service_data.id === service.id;
    if (this.services_selected.findIndex(finder) === -1) {
      service_data.active = true;
      this.services_selected.push(service_data);
    } else {
      service_data.active = false;
      this.services_selected.splice(this.services_selected.findIndex(finder), 1);
    }
    console.log('Services selected => ', this.services_selected);
  }

  updateMembership() {
    console.log('Membership Data', this.membershipObj);
    if (this.membershipObj.name.length === 0) {
      this.form_required.no_name = true;
      return;
    } else if (this.membershipObj.description.length === 0) {
      this.form_required.no_name = false;
      this.form_required.no_description = true;
    } else if (this.membershipObj.price === 0 || this.membershipObj.price === null) {
      this.form_required.no_price = true;
      this.form_required.no_name = false;
      this.form_required.no_description = true;
    } else if (this.services_selected.length === 0) {
      console.log('Update without services');
      this.updateOrInsert(this.membershipObj);
    } else {
      const addServices: any[] = [];
      this.services_selected.forEach(element => {
        let service = {
          id: 0,
          membershipId: parseInt(this.membershipID),
          serviceId: element.id
        };
        addServices.push(service);
      });
      this.membershipObj.membershipIndices = addServices;
      console.log('Update with services', this.membershipObj);
      this.updateOrInsert(this.membershipObj);
    }
  }

  updateOrInsert(membership: any) {
    this.services.service_general_post('Membership', membership).subscribe((value) => {
      this.form_required.no_price = false;
      this.form_required.no_name = false;
      this.form_required.no_description = false;
      switch(value.result) {
        case 'Sucess':
          this.systemMessage.showMessage({
            kind: 'ok',
            message: {
              header: value.detalle,
              text: 'The Membership has been update successfully.'
            },
            time: 2000
          });
          this._location.back();
          break;
      }
    });
  }

}
