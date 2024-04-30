import {Component, Input, OnInit} from '@angular/core';
import { PacketService } from 'src/shared/services/packet.service';
import {CustomerService} from "../../../shared/services/customer.service";
import {Packet} from "../../../shared/models/packet";
import {PurchaseService} from "../../../shared/services/purchase.service";
import {UserPacketComponent} from "../user-packet/user-packet.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PacketApiService} from "../../../shared/services/api/packet-api.service";
import {PurchaseApiService} from "../../../shared/services/api/purchase-api.service";

@Component({
	selector: 'app-user-packets',
    standalone: true,
    imports: [
        UserPacketComponent,
        ReactiveFormsModule,
        FormsModule
    ],
	templateUrl: './user-packets.component.html',
	styleUrl: './user-packets.component.css'
})
export class UserPacketsComponent implements OnInit {
	expandedIndex = 0;

	constructor(
		protected packetService: PacketService,
		protected packetApiService: PacketApiService,
        protected customerService: CustomerService,
        protected purchaseService: PurchaseService,
        protected purchaseApiService: PurchaseApiService
	) {
	}

    @Input()
    packets: Packet[] | undefined;
    searchValue: string = "";

    isIncluded(packet: Packet): boolean {
        return (
            this.purchaseService.get(
                (purchase) =>
                    purchase.id?.packetId === packet.id,
            ).length === 1
        );
    }

    search() {
        this.packetService.search(this.searchValue);
    }

    getPackets() {
        if (this.packets) {
            return this.packets;
        }

        return this.packetService.get()
    }

    ngOnInit(): void {
        this.packetApiService.getAll();
        this.purchaseApiService.getAll();
    }
}
