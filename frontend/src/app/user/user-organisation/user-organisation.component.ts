import { Component, Input, OnInit } from '@angular/core';
import { Organisation } from "../../../shared/models/organisation";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { PacketService } from "../../../shared/services/packet.service";
import { Packet } from "../../../shared/models/packet";
import { animate, keyframes, style, transition, trigger } from "@angular/animations";
import { UserPacketComponent } from "../user-packet/user-packet.component";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { OfferService } from "../../../shared/services/offer.service";
import { MatMenuModule } from "@angular/material/menu";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-user-organisation',
    standalone: true,
    imports: [
        MatButtonModule,
        MatCardModule,
        MatIconModule,
        UserPacketComponent,
        RouterLink,
        RouterLinkActive,
        MatMenuModule,
        MatProgressBarModule
    ],
    templateUrl: './user-organisation.component.html',
    styleUrl: './user-organisation.component.css',
    animations: [
        trigger('fadeInOut', [
            transition(':increment, :decrement', [
                style({ position: 'relative' }),  // Set the position to relative to allow movement
                animate('0.5s', keyframes([
                    style({ opacity: 0, transform: 'translateX(-10%)' }), // Move in from left and fade in (new word)
                    style({ opacity: 1, transform: 'translateX(0)' })     // Move to original position and fully visible
                ]))
            ])
        ])
    ]
})
export class UserOrganisationComponent {

    @Input({ required: true })
    organisation!: Organisation;

    constructor(protected packetService: PacketService,
        protected offerService: OfferService) {
        //console.log(this.packetsOfOrg)
    }

    // TODO: Make Endpoint in Backend for getting all Packets from 1 Organisation
    getPacketsOfOrg(): Packet[] {
        return this.packetService.get(p => p.organisation?.id === this.organisation.id);
    }

    getOffers(packetId: number) {
        return this.offerService.get(offer => offer.id.packetId == packetId);
    }

    getImageUrl() {
        return environment.apiUrl + '/organisations/' + this.organisation.id + '/image';
    }
}
