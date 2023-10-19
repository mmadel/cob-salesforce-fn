import { Component, OnInit } from '@angular/core';
import { filter, merge, switchMap } from 'rxjs';
import { ClinicService } from 'src/app/modules/administration/services/clinic/clinic.service';
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
  constructor(private completeTaskService: CompleteTaskService , private clinicService:ClinicService) { }

  ngOnInit(): void {
    merge(this.clinicService.selectedClinic$)
      .pipe(
        filter((selectedClinic) => selectedClinic !== null),
        switchMap(selectedClinic => this.completeTaskService.getCompletedFollowupTask(selectedClinic!.toString()))
      ).subscribe((response)=>{
        this.tasks = response;
      }, (error) => {
        console.log(JSON.stringify(error))
      })
  }
  

}
