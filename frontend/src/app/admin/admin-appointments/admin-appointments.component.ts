import { Component, inject, OnInit } from '@angular/core';
import { Appointment } from '@models';
import { RouterModule } from '@angular/router';
import { AppointmentApiService } from '@services/api';
import { StoreService } from '@services/store.service';
import { distinctUntilChanged, map } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
    standalone: true,
    imports: [RouterModule, AsyncPipe],
    selector: 'app-admin-appointments',
    templateUrl: './admin-appointments.component.html',
    styleUrls: ['./admin-appointments.component.css'],
})
export class AdminAppointmentsComponent implements OnInit {
    protected newAppointment: Appointment;

    protected viewModel = inject(StoreService).store.pipe(
        map((model) => model.appointments),
        distinctUntilChanged(),
    );

    private appointmentApiService = inject(AppointmentApiService);

    constructor() {
        this.newAppointment = {
            name: '',
            address: '',
            date: new Date(),
            duration: 0,
        };
    }

    parseDate(eventdate: Event): Date {
        const dateString = (eventdate.target as HTMLInputElement).value;

        let date = new Date();
        if (dateString) {
            date = new Date(dateString);
        }

        return date;
    }

    add() {
        this.appointmentApiService.add(this.newAppointment);

        this.newAppointment = {
            name: '',
            address: '',
            date: new Date(),
            duration: 0,
        };
    }

    ngOnInit(): void {
        this.appointmentApiService.getAll();
    }
}
