import { Component, Input } from '@angular/core';
import { CustomerService } from '../shared/services/customer.service';
import { ParticipationService } from '../shared/services/participation.service';
import { Appointment } from '../shared/models/appointment';
import { Customer } from '../shared/models/customer';
import { Participation } from '../shared/models/participation';

@Component({
  selector: 'app-participations',
  templateUrl: './participations.component.html',
  styleUrls: ['./participations.component.css']
})
export class ParticipationsComponent {

  @Input() appointment: Appointment | undefined;
  protected participationService: ParticipationService;
  protected customerService: CustomerService;
  protected selectedCustomer: Customer | undefined;

  constructor(particpationService: ParticipationService, customerService: CustomerService) {
    this.participationService = particpationService;
    this.customerService = customerService;
  }

  protected getPartipations() {
    return this.participationService.get(p => 
      p.appointment.id == this.appointment?.id
    )
  }

  public add() {
    if(!this.selectedCustomer || !this.appointment) return;
    if(!this.selectedCustomer.id || !this.appointment.id) return;

    let participation: Participation = {
      id: {
        appointmentId: this.appointment.id,
        customerId: this.selectedCustomer.id
      },
      customer: this.selectedCustomer,
      appointment: this.appointment
    }

    this.participationService.add(participation)
  }

  public remove(participation: Participation) {
    this.participationService.remove(participation);
  }
}
