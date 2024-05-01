import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Appointment } from '@models';
import { MatButtonModule } from '@angular/material/button';
import { MatTreeModule } from '@angular/material/tree';
import {MatIconModule} from "@angular/material/icon";

@Component({
    selector: 'app-user-appointment',
    standalone: true,
    imports: [MatCardModule, MatButtonModule, MatTreeModule, MatIconModule],
    templateUrl: './user-appointment.component.html',
    styleUrl: './user-appointment.component.css',
})
export class UserAppointmentComponent {
    constructor() {}

    @Input({ required: true }) appointment!: Appointment;

    protected readonly String = String;
}
