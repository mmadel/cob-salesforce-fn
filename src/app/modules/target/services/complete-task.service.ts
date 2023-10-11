import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CompletedTask } from '../model/completed.task.mode';

@Injectable({
  providedIn: 'root'
})
export class CompleteTaskService {
  private baseUrl = environment.baseURL + 'task'

  constructor(private httpClient: HttpClient) { }

  public getCompletedFollowupTask(clinicId: string): Observable<CompletedTask[]> {
    const completedFollowupTaskURL = this.baseUrl + '/complete/followup/clinicId/' + clinicId
    return this.httpClient.get(completedFollowupTaskURL).pipe(
      map((response: any) => <CompletedTask[]>response));
  }

  public getCompletedFirstVisitTask(clinicId: string) {
    const completedFirstVisitTaskURL = this.baseUrl + '/complete/first/clinicId/' + clinicId
    return this.httpClient.get(completedFirstVisitTaskURL).pipe(
      map((response: any) => <CompletedTask[]>response));
  }
}
