import { Component } from '@angular/core';
import {AppointmentService} from "../shared/services/appointment.service";
import {UserAppointmentComponent} from "../user-appointment/user-appointment.component";
import {Appointment} from "../shared/models/appointment";
import {CustomerService} from "../shared/services/customer.service";
import {Customer} from "../shared/models/customer";

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
              private customerService: CustomerService) {

    customerService.getLoggedInCustomer().subscribe({
      next: (customer: Customer) => {
        this.loggedInCustomer = customer;
        appointmentService.getAllFromUser(customer.id!).subscribe({
            next: (appointments: Appointment[]) => {
              this.appointmentsFromUser = appointments;
            }
        });
      }
    });
  }

  appointmentsFromUser: Appointment[] = [];
  loggedInCustomer!: Customer;

  isIncluded(appointment: Appointment): boolean {
    return this.appointmentsFromUser.filter(a => a.id === appointment.id).length === 1;
  }
}
