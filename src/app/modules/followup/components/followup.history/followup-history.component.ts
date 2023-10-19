import { Component, Input, OnInit } from '@angular/core';
import { Doctor } from 'src/app/modules/share/model/doctor';
import { CacheService } from 'src/app/modules/share/services/cahce/cache.service';
import { FollowupHistory } from '../../models/followup.history';
import { FollowupHistoryService } from '../../services/followup-history.service';

@Component({
  selector: 'app-followup-history',
  templateUrl: './followup-history.component.html',
  styleUrls: ['./followup-history.component.css']
})
export class FollowupHistoryComponent implements OnInit {
  historyList: FollowupHistory[];
  @Input() doctorUUID: string;
  constructor(private followupHistoryService: FollowupHistoryService , private cahceService:CacheService) { }

  ngOnInit(): void {
    this.followupHistoryService.findHistory(this.doctorUUID, this.cahceService.getSelectedClinic().toString())
      .subscribe((response) => {
        this.historyList = response;
      })
  }
}
