import {Component} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {MatDialogRef} from "@angular/material/dialog";
import {KeycloakService} from "keycloak-angular";

@Component({
  selector: 'app-logout-dialog',
  standalone: true,
    imports: [
        MatButtonModule
    ],
  templateUrl: './logout-dialog.component.html',
  styleUrl: './logout-dialog.component.css'
})
export class LogoutDialogComponent {
    constructor(
        protected keycloak: KeycloakService,
        protected dialogRef: MatDialogRef<LogoutDialogComponent>
    ) {

    }

    onBtnCancel() {
        this.dialogRef.close();
    }

    onBtnLogout() {
        this.keycloak.logout().catch(reason => console.log("Logout failed: " + reason));
    }
}
