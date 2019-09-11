import { Component, OnInit } from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Router, ActivatedRoute } from '@angular/router';
import { DatosService } from '../../../datos.service';
import { ToasterService, ToasterConfig } from 'angular2-toaster';
import { Utils } from '../../utils/utils';


@Component({
  selector: 'app-webadmin',
  templateUrl: './webadmin.component.html',
  styleUrls: ['./webadmin.component.scss']
})
export class WebadminComponent implements OnInit {

  
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
  postphoto: any[]=[];

  imageInputLabel = "Choose file";
  imageInputLabeltwo = "Choose file";

  private toasterService: ToasterService;

  public toasterconfig: ToasterConfig =
    new ToasterConfig({
      tapToDismiss: true,
      timeout: 3000,
      positionClass: "toast-top-center",
    });

  comment: string = "";

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
     this.heroService.ServicioPostPost("SeeIndex", creadoobj).subscribe((value) => {
 
 
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


   passdata(id:any ){
     this.PostId = id;
     this.imageInputLabel = "Choose file";
     this.imageInputLabeltwo = "Choose file";
   }

   
   updatephoto() {
    // debugger;

    if(this.imageInputLabel!="Choose file"&&this.imageInputLabeltwo!="Choose file"){
      var creadoobj = { id: this.PostId, BackPhoto: this.postphoto[1], FrontPhoto: this.postphoto[0], Position: this.PostId };
      debugger;
  
      this.heroService.ServicioPostPost("UpdateIndex", creadoobj).subscribe((value) => {
  
  
        switch (value.result) {
          case "Error":
            console.log("Ocurrio un error al cargar los catalogos: " + value.detalle);
            this.showError(); 
            break;
          default:
            debugger;
            if (value.result == "Success") {
              this.get_photos();
             
             
              this.postphoto=[]; 
              this.imageInputLabel="Choose file";
              this.imageInputLabeltwo="Choose file";

              this.showSuccess();
              //location.reload();
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
    //this.newImages = []
    if (Utils.isDefined(e.srcElement.files)) {
      for (let f of e.srcElement.files) {
        this.heroService.UploadImgSuc(f).subscribe((r) => {
          console.log(r);
          if (indice == 0) {
            this.imageInputLabel = f.name;
            this.postphoto[indice] = r.message;
          }
          if (indice == 1) {
            this.imageInputLabeltwo = f.name;
            this.postphoto[indice] = r.message;
          }
          
          //if (Utils.isDefined(r)) {
          //  url = <string>r.message;
          //  //debugger;
          //  url = url.replace('/Imagenes', this.heroService.getURL() + 'Flip');
          //  debugger;
          //  this.postphoto[indice]=(url);
          //  debugger;
          //}
        })
      }
    }
    //this.addImages(indice);

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
          console.log(r);
          //if (Utils.isDefined(r)) {
          //  url = <string>r.message;
          //  //debugger;
          //  url = url.replace('/Imagenes', this.heroService.getURL() + 'Flip');
          //  debugger;
          //  this.postphoto[indice]=(url);
          //  debugger;
          //}
        })
      }
    }
  }
}
