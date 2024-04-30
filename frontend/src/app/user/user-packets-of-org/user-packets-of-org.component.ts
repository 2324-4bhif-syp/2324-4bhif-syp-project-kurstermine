import {Component, OnInit} from '@angular/core';
import {Packet} from "../../../shared/models/packet";
import {PacketService} from "../../../shared/services/packet.service";
import {ActivatedRoute} from "@angular/router";
import {UserPacketsComponent} from "../user-packets/user-packets.component";
import {PacketApiService} from "../../../shared/services/api/packet-api.service";

@Component({
  selector: 'app-user-packets-of-org',
  standalone: true,
    imports: [
        UserPacketsComponent
    ],
  templateUrl: './user-packets-of-org.component.html',
  styleUrl: './user-packets-of-org.component.css'
})
export class UserPacketsOfOrgComponent implements OnInit {

    constructor(protected packetService: PacketService,
                protected packetApiService: PacketApiService,
                private route: ActivatedRoute,) {
    }

    public id = Number(this.route.snapshot.params['id']);

    /*@Input({required: true})
    protected organisation!: Organisation;*/

    getPacketsOfOrg(): Packet[] {
        return this.packetService.get(p => p.organisation?.id === this.id);
    }

    ngOnInit(): void {
        this.packetApiService.getAll();
    }
}
