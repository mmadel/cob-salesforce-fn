import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ClassToggleService, HeaderComponent } from '@coreui/angular-pro';
import { Clinic } from 'src/app/modules/administration/model/clinic';
import { ClinicService } from 'src/app/modules/administration/services/clinic/clinic.service';
import { KcAuthService } from 'src/app/modules/security/service/kc/kc-auth.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.css']
})


export class AdminHeaderComponent extends HeaderComponent {
  clinics: Clinic[] = new Array();
  selectedClinicId: number;
  userName: string | undefined;
  @ViewChild('userClinics') userClinics: ElementRef;
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
    , private ksAuthServiceService: KcAuthService
    , private clinicService: ClinicService) {
    super();
  }
  ngOnInit(): void {
    this.ksAuthServiceService.loadUserProfile()
    .then((userProfile) => {
      this.userName = userProfile.username?.charAt(0).toUpperCase()
      this.clinicService.getByUserId(userProfile.id).subscribe(response => {
        this.clinics = response;
        this.clinicService.selectedClinic$.next(this.clinics[0].id!)
      })
    })
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
