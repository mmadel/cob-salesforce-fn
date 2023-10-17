import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { FollowupConfiguration } from '../../model/followup.configuration';

@Injectable({
  providedIn: 'root'
})
export class FollowupConfigurationService {
  private baseUrl = environment.baseURL + '/followup/configure'
  constructor(private httpClient: HttpClient) { }

  create(followupConfiguration: FollowupConfiguration) {
    const urlCreateFirstTime = this.baseUrl + '/create'
    const headers = { 'content-type': 'application/json' }
    return this.httpClient.post(urlCreateFirstTime, JSON.stringify(followupConfiguration), { 'headers': headers, observe: 'response' })
  }
  
  get(clinicId: number) {
    const url = this.baseUrl + '/find/clinicId/' + clinicId;
    return this.httpClient.get(url).pipe(
      map((response: any) => <FollowupConfiguration>response));
  }
}
