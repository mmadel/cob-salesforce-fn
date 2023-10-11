import { Component, OnInit } from '@angular/core';
import { CompletedTask } from '../../model/completed.task.mode';
import { CompleteTaskService } from '../../services/complete-task.service';

@Component({
  selector: 'app-first-visit-doctor',
  templateUrl: './first-visit-doctor.component.html',
  styleUrls: ['./first-visit-doctor.component.css']
})
export class FirstVisitDoctorComponent implements OnInit {

  clinicId: string = '1';
  tasks: CompletedTask[];
  constructor(private completeTaskService: CompleteTaskService) { }

  ngOnInit(): void {
    this.completeTaskService.getCompletedFirstVisitTask(this.clinicId)
      .subscribe((response) => {
        console.log(response)
        this.tasks = response;
      }, (error) => {
        console.log(JSON.stringify(error))
      })
  }
}
