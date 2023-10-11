import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {
  AdminHeaderComponent, 
  DefaultAdminLayoutComponent, 
  DefaultFooterComponent, 
  DefaultHeaderComponent, 
  DefaultLayoutComponent
} from './core';
import { SalesForceShareModule } from './modules/share/sales-force-share.module';
const APP_CONTAINERS = [
  DefaultHeaderComponent,
  DefaultFooterComponent,
  DefaultLayoutComponent
];

const ADMIN_APP_CONTAINERS = [
  DefaultAdminLayoutComponent,
  AdminHeaderComponent
];
@NgModule({
  declarations: [AppComponent, ...APP_CONTAINERS, ...ADMIN_APP_CONTAINERS],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,SalesForceShareModule,
    ToastrModule.forRoot({
      timeOut: 9000,
      closeButton: true,
      progressBar: true,
      progressAnimation:'decreasing'
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
