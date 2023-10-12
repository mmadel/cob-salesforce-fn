import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { FollowUpType } from 'src/app/modules/followup/enum/followup.type';
import { Followup } from 'src/app/modules/followup/models/followup.model';
import { Doctor } from 'src/app/modules/share/model/doctor';
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
  constructor(private followupCreationService: FollowupCreationService
    , private toastr: ToastrService
    , private router: Router) {

  }
  ngOnInit(): void {
    this.followup = {
      dateOfVisit: 0,
      impression: '',
      contactName: '',
      contactPosition: '',
      nextFollowupDate: 0,
      feedback: ''
    }
    this.calculateDates();
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
          this.router.navigate(['administrator/followup/list']));
      },
        (error) => {
          this.toastr.error(error.error.message, 'Error while submit followup');
        });
    } else {
      this.errorMessage = 'Please enter valid data';
    }
  }
  calculateDates() {
    //read next followup date from backend
    this.followup.dateOfVisit_str = moment(new Date()).format("MM/DD/YYYY");
    this.followup.nextFollowupDate_str = moment(this.followup.dateOfVisit_str).add(3, 'weeks').format("MM/DD/YYYY");
  }

  populateModel() {
    this.followup.followUpType = FollowUpType.FIRST_FOLLOW_UP;
    this.followup.dateOfVisit = Number(moment(this.followup.dateOfVisit_str).format("x"))
    this.followup.nextFollowupDate = Number(moment(this.followup.nextFollowupDate_str).format("x"))
    this.followup.user = {
      id: 1,
      uuid: 'e066f671-c714-40da-af03-b9c3252eb252'
    }
    this.followup.doctor = this.selectedpotentialDoctor;
  }

}
