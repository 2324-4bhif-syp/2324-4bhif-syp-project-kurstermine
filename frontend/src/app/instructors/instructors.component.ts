import { Component } from '@angular/core';
import {InstructorService} from "../shared/services/instructor.service";
import {Instructor} from "../shared/models/instructor";

@Component({
  selector: 'app-instructors',
  templateUrl: './instructors.component.html',
  styleUrls: ['./instructors.component.css']
})
export class InstructorsComponent {
  protected instructorService: InstructorService;
  protected newInstructor: Instructor;

  constructor(instructorService: InstructorService) {
    this.instructorService = instructorService;
    this.newInstructor = {
      firstName: "",
      lastName: "",
      email: "",
      hiringDate: new Date()
    }
  }

  parseDate(event: Event): Date {
    const dateString: string = (event.target as HTMLInputElement).value;

    let date: Date = new Date();
    if(dateString) {
      date = new Date(dateString);
    }

    return date;
  }

  add() {
    this.instructorService.add(this.newInstructor);

    this.newInstructor = {
      firstName: "",
      lastName: "",
      email: "",
      hiringDate: new Date()
    }
  }
}
