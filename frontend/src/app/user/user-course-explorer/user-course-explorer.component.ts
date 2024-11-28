import { Component, inject } from "@angular/core";
import { StoreService } from "@services";
import { distinctUntilChanged, map, tap } from "rxjs";
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
                categories: model.categories
                    .filter((cat) => cat.organisationId === o.id)
                    .map((cat) => ({
                        ...cat,
                        unusedTokens: model.tokens.filter(
                            (t) =>
                                t.categoryId === cat.id &&
                                t.appointmentId === undefined &&
                                t.userId === model.currentUser?.id,
                        ).length,
                    })),
            })),
            breadcrumbs: [
                model.organisations
                    .map((o) => ({
                        id: o.id,
                        name: o.name,
                    }))
                    .find(
                        (o) => o.id === model.courseView.selectedOrganisationId,
                    ),
                model.categories
                    .map((c) => ({
                        id: c.id,
                        name: c.name,
                    }))
                    .find((c) => c.id === model.courseView.selectedCategoryId),
                model.courses
                    .map((c) => ({
                        id: c.id,
                        name: c.name,
                    }))
                    .find((c) => c.id === model.courseView.selectedCourseId),
            ].filter((x) => !!x),
        })),
        distinctUntilChanged(),
    );

    protected selectOrganisation(organisation: Organisation): void {
        set((model) => {
            model.courseView.selectedCategoryId = undefined;
            model.courseView.selectedOrganisationId = organisation.id;
        });
    }

    protected selectCategory(category: Category): void {
        set((model) => {
            model.courseView.selectedCategoryId = category.id;
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
