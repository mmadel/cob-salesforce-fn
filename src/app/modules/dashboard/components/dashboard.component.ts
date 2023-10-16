import { Component, OnInit, SecurityContext } from '@angular/core';
import { combineLatest, filter, from, merge, switchMap, tap } from 'rxjs';
import { DashboardCounters } from '../models/dashboar.counters';
import { DashboardService } from '../services/dashboard.service';
import * as Stomp from 'stompjs';
import { DomSanitizer } from '@angular/platform-browser';
import { KcAuthService } from '../../security/service/kc/kc-auth.service';
import { ClinicService } from '../../administration/services/clinic/clinic.service';

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
  userUUId: string = 'e066f671-c714-40da-af03-b9c3252eb252';
  constructor(private dashboardService: DashboardService,
    private sanitizer: DomSanitizer,
    private kcAuthService: KcAuthService,
    private clinicService: ClinicService) { }

  ngOnInit(): void {
    combineLatest([from(this.kcAuthService.loadUserProfile()), this.clinicService.selectedClinic$])
      .pipe(
        filter((result) => result[1] !== null),
        tap((result) => {
          this.userUUId = result[0].id!;
          this.clinicId = result[1] !== null ? result[1].toString() : ""
        }),
        switchMap(result => this.dashboardService.getDashboardCounters(result[1] !== null ? result[1].toString() : "", result[0].id!))
      )
      .subscribe((response) => {
        this.potentialDoctorsCounter = response.potentialDoctorsCounter + ''
        this.followupDoctorsCounter = response.followupDoctorsCounter + ''
        this.userAchievement = response.userAchievement + ''
        this.userFirstTimeVisitTarget = response.userFirstTimeVisitTarget + ''
        this.userFirstTimeVisitAchievement = response.userFirstTimeVisitAchievement + ''
      })
    this.connect();
  }
  getFirstVisitTargetAsHTML() {
    return this.sanitizer.bypassSecurityTrustHtml(`<b style="font-family:Lucida">Target is </b> <strong>${this.userFirstTimeVisitTarget}</strong>`);
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
      this.ws.subscribe("/topic/first/visit/target", (message: any) => {
        var payload = message.body.split("_");
        if (this.userUUId === payload[0])
          this.userFirstTimeVisitTarget = payload[1];
      });
      this.ws.subscribe("/topic/first/visit/achieved", (message: any) => {
        var payload = message.body.split("_");
        if (this.userUUId === payload[0])
          this.userFirstTimeVisitAchievement = payload[1];
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
