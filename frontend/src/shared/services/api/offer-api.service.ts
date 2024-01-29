import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { ApiService } from './api.service';
import {fromOfferDto, Offer} from "../../models/offer";
import {fromOffer, OfferDto} from "../../models/dtos/offer-dto";

@Injectable({
    providedIn: 'root',
})
export class OfferApiService extends ApiService<
    Offer,
    OfferDto
> {
    constructor(http: HttpClient) {
        super(http, 'offers', fromOfferDto);
    }

    public add(offer: Offer): Observable<Offer> {
        return this.http
            .post<OfferDto>(
                this.url,
                fromOffer(offer),
                {
                    headers: this.headers.set(
                        'Content-Type',
                        'application/json',
                    ),
                },
            )
            .pipe(
                map((offer) => {
                    return fromOfferDto(offer);
                }),
            );
    }

    public remove(offer: Offer): Observable<object> {
        return this.http.delete(
            `${this.url}/${offer.id?.appointmentId}/${offer.id?.packetId}`,
        );
    }
}
