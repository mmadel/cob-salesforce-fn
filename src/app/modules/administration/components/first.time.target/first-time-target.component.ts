import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../model/user';
import { UserTarget } from '../../model/user.target';
import { UserTargetService } from '../../services/target.service/user-target.service';
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
  submitted = false;
  constructor(private userService: UserService
    , private userTargetService: UserTargetService
    , private toastr: ToastrService) { }

  ngOnInit(): void {
    this.userService.getUserByClinic(this.clinicId).subscribe((response) => {
      this.users = response;
    })
  }
  create() {
    this.submitted = true;
    if (this.firstTimeConfigForm.valid) {
      var userTarget:UserTarget={
        firstTime : this.firstVisitTarget,
        userUUID : this.userUUID
      }
      this.userTargetService.update(userTarget).subscribe((response)=>{
        this.toastr.success('First Visit configuration created successfully');
        this.submitted = false;
        this.firstTimeConfigForm.reset();
      })
    }
    
  }
  resetError() {
    this.submitted = false;
    this.errorMessage = null;
  }

}
