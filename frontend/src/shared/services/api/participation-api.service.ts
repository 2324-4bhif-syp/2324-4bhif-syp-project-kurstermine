import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import {
    fromParticipationDto,
    Participation,
} from '../../models/participation';
import {
    fromParticipation,
    ParticipationDto,
} from '../../models/dtos/participation-dto';
import { ApiService } from './api.service';

@Injectable({
    providedIn: 'root',
})
export class ParticipationApiService extends ApiService<
    Participation,
    ParticipationDto
> {
    constructor(http: HttpClient) {
        super(http, 'admin-participations', fromParticipationDto);
    }

    public getAllFromCustomer(id: string): Observable<Participation[]> {
        return this.http
            .get<ParticipationDto[]>(`${this.url}/customer/${id}`, {
                headers: this.headers,
            })
            .pipe(
                map((appointments) => {
                    return appointments.map<Participation>(
                        fromParticipationDto,
                    );
                }),
            );
    }

    public add(participation: Participation): Observable<Participation> {
        return this.http
            .post<ParticipationDto>(
                this.url,
                fromParticipation(participation),
                {
                    headers: this.headers.set(
                        'Content-Type',
                        'application/json',
                    ),
                },
            )
            .pipe(
                map((participation) => {
                    return fromParticipationDto(participation);
                }),
            );
    }

    public remove(participation: Participation): Observable<object> {
        return this.http.delete(
            `${this.url}/${participation.id?.appointmentId}/${participation.id?.customerId}`,
        );
    }
}
