import { Validators } from "@angular/forms";

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
}