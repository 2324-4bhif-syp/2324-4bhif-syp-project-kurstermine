import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Participation, fromParticipationDto } from '../../models/participation';
import { ParticipationDto, fromParticipation } from '../../models/dtos/participation-dto';
import {ApiService} from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class ParticipationApiService extends ApiService<Participation, ParticipationDto> {
  constructor(http: HttpClient) {
    super(http, "participations", fromParticipationDto)
  }

  public getAllFromCustomer(id: number): Observable<Participation[]> {
    return this.http.get<ParticipationDto[]>(`${this.url}/customer/${id}`, {
      headers: this.headers
    }).pipe(
      map(appointments => {
        return appointments.map<Participation>(fromParticipationDto);
      })
    )
  }

  public add(participation: Participation): Observable<Participation> {
    return this.http.post<ParticipationDto>(this.url, fromParticipation(participation), {
      headers: this.headers.set("Content-Type", "application/json")
    }).pipe(
      map(participation => {
        return fromParticipationDto(participation)
      })
    )
  }

  public remove(participation: Participation): Observable<object> {
    return this.http.delete(`${this.url}/${participation.appointment.id}/${participation.customer.id}`);
  }
}
