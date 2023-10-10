import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
    AppRoutingModule,SalesForceShareModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
