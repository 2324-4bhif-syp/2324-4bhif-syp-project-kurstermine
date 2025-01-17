import { Component, inject } from "@angular/core";
import { AsyncPipe } from "@angular/common";
import { StoreService } from "@services";
import { distinctUntilChanged, map } from "rxjs";
import { RouterModule } from "@angular/router";

@Component({
    selector: "app-org-appointments",
    standalone: true,
    imports: [AsyncPipe, RouterModule],
    templateUrl: "./org-appointments.component.html",
    styleUrl: "./org-appointments.component.css",
})
export class OrgAppointmentsComponent {
    protected viewModel = inject(StoreService).store.pipe(
        map((model) =>
            model.appointments.map((a) => ({
                ...a,
                bookings: model.tokens.filter((t) => t.appointmentId === a.id)
                    .length,
            })),
        ),
        distinctUntilChanged(),
    );
}
