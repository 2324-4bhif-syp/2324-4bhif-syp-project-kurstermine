import {Component, Input} from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {Appointment} from "../shared/models/appointment";
import {MatButtonModule} from "@angular/material/button";
import {MatTreeModule} from "@angular/material/tree";

@Component({
  selector: 'app-user-appointment',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatTreeModule
  ],
  templateUrl: './user-appointment.component.html',
  styleUrl: './user-appointment.component.css'
})
export class UserAppointmentComponent {
  @Input({required: true}) appointment!: Appointment;
}
