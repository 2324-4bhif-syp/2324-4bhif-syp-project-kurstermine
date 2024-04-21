import { Component } from '@angular/core';
import {CustomerService} from "../../../shared/services/customer.service";
import {OrganisationService} from "../../../shared/services/organisation.service";
import {UserAppointmentComponent} from "../user-appointment/user-appointment.component";
import {UserOrganisationComponent} from "../user-organisation/user-organisation.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user-organisations',
  standalone: true,
    imports: [
        UserAppointmentComponent,
        UserOrganisationComponent,
        RouterModule
    ],
  templateUrl: './user-organisations.component.html',
  styleUrl: './user-organisations.component.css'
})
export class UserOrganisationsComponent {
    constructor(
        protected organisationService: OrganisationService,
        protected customerService: CustomerService,
    ) {}
}
