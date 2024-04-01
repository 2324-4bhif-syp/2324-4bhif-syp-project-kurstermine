import { Component } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { Roles } from '../shared/models/roles';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {LogoutDialogComponent} from "./other/logout-dialog/logout-dialog.component";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent {
    constructor(protected keycloak: KeycloakService,
                private dialog: MatDialog) {
        this.isAdmin = keycloak.getUserRoles().includes(Roles.Admin);
    }

    isAdmin = false;

    onBtnLogout() {
        const dialogRef: MatDialogRef<LogoutDialogComponent> = this.dialog.open(
            LogoutDialogComponent,
            {
                height: '160px',
                width: '500px'
            },
        );
    }
}
