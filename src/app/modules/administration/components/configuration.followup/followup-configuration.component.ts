import { Component, OnInit } from '@angular/core';
import { CacheService } from 'src/app/modules/share/services/cahce/cache.service';
import { FollowupConfiguration } from '../../model/followup.configuration';
import { ClinicService } from '../../services/clinic/clinic.service';
import { FollowupConfigurationService } from '../../services/followup.configuration/followup-configuration.service';
import { combineLatest, filter, merge, switchMap, tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-followup-configuration',
  templateUrl: './followup-configuration.component.html',
  styleUrls: ['./followup-configuration.component.css']
})
export class FollowupConfigurationComponent implements OnInit {
  selectedClinic: number;
  followupConfiguration: FollowupConfiguration = {
    firstTimeGood: null,
    firstTimeNeutral: null,
    firstTimeNotWorth: null,

    nextTimeGood: null,
    nextTimeNeutral: null,
    nextTimeNotWorth: null,
    clinicId: null
  }
  constructor(private followupConfigurationService: FollowupConfigurationService
    , private toastr: ToastrService, private clinicService: ClinicService) { }

  ngOnInit(): void {
    merge(this.clinicService.selectedClinic$)
      .pipe(
        filter((selectedClinic) => selectedClinic !== null),
        tap(clinicId => this.selectedClinic = clinicId!),
        switchMap(selectedClinic => this.followupConfigurationService.get(Number(selectedClinic)))
      ).subscribe((response) => {
        this.followupConfiguration = response;
      }, (error) => {
        console.log(JSON.stringify(error))
      })
      ;
  }

  save() {
    this.followupConfiguration.clinicId = this.selectedClinic;
    console.log(JSON.stringify(this.followupConfiguration))
    this.followupConfigurationService.create(this.followupConfiguration).subscribe(() => {
      this.toastr.success('follow-Up configuration created successfully');
    })
  }
}
