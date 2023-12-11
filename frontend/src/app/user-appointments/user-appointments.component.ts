import { Component } from '@angular/core';
import {AppointmentService} from "../shared/services/appointment.service";
import {UserAppointmentComponent} from "../user-appointment/user-appointment.component";
import {Appointment} from "../shared/models/appointment";
import {CustomerService} from "../shared/services/customer.service";
import {Customer} from "../shared/models/customer";
import {ParticipationService} from "../shared/services/participation.service";

@Component({
  selector: 'app-user-appointments',
  standalone: true,
  imports: [
    UserAppointmentComponent
  ],
  templateUrl: './user-appointments.component.html',
  styleUrl: './user-appointments.component.css'
})
export class UserAppointmentsComponent {
  constructor(public appointmentService: AppointmentService,
              public participationService: ParticipationService,
              customerService: CustomerService) {
    customerService.getLoggedInCustomer().subscribe({
      next: (customer: Customer) => {
        this.loggedInCustomer = customer;
        this.participationService.getAllFromUser(customer.id!)
      }
    });
  }
  loggedInCustomer!: Customer;

  isIncluded(appointment: Appointment): boolean {
    return this.participationService.get(participation => participation.appointment.id === appointment.id).length === 1;
  }
}
