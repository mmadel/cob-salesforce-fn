import { Component, OnInit } from '@angular/core';
import { merge } from 'rxjs';
import { DashboardCounters } from '../models/dashboar.counters';
import { DashboardService } from '../services/dashboard.service';
import * as Stomp from 'stompjs';

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
  userFirstTimeVisitAchievement: string;

  showConversation: boolean = false;
  ws: any;
  name: string;
  disabled: boolean;
  clinicId: string = '1';
  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.dashboardService.getDashboardCounters("1", "e066f671-c714-40da-af03-b9c3252eb252")
      .subscribe((response) => {
        this.potentialDoctorsCounter = response.potentialDoctorsCounter + ''
        this.followupDoctorsCounter = response.followupDoctorsCounter + ''
        this.userAchievement = response.userAchievement + ''
        this.userFirstTimeVisitTarget = response.userFirstTimeVisitTarget + ''
        this.userFirstTimeVisitAchievement = response.userFirstTimeVisitAchievement + ''
      })
    this.connect();
  }
  connect() {
    let socket = new WebSocket("ws://localhost:8080/salesforce-service/api/counters");
    this.ws = Stomp.over(socket);

    this.ws.connect({}, (frame: any) => {
      this.ws.subscribe("/errors", (message: any) => {
        alert("Error " + message.body);
      });
      this.ws.subscribe("/topic/potential", (message: any) => {
        this.potentialDoctorsCounter = message.body;
        console.log(message)
      });
      this.ws.subscribe("/topic/followup", (message: any) => {
        var payload = message.body.split("_");
        console.log(payload[0] +' ' + payload[1])
        if (this.clinicId === payload[0])
          this.followupDoctorsCounter = payload[1];
      });
      this.disabled = true;
    }, (error: any) => {
      alert("STOMP error " + error);
    });
  }
  disconnect() {
    if (this.ws != null) {
      this.ws.ws.close();
    }
    this.setConnected(false);
    console.log("Disconnected");
  }

  setConnected(connected: any) {
    this.disabled = connected;
    this.showConversation = connected;
  }
  sendName() {
    let data = JSON.stringify({
      'name': this.name
    })
    this.ws.send("/app/message", {}, data);
  }
}
