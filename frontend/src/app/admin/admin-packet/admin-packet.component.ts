import {Component, Input} from '@angular/core';
import {Packet} from "../../../shared/models/packet";
import {NgForOf, NgIf} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatListModule} from "@angular/material/list";
import {MatCardModule} from "@angular/material/card";
import {OfferService} from "../../../shared/services/offer.service";
import {Appointment} from "../../../shared/models/appointment";
import {MatChipsModule} from "@angular/material/chips";
import {MatButtonModule} from "@angular/material/button";
import {ParticipationService} from "../../../shared/services/participation.service";
import {ActivatedRoute} from "@angular/router";
import {MatIconModule} from "@angular/material/icon";

@Component({
  selector: 'app-admin-packet',
  standalone: true,
    imports: [
        NgForOf,
        NgIf,
        ReactiveFormsModule,
        FormsModule,
        MatExpansionModule,
        MatListModule,
        MatCardModule,
        MatChipsModule,
        MatButtonModule,
        MatIconModule
    ],
  templateUrl: './admin-packet.component.html',
  styleUrl: './admin-packet.component.css'
})
export class AdminPacketComponent {
    constructor(protected offerService: OfferService,
                protected participationService: ParticipationService,
                private route: ActivatedRoute) {
    }

    @Input({required: true})
    public packet!: Packet;

    @Input({required: true})
    public displaySignedInBtn!: boolean;

    protected panelOpenState: boolean = false;

    protected id = this.route.snapshot.params['id'];

    protected getAllAppointmentsFromPacket(): Appointment[] {
        return this.offerService
            .get(o => o.packet.id === this.packet.id)
            .map(o => o.appointment);
    }

    protected isUserParticipatingInAppointment(appointment: Appointment): boolean {
        return this.participationService
            .get(p => p.customer.id === this.id && p.appointment.id === appointment.id).length > 0;
    }
}
