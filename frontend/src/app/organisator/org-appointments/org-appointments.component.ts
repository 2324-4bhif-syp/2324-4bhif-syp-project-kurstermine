import { Component, inject } from "@angular/core";
import { AsyncPipe } from "@angular/common";
import { StoreService } from "@services";
import { distinctUntilChanged, map, tap } from "rxjs";
import { RouterModule } from "@angular/router";
import { AdminUserApiService } from "@services/api/admin-user-api.service";
import { FormsModule } from "@angular/forms";
import { Appointment } from "@models/appointment";
import { AppointmentApiService } from "@services/api";

@Component({
  selector: "app-org-appointments",
  standalone: true,
  imports: [AsyncPipe, RouterModule, FormsModule],
  templateUrl: "./org-appointments.component.html",
  styleUrl: "./org-appointments.component.css",
})
export class OrgAppointmentsComponent {
  protected adminUserApi = inject(AdminUserApiService);
  protected appointmentService = inject(AppointmentApiService);
  protected store = inject(StoreService).store;

  protected viewModel = this.store.pipe(
    map((model) => ({
      appointments: model.appointments
        .map((a) => ({
          ...a,
          bookings: model.tokensForCurrentOrganisation.filter(
            (t) => t.appointmentId === a.id,
          ).length,
          course: {
            ...model.courses.find((c) => c.id === a.courseId),
            category: model.categories.find(
              (c) =>
                c.id ===
                model.courses.find((c) => c.id === a.courseId)?.categoryId,
            ),
          },
        }))
        .filter(
          (a) =>
            a.course.category?.organisationId ===
            model.organisationOfCurrentUser?.id,
        ),
      courses: model.courses
        .map((c) => ({
          ...c,
          category: model.categories.find((ca) => ca.id === c.categoryId),
        }))
        .filter(
          (c) =>
            c.category?.organisationId === model.organisationOfCurrentUser?.id,
        ),
      organisationOfCurrentUser: model.organisationOfCurrentUser,
    })),
    distinctUntilChanged(),
  );

  public newCourseId: number | undefined;
  public newAppointmentName: string | undefined;
  public newAppointmentDate: string | undefined;
  public newAppointmentDuration: number | undefined;
  public newAppointmentAddress: string | undefined;

  public onAppointmentAddSubmit() {
    let name = this.newAppointmentName;
    let date = this.newAppointmentDate;
    let duration = this.newAppointmentDuration;
    let address = this.newAppointmentAddress;
    let courseId = this.newCourseId;
    let organisationId = this.store.value.organisationOfCurrentUser?.id;

    if (!name || !date || !duration || !address || !courseId || !organisationId)
      return;

    let appointment: Appointment = {
      name: name,
      date: new Date(date),
      duration: duration,
      address: address,
      courseId: courseId,
    };

    this.appointmentService.add(appointment);
  }
}
