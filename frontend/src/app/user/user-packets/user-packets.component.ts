import { Component } from '@angular/core';
import { PacketService } from 'src/shared/services/packet.service';
import {CustomerService} from "../../../shared/services/customer.service";
import {Packet} from "../../../shared/models/packet";
import {PurchaseService} from "../../../shared/services/purchase.service";

@Component({
	selector: 'app-user-packets',
	templateUrl: './user-packets.component.html',
	styleUrl: './user-packets.component.css'
})
export class UserPacketsComponent {
	expandedIndex = 0;

	constructor(
		protected packetService: PacketService,
        protected customerService: CustomerService,
        protected purchaseService: PurchaseService
	) {
        
	}

    isIncluded(packet: Packet): boolean {
        return (
            this.purchaseService.get(
                (purchase) =>
                    purchase.id?.packetId === packet.id,
            ).length === 1
        );
    }
}
