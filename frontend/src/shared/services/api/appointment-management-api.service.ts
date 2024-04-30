import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { AppointmentManagement, fromAppointmentManagementDto, set } from '@models';
import { AppointmentManagementDto, fromAppointmentManagement } from '@models/dtos';
import { ApiService } from '@services/api/api.service';

@Injectable({
    providedIn: 'root',
})
export class AppointmentManagementApiService extends ApiService {
    constructor(http: HttpClient) {
        super(http, 'appointment-managements');
    }

    public getAll() {
        this.http.get<AppointmentManagementDto[]>(this.url, {
            headers: this.headers,
        }).pipe(
            map((dtos) => {
                return dtos.map<AppointmentManagement>(fromAppointmentManagementDto);
            })
        ).subscribe(appointmentManagements => {
            set(model => {
                model.appointmentManagements = appointmentManagements;
            })
        })
    }

    public add(
        appointmentManagement: AppointmentManagement,
    ) {
        this.http
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
            )
            .subscribe(appointmentManagement => {
                set(model => {
                    model.appointmentManagements.push(appointmentManagement);
                })
            });
    }

    public remove(
        appointmentManagement: AppointmentManagement,
    ) {
        this.http.delete(
            `${this.url}/${appointmentManagement.appointment.id}/${appointmentManagement.instructor.id}`,
        ).subscribe(() => {
            set(model => {
                model.appointmentManagements = model.appointmentManagements.filter(
                    (am) => am !== appointmentManagement,
                );
            })
        });
    }
}
