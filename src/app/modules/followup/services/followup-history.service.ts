import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FollowupHistory } from '../models/followup.history';

@Injectable({
  providedIn: 'root'
})
export class FollowupHistoryService {
  
  private baseUrl = environment.baseURL + 'followup'

  constructor(private httpClient: HttpClient) { }

  findHistory(doctorUUID:string,clinicId:string ){
    clinicId = "1";
    const historyFollowupURL = this.baseUrl + '/history/doctorUUID/'+doctorUUID+'/clinicId/'+clinicId
    return this.httpClient.get(historyFollowupURL).pipe(
      map((response: any) => <FollowupHistory[]>response));
  }
}
