import { Component, inject, Input, OnInit } from '@angular/core';
import { Appointment, Customer, Participation } from '@models';
import { FormsModule } from '@angular/forms';
import { ParticipationApiService, CustomerApiService } from '@services/api';
import { StoreService } from '@services/store.service';
import { distinctUntilChanged, map } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
    standalone: true,
    imports: [FormsModule, AsyncPipe],
    selector: 'app-admin-participations',
    templateUrl: './admin-participation.component.html',
    styleUrls: ['./admin-participation.component.css'],
})
export class AdminParticipationComponent implements OnInit {
    @Input() appointment: Appointment | undefined;
    protected selectedCustomer: Customer | undefined;
    protected panelOpenState: boolean = false;

    private participationApiService = inject(ParticipationApiService);
    private customerApiService = inject(CustomerApiService);

    protected viewModel = inject(StoreService).store.pipe(
        map((model) => ({
            participations: model.participations
                .filter(
                    (participation) =>
                        participation.id?.appointmentId ===
                        this.appointment?.id,
                )
                .map((participation) => ({
                    ...participation,
                    customer: model.customers.find(
                        (customer) =>
                            participation.id?.customerId === customer.id,
                    ),
                })),
            customers: model.customers.filter(
                (customer) =>
                    !model.participations
                        .filter(
                            (participation) =>
                                participation.id?.appointmentId ===
                                this.appointment?.id,
                        )
                        .some(
                            (participation) =>
                                participation.id?.customerId === customer.id,
                        ),
            ),
        })),
        distinctUntilChanged(),
    );

    public add() {
        if (!this.selectedCustomer || !this.appointment) return;
        if (!this.selectedCustomer.id || !this.appointment.id) return;

        let participation: Participation = {
            id: {
                appointmentId: this.appointment.id,
                customerId: this.selectedCustomer.id,
            },
        };

        this.participationApiService.add(participation);
    }

    public remove(participation: Participation) {
        this.participationApiService.remove(participation);
    }

    ngOnInit(): void {
        this.participationApiService.getAllFromCustomer();
        this.customerApiService.getAll();
    }
}
