import { Injectable } from '@angular/core';
import { ParticipationApiService } from './api/participation-api.service';
import { Service } from './service';
import { Participation } from '../models/participation';
import { CustomerService } from './customer.service';
import { AppointmentService } from './appointment.service';

@Injectable({
    providedIn: 'root',
})
export class ParticipationService extends Service<Participation> {
    constructor(
        protected api: ParticipationApiService,
        protected customerService: CustomerService,
        protected appointmentService: AppointmentService,
    ) {
        super();

        if (!customerService.finished && !appointmentService.finished) {
            let isServiceFinished = false;

            customerService.finishedListeners.push(() => {
                isServiceFinished = !isServiceFinished;

                if (!isServiceFinished) {
                    this.getItems();
                }
            });

            appointmentService.finishedListeners.push(() => {
                isServiceFinished = !isServiceFinished;

                if (!isServiceFinished) {
                    this.getItems();
                }
            });
            return;
        }

        if (customerService.finished) {
            appointmentService.finishedListeners.push(() => this.getItems());
            return;
        }

        if (appointmentService.finished) {
            customerService.finishedListeners.push(() => this.getItems());
            return;
        }

        this.getItems();
    }

    getItems() {
        this.api.getAll().subscribe({
            next: (participations) => {
                participations.forEach((participation) => {
                    super.add({
                        id: participation.id,
                        appointment: this.appointmentService.get(
                            (a) => a.id === participation.id?.appointmentId,
                        )[0],
                        customer: this.customerService.get(
                            (c) => c.id === participation.id?.customerId,
                        )[0],
                    });
                });
            },
        });
        this.getAllFromCustomer(this.customerService.get()[0].id!);
    }

    override add(item: Participation): void {
        this.api.add(item).subscribe({
            next: (participation) => {
                super.add({
                    id: participation.id,
                    appointment: this.appointmentService.get(a => a.id === participation.id?.appointmentId)[0],
                    customer: this.customerService.get(c => c.id === participation.id?.customerId)[0]
                });
            },
        });
    }

    override remove(item: Participation): void {
        this.api.remove(item).subscribe({
            next: () => {
                super.remove(item);
            },
        });
    }

    getAllFromCustomer(id: string): void {
        this.api.getAllFromCustomer(id).subscribe({
            next: (participations) => {
                participations.forEach((participation) => {
                    super.add({
                        id: participation.id,
                        appointment: this.appointmentService.get(
                            (a) => a.id === participation.id?.appointmentId,
                        )[0],
                        customer: this.customerService.get(
                            (c) => c.id === participation.id?.customerId,
                        )[0],
                    });
                });
            },
        });
    }
}
