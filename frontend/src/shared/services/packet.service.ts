import { Injectable } from '@angular/core';
import { PacketApiService } from './api/packet-api.service';
import { Service } from './service';
import { Packet } from '../models/packet';

@Injectable({
    providedIn: 'root'
})
export class PacketService extends Service<Packet> {
    finished = false;

    constructor(
        protected api: PacketApiService
    ) {
        super()

        this.api.getAll().subscribe({
            next: (packet) => {
                super.add(...packet);
                this.finished = true;
                this.notifyListeners();
            },
        });
    }

    notifyListeners() {
        this.finishedListeners.forEach((listener) => listener());
    }

    finishedListeners: (() => void)[] = [];
}
