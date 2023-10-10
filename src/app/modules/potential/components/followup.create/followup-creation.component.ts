import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  contactPositions=ContactPosition;
  constructor() {

  }
  ngOnInit(): void {
  }
  resetError() {
    this.errorMessage = null;
  }
  create() {

  }
}
