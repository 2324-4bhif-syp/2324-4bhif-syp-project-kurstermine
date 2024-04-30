import {Component, OnInit} from '@angular/core';
import { InstructorService } from '../../../shared/services/instructor.service';
import { Instructor } from '../../../shared/models/instructor';
import { MatActionList } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { MatDivider } from '@angular/material/divider';
import {InstructorApiService} from "../../../shared/services/api/instructor-api.service";

@Component({
    standalone: true,
    imports: [MatActionList, RouterModule, MatIcon, MatDivider],
    selector: 'app-admin-instructors',
    templateUrl: './admin-instructors.component.html',
    styleUrls: ['./admin-instructors.component.css'],
})
export class AdminInstructorsComponent implements OnInit {
    protected newInstructor: Instructor;

    constructor(
        protected instructorService: InstructorService,
        protected instructorApiService: InstructorApiService,
    ) {
        this.newInstructor = {
            firstName: '',
            lastName: '',
            email: '',
        };
    }

    parseDate(event: Event): Date {
        const dateString: string = (event.target as HTMLInputElement).value;

        let date: Date = new Date();
        if (dateString) {
            date = new Date(dateString);
        }

        return date;
    }

    add() {
        this.instructorService.add(this.newInstructor);

        this.newInstructor = {
            firstName: '',
            lastName: '',
            email: '',
        };
    }

    ngOnInit(): void {
        this.instructorApiService.getAll();
    }
}
