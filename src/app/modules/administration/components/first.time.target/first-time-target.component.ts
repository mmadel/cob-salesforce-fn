import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../../model/user';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-first-time-target',
  templateUrl: './first-time-target.component.html',
  styleUrls: ['./first-time-target.component.css']
})
export class FirstTimeTargetComponent implements OnInit {
  clinicId: string = "1";
  errorMessage!: string | null;
  @ViewChild('firstTimeConfigForm') firstTimeConfigForm: NgForm;
  users: User[];
  userUUID: string = '';
  firstVisitTarget: number
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUserByClinic(this.clinicId).subscribe((response) => {
      this.users = response;
    })
  }
  create() {

  }
  resetError() {
    this.errorMessage = null;
  }

}
