import { Component, CSP_NONCE, inject, Input, OnInit } from '@angular/core';
import { Packet } from 'src/shared/models/packet';
import { Customer, Offer, Purchase } from '@models';
import { RouterLink } from '@angular/router';
import { OfferApiService, PurchaseApiService } from '@services/api';
import { StoreService } from '@services';
import { distinctUntilChanged, map, of } from 'rxjs';
import { KeycloakProfile } from 'keycloak-js';
import { userProfileToCustomer } from '@models/model';
import { KeycloakService } from 'keycloak-angular';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-user-packet',
    standalone: true,
    imports: [RouterLink, AsyncPipe],
    templateUrl: './user-packet.component.html',
    styleUrl: './user-packet.component.css',
})
export class UserPacketComponent implements OnInit {
    viewModelOffers = inject(StoreService).store.pipe(
        map((model) => ({
            offers: model.offers
                .filter((offer) => offer.id.packetId == this.packet.id)
                .map((offer) => ({
                    ...offer,
                    appointment: model.appointments.find(
                        (appointment) =>
                            appointment.id === offer.id.appointmentId,
                    ),
                })),
        })),
        distinctUntilChanged(),
    );

    viewModelPurchases = inject(StoreService).store.pipe(
        map((model) => model.purchases),
        distinctUntilChanged(),
    );

    protected userProfile: KeycloakProfile | undefined;
    protected loggedInCustomer: Customer | undefined;

    constructor(
        protected offerApiService: OfferApiService,
        protected purchaseApiService: PurchaseApiService,
        protected readonly keycloak: KeycloakService,
    ) {
        keycloak.loadUserProfile().then((profile) => {
            this.userProfile = profile;
            this.loggedInCustomer = userProfileToCustomer(this.userProfile!);
        });
    }

    @Input({ required: true })
    public packet!: Packet;

    hasUserBought(packet: Packet): boolean {
        let data: Purchase[] = [];
        this.viewModelPurchases.subscribe((purchases) => {
            data = purchases;
        });

        return data.filter((p) => p.id?.packetId === packet.id).length === 1;
    }

    onBtnConfirm() {
        let purchase: Purchase = {
            id: {
                packetId: this.packet.id!,
                customerId: this.loggedInCustomer!.id!,
            },
        };

        this.purchaseApiService.add(purchase);
    }

    ngOnInit(): void {
        this.offerApiService.getAll();
        this.purchaseApiService.getAllFromCustomer();
    }
}
