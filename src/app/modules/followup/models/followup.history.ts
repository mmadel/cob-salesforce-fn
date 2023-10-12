import { Impression } from "../../potential/enums/followup.impression";

export interface FollowupHistory{
    visitedDate:number;
    impression:Impression;
    feedback:string;
    userName:string;
    
}