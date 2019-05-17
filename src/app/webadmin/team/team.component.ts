import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatosService } from '../../../datos.service';
import { Utils } from '../../utils/utils';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

  
  
  public myModal;
  public largeModal;
  public smallModal;
  public primaryModal;
  public successModal;
  public warningModal;
  public dangerModal;
  public infoModal;

  constructor(private router: Router,
    private heroService: DatosService,
    private route: ActivatedRoute,
   ) {
  }
  posts: any[];
  email: string;
  password: string;
  token: boolean;
  message: {};
  validar: boolean = false;
  idpost: any;
  IDUSR: string = "0";
  IDBUILD: string = "0";
  PostId: number ;
  posttext: string = "";
  posttitle: string = "";
  public user: string[];
  Name: string ="";
  Desc: string ="";
  Link: string ="";


  postphoto: string = "assets/img/Coliving.jpg";
  

  comment: string = "";

  public newImages: any[] = [];


  ngOnInit() {
    if (localStorage.getItem("user") == undefined) {
      this.router.navigate(['/login']);
    }
    else {

      this.user = JSON.parse(localStorage.getItem("user"));
      console.log(this.user);
      this.IDUSR = JSON.parse(localStorage.getItem("user")).id;
      this.IDBUILD = this.route.snapshot.params['id']; 
      this.get_photos();
      

    }
  }

  get_photos() {
    // debugger;
     var creadoobj = { buildingid: 1 , userid: this.IDUSR };
     //debugger;
     this.heroService.ServicioPostPost("SeeTeam", creadoobj).subscribe((value) => {
 
 
       switch (value.result) {
         case "Error":
           console.log("Ocurrio un error al cargar los catalogos: " + value.detalle);
           break;
         default:
           //debugger; 
           if (value.result == "Success") {
              debugger;
             this.posts = value.item;
           }
       }
     });
   }


   passdata(id:any ){
    this.PostId = id ; 
   }

   
   updatephoto() {
    // debugger;
    var creadoobj = { id: this.PostId, BackPhoto: this.postphoto, FrontPhoto: this.postphoto, Name : this.Name , Description: this.Desc, Link: this.Link};
    debugger;

    this.heroService.ServicioPostPost("UpdateTeam", creadoobj).subscribe((value) => {


      switch (value.result) {
        case "Error":
          console.log("Ocurrio un error al cargar los catalogos: " + value.detalle);
         
          break;
        default:
          debugger;
          if (value.result == "Success") {
            this.get_photos();
           
           

          }
      }
    });
  }
   
  prepareImages(e) {
    debugger; 
    if (Utils.isDefined(e.srcElement.files)) {
      for (let f of e.srcElement.files) {
        debugger;
        this.newImages.push(f);
      }
    }
    this.addImages();

  }


  addImages() {
    let url: string = '';
    if (!Utils.isEmpty(this.newImages)) {
      for (let f of this.newImages) {
        this.heroService.UploadImgSuc(f).subscribe((r) => {
          if (Utils.isDefined(r)) {
            url = <string>r.message;
            debugger;
            url = url.replace('/Imagenes', this.heroService.getURL() + 'Flip');
            debugger;
            this.postphoto = url;
            debugger;
            this.newImages = [];
          }
        })
      }
    }
  }
}
