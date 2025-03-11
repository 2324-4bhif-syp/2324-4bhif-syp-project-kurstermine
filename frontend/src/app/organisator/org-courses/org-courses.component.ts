import { Component, inject } from "@angular/core";
import { AsyncPipe } from "@angular/common";
import { StoreService } from "@services";
import { distinctUntilChanged, map } from "rxjs";
import { RouterModule } from "@angular/router";
import { AdminUserApiService } from "@services/api/admin-user-api.service";
import { Course } from "@models/course";
import { CourseApiService } from "@services/api";
import { FormsModule } from "@angular/forms";

@Component({
  selector: "app-org-courses",
  standalone: true,
  imports: [AsyncPipe, RouterModule, FormsModule],
  templateUrl: "./org-courses.component.html",
  styleUrl: "./org-courses.component.css",
})
export class OrgCoursesComponent {
  protected adminUserApi = inject(AdminUserApiService);
  protected courseApiService = inject(CourseApiService);
  protected store = inject(StoreService).store;

  protected viewModel = this.store.pipe(
    map((model) => ({
      courses: model.courses
        .map((c) => ({
          ...c,
          category: model.categories.find((ca) => ca.id === c.categoryId),
        }))
        .filter((c) => c.category?.organisationId === model.organisationOfCurrentUser?.id),
      categories: model.categories.filter((c) => c.organisationId === model.organisationOfCurrentUser?.id),
      organisationOfCurrentUser: model.organisationOfCurrentUser,
    })),
    distinctUntilChanged(),
  );

  public newCourseName: string | undefined;
  public newCategoryId: number | undefined;

  public onCourseAddSubmit() {
    let name = this.newCourseName;
    let categoryId = this.newCategoryId;

    if (!name || !categoryId) return;

    let course: Course = {
      name: name,
      categoryId: categoryId,
    };

    this.courseApiService.add(course, categoryId);
  }
}
