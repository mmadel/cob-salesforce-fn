import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Clinic } from '../../model/clinic';

@Injectable({
  providedIn: 'root'
})
export class ClinicService {

  private baseUrl = environment.baseURL + 'clinic'
  constructor(private httpClient: HttpClient) { }

  create(clinic:Clinic){
    const url = this.baseUrl + '/create'
    const headers = { 'content-type': 'application/json' }
    return this.httpClient.post(`${url}`, JSON.stringify(clinic), { 'headers': headers, observe: 'response' })
  }

  list(){
    const url = this.baseUrl + '/find';
    return this.httpClient.get(url).pipe(
      map((response: any) => <Clinic[]>response));
  }
}
