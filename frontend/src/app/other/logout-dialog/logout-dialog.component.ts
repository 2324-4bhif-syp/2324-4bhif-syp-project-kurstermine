import {Component, Inject} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {ParticipationService} from "../../../shared/services/participation.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Appointment} from "../../../shared/models/appointment";
import {Customer} from "../../../shared/models/customer";
import {Participation} from "../../../shared/models/participation";
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
