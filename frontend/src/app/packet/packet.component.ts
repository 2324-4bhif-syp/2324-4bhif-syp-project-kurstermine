import { Component, Input } from '@angular/core';
import { Packet } from 'src/shared/models/packet';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {BuyPacketConfirmDialogComponent} from "../buy-packet-confirm-dialog/buy-packet-confirm-dialog.component";
import {Customer} from "../../shared/models/customer";

@Component({
  selector: 'app-packet',
  templateUrl: './packet.component.html',
  styleUrl: './packet.component.css'
})
export class PacketComponent {

    constructor(private dialog: MatDialog) {
    }

    @Input({required: true})
    public packet!: Packet;
    @Input({ required: true })
    loggedInCustomer!: Customer;
    @Input({ required: true })
    showSignIn!: boolean;

    onBtnSignIn() {
        let dialogRef: MatDialogRef<BuyPacketConfirmDialogComponent> = this.dialog.open(
            BuyPacketConfirmDialogComponent,
            {
                height: '200px',
                width: '600px',
                data: {
                    packet: this.packet!,
                    loggedInCustomer: this.loggedInCustomer!,
                },
            },
        );
    }
}
