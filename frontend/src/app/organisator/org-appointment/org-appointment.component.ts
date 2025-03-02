import { AsyncPipe } from "@angular/common";
import { Component, ElementRef, inject, model, OnInit, signal, ViewChild } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { ActivatedRoute } from "@angular/router";
import { set } from "@models/model";
import { StoreService } from "@services/store.service";
import { distinct, distinctUntilChanged, map, tap } from "rxjs";
import { CustomerApiService } from "@services/api/customer-api-service";
import { User } from "@models/user";
import { AppointmentManagement } from "@models/appointment-management";
import { AppointmentManagementApiService } from "@services/api";
import { ConstantPool } from "@angular/compiler";

@Component({
    selector: "app-org-appointment",
    standalone: true,
    imports: [AsyncPipe],
    templateUrl: "./org-appointment.component.html",
    styleUrl: "./org-appointment.component.css",
})
export class OrgAppointmentComponent implements OnInit {
    private route = inject(ActivatedRoute);
    private store = inject(StoreService).store;
    private customerApiService = inject(CustomerApiService);
    private appointmentManagementApiService = inject(AppointmentManagementApiService);

    protected viewModel = toSignal(
        this.store.pipe(
            map((model) => ({
                appointment: {
                    ...model.appointments.find((a) => a.id === model.appointmentView.selectedAppointmentId),
                    bookings: model.tokensForCurrentOrganisation
                        .filter((t) => t.appointmentId === model.appointmentView.selectedAppointmentId)
                        .map((t) => ({
                            ...t,
                            user: this.customerApiService.getById(t.userId),
                        }))
                        .sort((a, b) =>
                            // redeemedAt should be populated since an appointment was set for the token
                            a.redeemedAt! > b.redeemedAt! ? -1 : a.redeemedAt! < b.redeemedAt! ? 1 : 0,
                        ),
                    instructors: model.appointmentManagements
                        .filter((am) => am.id?.appointmentId === model.appointmentView.selectedAppointmentId)
                        .map((am) => model.instructors.find((i) => am.id?.instructorId === i.id)!)
                        .filter((i) => !!i)
                        .sort((a, b) => {
                            if (!a.lastName) return 1;
                            if (!b.lastName) return -1;
                            return a.lastName.localeCompare(b.lastName);
                        }),
                },
                instructors: model.instructors
                    .map((i) => ({
                        ...i,
                        selected: model.appointmentView.appointmentManagements.some((am) => am.id?.instructorId === i.id),
                    }))
                    .sort((a, b) => {
                        if (!a.lastName) return -1;
                        if (!b.lastName) return -1;
                        return a.lastName.localeCompare(b.lastName);
                    }),
            })),
            distinctUntilChanged(),
        ),
    );

    public ngOnInit(): void {
        this.route.params.subscribe((params) => {
            set((model) => {
                model.appointmentView.selectedAppointmentId = Number(params["id"]);
            });
        });

        this.store
            .pipe(
                map((m) => m.appointmentManagements),
                distinctUntilChanged(),
            )
            .subscribe((am) => {
                set((m) => {
                    m.appointmentView.appointmentManagements = am.filter((am) => am.id?.appointmentId === m.appointmentView.selectedAppointmentId);
                });
            });
    }

    public instructorSelectionChanged(event: Event, instructor: User | undefined) {
        if (!instructor || !instructor.id) return;
        const target = event.target as HTMLInputElement;

        if (target.checked) {
            set((m) => {
                m.appointmentView.appointmentManagements.push({
                    id: {
                        instructorId: instructor.id!,
                        appointmentId: m.appointmentView.selectedAppointmentId!,
                    },
                });
            });
        } else {
            set((m) => {
                m.appointmentView.appointmentManagements = m.appointmentView.appointmentManagements.filter(
                    (am) => am.id?.instructorId !== instructor.id,
                );
            });
        }
    }

    public onInstructorSelectionSubmit() {
        const model = this.store.value;
        const toAdd = model.appointmentView.appointmentManagements.filter((am) => !model.appointmentManagements.some(({ id }) => id === am.id));
        const toRemove = model.appointmentManagements.filter((am) => !model.appointmentView.appointmentManagements.some(({ id }) => id === am.id));

        console.log("ToAdd", toAdd);
        console.log("ToRemove", toRemove);

        if (toAdd.length !== 0) {
            this.appointmentManagementApiService.addBatch(toAdd);
        }
        if (toRemove.length !== 0) {
            this.appointmentManagementApiService.removeBatch(toRemove);
        }
    }
}
