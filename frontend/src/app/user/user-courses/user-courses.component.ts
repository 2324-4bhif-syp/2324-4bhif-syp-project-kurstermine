import {Component, inject} from '@angular/core';
import {AsyncPipe} from "@angular/common";
import {distinctUntilChanged, map} from "rxjs";
import {StoreService} from "@services";
import {Course} from "@models/course";
import {set} from "@models";

@Component({
  selector: 'app-user-courses',
  standalone: true,
    imports: [
        AsyncPipe
    ],
  templateUrl: './user-courses.component.html',
  styleUrl: './user-courses.component.css'
})
export class UserCoursesComponent {
    private storeService: StoreService = inject(StoreService);

    protected viewModel = this.storeService.store.pipe(map(model => ({
        courses: model.courses.map(c => ({
            ...c,
            category: model.categories.map(cat => ({
                ...cat,
                organisation: model.organisations.find(o => o.id === cat.organisationId)
            })).find(cat => cat.id === c.categoryId)
        })).filter(c => model.courseView.selectedCategory !== undefined ?
            c.category?.id === model.courseView.selectedCategory.id :
            model.courseView.selectedOrganisation !== undefined ?
                c.category?.organisation?.id === model.courseView.selectedOrganisation.id :
                false
        )
    })),
        distinctUntilChanged()
    );

    protected selectCourse(course: Course): void {
        set(model => {
            model.courseView.selectedCourse = course;
        });
    }
}
