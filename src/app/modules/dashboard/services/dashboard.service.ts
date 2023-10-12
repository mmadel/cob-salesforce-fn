import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DashboardCounters } from '../models/dashboar.counters';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private baseUrl = environment.baseURL + 'counter'
  constructor(private httpClient: HttpClient) { }

  getDashboardCounters(clinicId: string) {
    const dashboardCountersURL = this.baseUrl + '/dashboard/clinicId/' + 1
    return this.httpClient.get(dashboardCountersURL).pipe(
      map((response: any) => <DashboardCounters>response));
  }
}
