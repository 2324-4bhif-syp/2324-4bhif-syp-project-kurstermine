import { Component } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, RouterModule } from '@angular/router';
import { filter, map, switchMap } from 'rxjs';
import { Breadcrumb } from 'src/shared/models/breadcrumb';
import { BreadcrumbService } from 'src/shared/services/breadcrumb.service';

@Component({
	selector: 'app-breadcrumb',
	standalone: true,
	imports: [RouterModule],
	templateUrl: './breadcrumb.component.html',
	styleUrl: './breadcrumb.component.css'
})
export class BreadcrumbComponent {
	breadcrumbs: Breadcrumb[] = [];

	constructor(private breadcrumbService: BreadcrumbService) { }

	ngOnInit() {
		this.breadcrumbService.getBreadcrumbs().subscribe((breadcrumbs: Breadcrumb[]) => {
			this.breadcrumbs = breadcrumbs;
			console.log(this.breadcrumbs);
		});
	}
}
