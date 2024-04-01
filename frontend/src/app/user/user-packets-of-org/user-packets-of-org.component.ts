import {Component} from '@angular/core';
import {Packet} from "../../../shared/models/packet";
import {PacketService} from "../../../shared/services/packet.service";
import {ActivatedRoute} from "@angular/router";
import {UserPacketsComponent} from "../user-packets/user-packets.component";

@Component({
  selector: 'app-user-packets-of-org',
  standalone: true,
    imports: [
        UserPacketsComponent
    ],
  templateUrl: './user-packets-of-org.component.html',
  styleUrl: './user-packets-of-org.component.css'
})
export class UserPacketsOfOrgComponent {

    constructor(protected packetService: PacketService,
                private route: ActivatedRoute,) {
    }

    public id = Number(this.route.snapshot.params['id']);

    /*@Input({required: true})
    protected organisation!: Organisation;*/

    getPacketsOfOrg(): Packet[] {
        return this.packetService.get(p => p.organisation?.id === this.id);
    }
}
