import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getStyle, hexToRgba } from '@coreui/coreui-pro/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { navItems } from './../../_nav';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DatosService } from '../../../datos.service';




  
@Component({
  templateUrl: 'communities.component.html',
  styleUrls: ['./communities.component.scss']


})
export class CommunitiesComponent implements OnInit {

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
    // debugger;
    var creadoobj = { buildingid: this.IDBUILD, userid: this.IDUSR };
    // debugger;
    this.heroService.ServicioPostBuilds("SeeBuilding", creadoobj).subscribe((value) => {
      switch (value.result) {
        case "Error":
          console.log("Ocurrio un error al cargar los catalogos: " + value.detalle);
          break;
        default:
          debugger; 
          if (value.result == "Success") {
            //  debugger;
            this.posts = value.item;
          }
      }
    });
  }

  AddBuilding() { }


  gotonewsfeed(id?: number) {
     this.router.navigate(['/newsfeed/' + id])

  }

  /* openImage(src, id) {
    //debugger;
    let imageDOM = <HTMLImageElement>document.getElementById(id);
    let width = 600;
    if (Utils.isDefined(imageDOM)) {
      width = imageDOM.naturalWidth;

      let dialogConfig = new MatDialogConfig();
      dialogConfig.width = width + 'px';
      dialogConfig.data = { src: src }
      dialogConfig.scrollStrategy = this.overlay.scrollStrategies.noop();

      let dialogRef = this.dialog.open(ImageDetailComponents, dialogConfig);

      return false;
    }
  }

  prepareImages(e) {

    if (Utils.isDefined(e.srcElement.files)) {
      for (let f of e.srcElement.files) {

        this.newImages.push(f);
      }
    }
  }


 addImages() {
    let url: string = '';
    if (!Utils.isEmpty(this.newImages)) {
      for (let f of this.newImages) {
        this.heroService.UploadImgSuc(f).subscribe((r) => {
          if (Utils.isDefined(r)) {
            url = <string>r.response;

            url = url.replace('/Imagenes', this.heroService.getURL() + 'mieletickets');
            this.Cat_Suc.url_logo = url;
            this.newImages = [];
          }
        })
      }
    }
  }

*/
}




