import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ClinicService } from '../../administration/services/clinic/clinic.service';
import { IApiParams } from '../../potential';
import { BasePaginationService } from '../../share/services/base.pagination.service';

@Injectable({
  providedIn: 'root'
})
export class FollowupDoctorService extends BasePaginationService  {
  private baseUrl = environment.baseURL + 'followup'
  constructor(httpClient: HttpClient ,clinicService:ClinicService) { super(httpClient,clinicService)}

  getPotentialDoctors(config$: BehaviorSubject<IApiParams>){
    return this.get(config$, this.baseUrl + "/doctors/clinicId/" )
  }
}
