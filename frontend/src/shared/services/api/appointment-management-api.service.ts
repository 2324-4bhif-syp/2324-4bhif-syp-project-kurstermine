import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs";
import { AppointmentManagement, fromAppointmentManagementDto as fromDto, set } from "@models";
import { AppointmentManagementDto, fromAppointmentManagement as fromModel } from "@models/dtos";
import { ApiService } from "@services/api/api.service";

@Injectable({
    providedIn: "root",
})
export class AppointmentManagementApiService extends ApiService {
    constructor(http: HttpClient) {
        super(http, "appointment-managements");
    }

    public getAll() {
        this.http
            .get<AppointmentManagementDto[]>(this.url, {
                headers: this.headers,
            })
            .pipe(map((dtos) => dtos.map(fromDto)))
            .subscribe((appointmentManagements) => {
                set((model) => {
                    if (model.appointmentManagements.length === 0) {
                        model.appointmentManagements = appointmentManagements;
                    }
                });
            });
    }

    public add(appointmentManagement: AppointmentManagement) {
        this.http
            .post<AppointmentManagementDto>(this.url, fromModel(appointmentManagement), {
                headers: this.headers.set("Content-Type", "application/json"),
            })
            .pipe(map(fromDto))
            .subscribe((appointmentManagement) => {
                set((model) => {
                    model.appointmentManagements.push(appointmentManagement);
                });
            });
    }

    public addBatch(appointmentManagements: AppointmentManagement[]) {
        this.http
            .post(`${this.url}/batch`, appointmentManagements.map(fromModel), {
                headers: this.headers.set("Content-Type", "application/json"),
            })
            .subscribe(() => {
                set((model) => {
                    model.appointmentManagements.push(...appointmentManagements);
                });
            });
    }

    public remove(appointmentManagement: AppointmentManagement) {
        this.http.delete(`${this.url}/${appointmentManagement.id?.appointmentId}/${appointmentManagement.id?.instructorId}`).subscribe(() => {
            set((model) => {
                model.appointmentManagements = model.appointmentManagements.filter(
                    (am) =>
                        !(
                            am.id?.appointmentId === appointmentManagement.id?.appointmentId &&
                            am.id?.instructorId === appointmentManagement.id?.instructorId
                        ),
                );
            });
        });
    }

    public removeBatch(appointmentManagements: AppointmentManagement[]) {
        appointmentManagements.forEach((am) => {
            this.remove(am);
        });
    }
}
