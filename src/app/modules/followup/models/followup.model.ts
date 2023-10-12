import { Doctor } from "../../share/model/doctor";
import { User } from "../../share/model/user";
import { FollowUpType } from "../enum/followup.type";

export interface Followup {
    dateOfVisit?: number;
    dateOfVisit_str?: string;
    impression?: string;
    contactName?: string;
    contactPosition?: string;
    nextFollowupDate?: number;
    nextFollowupDate_str?: string;
    feedback?: string;
    user?: User;
    doctor?: Doctor
    followUpType?:FollowUpType
}