import { APP_INITIALIZER, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { initializer } from './keycloak-initializer.service';
import { KeycloakService } from 'keycloak-angular';
import { KcAuthService } from './service/kc/kc-auth.service';
import { KCAuthGuard } from './service/kc/kcauth.guard';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [
    {
        provide: APP_INITIALIZER,
        useFactory: initializer,
        multi: true,
        deps: [KeycloakService]
    },
    KeycloakService,
    KcAuthService,
    KCAuthGuard
  ]
})
export class SecurityModule { }
