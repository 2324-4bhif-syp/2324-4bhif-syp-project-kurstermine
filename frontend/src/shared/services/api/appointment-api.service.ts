import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { set, Appointment, fromAppointmentDto } from '@models';
import { AppointmentDto, fromAppointment } from '@models/dtos';
import { ApiService } from '@services/api/api.service';

@Injectable({
    providedIn: 'root',
})
export class AppointmentApiService extends ApiService {
    constructor(http: HttpClient) {
        super(http, 'appointments');
    }

    public getAll() {
        this.http
            .get<AppointmentDto[]>(this.url, {
                headers: this.headers,
            })
            .pipe(
                map((dtos) => {
                    return dtos.map<Appointment>(fromAppointmentDto);
                }),
            )
            .subscribe((appointments) => {
                set((model) => {
                    if (model.appointments.length === 0) {
                        model.appointments = appointments;
                    }
                });
            });
    }

    public add(appointment: Appointment) {
        this.http
            .post<AppointmentDto>(`${this.url}`, fromAppointment(appointment), {
                headers: this.headers.set('Content-Type', 'application/json'),
            })
            .pipe(
                map((appointment) => {
                    return fromAppointmentDto(appointment);
                }),
            )
            .subscribe((appointment) => {
                set((model) => {
                    model.appointments.push(appointment);
                });
            });
    }

    public search(pattern: String) {
        this.http
            .get<AppointmentDto[]>(`${this.url}/search?pattern=${pattern}`)
            .pipe(
                map((appointmentDtos: AppointmentDto[]) => {
                    return appointmentDtos.map((appointmentDto) =>
                        fromAppointmentDto(appointmentDto),
                    );
                }),
            )
            .subscribe((appointments) => {
                set((model) => {
                    model.appointments = appointments;
                });
            });
    }
}
