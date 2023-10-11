import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, debounceTime, distinctUntilChanged, Observable, retry, switchMap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Doctor } from '../../share/model/doctor';
import { ClinicService } from '../../share/services/clinic.service';
import { IApiParams } from '../components/list-potential-doctor.component';
const httpOptions = {
  // headers: new HttpHeaders({
  //   'Content-Type': 'application/json',
  //   'Access-Control-Allow-Origin': '*',
  //   Connection: 'keep-alive'
  // })
};
export interface IData {
  number_of_records: number;
  number_of_matching_records: number;
  records: Doctor[];
}
@Injectable({
  providedIn: 'root'
})
export class PotentialService {
  private baseUrl = environment.baseURL + 'potential'
  constructor(private httpClient: HttpClient, private clinicService: ClinicService) { }

  getPotentialDoctors(config$: BehaviorSubject<IApiParams>): Observable<any> {
    return config$.pipe(
      debounceTime(100),
      distinctUntilChanged(
        (previous, current) => {
          return JSON.stringify(previous) === JSON.stringify(current);
        }
      ),
      switchMap((config) => this.fetchData(config))
    );
  }
  private fetchData(params: IApiParams): Observable<IData> {

    const apiParams = {
      ...params
    };
    const httpParams: HttpParams = new HttpParams({ fromObject: apiParams });

    const options = Object.keys(httpParams).length
      ? { params: httpParams, ...httpOptions }
      : { params: {}, ...httpOptions };
    return this.clinicService.selectedClinic$.pipe(
      switchMap(clinicId =>
        this.httpClient
          .get<IData>(this.baseUrl + "/doctors/clinicId/" + 1, options)
          .pipe(
            retry({ count: 1, delay: 100000, resetOnSuccess: true }),
            catchError(this.handleHttpError)
          )
      ))
  }
  private handleHttpError(error: HttpErrorResponse) {
    return throwError(() => error);
  }
}
