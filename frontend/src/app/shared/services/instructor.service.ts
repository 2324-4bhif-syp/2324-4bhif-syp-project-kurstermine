import { Injectable } from '@angular/core';
import {Service} from "./service";
import {Instructor} from "../models/instructor";
import {InstructorApiService} from "./api/instructor-api.service";

@Injectable({
  providedIn: 'root'
})
export class InstructorService extends Service<Instructor> {

  protected api: InstructorApiService;

  constructor(instructorApiService: InstructorApiService) {
    super();

    this.api = instructorApiService;

    this.api.getAll().subscribe({
      next: (instructors) => {
        super.add(...instructors)
      }
    })
  }

  override add(item: Instructor): void {
    this.api.add(item).subscribe({
      next: (instructor => {
        super.add(instructor);
      })
    });
  }
}
