import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AdminPacketComponent } from "@components/admin/admin-packet/admin-packet.component";
import { StoreService } from '@services';
import { map, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-admin-instructor',
  standalone: true,
    imports: [MatListModule, RouterModule, AdminPacketComponent, AsyncPipe],
  templateUrl: './admin-instructor.component.html',
  styleUrl: './admin-instructor.component.css'
})
export class AdminInstructorComponent {

  private id = inject(ActivatedRoute).snapshot.params['id'];

  protected viewModel = inject(StoreService)
        .store
        .pipe(
            map(model => ({
                instructor: model.instructors.find(instructor => instructor.id === this.id),
                appointments: model.appointmentManagements.filter(appointment => appointment.instructor.id === this.id).map(appointment => appointment.appointment),
            })),
            distinctUntilChanged(),
        );
}
