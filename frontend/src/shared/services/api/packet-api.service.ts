import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Packet, fromPacketDto } from 'src/shared/models/packet';
import { PacketDto } from 'src/shared/models/dtos/packet-dto';

@Injectable({
	providedIn: 'root'
})
export class PacketApiService extends ApiService<Packet, PacketDto> {

	constructor(http: HttpClient) {
		super(http, "packets", fromPacketDto);
	}
}
