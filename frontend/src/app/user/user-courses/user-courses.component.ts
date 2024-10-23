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
    map(model => ({
      selectedCategory: model.courseView.selectedCategory,
      courses: model.courses
        .map(c => ({
          ...c,
          category: model.categories
            .map(cat => ({
              ...cat,
              organisation: model.organisations.find(
                o => o.id === cat.organisationId,
              ),
            }))
            .find(cat => cat.id === c.categoryId),
        }))
        .filter(c =>
          model.courseView.selectedCategory !== undefined
            ? c.category?.id === model.courseView.selectedCategory?.id
            : model.courseView.selectedOrganisation !== undefined
              ? c.category?.organisation?.id ===
                model.courseView.selectedOrganisation?.id
              : false,
        ),
    })),
    distinctUntilChanged(),
  );

  protected selectCourse(course: Course) {
    set(model => {
      model.courseView.selectedCourse = course;
    });
  }

  ngOnInit(): void {
    let organisationId = Number(this.route.snapshot.params["organisationId"]);
    let categoryId = Number(this.route.snapshot.params["categoryId"]);

    set(model => {
      model.courseView.selectedOrganisation = model.organisations.find(
        o => o.id === organisationId,
      );

      model.courseView.selectedCategory = model.categories.find(
        c => c.id === categoryId,
      );
    });
  }
}
