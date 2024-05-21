import { Component, Input } from '@angular/core';
import { Appointment } from '@models';

@Component({
    selector: 'app-user-appointment',
    standalone: true,
    imports: [],
    templateUrl: './user-appointment.component.html',
    styleUrl: './user-appointment.component.css',
})
export class UserAppointmentComponent {
    constructor() {}

    @Input({ required: true }) appointment!: Appointment;

    protected readonly String = String;
}
