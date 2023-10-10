import { Component, OnInit } from '@angular/core';
import { INavData } from '@coreui/angular-pro';
import { adminNavItems } from './_adminnav';
import { userNavItems } from './_usernav';

@Component({
  selector: 'app-default-admin-layout',
  templateUrl: './default-admin-layout.component.html',
  styleUrls: ['./default-admin-layout.component.css']
})
export class DefaultAdminLayoutComponent implements OnInit {
  navItems: INavData[] | null = null;
  constructor() { }
  public perfectScrollbarConfig = {
    suppressScrollX: true,
  };
  ngOnInit(): void {
    
  }
}
