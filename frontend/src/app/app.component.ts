import { Component, inject } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { Roles } from '@models';
import { RouterModule, RouterOutlet } from '@angular/router';
import {
    AppointmentApiService,
    AppointmentManagementApiService,
    OrganisationApiService,
} from '@services/api';

@Component({
    standalone: true,
    imports: [RouterOutlet, RouterModule],
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent {
    appointmentApiService = inject(AppointmentApiService).getAll();
    appointmentManagementApiService = inject(
        AppointmentManagementApiService,
    ).getAll();
    organisationApiService = inject(OrganisationApiService).getAll();

    constructor(protected keycloak: KeycloakService) {
        this.isAdmin = keycloak.getUserRoles().includes(Roles.Admin);
    }

    isAdmin = false;

    onBtnLogout() {
        this.keycloak
            .logout()
            .catch((reason) => console.log('Logout failed: ' + reason));
    }
}
