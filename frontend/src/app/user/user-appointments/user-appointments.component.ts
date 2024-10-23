import { ChangeDetectorRef, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppointmentApiService } from '@services/api';
import { StoreService } from '@services';
import { distinctUntilChanged, map, Subscription } from 'rxjs';
import {AsyncPipe} from "@angular/common";
import { ActivatedRoute } from '@angular/router';
import { set } from '@models/model';

@Component({
    selector: 'app-user-appointments',
    standalone: true,
    imports: [FormsModule, AsyncPipe],
    templateUrl: './user-appointments.component.html',
    styleUrl: './user-appointments.component.css',
})
export class UserAppointmentsComponent implements OnInit {
    private storeService: StoreService = inject(StoreService);
    private appointmentApiService: AppointmentApiService = inject(AppointmentApiService);
    private route = inject(ActivatedRoute);
    private cdr = inject(ChangeDetectorRef);

    protected viewModel = this.storeService.store.pipe(map(model => ({
            appointments: model.appointments.filter(a => a.courseId === model.courseView.selectedCourse)
        })),
        distinctUntilChanged()
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
      let courseId = Number(this.route.snapshot.params["courseId"]);

      set(model => {
        model.courseView.selectedCourse = model.courses.find(
          c => c.id === courseId
        );
      });
      this.appointmentApiService.getAll();
    }

    protected readonly String = String;
}
