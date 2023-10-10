import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { Followup } from 'src/app/modules/followup/models/followup.model';
import { ContactPosition } from '../../enums/contact.position';
import { Impression } from '../../enums/followup.impression';

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
  @ViewChild('followupCreateForm') followupCreateForm: NgForm;
  constructor() {

  }
  ngOnInit(): void {
    this.followup = {
      dateOfVisit: 0,
      dateOfVisit_str: '',
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
    } else {
      this.errorMessage = 'Please enter valid data';
    }

  }
}
