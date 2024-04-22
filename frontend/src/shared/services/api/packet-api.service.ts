import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Packet, fromPacketDto } from 'src/shared/models/packet';
import {fromPacket, PacketDto} from 'src/shared/models/dtos/packet-dto';
import {map, Observable} from "rxjs";

@Injectable({
	providedIn: 'root'
})
export class PacketApiService extends ApiService<Packet, PacketDto> {
	constructor(http: HttpClient) {
		super(http, "packets", fromPacketDto);
	}

    public add(packet: Packet): Observable<Packet> {
        return this.http
            .post<PacketDto>(`${this.url}`, fromPacket(packet), {
                headers: this.headers.set('Content-Type', 'application/json'),
            })
            .pipe(
                map((packetDto: PacketDto) => {
                    return fromPacketDto(packetDto);
                }),
            );
    }

    public search(pattern: String): Observable<Packet[]> {
        return this.http
            .get<PacketDto[]>(`${this.url}/search?pattern=${pattern}`)
            .pipe(
                map((packetDtos: PacketDto[]) => {
                    return packetDtos.map(packetDto => fromPacketDto(packetDto));
                })
            )
    }
}
