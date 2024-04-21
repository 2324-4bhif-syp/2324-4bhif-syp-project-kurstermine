import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Appointment } from '../../../shared/models/appointment';
import { MatButtonModule } from '@angular/material/button';
import { MatTreeModule } from '@angular/material/tree';
import { ParticipationService } from '../../../shared/services/participation.service';
import { Customer } from '../../../shared/models/customer';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UserConfirmDialogComponent } from '../user-confirm-dialog/user-confirm-dialog.component';
import {MatIconModule} from "@angular/material/icon";

@Component({
    selector: 'app-user-appointment',
    standalone: true,
    imports: [MatCardModule, MatButtonModule, MatTreeModule, MatIconModule],
    templateUrl: './user-appointment.component.html',
    styleUrl: './user-appointment.component.css',
})
export class UserAppointmentComponent {
    constructor(
        protected participationService: ParticipationService,
    ) {}

    @Input({ required: true }) appointment!: Appointment;

    protected readonly String = String;
}
