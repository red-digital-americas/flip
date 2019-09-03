
  import { Component, OnInit } from '@angular/core';
  import { ModalDirective } from 'ngx-bootstrap/modal';
  import { Router, ActivatedRoute } from '@angular/router';
  import { DatosService } from '../../../datos.service';
  import { ToasterService, ToasterConfig } from 'angular2-toaster';
  import { Utils } from '../../utils/utils';

@Component({
  selector: 'app-moreindex',
  templateUrl: './moreindex.component.html',
  styleUrls: ['./moreindex.component.scss']
})
export class MoreindexComponent implements OnInit {


  
    
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
    sn:any[]; 
    Facebook: string = "";
    Twitter: string = "";
    Instagram: string = "";
    Youtube: string = "";

  
    postphoto: string = "assets/img/Coliving.jpg";
    imageInputLabel = "Choose file";

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
  
        this.user = JSON.parse(localStorage.getItem("user"));
        console.log(this.user);
        this.IDUSR = JSON.parse(localStorage.getItem("user")).id;
        this.IDBUILD = this.route.snapshot.params['id']; 
        this.get_photos();
        
        this.get_sn(); 
  
      }
    }
  
    get_photos() {
      // debugger;
       var creadoobj = { buildingid: 1 , userid: this.IDUSR };
       //debugger;
       this.heroService.ServicioPostPost("SeeMoreIndex", creadoobj).subscribe((value) => {
   
   
         switch (value.result) {
           case "Error":
             console.log("Ocurrio un error al cargar los catalogos: " + value.detalle);
             break;
           default:
             //debugger; 
             if (value.result == "Success") {
              //  debugger;
               this.posts = value.item;
             }
         }
       });
     }
  
  
     passdata(id:any ){
      this.PostId = id ; 
     }
     updatesn(){
      var creadoobj = { id: this.sn[0].id, FacebookUrl: this.Facebook,  TwitterUrl: this.Twitter , InstagramUrl :this.Instagram, YoutubeUrl:this.Youtube};
      //debugger;
  
      this.heroService.ServicioPostPost("UpdateSocialNetworks", creadoobj).subscribe((value) => {
  
  
        switch (value.result) {
          case "Error":
            console.log("Ocurrio un error al cargar los catalogos: " + value.detalle);
           
            break;
          default:
            //debugger;
            if (value.result == "Success") {
              this.get_sn();
              this.showSuccess();
             
  
            }
        }
      });
     }
      
    get_sn() {
      // debugger;
       var creadoobj = { buildingid: 1 , userid: this.IDUSR };
       //debugger;
       this.heroService.ServicioPostPost("SeeSocialNetworks", creadoobj).subscribe((value) => {
   
   
         switch (value.result) {
           case "Error":
             console.log("Ocurrio un error al cargar los catalogos: " + value.detalle);
             this.showError(); 

             break;
           default:
             //debugger; 
             if (value.result == "Success") {
              //  debugger;
               this.sn = value.item;
               this.Facebook=this.sn[0].fb; 
               this.Twitter=this.sn[0].tt; 
               this.Youtube=this.sn[0].yt; 
               this.Instagram=this.sn[0].insta; 
             }
         }
       });
     }
  
     updatephoto() {
      // debugger;
      if(this.imageInputLabel!="Choose file"){

      var creadoobj = { id: this.PostId, Photo: this.postphoto,  Position: this.PostId };
      //debugger;
  
      this.heroService.ServicioPostPost("UpdateMoreIndex", creadoobj).subscribe((value) => {
  
  
        switch (value.result) {
          case "Error":
            console.log("Ocurrio un error al cargar los catalogos: " + value.detalle);
            this.showError(); 

            break;
          default:
            //debugger;
            if (value.result == "Success") {
              this.get_photos();
              this.showSuccess();
            }
        }
      });    
    }
    else {
      this.showWarning();
    }  
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
  
    showSuccess() {
      this.toasterService.pop('success', 'Success ', 'Publicación Actualizada Correctamente ');
    }
  
    showError() {
      this.toasterService.pop('error', 'Error ', 'Por favor completa todos los campos ');
    }
    showWarning() {
      this.toasterService.pop('warning', 'Warning Toaster', 'Completa todos los campos por favor');
    }
     
  
    addImages() {
      let url: string = '';
      if (!Utils.isEmpty(this.newImages)) {
        for (let f of this.newImages) {
          
          this.imageInputLabel = f.name;
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
  