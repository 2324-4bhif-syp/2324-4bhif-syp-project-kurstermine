import { Component } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { Roles } from '../shared/models/roles';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent {
    constructor(protected keycloak: KeycloakService) {
        this.isAdmin = keycloak.getUserRoles().includes(Roles.Admin);
    }

    isAdmin = false;
}
