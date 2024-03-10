import { Component, Input } from '@angular/core';
import { MatActionList, MatListModule } from '@angular/material/list';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from 'src/shared/services/customer.service';
import { PacketService } from 'src/shared/services/packet.service';
import { PurchaseService } from 'src/shared/services/purchase.service';
import { MatExpansionModule } from '@angular/material/expansion';
import { AppointmentService } from 'src/shared/services/appointment.service';
import { OfferService } from 'src/shared/services/offer.service';
import { ParticipationService } from 'src/shared/services/participation.service';
import { Appointment } from 'src/shared/models/appointment';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-admin-customer',
  standalone: true,
  imports: [MatListModule, MatExpansionModule, MatIconModule, MatChipsModule, MatCardModule],
  templateUrl: './admin-customer.component.html',
  styleUrl: './admin-customer.component.css'
})
export class AdminCustomerComponent {
  constructor(
    protected customerService: CustomerService,
    protected packetService: PacketService,
    protected purchaseService: PurchaseService,
    protected appointmentService: AppointmentService,
    protected offerService: OfferService,
    protected participationService: ParticipationService,
    private route: ActivatedRoute,
  ) {

  }

  public id = this.route.snapshot.params['id'];

  protected get customer() {
    let customer = this.customerService.get(c => c.id === this.id)[0];
    if (!customer) {
      return undefined;
    }
    return customer;
  }

  protected get purchases() {
    return this.purchaseService.get()
  }

  protected get packets() {
    return this.packetService.get();
  }

  protected get appointments() {
    return this.appointmentService.get();
  }

  protected get offers() {
    return this.offerService.get();
  }

  protected getAppointmentsForPacket(packetId: number) {
    return this.offers.filter(o => o.packet.id === packetId).map(o => o.appointment);
  }

  protected isUserParticipatingInAppointment(appointment: Appointment) {
    return this.participationService.get(p => p.customer.id === this.id
      && p.appointment.id === appointment.id).length > 0;
  }

  public panelOpenState: boolean = false;
}
