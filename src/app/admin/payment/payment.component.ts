import { Component, OnInit } from '@angular/core';
import { StripeToken, StripeSource } from 'stripe-angular';
import { StripeScriptTag } from "stripe-angular";
import { DatosService } from '../../../datos.service';
import { ToasterService, ToasterConfig } from 'angular2-toaster';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
  providers: [ToasterService]
})
export class PaymentComponent implements OnInit {
  
  private publishableKey:string = "pk_test_WiAYJgrEz6XKxL2MwKD89oqO00bfPcrlOF";

  public toasterconfig: ToasterConfig = new ToasterConfig({
    tapToDismiss: true,
    timeout: 3000,
    positionClass: "toast-top-center",
  });
  
  constructor(
    public StripeScriptTag: StripeScriptTag, 
    private apiService: DatosService,
    private toasterService: ToasterService
    ) { 
    this.StripeScriptTag.setPublishableKey(this.publishableKey);
  }

  ngOnInit() {
  }

  extraData = {
    "name": 'Erick Eduardo Gomez Jimenez',
    // "address_city": null,
    // "address_line1": null,
    // "address_line2": null,
    // "address_state": null,
    // "address_zip": null
  }
 
  onStripeInvalid( error:Error ){
    console.log('Validation Error', error)
  }
 
  setStripeToken( token:StripeToken ){
    console.log('Stripe token', token);
    this.apiService.service_general_get('Booking/Payment/'+token.id+'/'+1000).subscribe((res) => {
      console.info('Response Payment', res);
            switch (res.result) {
              case "Error":
                console.info('Error', res.detalle);
                this.toasterService.pop('danger', 'Error ', 'An error has been ocurred.');
                break;
              case "Success":
                this.toasterService.pop('success', 'Success ', 'Your payment was proced correctly.');
                break;
              default:
                //Stuff
                break;
            }
    });
  }
 
  setStripeSource( source:StripeSource ){
    console.log('Stripe source', source)
  }
 
  onStripeError( error:Error ){
    console.error('Stripe error', error)
  }

}
