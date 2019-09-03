import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatosServiceService } from '../../services/datos.service';
import { cat_promos, promocion } from '../../models/promocion';
//import { tryCatch } from 'rxjs/internal/util/tryCatch';

@Component({
  selector: 'app-wizard4',
  templateUrl: './wizard4.component.html',
  styleUrls: ['./wizard4.component.scss']
})
export class Wizard4Component implements OnInit {


  catalogos_promo = new cat_promos();
  promocion = new promocion();
  tabs = ['alone', 'flip-roomate', 'roomates'];
  selectedTab = 'alone'

  constructor(private heroService: DatosServiceService, private router: Router) { }

  ngOnInit() {
    this.get_catalogos_promocion();
    this.get_catalogos;
  }


  get_catalogos_promocion() {
    var creadoobj = { TextoLibre: "" };
    try {
      this.heroService.ServicioPostGeneral("get_catalogos_promocion", creadoobj).subscribe((value) => {
        setTimeout(() => {
          // debugger;
          switch (value.result) {
            case "Error":
              console.log("Ocurrio un error al cargar los catalogos: " + value.detalle);
              break;
            default:
              if (value.result == "Success") {

                this.catalogos_promo = value.item;

                ///// promos compatibles
                var indice: number = this.catalogos_promo[9].indexOf(this.catalogos_promo[9].find(x => x.id == this.promocion.id));
                if (indice >= 0) this.catalogos_promo[9].splice(indice, 1);
              }
          }
        }, 400);
      });
    } catch (error) {
      console.error('>> ', error)
    }
  }

  get_catalogos() {
    var creadoObj = { TextoLibre: "" };
    this.heroService.ServicioPostGeneral("get_catalogos", creadoObj).subscribe((value) => {
      setTimeout(() => {
        // debugger;
        switch (value.result) {
          case "Error":
        console.log("mensaje de error: " + value.detalle);
            break;
          default:
            if (value.result == "Success") {

              this.catalogos_promo = value.item;
            }
        }
      }, 400);
    });
  }

  setSelectedTab(tab) {
    this.selectedTab = tab
  }

}
