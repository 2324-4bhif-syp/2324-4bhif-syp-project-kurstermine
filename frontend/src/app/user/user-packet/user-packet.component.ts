import { Component, inject, Input, OnInit } from '@angular/core';
import { Packet } from 'src/shared/models/packet';
import { Customer, Offer, Purchase } from '@models';
import { RouterLink } from '@angular/router';
import {
    OfferApiService,
    PurchaseApiService,
} from '@services/api';
import { StoreService } from '@services';
import { distinctUntilChanged, map } from 'rxjs';
import { KeycloakProfile } from 'keycloak-js';
import { userProfileToCustomer } from '@models/model';
import { KeycloakService } from 'keycloak-angular';

@Component({
    selector: 'app-user-packet',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './user-packet.component.html',
    styleUrl: './user-packet.component.css',
})
export class UserPacketComponent implements OnInit {
    viewModelOffers = inject(StoreService).store.pipe(
        map((model) => model.offers),
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
            packet: this.packet,
            customer: this.loggedInCustomer!,
        };
        console.log(purchase);

        this.purchaseApiService.add(purchase);
    }

    getOffers(packetId: number) {
        let data: Offer[] = [];
        this.viewModelOffers.subscribe((offers) => {
            data = offers;
        });

        return data.filter((o) => o.id.packetId === packetId);
    }

    ngOnInit(): void {
        this.offerApiService.getAll();
        this.purchaseApiService.getAllFromCustomer();
    }
}
