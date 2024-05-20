import {Component, inject, OnInit} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { Offer } from 'src/shared/models/offer';
import { Packet } from 'src/shared/models/packet';
import { UserAppointmentComponent } from "../user-appointment/user-appointment.component";
import {OfferApiService, PacketApiService, PurchaseApiService} from "@services/api";
import {Customer, Purchase} from "@models";
import {StoreService} from "@services";
import {distinctUntilChanged, map} from "rxjs";
import {userProfileToCustomer} from "@models/model";
import {KeycloakService} from "keycloak-angular";
import {KeycloakProfile} from "keycloak-js";

@Component({
    selector: 'app-user-packet-info',
    standalone: true,
    templateUrl: './user-packet-info.component.html',
    styleUrl: './user-packet-info.component.css',
    imports: [MatCardModule, MatIconModule, MatButtonModule, UserAppointmentComponent]
})
export class UserPacketInfoComponent implements OnInit {

    viewModelPurchases = inject(StoreService)
        .store
        .pipe(
            map(model => model.purchases),
            distinctUntilChanged()
        )

    viewModelPackets = inject(StoreService)
        .store
        .pipe(
            map(model => model.packets),
            distinctUntilChanged()
        )

    viewModelOffers = inject(StoreService)
        .store
        .pipe(
            map(model => model.offers),
            distinctUntilChanged()
        )

    viewModelCustomer = inject(StoreService)
        .store
        .pipe(
            map(model => model.customer),
            distinctUntilChanged()
        )

    protected userProfile: KeycloakProfile | undefined;
    protected loggedInCustomer: Customer | undefined;

    constructor(
        protected offerApiService: OfferApiService,
        protected packetApiService: PacketApiService,
        protected purchaseApiService: PurchaseApiService,
        private route: ActivatedRoute,
        protected readonly keycloak: KeycloakService
        ) {
        if (isNaN(this.id)) {
            this.id = this.packetPathId;
        }

        keycloak.loadUserProfile().then((profile) => {
            this.userProfile = profile;
            this.loggedInCustomer = userProfileToCustomer(this.userProfile!);
        });
    }

    public id = Number(this.route.snapshot.params['id']);
    public packetPathId = Number(this.route.snapshot.params['packetId']);

    public get wasPurchased(): boolean {
        let data: Purchase[] = [];
        this.viewModelPurchases
            .subscribe(purchases => {
                data = purchases;
            });

        return data.filter(p => p.id?.packetId === this.id).length === 1;
    }

    public get packet(): Packet | undefined {
        let data: Packet[] = [];
        this.viewModelPackets
            .subscribe(packets => {
                data = packets;
            });

        return data.filter(p => p.id === this.id)[0];
    }

    public get offers(): Offer[] {
        let data: Offer[] = [];
        this.viewModelOffers
            .subscribe(offers => {
                data = offers;
            });

        return data.filter(o => o.id.packetId === this.id);
    }

    onBtnConfirm() {
        let purchase: Purchase = {
            id: {
                packetId: this.packet?.id!,
                customerId: this.loggedInCustomer!.id!,
            },
            packet: this.packet!,
            customer: this.loggedInCustomer!,
        };
        console.log(purchase)

        this.purchaseApiService.add(purchase);
    }

    ngOnInit(): void {
        this.packetApiService.getAll();
        this.purchaseApiService.getAllFromCustomer();
        this.offerApiService.getAll();
    }

    protected readonly String = String;
}
