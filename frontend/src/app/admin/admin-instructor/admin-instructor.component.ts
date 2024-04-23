import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { AppointmentManagementService } from 'src/shared/services/appointment-management.service';
import { AppointmentService } from 'src/shared/services/appointment.service';
import { InstructorService } from 'src/shared/services/instructor.service';
import {AdminPacketComponent} from "../admin-packet/admin-packet.component";

@Component({
  selector: 'app-admin-instructor',
  standalone: true,
    imports: [MatListModule, RouterModule, AdminPacketComponent],
  templateUrl: './admin-instructor.component.html',
  styleUrl: './admin-instructor.component.css'
})
export class AdminInstructorComponent {
  constructor(
    private route: ActivatedRoute,
    private instructorService: InstructorService,
    private appointmentService: AppointmentService,
    private appointmentManagement: AppointmentManagementService
  ) {

  }

  id: string = this.route.snapshot.params['id'];

  protected get instructor() {
    let instructor = this.instructorService.get(i => i.id === this.id)[0]
    if (instructor) {
      return instructor;
    }
    return undefined;
  }

  protected get appointments() {
    return this.appointmentManagement.get(a => a.instructor.id === this.id).map(a => a.appointment);
  }
}
