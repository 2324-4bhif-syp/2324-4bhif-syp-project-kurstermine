import { Injectable } from '@angular/core';
import { OfferApiService } from './api/offer-api.service';
import { Service } from './service';
import { Offer } from '../models/offer';
import { AppointmentService } from './appointment.service';
import { KeycloakService } from 'keycloak-angular';
import {PacketService} from "./packet.service";

@Injectable({
    providedIn: 'root',
})
export class OfferService extends Service<Offer> {
    constructor(
        protected api: OfferApiService,
        protected packetService: PacketService,
        protected appointmentService: AppointmentService,
        protected keycloak: KeycloakService
    ) {
        super();
        if (!packetService.finished && !appointmentService.finished) {
            let isServiceFinished = false;

            packetService.finishedListeners.push(() => {
                isServiceFinished = !isServiceFinished;

                if (!isServiceFinished) {
                    this.getItems();
                }
            });

            appointmentService.finishedListeners.push(() => {
                isServiceFinished = !isServiceFinished;

                if (!isServiceFinished) {
                    this.getItems();
                }
            });
            return;
        }

        if (packetService.finished && !appointmentService.finished) {
            appointmentService.finishedListeners.push(() => this.getItems());
            return;
        }

        if (appointmentService.finished && !packetService.finished) {
            packetService.finishedListeners.push(() => this.getItems());
            return;
        }

        this.getItems();
    }

    getItems() {
        this.api.getAll().subscribe({
            next: (offers) => {
                offers.forEach((offer) => {
                    super.add(this.mapOffer(offer));
                });
            },
        });
    }

    override add(item: Offer): void {
        this.api.add(item).subscribe({
            next: (offer) => {
                super.add(this.mapOffer(offer));
            },
        });
    }

    override remove(item: Offer): void {
        this.api.remove(item).subscribe({
            next: () => {
                super.remove(item);
            },
        });
    }

    mapOffer(old: Offer) {
        return {
            id: old.id,
            appointment: this.appointmentService.get(a => a.id === old.id?.appointmentId)[0],
            packet: this.packetService.get(p => p.id === old.id?.packetId)[0]
        }
    }
}
