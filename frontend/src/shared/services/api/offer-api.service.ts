import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { fromOfferDto, Offer, set } from '@models';
import { ApiService } from '@services/api/api.service';
import { OfferDto, fromOffer } from '@models/dtos';

@Injectable({
    providedIn: 'root',
})
export class OfferApiService extends ApiService {
    constructor(http: HttpClient) {
        super(http, 'offers');
    }

    public getAll() {
        this.http
            .get<OfferDto[]>(this.url, {
                headers: this.headers,
            })
            .pipe(
                map((dtos) => {
                    return dtos.map<Offer>(fromOfferDto);
                }),
            )
            .subscribe((offers) => {
                set((model) => {
                    if (model.offers.length === 0) {
                        model.offers = offers;
                    }
                });
            });
    }

    public add(offer: Offer) {
        this.http
            .post<OfferDto>(this.url, fromOffer(offer), {
                headers: this.headers.set('Content-Type', 'application/json'),
            })
            .pipe(
                map((offer) => {
                    return fromOfferDto(offer);
                }),
            )
            .subscribe((offer) => {
                set((model) => {
                    model.offers.push(offer);
                });
            });
    }

    public remove(offer: Offer) {
        this.http
            .delete(
                `${this.url}/${offer.id?.appointmentId}/${offer.id?.packetId}`,
            )
            .subscribe(() => {
                set((model) => {
                    model.offers = model.offers.filter((o) => o !== offer);
                });
            });
    }
}
