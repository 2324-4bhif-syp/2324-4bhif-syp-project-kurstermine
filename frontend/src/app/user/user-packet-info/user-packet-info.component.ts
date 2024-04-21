import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { Offer } from 'src/shared/models/offer';
import { Packet } from 'src/shared/models/packet';
import { CustomerService } from 'src/shared/services/customer.service';
import { OfferService } from 'src/shared/services/offer.service';
import { PacketService } from 'src/shared/services/packet.service';
import { PurchaseService } from 'src/shared/services/purchase.service';
import { UserBuyPacketConfirmDialogComponent } from '../user-buy-packet-confirm-dialog/user-buy-packet-confirm-dialog.component';
import { UserAppointmentComponent } from "../user-appointment/user-appointment.component";

@Component({
    selector: 'app-user-packet-info',
    standalone: true,
    templateUrl: './user-packet-info.component.html',
    styleUrl: './user-packet-info.component.css',
    imports: [MatCardModule, MatIconModule, MatButtonModule, UserAppointmentComponent]
})
export class UserPacketInfoComponent {
    constructor(
        protected offerService: OfferService,
        protected packetService: PacketService,
        protected customerService: CustomerService,
        protected purchaseService: PurchaseService,
        private route: ActivatedRoute,
        private dialog: MatDialog
        ) {
        if (isNaN(this.id)) {
            this.id = this.packetPathId;
        }
    }

    public id = Number(this.route.snapshot.params['id']);
    public packetPathId = Number(this.route.snapshot.params['packetId']);

    public get wasPurchased(): boolean {
        return this.purchaseService.get((purchase) => purchase.id?.packetId === this.id).length === 1;
    }

    public get packet(): Packet | undefined {
        return this.packetService.get((packet) => packet.id === this.id)[0];
    }

    public get offers(): Offer[] {
        return this.offerService.get((offer) => offer.id.packetId === this.id);
    }

    public get loggedInCustomer() {
        return this.customerService.get()[0];
    }

    onBtnSignIn() {
        let dialogRef: MatDialogRef<UserBuyPacketConfirmDialogComponent> = this.dialog.open(
            UserBuyPacketConfirmDialogComponent,
            {
                height: '150px',
                width: '500px',
                data: {
                    packet: this.packet!,
                    loggedInCustomer: this.loggedInCustomer!,
                },
            },
        );
    }


    protected readonly String = String;
}
