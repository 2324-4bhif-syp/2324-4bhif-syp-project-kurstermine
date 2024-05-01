import { Component, inject, OnInit } from '@angular/core';
import { Packet } from "@models";
import { AsyncPipe, NgForOf } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AdminPacketComponent } from "@components/admin/admin-packet/admin-packet.component";
import { MatExpansionModule } from "@angular/material/expansion";
import { PacketApiService } from "@services/api";
import { StoreService } from '@services/store.service';
import { distinctUntilChanged, map } from 'rxjs';

@Component({
    selector: 'app-admin-packets',
    standalone: true,
    imports: [
        NgForOf,
        ReactiveFormsModule,
        AdminPacketComponent,
        FormsModule,
        MatExpansionModule,
        AsyncPipe
    ],
    templateUrl: './admin-packets.component.html',
    styleUrl: './admin-packets.component.css'
})
export class AdminPacketsComponent implements OnInit {

    private packetApiService = inject(PacketApiService);

    protected viewModel = inject(StoreService)
        .store
        .pipe(
            map(model => model.packets),
            distinctUntilChanged(),
        );

    constructor() {
        this.newPacket = {
            name: '',
            price: 0
        };
    }

    public newPacket: Packet;

    addPacket() {
        this.packetApiService.add(this.newPacket);

        this.newPacket = {
            name: '',
            price: 0
        };
    }

    ngOnInit(): void {
        this.packetApiService.getAll();
    }
}
