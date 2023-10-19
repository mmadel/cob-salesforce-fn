import { Injectable, Optional, SkipSelf } from '@angular/core';
import { filter } from 'rxjs';
import { ClinicService } from 'src/app/modules/administration/services/clinic/clinic.service';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  private selectedClinic: number;
  private loggedinUserUUID: string;
  private loggedinUserName: string;
  constructor(private clinicService: ClinicService,
    @Optional() @SkipSelf() cacheService?: CacheService
  ) {
    if (cacheService) {
      throw new Error('PatientStoreService is already loaded')
    }
    this.clinicService.selectedClinic$.pipe(
      filter((result) => result !== null)
    ).subscribe((selectedClinic) => {
      this.selectedClinic = selectedClinic!;
    })
  }

  getSelectedClinic() {
    return this.selectedClinic;
  }
  getLoggedinUserUUID(): string {
    return this.loggedinUserUUID;
  }
  getLoggedinUserName() {
    return this.loggedinUserName;
  }
  setLoggedinUserUUID(uuid: string) {
    if (this.loggedinUserUUID === undefined || this.loggedinUserUUID === null)
      this.loggedinUserUUID = uuid;
  }

  setLoggedinUserName(userName: string) {
    if (this.loggedinUserName === undefined || this.loggedinUserName === null)
      this.loggedinUserName = userName;
  }
}
