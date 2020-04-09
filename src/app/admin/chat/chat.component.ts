import { Component, OnInit } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import * as signalR from '@aspnet/signalr';
import { Gvars } from '../../models/gvars';
import { Router } from '@angular/router';
import { DatosService } from '../../../datos.service';
import { ToasterService, ToasterConfig } from 'angular2-toaster';
import { MatDialog } from '@angular/material/dialog';
import { MessageUsersComponent } from '../modals/message-users/message-users/message-users.component';
import { Contact, ContactSend, Info } from '../models/contact';
import { type } from 'os';
import { MessageData, Conversation } from '../models/message';
// import { ToastController } from '../shared/toast-controller/toast-controller';
class MessageCustom {
  public message;
  public invitationId?: number;
  constructor() { }
}

enum typeSend {
  SEND = 1,
  SENDALL = 2
}
@Component({
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  providers: [ToasterService]
})

export class ChatComponent implements OnInit {

  constructor(private router: Router,
    private heroService: DatosService,
    public dialog: MatDialog
    // public modalController: ModalController,
    // public toastController: ToastController

  ) {

  }
  private hubConnection: HubConnection;
  IDUSR: string = "0";
  IDBUILD: string = "0";
  public user: string[];
  userInfo: any;
  posts: any;

  userConversation;
  messages: MessageCustom[] = [];
  selectedContacts: Contact[] = [];
  messageInput: string = ""
  showChat = false;
  public buildingDetail: any;
  rawContacts: Contact[] = [];
  tmpContacts: Contact[] = [];
  userSendMessage = new ContactSend();
  conversationId: number;

  public section:string;

