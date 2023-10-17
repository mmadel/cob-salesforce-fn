import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

import { IconSetService } from '@coreui/icons-angular';
import { iconSubset } from './icons/icon-subset';
import { Title } from '@angular/platform-browser';
import { KeycloakService } from 'keycloak-angular';
import { filter, from, merge, switchMap } from 'rxjs';
import { CacheService } from './modules/share/services/cahce/cache.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'body',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {
  title = 'SalesForce-fn';
  constructor(
    private router: Router,
    private titleService: Title,
    private iconSetService: IconSetService,
    private keycloakService: KeycloakService,
    private cacheService: CacheService
  ) {
    titleService.setTitle(this.title);
    // iconSet singleton
    iconSetService.icons = { ...iconSubset };
  }

  ngOnInit(): void {
    merge(from(this.keycloakService.isLoggedIn()))
      .pipe(
        filter(islogged => islogged),
        switchMap(islogged => from(this.keycloakService.loadUserProfile())))
      .subscribe((userProfile) => {
        this.cacheService.setLoggedinUserUUID(userProfile.id!)
        this.cacheService.setLoggedinUserName(userProfile.username!);
      })
  }
}
