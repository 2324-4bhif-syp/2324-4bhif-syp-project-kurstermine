import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AdminPacketComponent } from '@components/admin/admin-packet/admin-packet.component';
import { StoreService } from '@services';
import { map, distinctUntilChanged } from 'rxjs';

@Component({
    selector: 'app-admin-instructor',
    standalone: true,
    imports: [RouterModule, AdminPacketComponent, AsyncPipe],
    templateUrl: './admin-instructor.component.html',
    styleUrl: './admin-instructor.component.css',
})
export class AdminInstructorComponent {
    private id = inject(ActivatedRoute).snapshot.params['id'];

    protected viewModel = inject(StoreService).store.pipe(
        map((model) => ({
            instructor: model.instructors.find(
                (instructor) => instructor.id === this.id,
            ),
            appointments: model.appointmentManagements
                .filter((appointmentManagement) => {
                    return appointmentManagement.id?.instructorId === this.id;
                })
                .map((appointmentManagement) => {
                    return model.appointments.find((appointment) => {
                        return (
                            appointment.id ===
                            appointmentManagement.id?.appointmentId
                        );
                    });
                }),
        })),
        distinctUntilChanged(),
    );
}
