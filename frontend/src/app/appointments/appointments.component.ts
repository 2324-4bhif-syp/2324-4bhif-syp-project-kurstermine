import { Component } from '@angular/core';
import { AppointmentService } from '../shared/services/appointment.service';
import { Appointment } from '../shared/models/appointment';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent {
  
  protected appointmentService: AppointmentService;
  protected newAppointment: Appointment;
  
  constructor(appointmentService: AppointmentService) {
    this.appointmentService = appointmentService;
    this.newAppointment = {
      name: "",
      address: "",
      date: new Date(),
      duration: 0
    }
  }

  parseDate(eventdate: Event): Date {
    const dateString = (eventdate.target as HTMLInputElement).value;

    let date = new Date();
    if(dateString) {
      date = new Date(dateString);
    }

    return date;
  }

  add() {
    this.appointmentService.add(this.newAppointment);

    this.newAppointment = {
      name: "",
      address: "",
      date: new Date(),
      duration: 0
    }
  }
}