  public toasterconfig: ToasterConfig = new ToasterConfig({
    tapToDismiss: true,
    timeout: 3000,
    positionClass: "toast-top-center",
  });
  ngOnInit() {
    //debugger;

    this.user = JSON.parse(localStorage.getItem("user"));
    console.log(this.user);
    this.IDUSR = JSON.parse(localStorage.getItem("user")).id;
    this.IDBUILD = JSON.parse(localStorage.getItem("user")).buildingId;
    // this.GetBuildingCoverImage()
    this.get_chats();
    this.get_users();
    this.getInfoUser();
    this.section = 'chat';
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
      // console.log(rtMessageResponse);
      //debugger;
      if (this.conversationId == rtMessageResponse.conversationId) {
        this.GetMessages();
      }
    });
    this.hubConnection.onclose((error) => {
      if (error == undefined) { return; }
      // console.log(error.message);   // WebSocket closed with status code: 1006 ().
      // console.log(error?.name);      // Error          
    });
    this.hubConnection.start()
      .then(() => console.log('Connection started!'))
      .catch(err => console.log('Error while establishing connection :('));

    // this.IDBUILD = this.route.snapshot.params['id'];  
  }

  get_chats() {
    //debugger;
    var creadoobj = { buildingid: this.IDBUILD, userid: this.IDUSR };
    this.heroService.ServicioPostMessage("SeeChats", creadoobj).subscribe((value) => {
      //debugger;
      switch (value.result) {
        case "Error":
          console.log("Ocurrio un error al cargar los catalogos: " + value.detalle);
          break;
        default:
          console.log("Post==>", value.item);
          if (value.result == "Success") {
            this.posts = value.item;
          }
      }
    });
  }

  get_users() {
    var creadoobj = { buildingid: this.IDBUILD, userid: this.IDUSR };
    this.heroService.ServicioPostMessage("SeeUsers", creadoobj).subscribe((value) => {
      switch (value.result) {
        case "Error":
          console.log("Ocurrio un error al cargar los catalogos: " + value.detalle);
          break;
        default:
          if (value.result == "Success") {
            this.rawContacts = [];

            for (let i = 0; i < value.item.length; i++) {
              if (value.item[i].iduser == parseInt(this.IDUSR)) { continue; }
              this.rawContacts.push(new Contact(value.item[i]));

            }
            console.log("rewContact=>", this.rawContacts);
            this.rawContacts.forEach((contact) => {
              this.selectedContacts.forEach((selected) => {
                if (contact.info.iduser == selected.info.iduser) { contact.selected = true; }
              });
            });
            console.log("SelectedContact=>", this.selectedContacts);
            console.log("rewContact=>", this.rawContacts);

            this.tmpContacts = this.rawContacts;
            console.log("tmpContacrs=>", this.tmpContacts);
          }
      }
    });
  }
  seemessage(id: any) {
    this.router.navigate(['messages', id]);
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
  showConversation(contact: any, id: any, event_data:any) {
    //debugger;
    this.showChat = true;
    this.conversationId = contact.conversationId;
    this.userSendMessage.info = new Info();
    this.userSendMessage.info.iduser = contact.iduser;
    this.userSendMessage.info.name = contact.name;
    this.userSendMessage.info.lastname = contact.lastname;
    this.userSendMessage.info.photo = contact.photo;
    this.userSendMessage.selected = true;
    this.GetConversationUser(contact.conversationId);
    this.GetMessages();
    this.illChatWith( event_data );
  }

  public illChatWith( event_data:any ):void {

    const event = event_data.target,
          friend_item = document.getElementsByClassName('ap-chat__people-person--friend');

    for( let friend = friend_item.length; friend--; ) {

      friend_item[friend].classList.remove('ap-chat__people-person--active');

    }

    event.parentElement.classList.add('ap-chat__people-person--active');

  }

  private GetConversationUser(id) {
    //debugger;
    var creadoobj = { conversationId: id, userId: this.IDUSR };
    this.heroService.service_general_get_with_params("Message/GetConversationUser", creadoobj).subscribe((value) => {
      switch (value.result) {
        case "Error":
          console.log("Ocurrio un error " + value.detalle);
          break;
        default:
          console.log("GetConversationUSer=>", value.item);
          if (value.result == "Success") {
            this.userConversation = value.item;
          }
      }
    });
  }

  private GetMessages() {
    //debugger;
    var creadoobj = { conversationId: this.conversationId, userId: this.IDUSR };
    this.heroService.service_general_get_with_params("Message/GetMessages", creadoobj).subscribe((value) => {
      switch (value.result) {
        case "Error":
          console.log("Ocurrio un error " + value.detalle);
          break;
        default:
          console.log("GetMEsages=>", value.item);
          if (value.result == "Success") {
            this.messages = value.item;
            this.ReplaceInvitations(value.item);
            const chat_messages = document.getElementById('chat_messages');
            setTimeout( () => { chat_messages.scrollTo( 0, chat_messages.scrollHeight ) }, 200);
            //setTimeout(() => { this.scrollToBottom(); }, 200);
          }
      }
    });

  }


  private scrollToBottom(): void {
    document.getElementById('last').scrollIntoView(true);
  }
  private ReplaceInvitations(messageArray) {
    this.messages = [];

    messageArray.forEach(m => {
      let msj: string = m.message1;
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

  }

  openModal() {
    const dialogRef = this.dialog.open(MessageUsersComponent, {
      width: '512px',
      height: '400px',
      data: { buildId: this.IDBUILD }
    });

    dialogRef.afterClosed().subscribe(async selectedUser => {
      //debugger;
      console.log("SElectedUser", selectedUser);
      console.log("SElectedUser", selectedUser);

      let messageList = new Array<MessageData>();
      await selectedUser.users.forEach(async users => {
        let noRepeat = 0;
        await this.posts.forEach(messageFor => {
          if (users == messageFor.iduser && users != parseInt(this.IDUSR)) {
            let messageAdd = new MessageData();
            messageAdd.conversationId = messageFor.conversationId;
            messageAdd.message1 = selectedUser.message;
            messageAdd.userId = parseInt(this.IDUSR);
            messageList.push(messageAdd);
            console.log("Se agrego1");
          } else
            noRepeat++;
          if (noRepeat == this.posts.length && users != parseInt(this.IDUSR)) {
            let messageAdd = new MessageData();
            messageAdd.conversation = new Conversation();
            messageAdd.conversationId = 0;
            messageAdd.message1 = selectedUser.message;
            messageAdd.userId = parseInt(this.IDUSR);
            messageAdd.conversation.userId = parseInt(this.IDUSR);
            messageAdd.conversation.status = false;
            messageAdd.conversation.userIdReciver = users;
            messageList.push(messageAdd);
            
            console.log("Se agrego2");
          }
        });

      });
      console.log("MessageList=>", messageList);
      this.heroService.ServicioPostMessageList(messageList).subscribe(response => {
        //debugger;
        this.get_chats();

      }, error =>{
        console.log("error");
      });
      console.log('The dialog was closed');
    });

  }

  TextAreaExpand() {
    let lines = this.messageInput.split("\n");
    let count: number = lines.length;
    let space: number = count + 1;
    document.getElementById('sent-input').style.cssText = 'height:' + space + 'rem';
  }


  SentMessage(send) {
    //debugger;
    let SendTXT = "";
    let message;
    if (typeSend.SEND == send) {
      SendTXT = 'SentMessage';
      this.selectedContacts.push(this.userSendMessage);
      let userIdList = this.selectedContacts.map(contact => contact.info.iduser);
      message = { message1: this.messageInput, conversationId: this.conversationId, userId: this.IDUSR };

      if (this.messageInput.length <= 0) { return; }
      if (this.messageInput.trim().replace('/\r?\n|\r/', '').length <= 0) { return; }
      if (userIdList.length <= 0) { return; }

    }
    else if (typeSend.SENDALL == send) {
      SendTXT = 'SentMessageAll';

    }
    //debugger;
    //   this.selectedContacts.forEach((selected)=> {
    //     if (contact.info.iduser == selected.info.iduser) { contact.selected = true;}                  
    // });

    // console.log(newMessageModel); return;
    this.heroService.service_general_post("Message/SentMessage", message).subscribe((value) => {
      switch (value.result) {
        case "Error":
          console.log("Ocurrio un error " + value.detalle);
          break;
        default:
          console.log(value.item);
          if (value.result == "Success") {
            let dataMessage = { message1: this.messageInput, conversationId: this.conversationId, userId: this.IDUSR };
            this.messageInput = "";
            this.GetMessages();
            this.ResetTextArea();
            this.scrollToBottom();
            this.selectedContacts = new Array<Contact>();
            const chat_messages = document.getElementById('chat_messages');
            setTimeout( () => { chat_messages.scrollTo( 0, chat_messages.scrollHeight ) }, 200);
          }
      }
    });
  }
  private ResetTextArea() {
    document.getElementById('sent-input').style.cssText = 'height:' + 0 + 'px';
  }
  toggleSelected(contact) {
    if (!contact.selected) {
      this.selectedContacts.push(contact);
    }
    else if (contact.selected) {
      var index = this.selectedContacts.findIndex(c => c.info.iduser == contact.info.iduser);
      if (index > -1) { this.selectedContacts.splice(index, 1); }
    }
  }

}
