import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DatosService } from '../../../datos.service';
import { Utils } from '../../utils/utils';
import { ToasterService, ToasterConfig } from 'angular2-toaster';
import { SystemMessage } from '../../../ts/systemMessage';
import { LoaderComponent } from '../../../ts/loader';
@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.scss']
})
export class JobsComponent implements OnInit {

  public system_message: SystemMessage = new SystemMessage();
  public loader: LoaderComponent = new LoaderComponent();
  
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

   
   public job_data: JobDTO = new JobDTO();
   passdata( job: any ){
    
    this.job_data.id = job.id;
    this.job_data.Title = job.title;
    this.job_data.ShortDescription = job.shortdesc;
    this.job_data.LongDescription = job.longdesc;

   }

   
   updatephoto() {

    let creadoobj = { 
      id: this.job_data.id, 
      Title: this.job_data.Title, 
      ShortDescription: this.job_data.ShortDescription, 
      LongDescription: this.job_data.LongDescription
    }

    if( this.formValidator( this.job_data ) ) {

      this.loader.showLoader();

      const close_modal_button = document.getElementById('close_modal');

      this.heroService.ServicioPostPost("UpdateJobs", creadoobj)
          .subscribe( (response: any) => {

            if( response.result == 'Success' ) {

              this.system_message.showMessage({
                kind: 'ok',
                time: 4700,
                message: {
                  header: 'Content updated',
                  text: 'Content has been updated successfully'
                }
              });

              close_modal_button.click();
              this.get_photos();

              setTimeout( () => this.loader.hideLoader(),777);

            }

          }, (error: any) => {



          });

    } else {

      this.system_message.showMessage({
        kind: 'error',
        time: 4700,
        message: {
          header: 'Form must be completed',
          text: 'All inputs must be filled to continue'
        }
      });

      this.sendToPageTop();

    }

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

  public form_watcher = {
    no_titl: false,
    no_sdes: false,
    no_ldes: false
  }
  public formValidator( form_data: JobDTO ): boolean {

    let result: boolean = false;
    
    form_data.Title == null || form_data.Title == '' ?
      this.form_watcher.no_titl = true : this.form_watcher.no_titl = false; 

    form_data.ShortDescription == null || form_data.ShortDescription == '' ?
      this.form_watcher.no_sdes = true : this.form_watcher.no_sdes = false;

    form_data.LongDescription == null || form_data.LongDescription == '' ?
      this.form_watcher.no_ldes = true : this.form_watcher.no_ldes = false;

    for( const dato in this.form_watcher ) {

      if( this.form_watcher[dato] ) return false;
      else result = true;

    }

    return result;

  }

  public sendToPageTop():void {

    const modal_page: any = document.getElementsByClassName('modal-fw');

          modal_page.forEach( (modal: any) => {

            modal.scrollTo(0,0);

          });

  }

}

class JobDTO {
  id: number;
  Title: string;
  ShortDescription: string;
  LongDescription: string;
}