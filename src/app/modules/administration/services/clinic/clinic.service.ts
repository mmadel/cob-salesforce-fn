import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Clinic } from '../../model/clinic';

@Injectable({
  providedIn: 'root'
})
export class ClinicService {

  private baseUrl = environment.baseURL + 'clinic'
  private userUrl = environment.baseURL + 'user'
  
  public selectedClinic$: BehaviorSubject<number | null> = new BehaviorSubject<number | null>(null);
  public filterDate$: BehaviorSubject<number[] | null> = new BehaviorSubject<number[] | null>(null);
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
  getByUserId(userId: string | undefined) {
    const url = this.userUrl + '/find'+'/clinics/userUUID/' + userId;
    return this.httpClient.get(url).pipe(
      map((response: any) => <Clinic[]>response));
  }
}
