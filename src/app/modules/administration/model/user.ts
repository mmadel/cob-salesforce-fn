import { Clinic } from "./clinic";

export interface User{
    id?:number;
    uuid?:string;
    name?:string
    createdAt?:number;
    userRole: string | null;
    clinics: Clinic[] | null;
}