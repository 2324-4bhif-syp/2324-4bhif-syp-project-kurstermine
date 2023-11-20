import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import {AppointmentManagement, fromAppointmentManagementDto} from "../../models/appointmentManagement";
import {AppointmentManagementDto, fromAppointmentManagement} from "../../models/dtos/appointment-management-dto";

@Injectable({
  providedIn: 'root'
})
export class AppointmentManagementApiService {

  protected http: HttpClient;
  protected url: string;
  protected headers: HttpHeaders;

  constructor(http: HttpClient) {
    this.http = http;
    this.url = `${environment.apiUrl}/appointment-managements`;
    this.headers = new HttpHeaders().set("Accept", "application/json");
  }

  public getAll(): Observable<AppointmentManagement[]> {
    return this.http.get<AppointmentManagementDto[]>(this.url, {
      headers: this.headers
    }).pipe(map(appointmentManagements =>
          appointmentManagements.map<AppointmentManagement>(fromAppointmentManagementDto)));
  }

  public add(appointmentManagement: AppointmentManagement): Observable<AppointmentManagement> {
    return this.http.post<AppointmentManagementDto>(this.url, fromAppointmentManagement(appointmentManagement), {
      headers: this.headers.set("Content-Type", "application/json")
    }).pipe(map(appointmentManagement =>
        fromAppointmentManagementDto(appointmentManagement)));
  }

  public remove(appointmentManagement: AppointmentManagement): Observable<object> {
    return this.http.delete(`${this.url}/${appointmentManagement.appointment.id}/${appointmentManagement.instructor.id}`);
  }
}
