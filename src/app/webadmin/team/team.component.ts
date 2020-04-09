import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatosService } from '../../../datos.service';
import { Utils } from '../../utils/utils';
import { ToasterService, ToasterConfig } from 'angular2-toaster';

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
  Name: string ="";
  apellido: string = "";
  position: string = "";
  Desc: string ="";
  Link: string ="";
  tt: string ="";
  
  public titulo_seccion:string = 'Team seccion';

  postphoto: any[]=[];
  comment: string = "";

  imageInputLabel = "Choose file";
  imageInputLabeltwo = "Choose file";

  private toasterService: ToasterService;

  public toasterconfig: ToasterConfig =
    new ToasterConfig({
      tapToDismiss: true,
      timeout: 3000,
      positionClass: "toast-top-center",
    });
  public newImages: any[] = [];


  ngOnInit() {
    if (localStorage.getItem("user") == undefined) {
      this.router.navigate(['/login']);
    }
    else {
      this.postphoto.push("assets/img/Coliving.jpg");


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
              //debugger;
             this.posts = value.item;
           }
       }
     });
   }


  passdata(id: any, name: any, lastname: any, position: any, desc:any, twitter:any, link:any  ){
    this.PostId = id ; 
    this.Name= name ; 
    this.apellido = lastname;
    this.position = position;
    debugger; 
    this.Desc=desc;
    this.tt=twitter;
    this.Link= link; 
   }

   
   updatephoto() {
     debugger;
    if(this.imageInputLabel!="Choose file"){
      var creadoobj = { id: this.PostId, BackPhoto: this.postphoto[0], FrontPhoto: this.postphoto[0], Name: this.Name, LastName: this.apellido, Position: this.position, Description: this.Desc, LinkedinUrl: this.Link,TwitterUrl:this.tt};
    debugger;

    this.heroService.ServicioPostPost("UpdateTeam", creadoobj).subscribe((value) => {


      switch (value.result) {
        case "Error":
          console.log("Ocurrio un error al cargar los catalogos: " + value.detalle);
          this.showError(); 
          break;
        default:
          //debugger;
          if (value.result == "Success") {
            this.get_photos();
            
            this.postphoto=[]; 
           
           
            this.showSuccess();
            this.Name="";
            this.apellido="";            
            this.Desc="";
            this.Link="";
            this.tt=""; 
  this.imageInputLabel = "Choose file";
  this.imageInputLabeltwo = "Choose file";

          }
      }
    });    
  }
  else {
    this.showWarning();
  }
  }
    
  showSuccess() {
    this.toasterService.pop('success', 'Success ', 'Publicación Actualizada Correctamente ');
  }

  showError() {
    this.toasterService.pop('error', 'Error ', 'Por favor completa todos los campos ');
  }
  showWarning() {
    this.toasterService.pop('warning', 'Warning Toaster', 'Completa todos los campos por favor');
  }
   
  prepareImages(e, indice) {
    console.log(e);
    if (Utils.isDefined(e.srcElement.files)) {
      for (let f of e.srcElement.files) {
        this.newImages[indice]=(f);
      }
    }
    this.addImages(indice);

  }


  addImages(indice) {
    let url: string = '';
    if (!Utils.isEmpty(this.newImages)) {
      for (let f of this.newImages) {
        debugger;
        if(indice==0){
          this.imageInputLabel = f.name;
        }
        if(indice==1)
        {
        this.imageInputLabeltwo = f.name;
        }
        this.heroService.UploadImgSuc(f).subscribe((r) => {
          if (Utils.isDefined(r)) {
            url = <string>r.message;
            //debugger;
            url = url.replace('/Imagenes', this.heroService.getURL() + 'Flip');
            debugger;
            this.postphoto[indice]=(url);
            debugger;
          }
        })
      }
    }
  }

  

}
