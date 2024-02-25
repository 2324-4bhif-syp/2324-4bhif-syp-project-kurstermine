import { CSP_NONCE, Component, Input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, withRouterConfig } from '@angular/router';
import { KeycloakService } from 'keycloak-angular';
import { Offer } from 'src/shared/models/offer';
import { Packet } from 'src/shared/models/packet';
import { CustomerService } from 'src/shared/services/customer.service';
import { OfferService } from 'src/shared/services/offer.service';
import { PacketService } from 'src/shared/services/packet.service';
import { PurchaseService } from 'src/shared/services/purchase.service';

@Component({
    selector: 'app-user-packet-info',
    standalone: true,
    imports: [MatCardModule, MatIconModule, MatButtonModule],
    templateUrl: './user-packet-info.component.html',
    styleUrl: './user-packet-info.component.css'
})
export class UserPacketInfoComponent {
    constructor(
        protected offerService: OfferService, 
        protected packetService: PacketService,
        protected customerService: CustomerService,
        protected purchaseService: PurchaseService,
        private route: ActivatedRoute
        ) {
        customerService.get
    }

    public id = Number(this.route.snapshot.params['id']);

    public get wasPurchased(): boolean {
        return this.purchaseService.get((purchase) => purchase.id?.packetId === this.id).length === 1;
    }

    public get packet(): Packet | undefined {
        return this.packetService.get((packet) => packet.id === this.id)[0];
    }

    public get offers(): Offer[] {
        return this.offerService.get((offer) => offer.id.packetId === this.id);
    }


    protected readonly String = String;
}
