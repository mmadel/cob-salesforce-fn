import { Component, OnInit } from '@angular/core';
import { CompletedTask } from '../../model/completed.task.mode';
import { CompleteTaskService } from '../../services/complete-task.service';

@Component({
  selector: 'app-visited-doctor',
  templateUrl: './visited-doctor.component.html',
  styleUrls: ['./visited-doctor.component.css']
})
export class VisitedDoctorComponent implements OnInit {

  clinicId: string = '1';
  tasks:CompletedTask[];
  constructor(private completeTaskService: CompleteTaskService) { }

  ngOnInit(): void {
    this.completeTaskService.getCompletedFollowupTask(this.clinicId)
    .subscribe((response) => {
      this.tasks = response;
    }, (error) => {

    })
  }

}
