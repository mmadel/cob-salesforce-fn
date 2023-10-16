import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Clinic } from '../../../model/clinic';
import { User } from '../../../model/user';
import { ClinicService } from '../../../services/clinic/clinic.service';
interface UserRole {
  name: string;
  value: string
}
@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  userRoles: UserRole[] = [
    { name: "Administrator", value: "administration" },
    { name: "Sales", value: "sales" }
  ]
  submitted: boolean = false;
  user: User = {
    name: '',
    password: '',
    userRole: ''
  }
  clinics: Clinic[];
  @ViewChild('createUserForm') createUserForm: NgForm;
  constructor(private clinicService: ClinicService) { }

  ngOnInit(): void {
    this.clinicService.list().subscribe(response => {
      this.clinics = response;
    },
      error => {
        console.log(error)
      },
    )
  }

  create(event: any) {
    this.submitted = true;
    if (this.createUserForm.valid) {
      this.submitted = false;
    }
  }
  resetError() {

  }
}
