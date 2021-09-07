import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { couldStartTrivia } from 'typescript';
import { DatosService } from '../../../../datos.service';
import { LoaderComponent } from '../../../../ts/loader';
import { SystemMessage } from '../../../../ts/systemMessage';
import { Utils } from '../../../utils/utils';

@Component({
  selector: 'app-email-detail',
  templateUrl: './email-detail.component.html',
  styleUrls: ['./email-detail.component.scss']
})
export class EmailDetailComponent implements OnInit {

  dataObj;
  responseData;
  templateID;
  templetaObj: Template = new Template();
  formGroup: FormGroup;
  name = new FormControl('');
  subject = new FormControl('');
  greeting = new FormControl('');
  body = new FormControl('');
  // name = new FormControl('');
  loader = new LoaderComponent();
  systemMessage = new SystemMessage();

  constructor(private _services: DatosService,
    private _formBuilder: FormBuilder,
    public modalRef: BsModalRef,
    private route: ActivatedRoute) { }

  ngOnInit() {
    console.log('Initial Data', this.dataObj);
    this.responseData = { result: false };
    this.getMail();
  }

  getMail() {
    this.loader.showLoader();
    this._services.service_general_get('Email/Template/' + this.dataObj.id)
      .subscribe((response: any) => {
        this.loader.hideLoader();
        if (response.success === true) {
          console.log('DATA => ', response.result);
          this.templateID = response.result.id;
          this.templetaObj = response.result;
          this.name.setValue(response.result.name);
          this.subject.setValue(response.result.subject);
          this.greeting.setValue(response.result.greeting);
          this.body.setValue(response.result.body);
        }
      }, (error: any) => {
        this.loader.hideLoader();
        console.log('Error GetList => ', error);
        this.systemMessage.showMessage({
          kind: 'error',
          message: {
            header: 'Error',
            text: error.detalle
          },
          time: 2000
        });
      });
  }

  //// UPDATE 
  Update() {
    var obj = {
      id: this.templetaObj.id,
      body: this.body.value,
      image: this.templetaObj.image,
      name: this.name.value,
      subject: this.subject.value,
      greeting: this.greeting.value,
      updatedDate: Date.now
    };
    this._services.service_general_put('Email/Update/Template', obj).subscribe(
      (res) => {
        console.log('Tienes que mandar => ', obj);
        console.log(res);
        if (res.success == true) {
          console.log(res.item);
          this.responseData = { result: true, id: res.result.id, name: res.result.name };
          this.modalRef.hide();
        } else if (res.success === false) {
          console.log(res.detalle);
          this.systemMessage.showMessage({
            kind: 'error',
            time: 3777,
            message: {
              header: 'Error al guardar',
              text: res.message
            }
          });
        } else {
          console.log("Error");
          this.systemMessage.showMessage({
            kind: 'error',
            time: 3777,
            message: {
              header: 'Error',
              text: 'Por favor intenta mas tarde o contacta a soporte'
            }
          });
        }
      },
      (err) => { console.log(err); }
    );
  }

  //
  // ADD IMAGES
  //
  public newImages: any[] = [];
  imageInputLabel = "Selecciona un archivo";
  prepareImages(e) {
    if (Utils.isDefined(e.srcElement.files)) {
      for (let f of e.srcElement.files) {
        this.newImages.push(f);
      }
    }
    this.addImages();
  }

  addImages() {
    let url: string = '';
    if (!Utils.isEmpty(this.newImages)) {
      for (let f of this.newImages) {
        this.imageInputLabel = f.name;
        this._services.UploadImgSuc(f).subscribe((r) => {
          if (Utils.isDefined(r)) {
            url = <string>r.message;
            url = url.replace('/Imagenes', this._services.getURL() + 'Flip');
            this.templetaObj.image = url;
            this.templetaObj.image = url;
          }
        })
      }
    }
  }

}

class Template {
  id: number = 0;
  body: string = '';
  subject: string = '';
  image: string = 'assets/img/Coliving.jpg';
  greeting: string = '';
  name: string = '';
  constructor() { }
}
