import { Component } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { Roles } from '@models';
import { MatToolbar, MatToolbarRow } from "@angular/material/toolbar"
import { MatIcon } from '@angular/material/icon';
import { MatMenu, MatMenuTrigger } from '@angular/material/menu';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
    standalone: true,
    imports: [MatToolbar, MatToolbarRow, MatIcon, MatMenu, MatMenuTrigger, RouterOutlet, RouterModule],
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent {
    constructor(protected keycloak: KeycloakService) {
        this.isAdmin = keycloak.getUserRoles().includes(Roles.Admin);
    }

    isAdmin = false;

    onBtnLogout() {
        this.keycloak.logout().catch(reason => console.log("Logout failed: " + reason));
    }
}
