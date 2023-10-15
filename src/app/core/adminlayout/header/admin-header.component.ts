import { Component, Input } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ClassToggleService, HeaderComponent } from '@coreui/angular-pro';
import { KcAuthService } from 'src/app/modules/security/service/kc/kc-auth.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})


export class AdminHeaderComponent extends HeaderComponent {

  userName: string | undefined;
  public get classToggler(): ClassToggleService {
    return this._classToggler;
  }
  public set classToggler(value: ClassToggleService) {
    this._classToggler = value;
  }

  @Input() sidebarId: string = "sidebar1";



  public themeSwitch = new UntypedFormGroup({
    themeSwitchRadio: new UntypedFormControl('light'),
  });

  constructor(private _classToggler: ClassToggleService, private router: Router
    , private ksAuthServiceService: KcAuthService) {
    super();
  }
  ngOnInit(): void {

  }

  setTheme(value: string): void {
    this.themeSwitch.setValue({ themeSwitchRadio: value });
    this.classToggler.toggle('body', 'dark-theme');
  }
  logout() {
    this.ksAuthServiceService.logout()
  }
  setSelectedClinic(event: any) {

  }
  startDateChange(event: any) {



  }
  endDateChange(event: any) {

  }
  emitFilterDate(startDate: number, endDate: number) {

  }
  validateDateCriteria(startDate: number, endDate: number): boolean {
    return true
  }
}
