import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DatosService } from '../../../../../datos.service';
import { ToasterService } from 'angular2-toaster';
import { InviteModel } from '../../../models/invite';
import { ContactSend, Info } from '../../../models/contact';

@Component({
  selector: 'app-message-users',
  templateUrl: './message-users.component.html',
  styleUrls: ['./message-users.component.scss'],
  providers: [ToasterService]

})
export class MessageUsersComponent implements OnInit {

  usersBuildingArray = [];
  selectedUsers = [];
  booksArray = [];
  inviteModel: InviteModel = new InviteModel();
  messageInput: string;
  constructor(public dialogRef: MatDialogRef<MessageUsersComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private heroService: DatosService,
    private toasterService: ToasterService) { }

  ngOnInit() {
    this.LoadInvitableUsers();
    debugger; 
    //console.log("this.data.booksArray[0].Contact");
    //console.log(this.data.booksArray
    //console.log(this.data.booksArray[0].Contact);
  }

  LoadInvitableUsers() {
    this.heroService.service_general_get_with_params("Users", { buildingId: this.data.buildId }).subscribe(
      (res) => {
       // console.log(res.item);
        if (res.result === "Success") {
          this.usersBuildingArray = res.item;

          // this.usersBuildingArray = this.usersBuildingArray.filter(user => {
          //   return !this.data.booksArray.map(book => book.info.iduser).includes(user.id);
          // });
        } else if (res.result === "Error") { 
          console.log("Ocurrio un error" + res.detalle);
         }
        else { 
          console.log("Error");
         }
      },
      (err) => { 
        console.log(err);
       }
    );
  }

  selectAll() {
   // console.log(this.usersBuildingArray);
    this.selectedUsers = this.usersBuildingArray.map(x => x.id);
   
    // console.log()
  }
  unselectAll() {
    this.selectedUsers = [];
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  Send(){
    //debugger;
    let contact = new Array<ContactSend>()

    // this.selectedUsers.forEach(id =>{
    //   this.usersBuildingArray.forEach(user =>{
    //     if(user.id == id){
    //       let contactAdd = new ContactSend();
    //       contactAdd.info = new Info();
    //       contactAdd.info.iduser = user.id;
    //       contactAdd.info.lastname = user.lastName;
    //       contactAdd.info.name = user.name;
    //       contactAdd.info.photo = user.avatar;
    //       contact.push(contactAdd);
    //       console.log("ContactAdd=>>",contactAdd)
    //     }
    //   });
    // });
    console.log(this.selectedUsers);
    let sendData = {message: this.messageInput, users: this.selectedUsers}
    this.dialogRef.close(sendData);
  }
}
