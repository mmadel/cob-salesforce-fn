import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { combineLatest, filter, from, switchMap, tap } from 'rxjs';
import { ClinicService } from 'src/app/modules/administration/services/clinic/clinic.service';
import { Followup } from 'src/app/modules/followup/models/followup.model';
import { KcAuthService } from 'src/app/modules/security/service/kc/kc-auth.service';
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
  @ViewChild('firstVisitForm') firstVisitForm: NgForm;
  constructor(private followupCreationService: FollowupCreationService
    , private toastr: ToastrService
    , private router: Router
    , private clinicService: ClinicService
    , private kcAuthService: KcAuthService) { }

  ngOnInit(): void {
    this.clinicService.selectedClinic$.subscribe((re) => {
      console.log('################### ' + re)
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
      combineLatest([from(this.kcAuthService.loadUserProfile()), this.clinicService.selectedClinic$])
        .pipe(
          filter((result) => result[1] !== null),
          tap((result) => {
            this.userUUId = result[0].id!;
            this.clinicId = result[1] !== null ? result[1].toString() : ""
            this.populateModel();
          }),
          switchMap(result => this.followupCreationService.createFirstVisit(this.firstVisit)))
        .subscribe((response) => {
          this.toastr.success('First Visit Created successfully');
          this.router.navigateByUrl('/', { skipLocationChange: true }).then(() =>
            this.router.navigate(['administrator/target/first']));
        },
          (error) => {
            this.toastr.error(error.error.message, 'Error while submit followup');
          });
    }
  }
  calculateDates() {
    //read next followup date from backend
    this.firstVisit.dateOfVisit_str = moment(new Date()).format("MM/DD/YYYY");
    this.firstVisit.nextFollowupDate_str = moment(this.firstVisit.dateOfVisit_str).add(1, 'weeks').format("MM/DD/YYYY");
  }
  populateModel() {
    this.firstVisit.doctor!.clinicId = this.clinicId
    this.firstVisit.dateOfVisit = Number(moment(this.firstVisit.dateOfVisit_str).format("x"))
    this.firstVisit.nextFollowupDate = Number(moment(this.firstVisit.nextFollowupDate_str).format("x"))
    this.firstVisit.user = {
      uuid: this.userUUId
    }
  }
}
