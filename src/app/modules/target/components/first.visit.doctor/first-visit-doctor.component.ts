import { Component, OnInit } from '@angular/core';
import { combineLatest, filter, merge, switchMap, tap } from 'rxjs';
import { ClinicService } from 'src/app/modules/administration/services/clinic/clinic.service';
import { CompletedTask } from '../../model/completed.task.mode';
import { CompleteTaskService } from '../../services/complete-task.service';

@Component({
  selector: 'app-first-visit-doctor',
  templateUrl: './first-visit-doctor.component.html',
  styleUrls: ['./first-visit-doctor.component.css']
})
export class FirstVisitDoctorComponent implements OnInit {


  tasks: CompletedTask[];
  constructor(private completeTaskService: CompleteTaskService, private clinicService: ClinicService) { }

  ngOnInit(): void {
    merge(this.clinicService.selectedClinic$)
      .pipe(
        filter((selectedClinic) => selectedClinic !== null),
        switchMap(selectedClinic => this.completeTaskService.getCompletedFirstVisitTask(selectedClinic!.toString()))
      ).subscribe((response)=>{
        this.tasks = response;
      }, (error) => {
        console.log(JSON.stringify(error))
      })
  }
}
