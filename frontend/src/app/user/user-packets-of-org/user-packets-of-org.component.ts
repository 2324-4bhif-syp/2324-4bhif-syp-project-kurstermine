import { Component, inject, OnInit } from '@angular/core';
import { Packet } from '../../../shared/models/packet';
import { ActivatedRoute } from '@angular/router';
import { UserPacketsComponent } from '../user-packets/user-packets.component';
import { PacketApiService } from '@services/api';
import { distinctUntilChanged, map } from 'rxjs';
import { StoreService } from '@services/store.service';

@Component({
    selector: 'app-user-packets-of-org',
    standalone: true,
    imports: [UserPacketsComponent],
    templateUrl: './user-packets-of-org.component.html',
    styleUrl: './user-packets-of-org.component.css',
})
export class UserPacketsOfOrgComponent implements OnInit {
    viewModelPackets = inject(StoreService).store.pipe(
        map((model) => model.packets),
        distinctUntilChanged(),
    );

    constructor(
        protected packetApiService: PacketApiService,
        private route: ActivatedRoute,
    ) {}

    public id = Number(this.route.snapshot.params['id']);

    getPacketsOfOrg(): Packet[] {
        let data: Packet[] = [];
        this.viewModelPackets.subscribe((packets) => {
            data = packets;
        });

        return data.filter((p) => p.organisation?.id === this.id);
    }

    ngOnInit(): void {
        this.packetApiService.getAll();
    }
}
