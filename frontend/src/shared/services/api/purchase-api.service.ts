import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { ApiService } from '@services/api/api.service';
import { fromParticipationDto, fromPurchaseDto, Purchase, set } from '@models';
import { PurchaseDto, ParticipationDto, fromPurchase } from '@models/dtos';

@Injectable({
    providedIn: 'root',
})
export class PurchaseApiService extends ApiService {
    constructor(http: HttpClient) {
        super(http, 'purchases');
    }

    public getAll() {
        this.http
            .get<PurchaseDto[]>(this.url, {
                headers: this.headers,
            })
            .pipe(
                map((purchasesDto) => {
                    return purchasesDto.map<Purchase>(
                        fromPurchaseDto,
                    );
                }),
            )
            .subscribe((purchases) => {
                set((model) => {
                    model.purchases = purchases;
                });
            });
    }

    public getAllFromCustomer(id: string) {
        this.http
            .get<PurchaseDto[]>(`${this.url}/customer/${id}`, {
                headers: this.headers,
            })
            .pipe(
                map((purchasesDto) => {
                    return purchasesDto.map<Purchase>(
                        fromPurchaseDto,
                    );
                }),
            )
            .subscribe((purchases) => {
                set((model) => {
                    model.purchases = purchases;
                });
            });
    }

    public add(purchase: Purchase) {
        this.http.post<ParticipationDto[]>(
            this.url,
            fromPurchase(purchase),
            {
                headers: this.headers.set(
                    'Content-Type',
                    'application/json',
                ),
            },
        )
            .pipe(
                map(participationDtos => participationDtos.map(fromParticipationDto))
            )
            .subscribe(participations => {
                set(model => {
                    model.participations = participations;
                });
            });
    }

    public remove(purchase: Purchase) {
        this.http
            .delete(
                `${this.url}/${purchase.id?.packetId}/${purchase.id?.customerId}`,
            )
            .subscribe(() => {
                set(model => {
                    model.purchases = model.purchases.filter(p => p !== purchase);
                });
            });
    }
}
