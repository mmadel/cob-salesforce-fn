import { Component, OnInit } from '@angular/core';
import { merge } from 'rxjs';
import { DashboardCounters } from '../models/dashboar.counters';
import { DashboardService } from '../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  dashboardCounters: DashboardCounters;
  potentialDoctorsCounter: string
  followupDoctorsCounter: string
  userAchievement: string;
  userFirstTimeVisitTarget: string
  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.dashboardService.getDashboardCounters("1", "e066f671-c714-40da-af03-b9c3252eb252")
      .subscribe((response) => {
        this.potentialDoctorsCounter = response.potentialDoctorsCounter + ''
        this.followupDoctorsCounter = response.followupDoctorsCounter + ''
        this.userAchievement = response.userAchievement + ''
        this.userFirstTimeVisitTarget = response.userFirstTimeVisitTarget + ''
      })
  }

}
