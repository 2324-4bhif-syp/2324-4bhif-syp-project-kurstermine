import {Component, inject, OnInit} from '@angular/core';
import {UserAppointmentComponent} from "../user-appointment/user-appointment.component";
import {UserOrganisationComponent} from "../user-organisation/user-organisation.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {OrganisationApiService} from "@services/api";
import {StoreService} from "@services";
import {distinctUntilChanged, map} from "rxjs";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'app-user-organisations',
  standalone: true,
    imports: [
        UserAppointmentComponent,
        UserOrganisationComponent,
        ReactiveFormsModule,
        FormsModule,
        AsyncPipe
    ],
  templateUrl: './user-organisations.component.html',
  styleUrl: './user-organisations.component.css'
})
export class UserOrganisationsComponent implements OnInit {

    viewModelOrganisations = inject(StoreService)
        .store
        .pipe(
            map(model => model.organisations),
            distinctUntilChanged()
        )

    constructor(
        protected organisationApiService: OrganisationApiService
    ) {}

    searchValue: string = "";

    search() {
        this.organisationApiService.search(this.searchValue);
    }

    ngOnInit(): void {
        this.organisationApiService.getAll();
    }
}
