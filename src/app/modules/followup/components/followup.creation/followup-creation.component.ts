import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';
import { ContactPosition } from 'src/app/modules/potential/enums/contact.position';
import { Impression } from 'src/app/modules/potential/enums/followup.impression';
import { FollowupCreationService } from 'src/app/modules/potential/services/followup-creation.service';
import { Doctor } from 'src/app/modules/share/model/doctor';
import { CacheService } from 'src/app/modules/share/services/cahce/cache.service';
import { FollowUpType } from '../../enum/followup.type';
import { Followup } from '../../models/followup.model';

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
  @Input() doctorUUID: string;
  @Input() clinicId: string;
  @ViewChild('followupCreateForm') followupCreateForm: NgForm;
  constructor(private followupCreationService: FollowupCreationService
    , private toastr: ToastrService
    , private router: Router
    , private cacheService: CacheService) {

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
    this.followup.nextFollowupDate_str = moment(this.followup.dateOfVisit_str).add(1, 'weeks').format("MM/DD/YYYY");
  }

  populateModel() {
    this.followup.followUpType = FollowUpType.NEXT_FOLLOW_UP; 
    this.followup.dateOfVisit = Number(moment(this.followup.dateOfVisit_str).format("x"))
    this.followup.nextFollowupDate = Number(moment(this.followup.nextFollowupDate_str).format("x"))
    this.followup.user = {
      uuid: this.cacheService.getLoggedinUserUUID()
    }
    this.followup.doctor = {
      uuid:this.doctorUUID,
      clinicId:this.clinicId
    };
  }

}
