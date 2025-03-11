import { HttpClient } from "@angular/common/http";
import { Injectable, model } from "@angular/core";
import { map, tap } from "rxjs";
import { set, Appointment, fromAppointmentDto as fromDto } from "@models";
import { AppointmentDto, fromAppointment as fromModel } from "@models/dtos";
import { ApiService } from "@services/api/api.service";

@Injectable({
  providedIn: "root",
})
export class AppointmentApiService extends ApiService {
  constructor(http: HttpClient) {
    super(http, "appointments");
  }

  public getAll() {
    this.http
      .get<AppointmentDto[]>(this.url, {
        headers: this.headers,
      })
      .pipe(map((dtos) => dtos.map(fromDto)))
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
      .post<AppointmentDto>(`${this.url}`, fromModel(appointment), {
        headers: this.headers.set("Content-Type", "application/json"),
      })
      .pipe(map(fromDto))
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
        map((appointmentDtos) => {
          return appointmentDtos.map(fromDto);
        }),
      )
      .subscribe((appointments) => {
        set((model) => {
          model.appointments = appointments;
        });
      });
  }
}
