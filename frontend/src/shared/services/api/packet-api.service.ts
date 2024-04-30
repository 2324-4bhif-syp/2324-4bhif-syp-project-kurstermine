import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from "rxjs";
import { fromPacket, PacketDto } from 'src/shared/models/dtos/packet-dto';
import { set } from 'src/shared/models/model';
import { fromPacketDto, Packet } from 'src/shared/models/packet';
import { ApiService } from './api.service';

@Injectable({
	providedIn: 'root'
})
export class PacketApiService extends ApiService {
	constructor(http: HttpClient) {
		super(http, "packets");
	}

    public getAll() {
        this.http
            .get<PacketDto[]>(this.url, {
                headers: this.headers,
            })
            .pipe(
                map((dtos) => {
                    return dtos.map<Packet>(fromPacketDto);
                }),
            )
            .subscribe(packets => {
                set(model => {
                    model.packets = packets;
                });
            });
    }

    public add(packet: Packet) {
        this.http
            .post<PacketDto>(`${this.url}`, fromPacket(packet), {
                headers: this.headers.set('Content-Type', 'application/json'),
            })
            .pipe(
                map((packetDto: PacketDto) => {
                    return fromPacketDto(packetDto);
                }),
            )
            .subscribe(packet => {
                set(model => {
                    model.packets.push(packet);
                });
            });
    }

    public search(pattern: String) {
        this.http
            .get<PacketDto[]>(`${this.url}/search?pattern=${pattern}`)
            .pipe(
                map((packetDtos: PacketDto[]) => {
                    return packetDtos.map(packetDto => fromPacketDto(packetDto));
                })
            )
            .subscribe(packets => {
                set(model => {
                    model.packets = packets;
                });
            });
    }
}
