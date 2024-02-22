import { Component } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';

@Component({
    selector: 'app-userinfo',
    standalone: true,
    imports: [],
    templateUrl: './user.component.html',
    styleUrl: './user.component.css',
})
export class UserComponent {
    protected readonly keycloak: KeycloakService;
    protected userProfile: KeycloakProfile | undefined;

    constructor(keycloak: KeycloakService) {
        this.keycloak = keycloak;

        keycloak.loadUserProfile().then((profile) => {
            this.userProfile = profile;
        });
    }
}
