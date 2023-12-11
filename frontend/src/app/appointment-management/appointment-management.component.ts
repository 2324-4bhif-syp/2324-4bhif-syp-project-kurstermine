import {Component, Input} from '@angular/core';
import {Appointment} from "../shared/models/appointment";
import {InstructorService} from "../shared/services/instructor.service";
import {Instructor} from "../shared/models/instructor";
import {AppointmentManagement} from "../shared/models/appointmentManagement";
import {AppointmentManagementService} from "../shared/services/appointment-management.service";

@Component({
  selector: 'app-appointment-management',
  templateUrl: './appointment-management.component.html',
  styleUrls: ['./appointment-management.component.css']
})
export class AppointmentManagementComponent {
  @Input() appointment: Appointment | undefined;
  protected selectedInstructor: Instructor | undefined;

  constructor(protected appointmentManagementService: AppointmentManagementService,
              protected instructorService: InstructorService) {
  }

  protected getAppointmentManagement() : AppointmentManagement[] {
    return this.appointmentManagementService.get(appointmentManagement =>
      appointmentManagement.appointment.id == this.appointment?.id);
  }

  protected getInstructors() : Instructor[] {
    return this.instructorService.get(instructor => !this.getAppointmentManagement()
      .some(appointmentManagement => appointmentManagement.instructor.id === instructor.id));
  }

  public add() {
    if(!this.selectedInstructor || !this.appointment) return;
    if(!this.selectedInstructor.id || !this.appointment.id) return;

    let appointmentManagement: AppointmentManagement = {
      id: {
        appointmentId: this.appointment.id,
        instructorId: this.selectedInstructor.id
      },
      instructor: this.selectedInstructor,
      appointment: this.appointment
    }

    this.appointmentManagementService.add(appointmentManagement)
  }

  public remove(appointmentManagement: AppointmentManagement) {
    this.appointmentManagementService.remove(appointmentManagement);
  }
}
