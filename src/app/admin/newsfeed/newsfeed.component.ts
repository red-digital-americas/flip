import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatosService } from '../../../datos.service';
import { Utils } from '../../utils/utils';

@Component({
  selector: 'app-newsfeed',
  templateUrl: './newsfeed.component.html',
  styleUrls: ['./newsfeed.component.scss']
})
export class NewsfeedComponent implements OnInit {


  constructor(private router: Router, private heroService: DatosService, private route: ActivatedRoute, ) { }
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

  postphoto: string;

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
      this.get_posts();
      

    }
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

  addComment() {
    // debugger;
    var creadoobj = { Id: 0, PostId: this.PostId, UserId: 1, Comment1: this.posttext };
    debugger;
    /*public int Id { get; set; }
    public int UserId { get; set; }
    public int PostId { get; set; }
    public string Comment1 { get; set; }*/
    this.heroService.ServicioPostPost("PostComment", creadoobj).subscribe((value) => {


      switch (value.result) {
        case "Error":
          console.log("Ocurrio un error al cargar los catalogos: " + value.detalle);
          break;
        default:
          debugger;
          if (value.result == "Success") {

            this.get_posts();

          }
      }
    });
  }
  addPost() {
    // debugger;
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
          break;
        default:
          debugger;
          if (value.result == "Success") {
            this.get_posts();
            window.location.href = "/newsfeed";


          }
      }
    });
  }

  prepareImages(e) {

    if (Utils.isDefined(e.srcElement.files)) {
      for (let f of e.srcElement.files) {
        debugger;
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
    debugger; 
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
          break;
        default:
          debugger;
          if (value.result == "Success") {
            this.get_posts();

          }
      }
    }); }
}
