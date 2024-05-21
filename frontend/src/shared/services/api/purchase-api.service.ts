import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { ApiService } from '@services/api/api.service';
import { fromParticipationDto, fromPurchaseDto, Purchase, set } from '@models';
import { PurchaseDto, ParticipationDto, fromPurchase } from '@models/dtos';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';

@Injectable({
    providedIn: 'root',
})
export class PurchaseApiService extends ApiService {
    protected readonly keycloak: KeycloakService;
    protected userProfile: KeycloakProfile | undefined;

    constructor(http: HttpClient, keycloak: KeycloakService) {
        super(http, 'purchases');

        this.keycloak = keycloak;

        keycloak.loadUserProfile().then((profile) => {
            this.userProfile = profile;
        });
    }

    public getAll() {
        this.http
            .get<PurchaseDto[]>(this.url, {
                headers: this.headers,
            })
            .pipe(
                map((purchasesDto) => {
                    return purchasesDto.map<Purchase>(fromPurchaseDto);
                }),
            )
            .subscribe((purchases) => {
                set((model) => {
                    if (model.purchases.length === 0) {
                        model.purchases = purchases;
                    }
                });
            });
    }

    public getAllFromCustomer() {
        this.http
            .get<PurchaseDto[]>(
                `${this.url}/customer/${this.userProfile?.id}`,
                {
                    headers: this.headers,
                },
            )
            .pipe(
                map((purchasesDto) => {
                    return purchasesDto.map<Purchase>(fromPurchaseDto);
                }),
            )
            .subscribe((purchases) => {
                set((model) => {
                    if (model.purchases.length === 0) {
                        model.purchases = purchases;
                    }
                });
            });
    }

    public add(purchase: Purchase) {
        this.http
            .post<ParticipationDto[]>(this.url, fromPurchase(purchase), {
                headers: this.headers.set('Content-Type', 'application/json'),
            })
            .pipe(
                map((participationDtos) =>
                    participationDtos.map(fromParticipationDto),
                ),
            )
            .subscribe((participations) => {
                set((model) => {
                    model.participations.push(...participations);
                    model.purchases.push(purchase);
                });
            });
    }

    public remove(purchase: Purchase) {
        this.http
            .delete(
                `${this.url}/${purchase.id?.packetId}/${purchase.id?.customerId}`,
            )
            .subscribe(() => {
                set((model) => {
                    model.purchases = model.purchases.filter(
                        (p) => p !== purchase,
                    );
                });
            });
    }
}
