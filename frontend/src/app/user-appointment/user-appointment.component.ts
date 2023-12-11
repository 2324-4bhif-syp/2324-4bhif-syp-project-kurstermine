import {Component, Input} from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {Appointment} from "../shared/models/appointment";
import {MatButtonModule} from "@angular/material/button";
import {MatTreeModule} from "@angular/material/tree";
import {ParticipationService} from "../shared/services/participation.service";
import {Participation} from "../shared/models/participation";
import {Customer} from "../shared/models/customer";


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
  constructor(private participationService: ParticipationService) {
  }

  @Input({required: true}) appointment!: Appointment;
  @Input({required: true}) loggedInCustomer!: Customer;
  @Input({required: true}) showSignIn!: boolean;

  onBtnSignIn() {
    let participation: Participation = {
      id: {
        appointmentId: this.appointment.id!,
        customerId: this.loggedInCustomer.id!
      },
      appointment: this.appointment,
      customer: this.loggedInCustomer
    }

    this.participationService.add(participation);
  }
}
