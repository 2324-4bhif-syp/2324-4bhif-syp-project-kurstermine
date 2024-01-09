import { Component, Input } from '@angular/core';
import { CustomerService } from '../../shared/services/customer.service';
import { ParticipationService } from '../../shared/services/participation.service';
import { Appointment } from '../../shared/models/appointment';
import { Customer } from '../../shared/models/customer';
import { Participation } from '../../shared/models/participation';

@Component({
    selector: 'app-participations',
    templateUrl: './participation.component.html',
    styleUrls: ['./participation.component.css'],
})
export class ParticipationComponent {
    @Input() appointment: Appointment | undefined;
    protected participationService: ParticipationService;
    protected customerService: CustomerService;
    protected selectedCustomer: Customer | undefined;

    constructor(
        participationService: ParticipationService,
        customerService: CustomerService,
    ) {
        this.participationService = participationService;
        this.customerService = customerService;

        console.log(customerService.get());
    }

    protected getParticipation() {
        return this.participationService.get(
            (participation) =>
                participation.id?.appointmentId == this.appointment?.id
        );
    }

    protected getCustomers(): Customer[] {
        return this.customerService.get(
            (customer) =>
                !this.getParticipation().some(
                    (participation) =>
                        participation.id?.customerId === customer.id,
                ),
        );
    }

    public add() {
        if (!this.selectedCustomer || !this.appointment) return;
        if (!this.selectedCustomer.id || !this.appointment.id) return;

        let participation: Participation = {
            id: {
                appointmentId: this.appointment.id,
                customerId: this.selectedCustomer.id,
            },
            customer: this.selectedCustomer,
            appointment: this.appointment,
        };

        this.participationService.add(participation);
    }

    public remove(participation: Participation) {
        this.participationService.remove(participation);
    }
}
