import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Clinic } from '../../../model/clinic';
import { ClinicService } from '../../../services/clinic/clinic.service';

@Component({
  selector: 'app-list-clinic',
  templateUrl: './list-clinic.component.html',
  styleUrls: ['./list-clinic.component.css']
})
export class ListClinicComponent implements OnInit {
  clinics: Clinic[];

  constructor(private router: Router, private clinicService: ClinicService) { }

  ngOnInit(): void {
    this.clinicService.list().subscribe(response => {
      this.clinics  = response;
    },
      error => {
        console.log(error)
      },
    )
  }
  create(){
    
  }
}
