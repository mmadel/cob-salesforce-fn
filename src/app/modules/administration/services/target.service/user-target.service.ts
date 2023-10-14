import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { UserTarget } from '../../model/user.target';

@Injectable({
  providedIn: 'root'
})
export class UserTargetService {

  private baseUrl = environment.baseURL + 'user/target'
  constructor(private httpClient: HttpClient) { }

  update(userTarget:UserTarget){
    const userTargetUpdateURL = this.baseUrl + '/update'
    const headers = { 'content-type': 'application/json' }
    return this.httpClient.post(`${userTargetUpdateURL}`, JSON.stringify(userTarget), { 'headers': headers, observe: 'response' })
  }
}
