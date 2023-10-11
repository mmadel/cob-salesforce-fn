import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { Followup } from 'src/app/modules/followup/models/followup.model';
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
  @ViewChild('firstVisitForm') firstVisitForm: NgForm;
  constructor(private followupCreationService: FollowupCreationService
    , private toastr: ToastrService
    , private router: Router) { }

  ngOnInit(): void {
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
          this.router.navigate(['administrator/potential/list']));
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
    this.firstVisit.dateOfVisit_str = moment(new Date()).format("MM/DD/YYYY");
    this.firstVisit.nextFollowupDate_str = moment(this.firstVisit.dateOfVisit_str).add(1, 'weeks').format("MM/DD/YYYY");
  }
  populateModel() {
    this.firstVisit.doctor!.clinicId = "1"
    this.firstVisit.dateOfVisit = Number(moment(this.firstVisit.dateOfVisit_str).format("x"))
    this.firstVisit.nextFollowupDate = Number(moment(this.firstVisit.nextFollowupDate_str).format("x"))
    this.firstVisit.user = {
      id: 1,
      uuid: 'e066f671-c714-40da-af03-b9c3252eb252'
    }
  }
}
