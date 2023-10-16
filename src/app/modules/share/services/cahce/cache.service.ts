import { Injectable, Optional, SkipSelf } from '@angular/core';
import { filter } from 'rxjs';
import { ClinicService } from 'src/app/modules/administration/services/clinic/clinic.service';

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  private selectedClinic: number;
  private loggedinUserUUID: string;
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
  setLoggedinUserUUID(uuid: string) {
    this.loggedinUserUUID = uuid;
  }
}
