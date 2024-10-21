import { Component, Input } from '@angular/core';
import { Organisation } from '@models';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-user-organisation',
    standalone: true,
    imports: [RouterLink, RouterLinkActive],
    templateUrl: './user-organisation.component.html',
    styleUrl: './user-organisation.component.css',
})
export class UserOrganisationComponent {
    @Input({ required: true })
    organisation!: Organisation;

    constructor() {}

    getImageUrl() {
        return (
            environment.apiUrl +
            '/organisations/' +
            this.organisation.id +
            '/image'
        );
    }
}
