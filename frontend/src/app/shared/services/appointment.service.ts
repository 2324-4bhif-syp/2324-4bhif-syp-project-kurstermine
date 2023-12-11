import { Injectable } from '@angular/core';
import { AppointmentApiService } from './api/appointment-api.service';
import { Service } from './service';
import { Appointment } from '../models/appointment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService extends Service<Appointment> {

  protected api: AppointmentApiService;
  finished = false;

  constructor(appointmentApiService: AppointmentApiService) {
    super()

    this.api = appointmentApiService;

    this.api.getAll().subscribe({
      next: (appointments) => {
        super.add(...appointments);
        this.finished = true;
        this.notifyListeners();
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

  notifyListeners() {
    this.finishedListeners.forEach(listener => listener());
  }

  finishedListeners: (() => void)[] = [];
}
