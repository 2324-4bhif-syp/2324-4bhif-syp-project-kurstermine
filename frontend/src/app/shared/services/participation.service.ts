import { Injectable } from '@angular/core';
import { ParticipationApiService } from './api/participation-api.service';
import { Service } from './service';
import { Participation } from '../models/participation';
import { CustomerService } from './customer.service';
import { AppointmentService } from './appointment.service';

@Injectable({
  providedIn: 'root'
})
export class ParticipationService extends Service<Participation> {

  protected api: ParticipationApiService;
  protected customerService: CustomerService;
  protected appointmentService: AppointmentService;

  constructor(api: ParticipationApiService, customerService: CustomerService, appointmentService: AppointmentService) {
    super();

    this.api = api;
    this.customerService = customerService;
    this.appointmentService = appointmentService;

    api.getAll().subscribe({
      next: (participations) => {
        participations.forEach(participation => {
          super.add({
            id: participation.id,
            appointment: appointmentService.get(a => a.id === participation.id?.appointmentId)[0],
            customer: customerService.get(c => c.id === participation.id?.customerId)[0]
          })
        });
      }
    })
  }

  override add(item: Participation): void {
    this.api.add(item).subscribe({
      next: (participation => {
        super.add(participation);
      })
    });
  }

  override remove(item: Participation): void {
      this.api.remove(item).subscribe({
        next: () => {
          super.remove(item);
        }
      })
  }
}
