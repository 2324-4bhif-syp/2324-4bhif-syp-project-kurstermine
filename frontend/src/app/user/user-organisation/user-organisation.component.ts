import {Component, Input, OnInit} from '@angular/core';
import {Organisation} from "../../../shared/models/organisation";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {PacketService} from "../../../shared/services/packet.service";
import {Packet} from "../../../shared/models/packet";
import {animate, keyframes, style, transition, trigger} from "@angular/animations";
import {UserPacketComponent} from "../user-packet/user-packet.component";
import {RouterLink, RouterLinkActive} from "@angular/router";
import {OfferService} from "../../../shared/services/offer.service";
import {MatMenuModule} from "@angular/material/menu";
import {MatProgressBarModule} from "@angular/material/progress-bar";

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
export class UserOrganisationComponent implements OnInit{

    @Input({ required: true })
    organisation!: Organisation;
    protected progressBarValue: number = 0;

    constructor(protected packetService: PacketService,
                protected offerService: OfferService) {
        //console.log(this.packetsOfOrg)
    }

    ngOnInit(): void {
        this.startTimer();
    }

    ngOnDestroy(): void {
        clearInterval(this.intervalId);
        clearInterval(this.intervalProgressBar);
    }

    startTimer(): void {
        this.intervalProgressBar = setInterval(() => {
            this.progressBarValue = this.progressBarValue + 0.515;
        }, 50)

        this.intervalId = setInterval(() => {
            this.currentIndex = (this.currentIndex + 1) % this.getPacketsOfOrg().length;
            this.progressBarValue = 0;
        }, 10000);
    }

    currentIndex: number = 0;
    intervalId: any;
    intervalProgressBar: any;

    // TODO: Make Endpoint in Backend for getting all Packets from 1 Organisation
    getPacketsOfOrg(): Packet[] {
        return this.packetService.get(p => p.organisation?.id === this.organisation.id);
    }

    getOffers(packetId: number) {
        return this.offerService.get(offer => offer.id.packetId == packetId);
    }
}
