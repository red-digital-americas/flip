
  import { Component, OnInit } from '@angular/core';
  import { Router } from '@angular/router';
  import { getStyle, hexToRgba } from '@coreui/coreui-pro/dist/js/coreui-utilities';
  import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
  // import { navItems } from './../../_nav';
  import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
  import { DatosService } from '../../../datos.service';
@Component({
  selector: 'app-homemenu',
  templateUrl: './homemenu.component.html',
  styleUrls: ['./homemenu.component.scss']
})
export class HomemenuComponent implements OnInit {

  
    constructor(private router: Router, private heroService: DatosService ) { }
  posts: any[] ;
      email: string;
      password: string;
      token: boolean;
      message: {};
      validar: boolean = false;
      idpost: any; 
      IDUSR: string = "0";
      IDBUILD: string = "0";
      public user: string[];
  
  
  
    ngOnInit() {
      if (localStorage.getItem("user") == undefined) {
        this.router.navigate(['/login']);
      }
      else{
  
        this.user = JSON.parse(localStorage.getItem("user"));
        console.log(this.user);
        this.IDUSR = JSON.parse(localStorage.getItem("user")).id;
        this.IDBUILD = JSON.parse(localStorage.getItem("user")).buildingId;
        this.get_builds();
      }
    }
  
  
    get_builds() {
      // 
      var creadoobj = { buildingid: this.IDBUILD, userid: this.IDUSR };
      // 
      this.heroService.ServicioPostBuilds("SeeBuildingweb", creadoobj).subscribe((value) => {
        switch (value.result) {
          case "Error":
            console.log("Ocurrio un error al cargar los catalogos: " + value.detalle);
            break;
          default:          
            if (value.result == "Success") {
              //  
              this.posts = value.item;
            }
        }
      });
    }
  
    AddBuilding() { }
  
  
    gotonewsfeed(id?: number) {
       this.router.navigate(['webadmin/homeammenities/' + id])
  
    }
  
  
  }
  
  
  
  
  