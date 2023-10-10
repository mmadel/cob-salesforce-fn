import { NgModule } from '@angular/core';
import { IconModule } from '@coreui/icons-angular';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  AvatarModule,
  BadgeModule,
  BreadcrumbModule,
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  DateRangePickerModule,
  DropdownModule,
  FooterModule,
  FormModule,
  GridModule,
  HeaderModule,
  ListGroupModule,
  NavModule,
  ProgressModule,
  SharedModule,
  SidebarModule,
  TabsModule,
  UtilitiesModule,
  AlertModule,
} from '@coreui/angular-pro';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
const COREUI_MODULES = [
  AvatarModule,
  BadgeModule,
  BreadcrumbModule,
  ButtonGroupModule,
  ButtonModule,
  CardModule,
  DropdownModule,
  FooterModule,
  FormModule,
  GridModule,
  HeaderModule,
  ListGroupModule,
  NavModule,
  ProgressModule,
  SharedModule,
  SidebarModule,
  TabsModule,
  UtilitiesModule,
  IconModule,
  DateRangePickerModule,
  AlertModule
]

@NgModule({
  declarations: [],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ...COREUI_MODULES
  ]
})
export class SalesForceShareModule { }
