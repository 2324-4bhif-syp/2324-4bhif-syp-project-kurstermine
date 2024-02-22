import { Injectable } from '@angular/core';
import { Instructor } from '../models/instructor';
import { InstructorApiService } from './api/instructor-api.service';
import {ReplayBaseService} from "./replay-base-service";

@Injectable({
    providedIn: 'root',
})
export class InstructorService extends ReplayBaseService<Instructor> {
    protected api: InstructorApiService;
    finished = false;

    constructor(instructorApiService: InstructorApiService) {
        super(instructorApiService, instructorApiService.getAll, (instructors) => super.add(...instructors));
        this.api = instructorApiService;
    }

    override add(item: Instructor): void {
        this.api.add(item).subscribe({
            next: (instructor) => {
                super.add(instructor);
            },
        });
    }
}
