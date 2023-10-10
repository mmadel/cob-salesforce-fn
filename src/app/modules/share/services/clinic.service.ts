import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClinicService {

  public selectedClinic$: BehaviorSubject<number | null> = new BehaviorSubject<number | null>(null);
  public filterDate$: BehaviorSubject<number[] | null> = new BehaviorSubject<number[] | null>(null);
  constructor() { }
}
