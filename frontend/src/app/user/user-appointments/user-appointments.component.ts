import { Component, inject, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AppointmentApiService, TokenApiService } from "@services/api";
import { StoreService } from "@services";
import { distinctUntilChanged, map } from "rxjs";
import {AsyncPipe, NgTemplateOutlet} from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { set } from "@models/model";
import { Appointment, Token } from "@models";

@Component({
  selector: "app-user-appointments",
  standalone: true,
    imports: [FormsModule, AsyncPipe, NgTemplateOutlet],
  templateUrl: "./user-appointments.component.html",
  styleUrl: "./user-appointments.component.css",
})
export class UserAppointmentsComponent implements OnInit {
  protected readonly String = String;
  protected onlyBooked: boolean = false;
  private storeService = inject(StoreService);
  private appointmentApiService = inject(AppointmentApiService);
  private tokenApiService = inject(TokenApiService);
  private route = inject(ActivatedRoute);

  protected viewModel = this.storeService.store.pipe(
    map((model) => ({
      appointments: model.appointments
        .filter((a) => this.onlyBooked ?
            true :
            a.courseId === model.courseView.selectedCourseId)
        .filter((a) => this.onlyBooked ?
            model.tokens.find(
                (t) => t.appointmentId === a.id && t.userId === model.currentUser?.id
            ) !== undefined :
            true)
        .sort((a1, a2) => a1.date.getTime() - a2.date.getTime())
        .map((a) => ({
          ...a,
          isAppointmentBooked:
            model.tokens.find(
              (t) =>
                t.appointmentId === a.id && t.userId === model.currentUser?.id,
            ) !== undefined,
        })),
      unusedTokens: model.tokens.filter(
        (t) =>
          t.categoryId === model.courseView.selectedCategoryId &&
          t.appointmentId === undefined &&
          t.userId === model.currentUser?.id,
      ).length,
    })),
    distinctUntilChanged(),
  );

  protected searchValue: string = "";
  protected view: "table" | "card" = "card";

  protected search(): void {
    this.appointmentApiService.search(this.searchValue);
  }

  protected changeView(view: "table" | "card"): void {
    this.view = view;
  }

  public ngOnInit(): void {
    this.onlyBooked = this.route.snapshot.data["onlyBooked"] ?? false;

    this.route.params.subscribe((params) => {
      set((model) => {
        model.courseView.selectedOrganisationId = Number(
          params["organisationId"],
        );
        model.courseView.selectedCategoryId = Number(params["categoryId"]);
        model.courseView.selectedCourseId = Number(params["courseId"]);
      });
    });
  }

  protected isAppointmentOver(appointment: Appointment): boolean {
    return appointment.date < new Date();
  }

  protected addAppointmentToToken(appointment: Appointment): void {
    const token: Token | undefined = this.storeService.store.value.tokens.find(
      (t) =>
        t.categoryId ===
          this.storeService.store.value.courseView.selectedCategoryId &&
        t.appointmentId === undefined,
    );

    if (token !== undefined) {
      const updatedToken: Token = { ...token };
      updatedToken.appointmentId = appointment.id;
      this.tokenApiService.update(updatedToken);
    }
  }
}
