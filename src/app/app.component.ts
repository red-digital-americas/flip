import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { StripeScriptTag } from "stripe-angular"

@Component({
  // tslint:disable-next-line
  selector: 'body',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit {
  private publishableKey:string = "pk_test_WiAYJgrEz6XKxL2MwKD89oqO00bfPcrlOF";
  constructor(private router: Router, public StripeScriptTag:StripeScriptTag) {
    this.StripeScriptTag.setPublishableKey(this.publishableKey);
  }

  ngOnInit() {
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }
}
