import {Component, inject, OnInit} from "@angular/core";
import { AsyncPipe } from "@angular/common";
import { StoreService } from "@services";
import { distinctUntilChanged, map } from "rxjs";
import { RouterModule } from "@angular/router";
import {AdminUserApiService} from "@services/api/admin-user-api.service";

@Component({
    selector: "app-org-appointments",
    standalone: true,
    imports: [AsyncPipe, RouterModule],
    templateUrl: "./org-appointments.component.html",
    styleUrl: "./org-appointments.component.css",
})
export class OrgAppointmentsComponent {
    protected adminUserApi = inject(AdminUserApiService);

    protected viewModel = inject(StoreService).store.pipe(
        map((model) => ({
          appointments: model.appointments.map((a) => ({
            ...a,
            bookings: model.tokensForCurrentOrganisation.filter((t) => t.appointmentId === a.id)
              .length,
            course: {
              ...model.courses.find(c => c.id === a.courseId),
              category: model.categories.find(c => c.id === model.courses.find(c => c.id === a.courseId)?.categoryId)
            }
          })).filter(a => a.course.category?.organisationId === model.organisationOfCurrentUser?.id),
          organisationOfCurrentUser: model.organisationOfCurrentUser
        })),
        distinctUntilChanged(),
    );
}
