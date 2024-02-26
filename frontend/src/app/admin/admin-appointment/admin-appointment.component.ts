import { Component, Input } from '@angular/core';
import { AppointmentService } from '../../../shared/services/appointment.service';
import { Appointment } from '../../../shared/models/appointment';

@Component({
    selector: 'app-admin-appointment',
    templateUrl: './admin-appointment.component.html',
    styleUrls: ['./admin-appointment.component.css'],
})
export class AdminAppointmentComponent {
    @Input() appointment: Appointment | undefined;
    protected appointmentService: AppointmentService;

    constructor(appointmentService: AppointmentService) {
        this.appointmentService = appointmentService;
    }
}
