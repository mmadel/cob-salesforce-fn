import { Component, OnInit } from '@angular/core';
import { INavData } from '@coreui/angular-pro';
import { KcAuthService } from 'src/app/modules/security/service/kc/kc-auth.service';
import { adminNavItems } from './_adminnav';
import { userNavItems } from './_usernav';

@Component({
  selector: 'app-default-admin-layout',
  templateUrl: './default-admin-layout.component.html',
  styleUrls: ['./default-admin-layout.component.css']
})
export class DefaultAdminLayoutComponent implements OnInit {
  navItems: INavData[] | null = null;
  constructor(private kcUserService: KcAuthService) { }
  public perfectScrollbarConfig = {
    suppressScrollX: true,
  };
  ngOnInit(): void {
    this.navItems = adminNavItems;
    if (this.kcUserService.isUserInRole('normal'))
      this.navItems = userNavItems
    if (this.kcUserService.isUserInRole('administration'))
      this.navItems = adminNavItems;
  }
}
