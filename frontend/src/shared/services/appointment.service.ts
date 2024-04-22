import { Injectable } from '@angular/core';
import { AppointmentApiService } from './api/appointment-api.service';
import { Appointment } from '../models/appointment';
import {ReplayBaseService} from "./replay-base-service";

@Injectable({
    providedIn: 'root',
})
export class AppointmentService extends ReplayBaseService<Appointment> {
    protected api: AppointmentApiService;
    finished = false;

    constructor(appointmentApiService: AppointmentApiService) {
        super(appointmentApiService, appointmentApiService.getAll, (appointments) => super.add(...appointments));

        this.api = appointmentApiService;
    }

    override add(item: Appointment): void {
        this.api.add(item).subscribe({
            next: (appointment) => {
                super.add(appointment);
            },
        });
    }

    public search(pattern: string): void {
        this.api.search(pattern).subscribe({
            next: appointments =>  {
                this.items = appointments;
            }
        })
    }
}
