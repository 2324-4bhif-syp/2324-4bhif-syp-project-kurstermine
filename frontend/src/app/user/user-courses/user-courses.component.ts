import { ChangeDetectorRef, Component, inject, OnInit } from "@angular/core";
import { AsyncPipe } from "@angular/common";
import { distinctUntilChanged, map } from "rxjs";
import { StoreService } from "@services";
import { Course } from "@models/course";
import { set } from "@models";
import { ActivatedRoute, RouterModule } from "@angular/router";

@Component({
  selector: "app-user-courses",
  standalone: true,
  imports: [AsyncPipe, RouterModule],
  templateUrl: "./user-courses.component.html",
  styleUrl: "./user-courses.component.css",
})
export class UserCoursesComponent implements OnInit {
  private storeService: StoreService = inject(StoreService);
  private route = inject(ActivatedRoute);
  private cdr = inject(ChangeDetectorRef);

  protected viewModel = this.storeService.store.pipe(
    map((model) => ({
      selectedCategory: model.categories.find(
        (c) => c.id === model.courseView.selectedCategoryId,
      ),
      courses: model.courses
        .map((c) => ({
          ...c,
          category: model.categories
            .map((cat) => ({
              ...cat,
              organisation: model.organisations.find(
                (o) => o.id === cat.organisationId,
              ),
            }))
            .find((cat) => cat.id === c.categoryId),
        }))
        .filter((c) =>
          model.courseView.selectedCategoryId
            ? c.category?.id === model.courseView.selectedCategoryId
            : model.courseView.selectedOrganisationId
              ? c.category?.organisation?.id ===
                model.courseView.selectedOrganisationId
              : false,
        ),
    })),
    distinctUntilChanged(),
  );

  protected selectCourse(course: Course) {
    set((model) => {
      model.courseView.selectedCourseId = course.categoryId;
    });
  }

  public ngOnInit(): void {
    this.route.params.subscribe((params) => {
      set((model) => {
        model.courseView.selectedOrganisationId = Number(
          params["organisationId"],
        );
        model.courseView.selectedCategoryId = Number(params["categoryId"]);
      });
    });
  }
}
