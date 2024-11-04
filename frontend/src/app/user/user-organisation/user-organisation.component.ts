import { Component, inject, Input } from "@angular/core";
import { Organisation } from "@models";
import { Router, RouterLink, RouterLinkActive } from "@angular/router";
import { environment } from "src/environments/environment";

@Component({
	selector: "app-user-organisation",
	standalone: true,
	imports: [RouterLink, RouterLinkActive],
	templateUrl: "./user-organisation.component.html",
	styleUrl: "./user-organisation.component.css",
})
export class UserOrganisationComponent {
	private router: Router = inject(Router);

	@Input({ required: true })
	public organisation!: Organisation;

	constructor() {}

	protected getImageUrl(): string {
		return (
			environment.apiUrl +
			"/organisations/" +
			this.organisation.id +
			"/image"
		);
	}

	protected async redirectToCourses(): Promise<void> {
		await this.router.navigate([`/courses/${this.organisation.id}`]);
	}
}
