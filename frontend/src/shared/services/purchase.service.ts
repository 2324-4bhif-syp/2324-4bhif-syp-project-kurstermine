import { Injectable } from '@angular/core';
import { Service } from './service';
import { CustomerService } from './customer.service';
import { KeycloakService } from 'keycloak-angular';
import { Roles } from '../models/roles';
import {PacketService} from "./packet.service";
import {Purchase} from "../models/purchase";
import {PurchaseApiService} from "./api/purchase-api.service";
import {ParticipationService} from "./participation.service";
import {Participation} from "../models/participation";

@Injectable({
    providedIn: 'root',
})
export class PurchaseService extends Service<Purchase> {
    constructor(
        protected api: PurchaseApiService,
        protected customerService: CustomerService,
        protected packetService: PacketService,
        protected keycloak: KeycloakService,
        protected participationService: ParticipationService
    ) {
        super();

        if (!customerService.finished && !packetService.finished) {
            let isServiceFinished = false;

            customerService.finishedListeners.push(() => {
                isServiceFinished = !isServiceFinished;

                if (!isServiceFinished) {
                    this.getItems();
                }
            });

            packetService.finishedListeners.push(() => {
                isServiceFinished = !isServiceFinished;

                if (!isServiceFinished) {
                    this.getItems();
                }
            });
            return;
        }

        if (customerService.finished && !packetService.finished) {
            packetService.finishedListeners.push(() => this.getItems());
            return;
        }

        if (packetService.finished && !customerService.finished) {
            customerService.finishedListeners.push(() => this.getItems());
            return;
        }

        this.getItems();
    }

    getItems() {
        if(this.keycloak.getUserRoles().includes(Roles.Admin)) {
            this.api.getAll().subscribe({
                next: (purchases) => {
                    purchases.forEach((purchase) => {
                        super.add({
                            id: purchase.id,
                            packet: this.packetService.get(
                                (p) => p.id === purchase.id?.packetId,
                            )[0],
                            customer: this.customerService.get(
                                (c) => c.id === purchase.id?.customerId,
                            )[0],
                        });
                    });
                },
            });

            return;
        }

        if (this.keycloak.getUserRoles().includes(Roles.Customer)) {
            this.getAllFromCustomer(this.customerService.get()[0].id!);
        }
    }

    override add(item: Purchase): void {
        this.api.add(item).subscribe({
            next: (participations) => {
                super.add({
                    id: item.id,
                    packet: this.packetService.get(p => p.id === item.id?.packetId)[0],
                    customer: this.customerService.get(c => c.id === item.id?.customerId)[0]
                });

                participations.forEach((participation: Participation) =>
                    this.participationService.items.push(this.participationService.mapParticipation(participation)));
            },
        });
    }

    override remove(item: Purchase): void {
        this.api.remove(item).subscribe({
            next: () => {
                super.remove(item);
            },
        });
    }

    getAllFromCustomer(id: string): void {
        this.api.getAllFromCustomer(id).subscribe({
            next: (purchases) => {
                purchases.forEach((purchase) => {
                    super.add({
                        id: purchase.id,
                        packet: this.packetService.get(
                            (p) => p.id === purchase.id?.packetId,
                        )[0],
                        customer: this.customerService.get(
                            (c) => c.id === purchase.id?.customerId,
                        )[0],
                    });
                });
            },
        });
    }
}
