import { Component, OnInit, ViewChild } from '@angular/core';
import { IColumn } from '@coreui/angular-pro/lib/smart-table/smart-table.type';
import { map, Observable, retry, tap } from 'rxjs';
import { Doctor } from 'src/app/modules/share/model/doctor';
import { ListTemplate } from 'src/app/modules/share/template/list.template';
import { FollowupDoctorService } from '../../services/followup-doctor.service';
import { FollowupHistoryComponent } from '../followup.history/followup-history.component';

@Component({
  selector: 'app-list-followup',
  templateUrl: './list-followup.component.html',
  styleUrls: ['./list-followup.component.css']
})
export class ListFollowupComponent extends ListTemplate implements OnInit {
  columns: (string | IColumn)[];
  potentialDoctorData$!: Observable<[Doctor]>;
  public historyVisible: boolean = false;
  public followupVisible: boolean = false;
  public selectedDocotorUUID:string;
  @ViewChild(FollowupHistoryComponent) followupHistoryComponent: FollowupHistoryComponent;
  constructor(private followupDoctorService: FollowupDoctorService) {
    super();
  }

  ngOnInit(): void {
    this.columns = this.constructColumns(['name', 'npi', 'actions']);
    this.initListComponent();
    this.potentialDoctorData$ = this.followupDoctorService.getPotentialDoctors(this.apiParams$).pipe(
      retry({
        delay: (error) => {
          console.warn('Retry: ', error);
          this.errorMessage$.next(error.message ?? `Error: ${JSON.stringify(error)}`);
          this.loadingData$.next(false);
          return this.retry$;
        }
      }),
      tap((response: any) => {
        this.totalItems$.next(response.number_of_matching_records);
        if (response.number_of_records) {
          this.errorMessage$.next('');
        }
        this.retry$.next(false);
        this.loadingData$.next(false);
      }),
      map((response: any) => {
        return response.records;
      })
    );
  }
  handleHistoryChange(event: any) {
    this.historyVisible = event;
  }
  handleFollowupChange(event: any) {
    this.followupVisible = event;
  }
  closeHistoryModal() {
    this.historyVisible = !this.historyVisible;
  }
  closeFollowupModal() {
    this.followupVisible = !this.followupVisible;
  }
  saveFollowup() {
    this.closeFollowupModal();
  }
  openHistory(item: any) {
    this.historyVisible = !this.historyVisible;
    this.selectedDocotorUUID = item.uuid;
  }
  openFollowup(item: Doctor) {
    this.followupVisible = !this.followupVisible;
  }
}
