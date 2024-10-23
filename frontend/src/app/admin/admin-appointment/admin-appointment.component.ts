import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminAppointmentManagementComponent } from '@components/admin/admin-appointment-management/admin-appointment-management.component';
import { StoreService } from '@services/store.service';
import { distinctUntilChanged, map } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
    standalone: true,
    imports: [
        AdminAppointmentManagementComponent,
        AsyncPipe,
    ],
    selector: 'app-admin-appointment',
    templateUrl: './admin-appointment.component.html',
    styleUrls: ['./admin-appointment.component.css'],
})
export class AdminAppointmentComponent {
    private id = Number(inject(ActivatedRoute).snapshot.params['id']);

    protected viewModel = inject(StoreService).store.pipe(
        map((model) => model.appointments),
        map((appointments) =>
            appointments.find((appointment) => appointment.id === this.id),
        ),
        distinctUntilChanged(),
    );

    String = String;
}
