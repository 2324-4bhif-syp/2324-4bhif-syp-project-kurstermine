import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import {
    AppointmentDto,
    fromAppointment,
} from '../../models/dtos/appointment-dto';
import { Appointment, fromAppointmentDto } from '../../models/appointment';
import { ApiService } from './api.service';

@Injectable({
    providedIn: 'root',
})
export class AppointmentApiService extends ApiService<
    Appointment,
    AppointmentDto
> {
    constructor(http: HttpClient) {
        super(http, 'appointments', fromAppointmentDto);
    }

    public add(appointment: Appointment): Observable<Appointment> {
        return this.http
            .post<AppointmentDto>(`${this.url}`, fromAppointment(appointment), {
                headers: this.headers.set('Content-Type', 'application/json'),
            })
            .pipe(
                map((appointment) => {
                    return fromAppointmentDto(appointment);
                }),
            );
    }
}
