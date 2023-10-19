import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Clinic } from '../../../model/clinic';
import { ClinicService } from '../../../services/clinic/clinic.service';

@Component({
  selector: 'app-create-clinic',
  templateUrl: './create-clinic.component.html',
  styleUrls: ['./create-clinic.component.css']
})
export class CreateClinicComponent implements OnInit {

  @ViewChild('createClinicForm') createClinicForm: NgForm;
  clinic: Clinic={
    name:''
  };
  submitted = false;
  constructor(private clinicService: ClinicService,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  create() {
    this.submitted = true;
    if (this.createClinicForm.valid) {
      this.clinicService.create(this.clinic).subscribe((response) => {
        this.toastr.success('Clinic created successfully');
        this.submitted = false;
        this.createClinicForm.reset();
        this.router.navigate(['/administrator/administration/list/clinic'])
      })
    }

  }
  resetError() {
    this.submitted = false;
  }
}
