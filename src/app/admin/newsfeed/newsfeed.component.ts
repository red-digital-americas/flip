import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatosService } from '../../../datos.service';
import { Utils } from '../../utils/utils';
import { ToasterService, ToasterConfig } from 'angular2-toaster';

@Component({
  selector: 'app-newsfeed',
  templateUrl: './newsfeed.component.html',
  styleUrls: ['./newsfeed.component.scss', '../../../scss/vendors/toastr/toastr.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [ToasterService]
})

export class NewsfeedComponent implements OnInit {


  constructor(private router: Router,
    private heroService: DatosService,
    private route: ActivatedRoute,
    toasterService: ToasterService,) {
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
      this.get_posts();
      

    }
  }
  private toasterService: ToasterService;

  public toasterconfig: ToasterConfig =
    new ToasterConfig({
      tapToDismiss: true,
      timeout: 3000,
      positionClass: "toast-top-center",
    });



  showSuccess() {
    this.toasterService.pop('success', 'Success ', 'Your post was published correctly ');
    
  }

  showWarning() {
    this.toasterService.pop('warning', 'Post Deleted', 'The post was deleted');
  }

  showError() {
    this.toasterService.pop('error', 'Error ', 'An unexpected error occurred ');
  }

  get_posts() {
   // debugger;
    var creadoobj = { buildingid: this.route.snapshot.params['id'] , userid: this.IDUSR };
    // debugger;
    this.heroService.ServicioPostPost("SeePost", creadoobj).subscribe((value) => {


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

  addPost() {
    debugger;
    
    var creadoobj = { id: 0, title: this.posttitle, userid: this.IDUSR, PostText: this.posttext, photo: this.postphoto, BuildingId: this.route.snapshot.params['id'] };
    debugger;
    /*
     public int id { get; set; }
            public int userid { get; set; }
            public string title  { get; set; }
            public string comment { get; set; }

*/
    this.heroService.ServicioPostPost("PostPosts", creadoobj).subscribe((value) => {


      switch (value.result) {
        case "Error":
          console.log("Ocurrio un error al cargar los catalogos: " + value.detalle);
          this.showError(); 
          break;
        default:
          debugger;
          if (value.result == "Success") {
            this.get_posts();
            debugger; 
            this.postphoto = "assets/img/Coliving.jpg";
            this.posttext = "";
            this.posttitle = "";
            this.showSuccess();


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


  editPost(id: number) {
   // debugger; 
    this.router.navigate(['/editcomment/' + id])

  }
  deletePost(idpost: number) {
    debugger;
    var creadoobj = { id: idpost, title: "", userid: this.IDUSR, PostText: "", photo: "", BuildingId: this.route.snapshot.params['id'] };
    debugger;
    /*
     public int id { get; set; }
            public int userid { get; set; }
            public string title  { get; set; }
            public string comment { get; set; }

*/
    this.heroService.ServicioPostPost("DeletePost", creadoobj).subscribe((value) => {
      switch (value.result) {
        case "Error":
          console.log("Ocurrio un error al cargar los catalogos: " + value.detalle);
          this.showError();
          break;

        default:
          debugger;
          if (value.result == "Success") {
            this.get_posts();
            this.showWarning();
          }
      }
    }); }
}
