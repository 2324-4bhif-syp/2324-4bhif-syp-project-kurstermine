import { Component, inject, Input } from '@angular/core';
import { Appointment, AppointmentManagement, Instructor } from '@models';
import { FormsModule } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { distinctUntilChanged, map } from 'rxjs';
import { StoreService } from '@services';
import { AppointmentManagementApiService } from '@services/api';
import { AsyncPipe } from '@angular/common';

@Component({
    standalone: true,
    imports: [FormsModule, MatListModule, MatIconModule, MatSelectModule, MatButtonModule, MatExpansionModule, AsyncPipe],
    selector: 'app-admin-appointment-management',
    templateUrl: './admin-appointment-management.component.html',
    styleUrls: ['./admin-appointment-management.component.css'],
})
export class AdminAppointmentManagementComponent {
    @Input() appointment: Appointment | undefined;
    protected selectedInstructor: Instructor | undefined;
    protected panelOpenState: boolean = false;

    protected viewModel = inject(StoreService)
        .store
        .pipe(
            map(model => ({
                instructors: model.instructors,
                appointmentManagements: model.appointmentManagements.filter(appointmentManagement => appointmentManagement.appointment.id === this.appointment?.id)
            })),
            distinctUntilChanged(),
        );

    protected appointmentManagementApiService = inject(AppointmentManagementApiService);

    public add() {
        if (!this.selectedInstructor || !this.appointment) return;
        if (!this.selectedInstructor.id || !this.appointment.id) return;

        let appointmentManagement: AppointmentManagement = {
            id: {
                appointmentId: this.appointment.id,
                instructorId: this.selectedInstructor.id,
            },
            instructor: this.selectedInstructor,
            appointment: this.appointment,
        };

        this.appointmentManagementApiService.add(appointmentManagement);
    }

    public remove(appointmentManagement: AppointmentManagement) {
        this.appointmentManagementApiService.remove(appointmentManagement);
    }
}
