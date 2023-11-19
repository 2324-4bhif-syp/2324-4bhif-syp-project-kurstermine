import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { getTestBed } from '@angular/core/testing';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { AppointmentDto } from '../../models/dtos/appointment-dto';
import { Appointment } from '../../models/appointment';

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
    return this.http.get<AppointmentDto[]>(`${this.url}/appointments`, {
      headers: this.headers
    }).pipe(
      map(appointments => {
        return appointments.map<Appointment>(appointment => {
          return {
            id: appointment.id,
            address: appointment.address,
            date: new Date(appointment.date),
            duration: appointment.duration,
            name: appointment.name
          }
        });
      })
    )
  }
}

