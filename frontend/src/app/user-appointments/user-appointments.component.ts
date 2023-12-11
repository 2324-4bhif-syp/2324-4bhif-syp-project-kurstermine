import { Component } from '@angular/core';
import {AppointmentService} from "../shared/services/appointment.service";
import {UserAppointmentComponent} from "../user-appointment/user-appointment.component";

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
  constructor(public appointmentService: AppointmentService) {
  }
}
