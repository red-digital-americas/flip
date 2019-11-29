import { Component, OnInit } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import * as signalR from '@aspnet/signalr';
import { Gvars } from '../../models/gvars';
import { Router } from '@angular/router';
import { DatosService } from '../../../datos.service';
import { ToasterService, ToasterConfig } from 'angular2-toaster';
// import { ToastController } from '../shared/toast-controller/toast-controller';
@Component({
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  providers: [ToasterService]
})
export class ChatComponent implements OnInit {
  private hubConnection: HubConnection;
  IDUSR: string = "0";
  IDBUILD: string = "0";
  public user: string[];
  userInfo: any;
  posts: any[];
  public buildingDetail: any;
  public toasterconfig: ToasterConfig = new ToasterConfig({
    tapToDismiss: true,
    timeout: 3000,
    positionClass: "toast-top-center",
  });
  constructor(private router: Router,
    private heroService: DatosService,
    // public modalController: ModalController,
    // public toastController: ToastController

  ) { }

  ngOnInit() {
    debugger;
    this.user = JSON.parse(localStorage.getItem("user"));
    console.log(this.user);
    this.IDUSR = JSON.parse(localStorage.getItem("user")).id;
    this.IDBUILD = JSON.parse(localStorage.getItem("user")).buildingId;
    // this.GetBuildingCoverImage()
    this.get_chats();
    this.getInfoUser()
    this.hubConnection = new HubConnectionBuilder()
      .configureLogging(signalR.LogLevel.Debug)
      .withUrl(`${Gvars.URL}/chatHub`, {
        // .withUrl("http://localhost:49314/chatHub", {
        // .withUrl("http://23.253.173.64:8088/chatHub", {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets
      })
      .build();


    this.hubConnection.on('Send', (rtMessageResponse) => {
      console.log(rtMessageResponse);
      if (parseInt(this.IDUSR) == rtMessageResponse.user1Id || parseInt(this.IDUSR) == rtMessageResponse.user2Id) {
        this.get_chats();
      }
    });
    this.hubConnection.start()
      .then(() => console.log('Connection started!'))
      .catch(err => console.log('Error while establishing connection :('));

    // this.IDBUILD = this.route.snapshot.params['id'];  
  }

  get_chats() {
    debugger;
    var creadoobj = { buildingid: this.IDBUILD, userid: this.IDUSR };
    this.heroService.ServicioPostMessage("SeeChats", creadoobj).subscribe((value) => {
      debugger;
      switch (value.result) {
        case "Error":
          console.log("Ocurrio un error al cargar los catalogos: " + value.detalle);
          break;
        default:
          console.log(value.item);
          if (value.result == "Success") {
            this.posts = value.item;
          }
      }
    });
  }

  seemessage(id: any) {
    this.router.navigate(['messages', id]);
  }

  private GetBuildingCoverImage() {
    this.heroService.service_general_get(`Building/GetCoverImage/${this.IDBUILD}`).subscribe(
      (res) => {
        if (res.result === "Success") {
          console.log(res.item);
          this.buildingDetail = res.item;
        } else if (res.result === "Error") { console.log("Ocurrio un error" + res.detalle); }
        else { console.log("Error"); }
      },
      (err) => { console.log(err); }
    );
  }

  getInfoUser() {
    var creadoobj = { Id: this.IDUSR };
    this.heroService.ServicioPostUsers("SeeDetailUser", creadoobj).subscribe((value) => {
      console.log(value.item[0]);
      switch (value.result) {
        case "Error":
          console.log("Ocurrio un error al cargar los catalogos: " + value.detalle);
          break;
        default:
          if (value.result == "Success") {
            console.log(value);
            this.userInfo = value.item[0];
            // this.LastName = value.item[0].lastName;
            // this.MotherName = value.item[0].motherName;
            // this.Email = value.item[0].email;
            // this.Password = value.item[0].password;
            // this.Avatar = value.item[0].avatar;
            // this.FacebookUrl = value.item[0].facebookUrl;
            // this.TwitterUrl = value.item[0].twitterUrl;
            // this.InstagramUrl = value.item[0].instagramUrl;
            // this.Phone = value.item[0].phone;
            // this.Workplace = value.item[0].workplace;
            // this.AboutMe = value.item[0].aboutMe;
            // if (this.AboutMe !== null) { this.ParseAboutMe(); }
            // this.CompleteName = this.Name + " " + this.LastName + " " + this.MotherName;
          }
      }
    });
  }

  // async ShowModal() {
  //   const modal = await this.modalController.create({
  //     component: NewMessageComponent
  //   });

  // modal.onDidDismiss().then((dataReturned) => {
  //     if (dataReturned !== null) {
  //         console.log('Modal Sent Data :', dataReturned);
  //         if (dataReturned.data === "true") { 
  //           this.get_chats();
  //           this.presentToast("Mensaje enviado"); 
  //         }            
  //     }
  // });

  // return await modal.present();
  // }
  // async presentToast(msj:string) {
  //   // const toast = await this.toastController.create({ message: msj, duration: 2000 });
  //   // toast.present();
  // }
}
