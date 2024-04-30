import {Component, OnInit} from '@angular/core';
import {PacketService} from "../../../shared/services/packet.service";
import {Packet} from "../../../shared/models/packet";
import {NgForOf} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AdminPacketComponent} from "../admin-packet/admin-packet.component";
import {MatExpansionModule} from "@angular/material/expansion";
import {PacketApiService} from "../../../shared/services/api/packet-api.service";

@Component({
  selector: 'app-admin-packets',
  standalone: true,
    imports: [
        NgForOf,
        ReactiveFormsModule,
        AdminPacketComponent,
        FormsModule,
        MatExpansionModule
    ],
  templateUrl: './admin-packets.component.html',
  styleUrl: './admin-packets.component.css'
})
export class AdminPacketsComponent implements OnInit {
    constructor(
        protected packetService: PacketService,
        protected packetApiService: PacketApiService
    ) {
        this.newPacket = {
            name: '',
            price: 0
        };
    }

    public newPacket: Packet;

    getAllPackets() {
        return this.packetService.get();
    }

    addPacket() {
        this.packetService.add(this.newPacket);

        this.newPacket = {
            name: '',
            price: 0
        };
    }

    ngOnInit(): void {
        this.packetApiService.getAll();
    }
}
