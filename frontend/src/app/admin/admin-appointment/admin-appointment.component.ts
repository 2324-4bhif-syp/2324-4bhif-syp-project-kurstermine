import { Component, Input } from '@angular/core';
import { AppointmentService } from '../../../shared/services/appointment.service';
import { Appointment } from '../../../shared/models/appointment';
import { ActivatedRoute } from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';
import { AdminAppointmentManagementComponent } from '../admin-appointment-management/admin-appointment-management.component';
import { AdminParticipationComponent } from '../admin-participations/admin-participation.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
    standalone: true,
    imports: [MatExpansionModule, AdminAppointmentManagementComponent, AdminParticipationComponent, MatIconModule],
    selector: 'app-admin-appointment',
    templateUrl: './admin-appointment.component.html',
    styleUrls: ['./admin-appointment.component.css'],
})
export class AdminAppointmentComponent {
    ;

    constructor(
        protected appointmentService: AppointmentService,
        private route: ActivatedRoute
        ) {
    }

    id = Number(this.route.snapshot.params['id']);

    protected get appointment() {
        let appointment = this.appointmentService.get((a) => a.id === this.id)[0];
        if (appointment) {
            return appointment;
        }
        return undefined;
    }

    String = String;
}
