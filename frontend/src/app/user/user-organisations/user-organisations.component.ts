import {Component, OnInit} from '@angular/core';
import {OrganisationService} from "../../../shared/services/organisation.service";
import {UserAppointmentComponent} from "../user-appointment/user-appointment.component";
import {UserOrganisationComponent} from "../user-organisation/user-organisation.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {OrganisationApiService} from "../../../shared/services/api/organisation-api.service";

@Component({
  selector: 'app-user-organisations',
  standalone: true,
    imports: [
        UserAppointmentComponent,
        UserOrganisationComponent,
        ReactiveFormsModule,
        FormsModule
    ],
  templateUrl: './user-organisations.component.html',
  styleUrl: './user-organisations.component.css'
})
export class UserOrganisationsComponent implements OnInit {
    constructor(
        protected organisationService: OrganisationService,
        protected organisationApiService: OrganisationApiService
    ) {}

    searchValue: string = "";

    search() {
        this.organisationService.search(this.searchValue);
    }

    ngOnInit(): void {
        this.organisationApiService.getAll();
    }
}
