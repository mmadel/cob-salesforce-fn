import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = environment.baseURL + 'user'
  constructor(private httpClient: HttpClient) { }

  getUserByClinic(clinicId:string){
    const url = this.baseUrl + '/find/'+'/clinicId/'+clinicId
    return this.httpClient.get(url).pipe(
      map((response: any) => <User[]>response));
  }
  
  list(){
    const url = this.baseUrl + '/find';
    return this.httpClient.get(url).pipe(
      map((response: any) => <User[]>response));
  }
  create(user: User){
    const url = this.baseUrl + '/create'
    const headers = { 'content-type': 'application/json' }
    return this.httpClient.post(`${url}`, JSON.stringify(user), { 'headers': headers, observe: 'response' })
  }
}
