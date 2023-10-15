import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { SecurityModule } from './modules/security/security.module';
import { AuthInterceptor } from './modules/security/service/auth.interceptor';
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
    SecurityModule,
    ToastrModule.forRoot({
      timeOut: 9000,
      closeButton: true,
      progressBar: true,
      progressAnimation:'decreasing'
    }),
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy,
    },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
