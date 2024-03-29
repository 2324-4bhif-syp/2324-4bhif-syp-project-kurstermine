import { Injectable } from '@angular/core';
import { AppointmentManagementApiService } from './api/appointment-management-api.service';
import { Service } from './service';
import { InstructorService } from './instructor.service';
import { AppointmentService } from './appointment.service';
import { AppointmentManagement } from '../models/appointmentManagement';

@Injectable({
    providedIn: 'root',
})
export class AppointmentManagementService extends Service<AppointmentManagement> {
    constructor(
        protected api: AppointmentManagementApiService,
        protected instructorService: InstructorService,
        protected appointmentService: AppointmentService,
    ) {
        super();

        instructorService.replaySubject.subscribe({
            next: () => appointmentService.replaySubject.subscribe({
                next: () => this.getItems()
            })
        })
    }

    getItems() {
        this.api.getAll().subscribe({
            next: (appointmentManagements) => {
                appointmentManagements.forEach((appointmentManagement) => {
                    super.add({
                        id: appointmentManagement.id,
                        appointment: this.appointmentService.get(
                            (a) =>
                                a.id ===
                                appointmentManagement.id?.appointmentId,
                        )[0],
                        instructor: this.instructorService.get(
                            (c) =>
                                c.id === appointmentManagement.id?.instructorId,
                        )[0],
                    });
                });
            },
        });
    }

    override add(item: AppointmentManagement): void {
        this.api.add(item).subscribe({
            next: (appointmentManagement) => {
                super.add({
                    id: appointmentManagement.id,
                    appointment: this.appointmentService.get(
                        (a) =>
                            a.id ===
                            appointmentManagement.id?.appointmentId,
                    )[0],
                    instructor: this.instructorService.get(
                        (c) =>
                            c.id === appointmentManagement.id?.instructorId,
                    )[0],
                });
            }
        });
    }

    override remove(item: AppointmentManagement): void {
        this.api.remove(item).subscribe({
            next: () => {
                super.remove(item);
            },
        });
    }
}
