import { Component, inject, OnInit } from '@angular/core';
import { Instructor } from '@models';
import { MatActionList } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { MatDivider } from '@angular/material/divider';
import { InstructorApiService } from "@services/api";
import { StoreService } from '@services';
import { distinctUntilChanged, map } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
    standalone: true,
    imports: [MatActionList, RouterModule, MatIcon, MatDivider, AsyncPipe],
    selector: 'app-admin-instructors',
    templateUrl: './admin-instructors.component.html',
    styleUrls: ['./admin-instructors.component.css'],
})
export class AdminInstructorsComponent implements OnInit {
    protected newInstructor: Instructor;

    private instructorApiService = inject(InstructorApiService);

    protected viewModel = inject(StoreService)
        .store
        .pipe(
            map(model => model.instructors),
            distinctUntilChanged(),
        );

    constructor() {
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
        this.instructorApiService.add(this.newInstructor);

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
