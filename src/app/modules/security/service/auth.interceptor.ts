import {
  HttpEvent, HttpHandler, HttpInterceptor, HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { NgxSpinnerService } from 'ngx-spinner';
import { catchError, finalize, from, mergeMap, Observable, throwError } from 'rxjs';
import { KcAuthService } from './kc/kc-auth.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private kcAuthServiceService: KcAuthService, private keycloakService: KeycloakService
    , private spinner: NgxSpinnerService, private router: Router) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.spinner.show();
    return from(this.kcAuthServiceService.getToken())
      .pipe(
        mergeMap(token => {
          if (localStorage.getItem('access-token') === null) {
            localStorage.setItem('access-token', token)
          }
          request = request.clone({
            setHeaders: { Authorization: `Bearer ${localStorage.getItem('access-token')}` }
          });
          return next.handle(request);
        }
        ),
        finalize(() => {
          this.spinner.hide();
        }),
        catchError(error => {
          if (error.status === 401) {
            this.kcAuthServiceService.logout();
          }
          if (error.error.errorCode === 'UNAUTHORIZED') {
            this.kcAuthServiceService.logout();
          } else {
            return throwError(error);
          }
          return [];
        }))
  }
}
