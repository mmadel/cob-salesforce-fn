import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LocalService } from 'src/app/modules/share/services/local.service';
import { Clinic } from '../../../model/clinic';
import { User } from '../../../model/user';
import { ClinicService } from '../../../services/clinic/clinic.service';
import { UserService } from '../../../services/user.service';
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
  selectedClinicIds: number[];
  @ViewChild('createUserForm') createUserForm: NgForm;
  constructor(private clinicService: ClinicService
    , private localService: LocalService
    , private userService: UserService
    , private router: Router
    , private toastr: ToastrService) { }

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
    this.user.password = this.localService.encrypt(this.user.password !== undefined ? this.user.password : '')
    this.submitted = true;
    var selectedClinicIds: Clinic[] = new Array();
    this.selectedClinicIds.forEach(selectedId => {
      var clinic: Clinic = {
        id: Number(selectedId)
      };
      selectedClinicIds.push(clinic);
    })
    this.user.clinics = selectedClinicIds;
    if (this.createUserForm.valid) {
      this.userService.create(this.user).subscribe((response) => {
        this.toastr.success('Clinic created successfully');
        this.submitted = false;
        this.createUserForm.reset();
        this.router.navigate(['/administrator/administration/list/user'])
      })
    }
  }
  resetError() {
    this.submitted = false;
  }

}
