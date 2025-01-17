import { AsyncPipe } from "@angular/common";
import { Component, inject, OnInit } from "@angular/core";
import { ActivatedRoute, RouterModule } from "@angular/router";
import { set } from "@models/model";
import { StoreService } from "@services/store.service";
import { distinctUntilChanged, map } from "rxjs";

@Component({
    selector: "app-org-appointment",
    standalone: true,
    imports: [AsyncPipe],
    templateUrl: "./org-appointment.component.html",
    styleUrl: "./org-appointment.component.css",
})
export class OrgAppointmentComponent implements OnInit {
    private route = inject(ActivatedRoute);

    protected viewModel = inject(StoreService).store.pipe(
        map((model) => ({
            appointment: {
                ...model.appointments.find(
                    (a) => a.id === model.appointmentView.selectedAppointmentId,
                ),
                bookings: model.tokens
                    .filter(
                        (t) =>
                            t.appointmentId ===
                            model.appointmentView.selectedAppointmentId,
                    )
                    .map((t) => ({
                        ...t,
                        user: model.users.find((u) => u.id === t.userId),
                    }))
                    .sort((a, b) =>
                        // redeemedAt should be populated since an appointment was set for the token
                        a.redeemedAt! > b.redeemedAt!
                            ? -1
                            : a.redeemedAt! < b.redeemedAt!
                              ? 1
                              : 0,
                    ),
                instructors: model.appointmentManagements
                    .filter(
                        (am) =>
                            am.id?.appointmentId ===
                            model.appointmentView.selectedAppointmentId,
                    )
                    .map((am) =>
                        model.instructors.find(
                            (i) => am.id?.instructorId === i.id,
                        ),
                    )
                    .filter((i) => !!i),
            },
        })),
        distinctUntilChanged(),
    );

    public ngOnInit(): void {
        this.route.params.subscribe((params) => {
            set((model) => {
                model.appointmentView.selectedAppointmentId = Number(
                    params["id"],
                );
            });
        });
    }
}
