import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppointmentApiService } from '@services/api';
import { StoreService } from '@services';
import { distinctUntilChanged, map } from 'rxjs';
import {AsyncPipe} from "@angular/common";

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

    protected viewModel = this.storeService.store.pipe(map(model => ({
            appointments: model.appointments.filter(a => a.courseId === model.courseView.selectedCourse?.id),
        })),
        distinctUntilChanged()
    );

    protected searchValue: string = '';

    protected search(): void {
        this.appointmentApiService.search(this.searchValue);
    }

    public ngOnInit(): void {
        this.appointmentApiService.getAll();
    }

    protected readonly String = String;
}
