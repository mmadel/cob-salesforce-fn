import { Component, OnInit, SecurityContext } from '@angular/core';
import { merge } from 'rxjs';
import { DashboardCounters } from '../models/dashboar.counters';
import { DashboardService } from '../services/dashboard.service';
import * as Stomp from 'stompjs';
import { DomSanitizer } from '@angular/platform-browser';

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
  userUUId:string = 'e066f671-c714-40da-af03-b9c3252eb252';
  constructor(private dashboardService: DashboardService , private sanitizer: DomSanitizer) { }

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
  getFirstVisitTargetAsHTML(){
    return  this.sanitizer.bypassSecurityTrustHtml(`<b style="font-family:Lucida">Target is </b> <strong>${this.userFirstTimeVisitTarget}</strong>`);
  }
  connect() {
    let socket = new WebSocket("ws://localhost:8080/salesforce-service/api/counters");
    this.ws = Stomp.over(socket);

    this.ws.connect({}, (frame: any) => {
      this.ws.subscribe("/errors", (message: any) => {
        console.log("Error " + message.body);
      });
      this.ws.subscribe("/topic/potential", (message: any) => {
        this.potentialDoctorsCounter = message.body;
        console.log(message)
      });
      this.ws.subscribe("/topic/followup", (message: any) => {
        var payload = message.body.split("_");
        if (this.clinicId === payload[0])
          this.followupDoctorsCounter = payload[1];
      });
      this.ws.subscribe("/topic/firstvisit", (message: any) => {
        var payload = message.body.split("_");
        if (this.userUUId === payload[0])
          this.userFirstTimeVisitTarget = payload[1];
      });
      this.disabled = true;
    }, (error: any) => {
      console.log("STOMP error " + error);
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
