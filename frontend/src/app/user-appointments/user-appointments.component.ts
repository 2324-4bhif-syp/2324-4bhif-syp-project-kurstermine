import { Component } from '@angular/core';
import {AppointmentService} from "../shared/services/appointment.service";
import {UserAppointmentComponent} from "../user-appointment/user-appointment.component";
import {Appointment} from "../shared/models/appointment";
import {CustomerService} from "../shared/services/customer.service";
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
  constructor(protected appointmentService: AppointmentService,
              protected participationService: ParticipationService,
              protected customerService: CustomerService) {

  }

  isIncluded(appointment: Appointment): boolean {
    return this.participationService.get(participation => participation.appointment.id === appointment.id).length === 1;
  }
}
