import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { filter, switchMap, merge } from 'rxjs';
import { FollowupConfiguration } from 'src/app/modules/administration/model/followup.configuration';
import { ClinicService } from 'src/app/modules/administration/services/clinic/clinic.service';
import { FollowupConfigurationService } from 'src/app/modules/administration/services/followup.configuration/followup-configuration.service';
import { FollowUpType } from 'src/app/modules/followup/enum/followup.type';
import { Followup } from 'src/app/modules/followup/models/followup.model';
import { Doctor } from 'src/app/modules/share/model/doctor';
import { CacheService } from 'src/app/modules/share/services/cahce/cache.service';
import { ContactPosition } from '../../enums/contact.position';
import { Impression } from '../../enums/followup.impression';
import { FollowupCreationService } from '../../services/followup-creation.service';

@Component({
  selector: 'app-followup-creation',
  templateUrl: './followup-creation.component.html',
  styleUrls: ['./followup-creation.component.css']
})
export class FollowupCreationComponent implements OnInit {
  errorMessage!: string | null;
  impressions = Impression;
  contactPositions = ContactPosition;
  followup: Followup;
  selectedpotentialDoctor: Doctor;
  @ViewChild('followupCreateForm') followupCreateForm: NgForm;
  followupConfiguration: FollowupConfiguration;
  constructor(private followupCreationService: FollowupCreationService
    , private toastr: ToastrService
    , private router: Router
    , private cacheService: CacheService
    , private clinicService: ClinicService
    , private followupConfigurationService: FollowupConfigurationService) {

  }
  ngOnInit(): void {
    merge(this.clinicService.selectedClinic$)
      .pipe(
        filter(selectedClinic => selectedClinic !== null),
        switchMap(selectedClinic => this.followupConfigurationService.get(selectedClinic!)))
      .subscribe((configuration) => {
        this.followupConfiguration = configuration;
      })
    this.followup = {
      dateOfVisit: 0,
      impression: '',
      contactName: '',
      contactPosition: '',
      nextFollowupDate: 0,
      feedback: ''
    }
  }
  resetError() {
    this.errorMessage = null;
  }
  create() {
    if (this.followupCreateForm.valid) {
      this.populateModel();
      this.followupCreationService.create(this.followup).subscribe((response) => {
        this.toastr.success('Follow-Up Created successfully');
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
          this.router.navigate(['administrator/potential/list']));
      },
        (error) => {
          this.toastr.error(error.error.message, 'Error while submit followup');
        });
    } else {
      this.errorMessage = 'Please enter valid data';
    }
  }
  populateModel() {
    this.followup.followUpType = FollowUpType.FIRST_FOLLOW_UP;
    this.followup.dateOfVisit = Number(moment(this.followup.dateOfVisit_str).format("x"))
    this.followup.nextFollowupDate = Number(moment(this.followup.nextFollowupDate_str).format("x"))
    this.followup.user = {
      uuid: this.cacheService.getLoggedinUserUUID()
    }
    this.followup.doctor = this.selectedpotentialDoctor;
  }

  public getNextFollowupDate() {
    this.followup.dateOfVisit_str = moment(new Date()).format("MM/DD/YYYY");
    var configDuration: number = 0;
    if (this.followup.impression === 'Good')
      configDuration = this.followupConfiguration.firstTimeGood!;
    else if (this.followup.impression === 'Neutral')
      configDuration = this.followupConfiguration.firstTimeNeutral!;
    else if (this.followup.impression === 'Not_Worth')
      configDuration = this.followupConfiguration.firstTimeNotWorth!;
    else
      configDuration = 0
    if (configDuration !== 0)
      this.followup.nextFollowupDate_str = moment(this.followup.dateOfVisit_str).add(configDuration, 'weeks').format("MM/DD/YYYY");
  }
}
