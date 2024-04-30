import {Component, OnInit} from '@angular/core';
import { AppointmentService } from '../../../shared/services/appointment.service';
import { UserAppointmentComponent } from '../user-appointment/user-appointment.component';
import { Appointment } from '../../../shared/models/appointment';
import { ParticipationService } from '../../../shared/services/participation.service';
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {MatIconButton} from "@angular/material/button";
import {AppointmentApiService} from "../../../shared/services/api/appointment-api.service";

@Component({
    selector: 'app-user-appointments',
    standalone: true,
    imports: [UserAppointmentComponent, MatFormField, FormsModule, MatIcon, MatInput, MatIconButton, MatLabel],
    templateUrl: './user-appointments.component.html',
    styleUrl: './user-appointments.component.css',
})
export class UserAppointmentsComponent implements OnInit {
    constructor(
        protected appointmentService: AppointmentService,
        protected appointmentApiService: AppointmentApiService,
        protected participationService: ParticipationService
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
        this.appointmentService.search(this.searchValue);
    }

    getAppointments(): Appointment[] {
        return this.appointmentService.get(appointment => this.isIncluded(appointment));
    }

    ngOnInit(): void {
        this.appointmentApiService.getAll();
    }
}
