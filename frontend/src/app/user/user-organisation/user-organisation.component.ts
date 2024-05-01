import {Component, Input} from '@angular/core';
import {Organisation} from "@models";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { UserPacketComponent } from "../user-packet/user-packet.component";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { MatMenuModule } from "@angular/material/menu";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-user-organisation',
    standalone: true,
    imports: [
        MatButtonModule,
        MatCardModule,
        MatIconModule,
        UserPacketComponent,
        RouterLink,
        RouterLinkActive,
        MatMenuModule,
        MatProgressBarModule
    ],
    templateUrl: './user-organisation.component.html',
    styleUrl: './user-organisation.component.css'
})
export class UserOrganisationComponent {

    @Input({ required: true })
    organisation!: Organisation;

    constructor() {}

    getImageUrl() {
        return environment.apiUrl + '/organisations/' + this.organisation.id + '/image';
    }
}
