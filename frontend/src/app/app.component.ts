import { Component } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { Roles } from '../shared/models/roles';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {LogoutDialogComponent} from "./other/logout-dialog/logout-dialog.component";
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter, map, switchMap } from 'rxjs';
import { Breadcrumb } from 'src/shared/models/breadcrumb';
import { BreadcrumbService } from 'src/shared/services/breadcrumb.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent {

    constructor(
        protected keycloak: KeycloakService,
        private dialog: MatDialog,
		private readonly breadcrumbService: BreadcrumbService,
		private readonly router: Router,
		private readonly activatedRoute: ActivatedRoute,
	) {
        this.isAdmin = keycloak.getUserRoles().includes(Roles.Admin)
	}

	ngOnInit() {
		this.router.events.pipe(
			filter(event => event instanceof NavigationEnd),
			map(() => this.activatedRoute)
		).subscribe(route => {
			const breadcrumbs = this.createBreadcrumbs(route);
			this.breadcrumbService.setBreadcrumbs(breadcrumbs);
		});
	}

	private createBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: Breadcrumb[] = []): Breadcrumb[] {

		const children: ActivatedRoute[] = route.children;

		if (children.length === 0) {
			return breadcrumbs;
		}

		for (const child of children) {
			const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');
			if (routeURL !== '') {
				url += `/${routeURL}`;
			}

			breadcrumbs.push({ name: child.snapshot.data['breadcrumb'], path: url });
			return this.createBreadcrumbs(child, url, breadcrumbs);
		}
		return breadcrumbs;
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
