import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { fromParticipationDto, Participation, set } from '@models';
import { ApiService } from '@services/api/api.service';
import { ParticipationDto, fromParticipation } from '@models/dtos';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';

@Injectable({
    providedIn: 'root',
})
export class ParticipationApiService extends ApiService {
    protected readonly keycloak: KeycloakService;
    protected userProfile: KeycloakProfile | undefined;

    constructor(http: HttpClient, keycloak: KeycloakService) {
        super(http, 'participations');

        this.keycloak = keycloak;

        keycloak.loadUserProfile().then((profile) => {
            this.userProfile = profile;
        });
    }

    public getAll() {
        this.http
            .get<ParticipationDto[]>(this.url, {
                headers: this.headers,
            })
            .pipe(
                map((appointments) => {
                    return appointments.map<Participation>(
                        fromParticipationDto,
                    );
                }),
            )
            .subscribe((participations) => {
                set((model) => {
                    if (model.participations.length === 0) {
                        model.participations = participations;
                    }
                });
            });
    }

    public getAllFromCustomer() {
        this.http
            .get<ParticipationDto[]>(
                `${this.url}/customer/${this.userProfile?.id}`,
                {
                    headers: this.headers,
                },
            )
            .pipe(
                map((appointments) => {
                    return appointments.map<Participation>(
                        fromParticipationDto,
                    );
                }),
            )
            .subscribe((participations) => {
                set((model) => {
                    if (model.participations.length === 0) {
                        model.participations = participations;
                    }
                });
            });
    }

    public add(participation: Participation) {
        this.http
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
            )
            .subscribe((participation) => {
                set((model) => {
                    model.participations.push(participation);
                });
            });
    }

    public remove(participation: Participation) {
        this.http
            .delete(
                `${this.url}/${participation.id?.appointmentId}/${participation.id?.customerId}`,
            )
            .subscribe(() => {
                set((model) => {
                    model.participations = model.participations.filter(
                        (p) => p !== participation,
                    );
                });
            });
    }
}
