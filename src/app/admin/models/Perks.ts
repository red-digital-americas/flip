import * as moment from 'moment';
import { FormGroup, FormControl } from '@angular/forms';

export class PerksGuide {        
    public id:number;
    public name:string;
    public description:string;
    public streetAddress:string;
    public city:string;
    public stateProvincy:string;
    public zip:string;
    public country:string;
    public latitude:string;
    public longitude:string;
    public packCategoryId:number;
    public buildingId:number;
    public photo:string;

    public building?:any
    public packCategory?:PerksCategory;
    public galleryPerks?:GalleryPerk[];
    public perkPromotions?:PerkPromotion[];

    constructor() { }

    public InstanceFromService(serviceObject:PerksGuide) {
        this.id = serviceObject.id;
        this.name = serviceObject.name;
        this.description = serviceObject.description;
        this.streetAddress = serviceObject.streetAddress;
        this.city = serviceObject.city;
        this.stateProvincy = serviceObject.stateProvincy;
        this.zip = serviceObject.zip;
        this.country = serviceObject.country;
        this.latitude = serviceObject.latitude;
        this.longitude = serviceObject.longitude;
        this.packCategoryId = serviceObject.packCategoryId;
        this.buildingId = serviceObject.buildingId;
        this.photo = serviceObject.photo;

        this.galleryPerks = serviceObject.galleryPerks;
    }

    public ParseFromForm(form) {
        this.name = form.perkNameCtrl;
        this.description = form.perkDescriptionCtrl;
        this.streetAddress = form.perkStreetAddressCtrl;
        this.city = form.perkCityCtrl;
        this.stateProvincy = form.perkStateProvincyCtrl;
        this.zip = form.perkZipCtrl;
        this.country = form.perkCountryCtrl;
        this.latitude = form.perkLatitudeCtrl;
        this.longitude = form.perkLongitudeCtrl;
        this.packCategoryId = form.perkCategoryIdCtrl;
        this.buildingId = form.perkBuildingIdCtrol;
        this.photo = form.perkPhotoCtrl.serverUrlCtrl;

        this.galleryPerks = [];
        form.perkGalleryCtrl.forEach(photo => {
            let galleryPerk = new GalleryPerk()
            galleryPerk.photo = photo.serverUrlCtrl;
            this.galleryPerks.push(galleryPerk);
        });        
    }

    public ParseToForm(form) {
        form.controls.perkNameCtrl.setValue(this.name);        
        form.controls.perkDescriptionCtrl.setValue(this.description);
        form.controls.perkStreetAddressCtrl.setValue(this.streetAddress);
        form.controls.perkCityCtrl.setValue(this.city);
        form.controls.perkStateProvincyCtrl.setValue(this.stateProvincy);
        form.controls.perkZipCtrl.setValue(this.zip);
        form.controls.perkCountryCtrl.setValue(this.country);
        form.controls.perkLatitudeCtrl.setValue(this.latitude);
        form.controls.perkLongitudeCtrl.setValue(this.longitude);
        form.controls.perkCategoryIdCtrl.setValue(this.packCategoryId);
        form.controls.perkBuildingIdCtrol.setValue(this.buildingId);              
        form.controls.perkPhotoCtrl.controls.serverUrlCtrl.setValue(this.photo);
                             
        this.galleryPerks.forEach( photo => {       
            form.controls['perkGalleryCtrl'].push(
                new FormGroup ({
                    labelCtrl: new FormControl('Choose file'),
                    photoCtrl: new FormControl(),  
                    serverUrlCtrl: new FormControl(photo.photo)
                })
            );                                    
        });         
    }
}

export class PerksCategory {
    public id:number;
    public name:string;
    public icon:string;
    constructor() {}
}

export class GalleryPerk {
    public id:number;
    public photo:string;
    public perkGuideId:number;
}

export class PerkPromotion {
    public id:number;
    public name:string;
    public description:string;
    public startDate;
    public endDate;
    public date;
    public photo:string;
    public active:boolean;
    public perkGuideId:number;

    public InstanceFromService(serviceObject:PerkPromotion) {
        this.id = serviceObject.id;
        this.name = serviceObject.name;
        this.description = serviceObject.description;
        this.startDate = serviceObject.startDate;
        this.endDate = serviceObject.endDate;
        this.date = serviceObject.date;
        this.photo = serviceObject.photo;
        this.active = serviceObject.active;
        this.perkGuideId = serviceObject.perkGuideId;
    }

    public ParseFromForm(form) {
        this.name = form.promotionNameCtrl;
        this.description = form.promotionDescriptionCtrl;
        this.startDate = moment(form.promotionStartDateCtrl).startOf('day').format('YYYY-MM-DDTHH:mm:ss');
        this.endDate = moment(form.promotionEndDateCtrl).startOf('day').format('YYYY-MM-DDTHH:mm:ss');
        this.photo = form.promotionPhotoCtrl.serverUrlCtrl;     
        this.perkGuideId = form.promotionPerkGuideId;
    }

    public ParseToForm(form) {
        form.controls.promotionNameCtrl.setValue(this.name);
        form.controls.promotionDescriptionCtrl.setValue(this.description);
        form.controls.promotionStartDateCtrl.setValue(moment(this.startDate).toDate());
        form.controls.promotionEndDateCtrl.setValue(moment(this.endDate).toDate());
        form.controls.promotionPhotoCtrl.controls.serverUrlCtrl.setValue(this.photo);        
        form.controls.promotionPerkGuideId.setValue(this.perkGuideId);              
    }
}