import { Component, inject, Input } from '@angular/core';
import { AsyncPipe, NgForOf, NgIf } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatListModule } from "@angular/material/list";
import { MatCardModule } from "@angular/material/card";
import { Appointment, Packet } from "@models";
import { MatChipsModule } from "@angular/material/chips";
import { MatButtonModule } from "@angular/material/button";
import { ActivatedRoute } from "@angular/router";
import { MatIconModule } from "@angular/material/icon";
import { StoreService } from '@services/store.service';
import { distinctUntilChanged, map } from 'rxjs';

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
    MatIconModule,
    AsyncPipe
  ],
  templateUrl: './admin-packet.component.html',
  styleUrl: './admin-packet.component.css'
})
export class AdminPacketComponent {

  private id = inject(ActivatedRoute).snapshot.params['id'];
  
  protected viewModel = inject(StoreService)
    .store
    .pipe(
      map(model => ({
        packet: this.packet,
        appointments: model.offers.filter(offer => offer.packet.id === this.id).map(offer => offer.appointment),
        participations: model.participations.filter(participation => participation.customer.id === this.id),
      })),
      distinctUntilChanged(),
    );



  @Input({ required: true })
  public packet!: Packet;

  @Input({ required: true })
  public displaySignedInBtn!: boolean;

  protected panelOpenState: boolean = false;
}
