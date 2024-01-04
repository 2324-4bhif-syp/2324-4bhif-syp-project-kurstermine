import {Component, Inject} from '@angular/core';
import {Participation} from "../shared/models/participation";
import {ParticipationService} from "../shared/services/participation.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Appointment} from "../shared/models/appointment";
import {Customer} from "../shared/models/customer";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
    imports: [
        MatButtonModule
    ],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.css'
})
export class ConfirmDialogComponent {
    constructor(protected participationService: ParticipationService,
                public dialogRef: MatDialogRef<ConfirmDialogComponent>,
                @Inject(MAT_DIALOG_DATA) public data: { appointment: Appointment, loggedInCustomer: Customer}) {
        this.appointment = data.appointment;
        this.loggedInCustomer = data.loggedInCustomer;
    }

    appointment!: Appointment;
    loggedInCustomer!: Customer;

    onBtnCancel() {
        this.dialogRef.close();
    }

    onBtnConfirm() {
        let participation: Participation = {
            id: {
                appointmentId: this.appointment.id!,
                customerId: this.loggedInCustomer.id!
            },
            appointment: this.appointment,
            customer: this.loggedInCustomer
        }

        this.participationService.add(participation);
        this.dialogRef.close();
    }
}
