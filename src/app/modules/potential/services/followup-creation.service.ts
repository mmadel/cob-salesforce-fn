import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Followup } from '../../followup/models/followup.model';

@Injectable({
  providedIn: 'root'
})
export class FollowupCreationService {
  private baseUrl = environment.baseURL + 'followup'
  constructor(private httpClient: HttpClient) { }

  create(followup: Followup) {
    const createFollowupURL = this.baseUrl + '/next'
    const headers = { 'content-type': 'application/json' }
    return this.httpClient.post(`${createFollowupURL}`, JSON.stringify(followup), { 'headers': headers, observe: 'response' })
  }

  createFirstVisit(followup: Followup) {
    const createFollowupURL = this.baseUrl + '/first'
    const headers = { 'content-type': 'application/json' }
    return this.httpClient.post(`${createFollowupURL}`, JSON.stringify(followup), { 'headers': headers, observe: 'response' })
  }
}
