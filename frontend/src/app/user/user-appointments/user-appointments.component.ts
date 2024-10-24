import { Component, inject, OnInit } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AppointmentApiService } from "@services/api";
import { StoreService } from "@services";
import { distinctUntilChanged, map } from "rxjs";
import { AsyncPipe } from "@angular/common";
import { ActivatedRoute } from "@angular/router";
import { set } from "@models/model";

@Component({
  selector: "app-user-appointments",
  standalone: true,
  imports: [FormsModule, AsyncPipe],
  templateUrl: "./user-appointments.component.html",
  styleUrl: "./user-appointments.component.css",
})
export class UserAppointmentsComponent implements OnInit {
  private storeService = inject(StoreService);
  private appointmentApiService = inject(AppointmentApiService);
  private route = inject(ActivatedRoute);

  protected viewModel = this.storeService.store.pipe(
    map((model) => ({
      appointments: model.appointments.filter(
        (a) => a.courseId === model.courseView.selectedCourseId,
      ),
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

  protected readonly String = String;
}
