import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule, Http } from '@angular/http';
import { LocationStrategy, HashLocationStrategy, PathLocationStrategy } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ToasterModule, ToasterService } from 'angular2-toaster/angular2-toaster';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

import { AppComponent } from './app.component';

// Import containers
import { DefaultLayoutComponent } from './containers';
import { AppLayoutComponent } from './container-app';
import { ImageCropperModule } from 'ngx-image-cropper';


import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';

import { Module as StripeModule } from "stripe-angular"

const APP_CONTAINERS = [
  DefaultLayoutComponent
];

const APP_CONTAIN = [
  AppLayoutComponent
];


import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from '@coreui/angular';

// Import routing module
import { AppRoutingModule } from './app.routing';

// Import 3rd party components
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
// import { ChartsModule } from 'ng2-charts/ng2-charts';
import { Wizard1Component } from './views/wizard1/wizard1.component';
import { Wizard2aComponent } from './views/wizard2a/wizard2a.component';
import { Wizard2bComponent } from './views/wizard2b/wizard2b.component';
import { Wizard3Component } from './views/wizard3/wizard3.component';
import { Wizard4Component } from './views/wizard4/wizard4.component';
import { Wizard5Component } from './views/wizard5/wizard5.component';
import { FooterComponent } from './footer/footer.component';
import { RecoverpassComponent } from './recoverpass/recoverpass.component';
//import { WebadminComponent } from './webadmin/webadmin.component';
import { CommunitiesComponent } from './admin/communities/communities.component';
//import { AppLayoutComponent } from './container-app/app-layout/app-layout.component';

import { ChartsModule } from 'ng2-charts';
import { MaterialModule } from './material/material.module';
import { AdminModule } from './admin/admin.module';
import { MatCardModule } from '@angular/material/card';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { AlertModalComponent } from './container-app/app-layout/alert-modal/alert-modal.component';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpModule,
    AppRoutingModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    ToasterModule,
    ImageCropperModule,
    // MaterialModule,
    StripeModule.forRoot(),
    NgxMaskModule.forRoot(options)
  ],
  declarations: [
    AppComponent,
    ...APP_CONTAINERS, 
    ...APP_CONTAIN,
    P404Component,
    P500Component,
    LoginComponent,
    RegisterComponent,
    Wizard1Component,
    Wizard2aComponent,
    Wizard2bComponent,
    Wizard3Component,
    Wizard4Component,
    Wizard5Component,
    FooterComponent,
    RecoverpassComponent,
    AlertModalComponent,
   // WebadminComponent,
 //  AppLayoutComponent
  ],
  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  }],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
