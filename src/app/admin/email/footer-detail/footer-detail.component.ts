import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { DatosService } from '../../../../datos.service';
import { LoaderComponent } from '../../../../ts/loader';
import { SystemMessage } from '../../../../ts/systemMessage';

@Component({
  selector: 'app-footer-detail',
  templateUrl: './footer-detail.component.html',
  styleUrls: ['./footer-detail.component.scss']
})
export class FooterDetailComponent implements OnInit {

  dataObj;
  responseData;
  footerOBJ: FooterTemplate = new FooterTemplate();
  loader = new LoaderComponent();
  systemMessage = new SystemMessage();

  facebookUrl = new FormControl('');
  footerText = new FormControl('');
  instagramUrl = new FormControl('');
  text1 = new FormControl('');
  text2 = new FormControl('');
  text3 = new FormControl('');
  text4 = new FormControl('');
  twitterUrl = new FormControl('');
  youtubeUrl = new FormControl('');

  constructor(private _services: DatosService,
    private _formBuilder: FormBuilder,
    public modalRef: BsModalRef,
    private route: ActivatedRoute) { }

  ngOnInit() {
    console.log('Initial Data', this.dataObj);
    this.responseData = { result: false };
    this.getFooter();
  }

  getFooter() {
    this.loader.showLoader();
    this._services.service_general_get('Email/Footer/' + this.dataObj.id)
      .subscribe((response: any) => {
        this.loader.hideLoader();
        if (response.success === true) {
          console.log('DATA => ', response.result);
          this.footerOBJ = response.result;
          this.footerText.setValue(response.result.footerText);
          this.text1.setValue(response.result.text1);
          this.text2.setValue(response.result.text2);
          this.text3.setValue(response.result.text3);
          this.text4.setValue(response.result.text4);
          this.twitterUrl.setValue(response.result.twitterUrl);
          this.youtubeUrl.setValue(response.result.youtubeUrl);
          this.instagramUrl.setValue(response.result.instagramUrl);
          this.facebookUrl.setValue(response.result.facebookUrl);
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
    this.footerOBJ.footerText = this.footerText.value;
    this.footerOBJ.text1 = this.text1.value;
    this.footerOBJ.text2 = this.text2.value;
    this.footerOBJ.text3 = this.text3.value;
    this.footerOBJ.text4 = this.text4.value;
    this.footerOBJ.facebookUrl = this.facebookUrl.value;
    this.footerOBJ.twitterUrl = this.twitterUrl.value;
    this.footerOBJ.instagramUrl = this.instagramUrl.value;
    this.footerOBJ.youtubeUrl = this.youtubeUrl.value;
    this.footerOBJ.footerText = this.footerText.value;
    this._services.service_general_put('Email/Update/Footer', this.footerOBJ).subscribe(
      (res) => {
        console.log('Tienes que mandar => ', this.footerOBJ);
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

}

class FooterTemplate {
  createdBy: number = 0;
  createdDate: string ='';
  facebookUrl: string ='';
  footerText: string ='';
  id:number =0;
  instagramUrl: string ='';
  text1: string ='';
  text2: string ='';
  text3: string ='';
  text4: string ='';
  twitterUrl: string ='';
  updatedBy: string ='';
  updatedDate: string ='';
  youtubeUrl: string ='';

  constructor() {

  }
}
