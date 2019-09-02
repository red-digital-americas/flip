import { FormGroup, Validators, FormControl } from "@angular/forms";

//photo=  "assets/img/Coliving.jpg";
export class Service {
    public id:number;
    public name:string;
    public description:string;
    public icon:string;
    public photo:string;
    public provider:string;
    public price:number;
    public priceUnit:number;
    public buildingId:number;
    constructor() {}

    public InstanceFromService(serviceObject:Service) {
        this.id = serviceObject.id;
        this.name = serviceObject.name;
        this.description = serviceObject.description;
        this.icon = serviceObject.icon;
        this.photo = serviceObject.photo;
        this.provider = serviceObject.provider;
        this.price = serviceObject.price;
        this.priceUnit = serviceObject.priceUnit;
        this.buildingId = serviceObject.buildingId;
    }

    public ParseFromForm(form) {
        this.name = form.nameCtrl;
        this.description = form.descriptionCtrl;
        // this.icon = form.iconCtrl;
        this.icon = form.iconCtrl.serverUrl;
        this.photo = form.photoCtrl.serverUrl;
        this.provider = form.providerCtrl;
        this.price = form.priceCtrl;
        this.priceUnit = form.priceUnitCtrl;
        this.buildingId = form.buildingIdCtrl;
    }

    public ParseToForm(form) {
        form.controls.nameCtrl.setValue(this.name);
        form.controls.descriptionCtrl.setValue(this.description);
        // form.controls.iconCtrl.setValue(this.icon);
        form.controls.iconCtrl.controls.serverUrl.setValue(this.icon);
        form.controls.photoCtrl.controls.serverUrl.setValue(this.photo);
        form.controls.providerCtrl.setValue(this.provider);
        form.controls.priceCtrl.setValue(this.price);
        form.controls.priceUnitCtrl.setValue(this.priceUnit);
        form.controls.buildingIdCtrl.setValue(this.buildingId);
    }
}

export const ServicesFormGroup = new FormGroup({
    nameCtrl: new FormControl('', [Validators.required]),
    descriptionCtrl: new FormControl('', [Validators.required]),
    // iconCtrl: new FormControl('/assets/Assets-prototype-flipApp/gym.svg', []),
    iconCtrl: new FormGroup({
        label: new FormControl('Choose icon', []),
        photo: new FormControl('', []),
        serverUrl: new FormControl('', [Validators.required])
    }),
    photoCtrl: new FormGroup({
        label: new FormControl('Choose file', []),
        photo: new FormControl('', []),  
        serverUrl: new FormControl('assets/img/Coliving.jpg', [])
    }, []),
    providerCtrl: new FormControl('', [Validators.required]),
    priceCtrl: new FormControl('', [Validators.required, Validators.pattern('[0-9]*(\\.){0,1}[0-9]{1,2}')]),
    priceUnitCtrl: new FormControl('', [Validators.required, Validators.pattern('[0-9]*(\\.){0,1}[0-9]{1,2}')]),
    buildingIdCtrl: new FormControl(''),
})

export const ServicesFormGroupInitialValues = {
    // iconCtrl: '/assets/Assets-prototype-flipApp/gym.svg',
    iconCtrl: {     
        label: 'Choose icon'      
    },
    photoCtrl: {     
        label: 'Choose file',
        serverUrl: 'assets/img/Coliving.jpg'
    }
}