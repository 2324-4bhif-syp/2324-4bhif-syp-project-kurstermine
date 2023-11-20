import { Component, Input } from '@angular/core';
import { AppointmentService } from '../shared/services/appointment.service';
import { Appointment } from '../shared/models/appointment';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.css']
})
export class AppointmentComponent {

  @Input() appointment: Appointment | undefined;
  protected appointmentService: AppointmentService;

  constructor(appointmentService: AppointmentService) {
    this.appointmentService = appointmentService;
  }
}
