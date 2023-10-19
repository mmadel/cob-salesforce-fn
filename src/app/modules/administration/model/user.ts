import { Clinic } from "./clinic";

export interface User{
    id?:number;
    uuid?:string;
    name?:string
    password?:string
    createdAt?:number;
    userRole?: string | null;
    clinics?: Clinic[] | null;
}