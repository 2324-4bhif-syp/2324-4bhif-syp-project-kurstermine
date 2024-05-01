import {Component, inject, Input, OnInit} from '@angular/core';
import { Packet } from 'src/shared/models/packet';
import {Customer, Offer, Purchase} from "@models";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {RouterLink} from "@angular/router";
import {OfferApiService, PurchaseApiService} from "@services/api";
import {StoreService} from "@services";
import {distinctUntilChanged, map} from "rxjs";

@Component({
    selector: 'app-user-packet',
    standalone: true,
    imports: [
        MatButtonModule,
        MatCardModule,
        MatIconModule,
        RouterLink
    ],
    templateUrl: './user-packet.component.html',
    styleUrl: './user-packet.component.css'
})
export class UserPacketComponent implements OnInit {

    viewModelOffers = inject(StoreService)
        .store
        .pipe(
            map(model => model.offers),
            distinctUntilChanged()
        )

    viewModelPurchases = inject(StoreService)
        .store
        .pipe(
            map(model => model.purchases),
            distinctUntilChanged()
        )

    constructor(
        protected offerApiService: OfferApiService,
        protected purchaseApiService: PurchaseApiService,
    ) {
    }

    @Input({required: true})
    public packet!: Packet;
    @Input({ required: true })
    loggedInCustomer!: Customer;

    hasUserBought(packet: Packet): boolean {
        let data: Purchase[] = [];
        this.viewModelPurchases
            .subscribe(purchases => {
                data = purchases;
            });

        return data.filter(p => p.id?.packetId === packet.id).length === 1;
    }

    onBtnConfirm() {
        let purchase: Purchase = {
            id: {
                packetId: this.packet.id!,
                customerId: this.loggedInCustomer.id!,
            },
            packet: this.packet,
            customer: this.loggedInCustomer,
        };

        this.purchaseApiService.add(purchase);
    }

    getOffers(packetId: number) {
        let data: Offer[] = [];
        this.viewModelOffers
            .subscribe(offers => {
                data = offers;
            });

        return data.filter(o => o.id.packetId === packetId);
    }

    ngOnInit(): void {
        this.offerApiService.getAll();
    }
}
