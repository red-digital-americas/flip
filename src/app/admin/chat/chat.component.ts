import { Component, OnInit } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import * as signalR from '@aspnet/signalr';
import { Gvars } from '../../models/gvars';
import { Router } from '@angular/router';
import { DatosService } from '../../../datos.service';
import { ToasterService, ToasterConfig } from 'angular2-toaster';
// import { ToastController } from '../shared/toast-controller/toast-controller';
class MessageCustom {
  public message;
  public invitationId?:number;
  constructor(){}
}
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
  posts: any;

  userConversation;
  messages:MessageCustom[] = [];
  messageInput:string = ""
  
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
      if (parseInt(this.IDUSR) == rtMessageResponse.conversationId || parseInt(this.IDUSR) == rtMessageResponse.user2Id) {
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
          console.log("Post==>",value.item);
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
          }
      }
    });
  }
  showConversation(id:any){
    this.GetConversationUser(id);
      this.GetMessages(id);  
  }
  private GetConversationUser (id) { 
    debugger;   
    var creadoobj = { conversationId: id, userId: this.IDUSR };        
    this.heroService.service_general_get_with_params("Message/GetConversationUser", creadoobj).subscribe((value) => {          
      switch (value.result) {              
        case "Error":
          console.log("Ocurrio un error " + value.detalle);
          break;
        default:          
        console.log("GetConversationUSer=>",value.item);
        if (value.result == "Success") {                  
            this.userConversation = value.item;                                                            
          }
        }
    });
  }

  private GetMessages (id) {   
    debugger; 
    var creadoobj = { conversationId: id, userId: this.IDUSR };        
    this.heroService.service_general_get_with_params("Message/GetMessages", creadoobj).subscribe((value) => {          
      switch (value.result) {              
        case "Error":
          console.log("Ocurrio un error " + value.detalle);
          break;
        default:          
        console.log("GetMEsages=>",value.item);
        if (value.result == "Success") {                  
            // this.messages= value.item;
            this.ReplaceInvitations(value.item);

            setTimeout( () => { this.scrollToBottom(); }, 200 );                                                                
          }
        }
    });
  }
  private scrollToBottom(): void {      
    document.getElementById('last').scrollIntoView(true);    
  }
  private ReplaceInvitations (messageArray) {
    this.messages = [];

    messageArray.forEach( m => {
      let msj:string = m.message1;   
      let messageObject = new MessageCustom();
            
      if (msj.includes('<a>')) {
        m.message1 = msj.split('<a>')[0];

        let id = msj.split('<a>')[1];
        id = id.replace('</a>', '');
        messageObject.invitationId = parseInt(id);
      }

      messageObject.message = m;
      this.messages.push(messageObject);
    });    

    // console.log(this.messages);
  }
}
