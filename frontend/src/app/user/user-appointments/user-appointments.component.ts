import { Component } from '@angular/core';
import { AppointmentService } from '../../../shared/services/appointment.service';
import { UserAppointmentComponent } from '../user-appointment/user-appointment.component';
import { Appointment } from '../../../shared/models/appointment';
import { CustomerService } from '../../../shared/services/customer.service';
import { ParticipationService } from '../../../shared/services/participation.service';
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {MatIconButton} from "@angular/material/button";

@Component({
    selector: 'app-user-appointments',
    standalone: true,
    imports: [UserAppointmentComponent, MatFormField, FormsModule, MatIcon, MatInput, MatIconButton, MatLabel],
    templateUrl: './user-appointments.component.html',
    styleUrl: './user-appointments.component.css',
})
export class UserAppointmentsComponent {
    constructor(
        protected appointmentService: AppointmentService,
        protected participationService: ParticipationService,
        protected customerService: CustomerService,
    ) {}

    searchValue: string = "";

    isIncluded(appointment: Appointment): boolean {
        return (
            this.participationService.get(
                (participation) =>
                    participation.id?.appointmentId === appointment.id,
            ).length === 1
        );
    }

    search() {
        //TODO
    }

    getAppointments(): Appointment[] {
        return this.appointmentService.get(appointment => this.isIncluded(appointment));
    }
}
