import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ApiService } from './api.service';
import {fromPurchaseDto, Purchase} from "../../models/purchase";
import {fromPurchase, PurchaseDto} from "../../models/dtos/purchase-dto";
import {fromParticipationDto, Participation} from "../../models/participation";
import {ParticipationDto} from "../../models/dtos/participation-dto";

@Injectable({
    providedIn: 'root',
})
export class PurchaseApiService extends ApiService<
    Purchase,
    PurchaseDto
> {
    constructor(http: HttpClient) {
        super(http, 'purchases', fromPurchaseDto);
    }

    public getAllFromCustomer(id: string): Observable<Purchase[]> {
        return this.http
            .get<PurchaseDto[]>(`${this.url}/customer/${id}`, {
                headers: this.headers,
            })
            .pipe(
                map((purchasesDto) => {
                    return purchasesDto.map<Purchase>(
                        fromPurchaseDto,
                    );
                }),
            );
    }

    public add(purchase: Purchase): Observable<Participation[]> {
        return this.http.post<ParticipationDto[]>(
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
            );
    }

    public remove(purchase: Purchase): Observable<object> {
        return this.http.delete(
            `${this.url}/${purchase.id?.packetId}/${purchase.id?.customerId}`,
        );
    }
}
