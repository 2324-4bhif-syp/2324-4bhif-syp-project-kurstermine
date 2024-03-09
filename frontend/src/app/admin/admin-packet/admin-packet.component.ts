import {Component, Input} from '@angular/core';
import {Packet} from "../../../shared/models/packet";
import {NgForOf, NgIf} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatListModule} from "@angular/material/list";
import {MatCardModule} from "@angular/material/card";
import {OfferService} from "../../../shared/services/offer.service";
import {Appointment} from "../../../shared/models/appointment";

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
        MatCardModule
    ],
  templateUrl: './admin-packet.component.html',
  styleUrl: './admin-packet.component.css'
})
export class AdminPacketComponent {
    constructor(protected offerService: OfferService) {
    }

    @Input({required: true})
    public packet!: Packet;

    getAllAppointmentsFromPacket(): Appointment[] {
        return this.offerService
            .get(o => o.packet.id === this.packet.id)
            .map(o => o.appointment);
    }
}
