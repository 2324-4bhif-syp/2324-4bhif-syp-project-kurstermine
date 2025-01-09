import {Component, inject} from '@angular/core';
import {AsyncPipe} from "@angular/common";
import {StoreService} from "@services";
import {distinctUntilChanged, map} from "rxjs";

@Component({
  selector: 'app-org-appointments',
  standalone: true,
    imports: [
        AsyncPipe
    ],
  templateUrl: './org-appointments.component.html',
  styleUrl: './org-appointments.component.css'
})
export class OrgAppointmentsComponent {
    protected viewModel = inject(StoreService).store.pipe(
        map((model) => model.appointments),
        distinctUntilChanged(),
    );
}
