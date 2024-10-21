import {Component, inject} from '@angular/core';
import {StoreService} from "@services";
import {distinctUntilChanged, map} from "rxjs";
import {AsyncPipe} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {Category} from "@models/category";
import {Organisation, set} from "@models";
import {UserCoursesComponent} from "@components/user/user-courses/user-courses.component";

@Component({
  selector: 'app-user-course-explorer',
  standalone: true,
    imports: [
        AsyncPipe,
        FormsModule,
        UserCoursesComponent
    ],
  templateUrl: './user-course-explorer.component.html',
  styleUrl: './user-course-explorer.component.css'
})
export class UserCourseExplorerComponent {
    private storeService: StoreService = inject(StoreService);

    protected viewModel = this.storeService.store.pipe(map(model => ({
        organisations: model.organisations.map(o => ({
            ...o,
            categories: model.categories.filter(cat => cat.organisationId === o.id)
        })),
    })),
        distinctUntilChanged()
    );

    protected selectOrganisation(organisation: Organisation): void {
        set(model => {
            model.courseView.selectedCategory = undefined;
            model.courseView.selectedOrganisation = organisation;
        });
    }

    protected selectCategory(category: Category): void {
        set(model => {
            model.courseView.selectedCategory = category;
            model.courseView.selectedOrganisation = undefined;
        });
    }
}
