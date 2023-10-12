import { CompletedTaskType } from "../enum/completed.task.type";

export interface CompletedTask{
    doctorName:string,
    doctorNPI:string;
    nextFollowupDate:number;
    completedTaskType:CompletedTaskType;
}