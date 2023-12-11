import { Injectable } from '@angular/core';
import { AppointmentApiService } from './api/appointment-api.service';
import { Service } from './service';
import { Appointment } from '../models/appointment';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AppointmentService extends Service<Appointment> {

  protected api: AppointmentApiService;

  constructor(appointmentApiService: AppointmentApiService) {
    super()

    this.api = appointmentApiService;

    this.api.getAll().subscribe({
      next: (appointments) => {
        super.add(...appointments);
      }
    });
  }

  override add(item: Appointment): void {
    this.api.add(item).subscribe({
      next: (appointment => {
        super.add(appointment);
      })
    });
  }

  getAllFromUser(id: number): Observable<Appointment[]> {
    return this.api.getAllFromCustomer(id);
  }
}
