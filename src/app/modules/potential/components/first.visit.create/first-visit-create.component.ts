import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { filter, merge, switchMap } from 'rxjs';
import { FollowupConfiguration } from 'src/app/modules/administration/model/followup.configuration';
import { ClinicService } from 'src/app/modules/administration/services/clinic/clinic.service';
import { FollowupConfigurationService } from 'src/app/modules/administration/services/followup.configuration/followup-configuration.service';
import { Followup } from 'src/app/modules/followup/models/followup.model';
import { CacheService } from 'src/app/modules/share/services/cahce/cache.service';
import { ContactPosition } from '../../enums/contact.position';
import { Impression } from '../../enums/followup.impression';
import { FollowupCreationService } from '../../services/followup-creation.service';

@Component({
  selector: 'app-first-visit-create',
  templateUrl: './first-visit-create.component.html',
  styleUrls: ['./first-visit-create.component.css']
})
export class FirstVisitCreateComponent implements OnInit {
  errorMessage!: string | null;
  firstVisit: Followup;
  impressions = Impression;
  contactPositions = ContactPosition;
  userUUId: string;
  clinicId: string;
  followupConfiguration: FollowupConfiguration;
  @ViewChild('firstVisitForm') firstVisitForm: NgForm;
  constructor(private followupCreationService: FollowupCreationService
    , private toastr: ToastrService
    , private router: Router
    , private cacheService: CacheService
    , private clinicService: ClinicService
    , private followupConfigurationService: FollowupConfigurationService) { }

  ngOnInit(): void {
    merge(this.clinicService.selectedClinic$)
      .pipe(
        filter(selectedClinic => selectedClinic !== null),
        switchMap(selectedClinic => this.followupConfigurationService.get(selectedClinic!)))
      .subscribe((configuration) => {
        this.followupConfiguration = configuration;
      })
    this.firstVisit = {
      dateOfVisit: 0,
      impression: '',
      contactName: '',
      contactPosition: '',
      nextFollowupDate: 0,
      feedback: '',
      doctor: {
        name: '',
        npi: ''
      }
    }
  }
  resetError() {
    this.errorMessage = null;
  }
  create() {
    if (this.firstVisitForm.valid) {
      this.populateModel();
      this.followupCreationService.createFirstVisit(this.firstVisit).subscribe((response) => {
        this.toastr.success('First Visit Created successfully');
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
          this.router.navigate(['administrator/target/first']));
      })
    }
  }
  populateModel() {
    this.firstVisit.doctor!.clinicId = this.cacheService.getSelectedClinic().toString()
    this.firstVisit.dateOfVisit = Number(moment(this.firstVisit.dateOfVisit_str).format("x"))
    this.firstVisit.nextFollowupDate = Number(moment(this.firstVisit.nextFollowupDate_str).format("x"))
    this.firstVisit.user = {
      uuid: this.cacheService.getLoggedinUserUUID()
    }
  }

  public getNextFollowupDate() {
    this.firstVisit.dateOfVisit_str = moment(new Date()).format("MM/DD/YYYY");
    var configDuration: number = 0;
    if (this.firstVisit.impression === 'Good')
      configDuration = this.followupConfiguration.firstTimeGood!;
    else if (this.firstVisit.impression === 'Neutral')
      configDuration = this.followupConfiguration.firstTimeNeutral!;
    else if (this.firstVisit.impression === 'Not_Worth')
      configDuration = this.followupConfiguration.firstTimeNotWorth!;
    else
      configDuration = 0
    if (configDuration !== 0)
      this.firstVisit.nextFollowupDate_str = moment(this.firstVisit.dateOfVisit_str).add(configDuration, 'weeks').format("MM/DD/YYYY");

  }
}
