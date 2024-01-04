import {Component, Input} from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {Appointment} from "../shared/models/appointment";
import {MatButtonModule} from "@angular/material/button";
import {MatTreeModule} from "@angular/material/tree";
import {ParticipationService} from "../shared/services/participation.service";
import {Customer} from "../shared/models/customer";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../confirm-dialog/confirm-dialog.component";


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
  constructor(protected participationService: ParticipationService,
              private dialog: MatDialog) {
  }

  @Input({required: true}) appointment!: Appointment;
  @Input({required: true}) loggedInCustomer!: Customer;
  @Input({required: true}) showSignIn!: boolean;

  onBtnSignIn() {
    let dialogRef: MatDialogRef<ConfirmDialogComponent> = this.dialog.open(ConfirmDialogComponent,{
        height: '200px',
        width: '600px',
        data: {
            appointment: this.appointment!,
            loggedInCustomer: this.loggedInCustomer!
        }
    });
    /*
    let participation: Participation = {
      id: {
        appointmentId: this.appointment.id!,
        customerId: this.loggedInCustomer.id!
      },
      appointment: this.appointment,
      customer: this.loggedInCustomer
    }

    this.participationService.add(participation);
     */
  }
}
