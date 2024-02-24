import { Component, Input } from '@angular/core';
import { Packet } from 'src/shared/models/packet';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {UserBuyPacketConfirmDialogComponent} from "../user-buy-packet-confirm-dialog/user-buy-packet-confirm-dialog.component";
import {Customer} from "../../../shared/models/customer";
import {OfferService} from "../../../shared/services/offer.service";

@Component({
  selector: 'app-user-packet',
  templateUrl: './user-packet.component.html',
  styleUrl: './user-packet.component.css'
})
export class UserPacketComponent {

    constructor(private dialog: MatDialog, protected offerService: OfferService) {
    }

    @Input({required: true})
    public packet!: Packet;
    @Input({ required: true })
    loggedInCustomer!: Customer;
    @Input({ required: true })
    showSignIn!: boolean;

    onBtnSignIn() {
        let dialogRef: MatDialogRef<UserBuyPacketConfirmDialogComponent> = this.dialog.open(
            UserBuyPacketConfirmDialogComponent,
            {
                height: '120px',
                width: '550px',
                data: {
                    packet: this.packet!,
                    loggedInCustomer: this.loggedInCustomer!,
                },
            },
        );
    }

    getOffers(packetId: number) {
        return this.offerService.get(offer => offer.id.packetId == packetId);
    }
}
