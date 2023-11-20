import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { Customer } from '../../models/customer';
import { CustomerDto } from '../../models/dtos/customer-dto';
import { Participation, fromParticipationDto } from '../../models/participation';
import { ParticipationDto, fromParticipation } from '../../models/dtos/participation-dto';

@Injectable({
  providedIn: 'root'
})
export class ParticipationApiService {

  protected http: HttpClient;
  protected url: string;
  protected headers: HttpHeaders;

  constructor(http: HttpClient) {
    this.http = http;
    this.url = `${environment.apiUrl}/participations`;
    this.headers = new HttpHeaders().set("Accept", "application/json");
  }

  public getAll(): Observable<Participation[]> {
    return this.http.get<ParticipationDto[]>(this.url, {
      headers: this.headers
    }).pipe(
      map(participations => {
          return participations.map<Participation>(fromParticipationDto);
      })
    )
  }

  public add(participation: Participation): Observable<Participation> {
    return this.http.post<ParticipationDto>(this.url, fromParticipation(participation), {
      headers: this.headers.set("Conent-Type", "application/json")
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
