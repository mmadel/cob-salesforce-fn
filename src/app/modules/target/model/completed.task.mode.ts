import { CompletedTaskType } from "../enum/completed.task.type";

export interface CompletedTask{
    doctorName:string,
    doctorNPI:string;
    userName:string,
    nextFollowupDate:number;
    completedTaskType:CompletedTaskType;
}