import { Component, OnInit } from '@angular/core';
import { CompleteTaskService } from '../../services/complete-task.service';

@Component({
  selector: 'app-first-visit-doctor',
  templateUrl: './first-visit-doctor.component.html',
  styleUrls: ['./first-visit-doctor.component.css']
})
export class FirstVisitDoctorComponent implements OnInit {

  constructor(private completeTaskService:CompleteTaskService) { }

  ngOnInit(): void {
  }

}
