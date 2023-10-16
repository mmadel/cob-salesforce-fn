import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Clinic } from '../model/clinic';

@Injectable({
  providedIn: 'root'
})
export class ClinicService {

  private userUrl = environment.baseURL + 'user'
  public selectedClinic$: BehaviorSubject<number | null> = new BehaviorSubject<number | null>(null);
  public filterDate$: BehaviorSubject<number[] | null> = new BehaviorSubject<number[] | null>(null);
  constructor(private http: HttpClient) { }
  getByUserId(userId: string | undefined) {
    const url = this.userUrl + '/find'+'/clinics/userUUID/' + userId;
    return this.http.get(url).pipe(
      map((response: any) => <Clinic[]>response));
  }
}
