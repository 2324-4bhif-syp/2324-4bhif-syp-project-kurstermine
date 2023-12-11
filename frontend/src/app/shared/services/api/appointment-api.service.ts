import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { AppointmentDto, fromAppointment } from '../../models/dtos/appointment-dto';
import { Appointment, fromAppointmentDto } from '../../models/appointment';

@Injectable({
  providedIn: 'root'
})
export class AppointmentApiService {

  protected http: HttpClient;
  protected url: string;
  protected headers: HttpHeaders;

  constructor(http: HttpClient) {
    this.http = http;
    this.url = `${environment.apiUrl}/appointments`;
    this.headers = new HttpHeaders().set("Accept", "application/json")
  }

  public getAll(): Observable<Appointment[]> {
    return this.http.get<AppointmentDto[]>(`${this.url}`, {
      headers: this.headers
    }).pipe(
      map(appointments => {
        return appointments.map<Appointment>(fromAppointmentDto);
      })
    )
  }

  public getAllFromCustomer(id: number): Observable<Appointment[]> {
    return this.http.get<AppointmentDto[]>(`${this.url}/customer/${id}`, {
      headers: this.headers
    }).pipe(
      map(appointments => {
        return appointments.map<Appointment>(fromAppointmentDto);
      })
    )
  }

  public add(appointment: Appointment): Observable<Appointment> {
    return this.http.post<AppointmentDto>(`${this.url}`, fromAppointment(appointment), {
      headers: this.headers.set("Content-Type", "application/json")
    }).pipe(
      map(appointment => {
        return fromAppointmentDto(appointment)
      })
    )
  }
}

