import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import {
    AppointmentManagement,
    fromAppointmentManagementDto,
} from '../../models/appointmentManagement';
import {
    AppointmentManagementDto,
    fromAppointmentManagement,
} from '../../models/dtos/appointment-management-dto';
import { ApiService } from './api.service';

@Injectable({
    providedIn: 'root',
})
export class AppointmentManagementApiService extends ApiService<
    AppointmentManagement,
    AppointmentManagementDto
> {
    constructor(http: HttpClient) {
        super(http, 'admin-appointment-managements', fromAppointmentManagementDto);
    }

    public add(
        appointmentManagement: AppointmentManagement,
    ): Observable<AppointmentManagement> {
        return this.http
            .post<AppointmentManagementDto>(
                this.url,
                fromAppointmentManagement(appointmentManagement),
                {
                    headers: this.headers.set(
                        'Content-Type',
                        'application/json',
                    ),
                },
            )
            .pipe(
                map((appointmentManagement) =>
                    fromAppointmentManagementDto(appointmentManagement),
                ),
            );
    }

    public remove(
        appointmentManagement: AppointmentManagement,
    ): Observable<object> {
        return this.http.delete(
            `${this.url}/${appointmentManagement.appointment.id}/${appointmentManagement.instructor.id}`,
        );
    }
}
