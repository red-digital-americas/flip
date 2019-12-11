export class Contact {    
    public info:any;
    public selected:boolean;

    constructor(contactData:any){        
        this.info = contactData;
        this.selected = false;
    }
}
export class ContactSend{
    public info:Info;
    public selected:boolean;
}

export class Info{
    iduser: number;
    lastname: string;
    name: string;
    photo: string;
}