import { Injectable } from '@angular/core';
import { PacketApiService } from './api/packet-api.service';
import { Packet } from '../models/packet';
import {ReplayBaseService} from "./replay-base-service";

@Injectable({
    providedIn: 'root'
})
export class PacketService extends ReplayBaseService<Packet> {
    finished = false;

    constructor(
        protected api: PacketApiService
    ) {
        super(api, api.getAll, (packet) => super.add(...packet));
    }
}
