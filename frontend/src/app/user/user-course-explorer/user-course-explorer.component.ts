import { Component, inject } from "@angular/core";
import { StoreService } from "@services";
import { distinctUntilChanged, map } from "rxjs";
import { AsyncPipe } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Category } from "@models/category";
import { Organisation, Roles, set } from "@models";
import { UserCoursesComponent } from "@components/user/user-courses/user-courses.component";
import { RouterModule, Routes } from "@angular/router";
import { UserAppointmentsComponent } from "../user-appointments/user-appointments.component";
import { AuthGuard } from "@components/other/guard/auth.guard";
import { RoleGuard } from "@components/other/guard/role.guard";

@Component({
  selector: "app-user-course-explorer",
  standalone: true,
  imports: [
    UserAppointmentsComponent,
    AsyncPipe,
    FormsModule,
    UserCoursesComponent,
    RouterModule,
  ],
  templateUrl: "./user-course-explorer.component.html",
  styleUrl: "./user-course-explorer.component.css",
})
export class UserCourseExplorerComponent {
  private storeService: StoreService = inject(StoreService);

  protected viewModel = this.storeService.store.pipe(
    map((model) => ({
      organisations: model.organisations.map((o) => ({
        ...o,
        categories: model.categories.filter(
          (cat) => cat.organisationId === o.id,
        ),
      })),
    })),
    distinctUntilChanged(),
  );

  protected selectOrganisation(organisation: Organisation): void {
    set((model) => {
      model.courseView.selectedCategory = undefined;
      model.courseView.selectedOrganisation = organisation;
    });
  }

  protected selectCategory(category: Category): void {
    set((model) => {
      model.courseView.selectedCategory = category;
    });
  }
}

export const routes: Routes = [
  {
    path: "",
    component: UserCourseExplorerComponent,
    children: [
      {
        path: ":organisationId",
        component: UserCoursesComponent,
      },
      {
        path: ":organisationId/:categoryId",
        component: UserCoursesComponent,
      },
      {
        path: ":organisationId/:categoryId/:courseId",
        canActivate: [AuthGuard, RoleGuard],
        data: {
          roles: [Roles.Customer],
        },
        component: UserAppointmentsComponent,
      },
    ],
  },
];
