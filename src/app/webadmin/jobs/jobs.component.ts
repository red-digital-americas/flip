import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatosService } from '../../../datos.service';
import { Utils } from '../../utils/utils';
import { ToasterService, ToasterConfig } from 'angular2-toaster';
@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit {

 
  
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
    toasterService: ToasterService) {
      this.toasterService = toasterService;
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
  title:string =""; 
  shortdesc:string =""; 
  longdesc:string =""; 

  postphoto: string = "assets/img/Coliving.jpg";
  

  comment: string = "";

  public newImages: any[] = [];

  private toasterService: ToasterService;

  public toasterconfig: ToasterConfig =
    new ToasterConfig({
      tapToDismiss: true,
      timeout: 3000,
      positionClass: "toast-top-center",
    });


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
     this.heroService.ServicioPostPost("SeeJobs", creadoobj).subscribe((value) => {
 
 
       switch (value.result) {
         case "Error":
           console.log("Ocurrio un error al cargar los catalogos: " + value.detalle);
           break;
         default:
           //debugger; 
           if (value.result == "Success") {
             this.posts = value.item;
           }
       }
     });
   }


   passdata(id:any , title :any , lng :any , sht :any  ){
    this.PostId = id ; 
    this.title=title;
    this.longdesc=lng;
    this.shortdesc=sht; 
   }

   
   updatephoto() {
    // debugger;
    var creadoobj = { id: this.PostId, Title: this.title, ShortDescription:this.shortdesc, LongDescription:this.longdesc};
    //debugger;

    this.heroService.ServicioPostPost("UpdateJobs", creadoobj).subscribe((value) => {


      switch (value.result) {
        case "Error":
          console.log("Ocurrio un error al cargar los catalogos: " + value.detalle);
         
          break;
        default:
          //debugger;
          if (value.result == "Success") {
            this.get_photos();
           
            this.title="";
    this.longdesc="";
    this.shortdesc="";
    
           
    this.showSuccess(); 

          }
      }
    });
  }

  showSuccess() {
    this.toasterService.pop('success', 'Success ', 'Publicación Actualizada Correctamente ');
  }
   
  prepareImages(e) {
    //debugger; 
    if (Utils.isDefined(e.srcElement.files)) {
      for (let f of e.srcElement.files) {
        //debugger;
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
            //debugger;
            url = url.replace('/Imagenes', this.heroService.getURL() + 'Flip');
            //debugger;
            this.postphoto = url;
            //debugger;
            this.newImages = [];
          }
        })
      }
    }
  }
}

