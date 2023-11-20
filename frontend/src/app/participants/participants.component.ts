import { Component, Input } from '@angular/core';
import { CustomerService } from '../shared/services/customer.service';
import { ParticipationService } from '../shared/services/participation.service';
import { Appointment } from '../shared/models/appointment';
import { Customer } from '../shared/models/customer';
import { Participation } from '../shared/models/participation';

@Component({
  selector: 'app-participants',
  templateUrl: './participants.component.html',
  styleUrls: ['./participants.component.css']
})
export class ParticipantsComponent {

  @Input() appointment: Appointment | undefined;
  protected particpationService: ParticipationService;
  protected customerService: CustomerService;
  protected selectedCustomer: Customer | undefined;

  constructor(particpationService: ParticipationService, customerService: CustomerService) {
    this.particpationService = particpationService;
    this.customerService = customerService;
  }

  protected getPartipations() {
    return this.particpationService.get(p => p.appointment === this.appointment)
  }

  public add() {
    if(!this.selectedCustomer || !this.appointment) return;

    let participation: Participation = {
      customer: this.selectedCustomer,
      appointment: this.appointment
    }

    this.particpationService.add(participation)
  }

  public remove(participation: Participation) {
    this.particpationService.remove(participation);
  }
}
