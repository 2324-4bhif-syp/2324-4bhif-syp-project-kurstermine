import {Component, inject, OnInit} from '@angular/core';
import { UserAppointmentComponent } from '../user-appointment/user-appointment.component';
import {Appointment, Participation} from '@models';
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {FormsModule} from "@angular/forms";
import {MatIcon} from "@angular/material/icon";
import {MatInput} from "@angular/material/input";
import {MatIconButton} from "@angular/material/button";
import {AppointmentApiService} from "@services/api";
import {ParticipationApiService} from "@services/api";
import {StoreService} from "@services";
import {distinctUntilChanged, map} from "rxjs";

@Component({
    selector: 'app-user-appointments',
    standalone: true,
    imports: [UserAppointmentComponent, MatFormField, FormsModule, MatIcon, MatInput, MatIconButton, MatLabel],
    templateUrl: './user-appointments.component.html',
    styleUrl: './user-appointments.component.css',
})
export class UserAppointmentsComponent implements OnInit {

    viewModelAppointments = inject(StoreService)
        .store
        .pipe(
            map(model => model.appointments),
            distinctUntilChanged()
        )

    viewModelParticipations = inject(StoreService)
        .store
        .pipe(
            map(model => model.participations),
            distinctUntilChanged()
        )

    constructor(
        protected appointmentApiService: AppointmentApiService,
        protected participationApiService: ParticipationApiService
    ) {}

    searchValue: string = "";

    doesUserParticipateIn(appointment: Appointment): boolean {
        let data: Participation[] = [];
        this.viewModelParticipations
            .subscribe(participations => {
                data = participations;
            });

        return data.filter(p => p.id?.appointmentId === appointment.id).length === 1;
    }

    search() {
        this.appointmentApiService.search(this.searchValue);
    }

    getAppointments(): Appointment[] {
        let data: Appointment[] = [];
        this.viewModelAppointments
            .subscribe(appointments => {
                data = appointments;
            });

        return data.filter(a => this.doesUserParticipateIn(a));
    }

    ngOnInit(): void {
        this.appointmentApiService.getAll();
        this.participationApiService.getAll();
    }
}
