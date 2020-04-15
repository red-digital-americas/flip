import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatosService } from '../../../datos.service';
import { FormsModule } from '@angular/forms';
import { Utils } from '../../utils/utils';
import { ToasterService, ToasterConfig } from 'angular2-toaster';



@Component({
  selector: 'app-editcomment',
  templateUrl: './editcomment.component.html',
  styleUrls: ['./editcomment.component.scss', '../../../scss/vendors/toastr/toastr.scss'],
  encapsulation: ViewEncapsulation.None,
  providers: [ToasterService]
})
export class EditcommentComponent implements OnInit {

  constructor(private router: Router,
    private heroService: DatosService,
    private route: ActivatedRoute,
    toasterService: ToasterService, ) {
    this.toasterService = toasterService;
  }
  posts: any[];
  email: string;
  password: string;
  postphoto: string;
  token: boolean;
  message: {};
  validar: boolean = false;
  idpost: any;
  IDUSR: string = "0";
  IDBUILD: string = "0";
  PostId: number;
  posttext: string = "";
  posttitle: string = "";
  comment: string = "";
  idbuilding: number;


  public newImages: any[] = [];

  permisos_edicion: boolean = false;

  public user: string[];


  ngOnInit() {
    if (localStorage.getItem("user") == undefined) {
      this.router.navigate(['/login']);
    }
    else {

      this.user = JSON.parse(localStorage.getItem("user"));
      console.log(this.user);
      this.IDUSR = JSON.parse(localStorage.getItem("user")).id;
      this.get_post();
      this.get_comments(); 

    }
  }

  private toasterService: ToasterService;

  public toasterconfig: ToasterConfig =
    new ToasterConfig({
      tapToDismiss: true,
      timeout: 3000,
      positionClass: "toast-top-center",
    });

  validar_permisos() {

    this.permisos_edicion = true;
  }


  showSuccess() {
    this.toasterService.pop('success', 'Updated Post ', 'Your post was updated correctly ');

  }

  showWarning() {
    this.toasterService.pop('warning', 'Comment Deleted', 'The comment was deleted');
  }

  showError() {
    this.toasterService.pop('error', 'Error ', 'An unexpected error occurred ');
  }
  showInfo() {
    this.toasterService.pop('info', 'Comment', 'Your comment was posted ');
  }

  goback() {
    window.history.back();
}
  get_comments() {
    // 
    var creadoobj = { idpost: this.route.snapshot.params['id'] , userid: this.IDUSR };
    // 
    this.heroService.ServicioPostPost("SeeComment", creadoobj).subscribe((value) => {

      console.log( 'Es esta mamada => ', value );


      switch (value.result) {
        case "Error":
          console.log("Ocurrio un error al cargar los catalogos: " + value.detalle);
           

          break;
        default:
          
          if (value.result == "Success") {
            
            this.posts = value.item;
          
            if (this.IDUSR == value.item[0].userid) { this.validar_permisos() }
          }
      }
    });
  }


  get_post() {
    // 
    var creadoobj = { idpost: this.route.snapshot.params['id'], userid: this.IDUSR };
    // 
    this.heroService.ServicioPostPost("SeeOnePost", creadoobj).subscribe((value) => {


      switch (value.result) {
        case "Error":
          console.log("Ocurrio un error al cargar los catalogos: " + value.detalle);
          break;
        default:
          // 
          if (value.result == "Success") {
            // 
            //this.posts = value.item;
            this.idbuilding = value.item[0].idbuilding; 
            this.posttext = value.item[0].posttext; 
            this.posttitle = value.item[0].posttitle; 
            this.postphoto = value.item[0].postphoto; 
          }
      }
    });
  }
  deleteComment(commentid:number ) {
    
    var creadoobj = { PostId: this.route.snapshot.params['id'], userid: this.IDUSR, Id: commentid  };
    this.heroService.ServicioPostPost("DeleteComment", creadoobj).subscribe((value) => {


      switch (value.result) {
        case "Error":
          console.log("Ocurrio un error al cargar los catalogos: " + value.detalle);
          this.showError();
          break;
        default:
          if (value.result == "Success") {
            this.get_comments();
            this.get_post();
            this.showWarning();
          }
      }
    });

  }
  addPost() {
    // 
    var creadoobj = { id: this.route.snapshot.params['id'], title: this.posttitle, userid: this.IDUSR, PostText: this.posttext, photo: this.postphoto };
    
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
          
          if (value.result == "Success") {
            this.get_post();
           
            this.showSuccess();

            this.router.navigate(['/newsfeed/' + this.idbuilding]); 

          }
      }
    });
  }

  

    /*openImage(src, id) {
    //
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
  */

  addComment() {
    // 
    var creadoobj = { Id: 0, PostId: this.route.snapshot.params['id'], UserId: this.IDUSR , Comment1: this.comment };
    
    /*public int Id { get; set; }
    public int UserId { get; set; }
    public int PostId { get; set; }
    public string Comment1 { get; set; }*/
    this.heroService.ServicioPostPost("PostComment", creadoobj).subscribe((value) => {


      switch (value.result) {
        case "Error":
          console.log("Ocurrio un error al cargar los catalogos: " + value.detalle);
          this.showError(); 
          break;
        default:
          
          if (value.result == "Success") {
            this.get_comments();
            this.comment = ""; 
            this.showInfo();
            this.get_post();

          }
      }
    });
  }
  prepareImages(e) {

    if (Utils.isDefined(e.srcElement.files)) {
      for (let f of e.srcElement.files) {
         
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
             
            url = url.replace('/Imagenes', this.heroService.getURL() + 'Flip');
             
            this.postphoto = url;
             
            this.newImages = [];
          }
        })
      }
    }
  }

  
}
