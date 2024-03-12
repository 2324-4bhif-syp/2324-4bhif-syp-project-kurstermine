import { Component } from '@angular/core';
import { AppointmentService } from '../../../shared/services/appointment.service';
import { Appointment } from '../../../shared/models/appointment';
import { MatListModule } from '@angular/material/list';
import { MatExpansionModule } from '@angular/material/expansion';
import { RouterModule } from '@angular/router';

@Component({
    standalone: true,
    imports: [MatListModule, MatExpansionModule, RouterModule],
    selector: 'app-admin-appointments',
    templateUrl: './admin-appointments.component.html',
    styleUrls: ['./admin-appointments.component.css'],
})
export class AdminAppointmentsComponent {
    protected appointmentService: AppointmentService;
    protected newAppointment: Appointment;

    constructor(appointmentService: AppointmentService) {
        this.appointmentService = appointmentService;
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
        this.appointmentService.add(this.newAppointment);

        this.newAppointment = {
            name: '',
            address: '',
            date: new Date(),
            duration: 0,
        };
    }
}
