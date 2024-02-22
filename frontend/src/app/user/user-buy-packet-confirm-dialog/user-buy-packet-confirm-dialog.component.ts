import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Customer} from "../../../shared/models/customer";
import {PurchaseService} from "../../../shared/services/purchase.service";
import {Packet} from "../../../shared/models/packet";
import {Purchase} from "../../../shared/models/purchase";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-user-buy-user-packet-user-confirm-dialog',
  standalone: true,
    imports: [
        MatButtonModule
    ],
  templateUrl: './user-buy-packet-confirm-dialog.component.html',
  styleUrl: './user-buy-packet-confirm-dialog.component.css'
})
export class UserBuyPacketConfirmDialogComponent {
    constructor(
        protected purchaseService: PurchaseService,
        public dialogRef: MatDialogRef<UserBuyPacketConfirmDialogComponent>,
        @Inject(MAT_DIALOG_DATA)
        public data: { packet: Packet; loggedInCustomer: Customer },
    ) {
        this.packet = data.packet;
        this.loggedInCustomer = data.loggedInCustomer;
    }

    packet!: Packet;
    loggedInCustomer!: Customer;

    onBtnCancel() {
        this.dialogRef.close();
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

        this.purchaseService.add(purchase);
        this.dialogRef.close();
    }
}
