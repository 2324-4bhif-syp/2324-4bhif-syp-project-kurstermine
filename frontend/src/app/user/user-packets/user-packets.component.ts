import { Component, inject, OnInit } from '@angular/core';
import { UserPacketComponent } from '../user-packet/user-packet.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PacketApiService } from '@services/api';
import { PurchaseApiService } from '@services/api';
import { StoreService } from '@services';
import { distinctUntilChanged, map } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-user-packets',
    standalone: true,
    imports: [UserPacketComponent, ReactiveFormsModule, FormsModule, AsyncPipe],
    templateUrl: './user-packets.component.html',
    styleUrl: './user-packets.component.css',
})
export class UserPacketsComponent implements OnInit {
    expandedIndex = 0;

    viewModelPackets = inject(StoreService).store.pipe(
        map((model) => model.packets),
        distinctUntilChanged(),
    );

    viewModelOffers = inject(StoreService).store.pipe(
        map((model) => model.offers),
        distinctUntilChanged(),
    );

    viewModelCustomer = inject(StoreService).store.pipe(
        map((model) => model.customer),
        distinctUntilChanged(),
    );

    constructor(
        protected packetApiService: PacketApiService,
        protected purchaseApiService: PurchaseApiService,
    ) {}

    searchValue: string = '';

    search() {
        this.packetApiService.search(this.searchValue);
    }

    ngOnInit(): void {
        this.packetApiService.getAll();
        this.purchaseApiService.getAllFromCustomer();
    }
}
