import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { fromInstructorDto, Instructor, set } from '@models';
import { ApiService } from '@services/api/api.service';
import { InstructorDto, fromInstructor } from '@models/dtos';

@Injectable({
    providedIn: 'root',
})
export class InstructorApiService extends ApiService {
    constructor(http: HttpClient) {
        super(http, 'instructors');
    }

    public getAll() {
        this.http
            .get<InstructorDto[]>(this.url, {
                headers: this.headers,
            })
            .pipe(
                map((dtos) => {
                    return dtos.map<Instructor>(fromInstructorDto);
                }),
            )
            .subscribe((instructors) => {
                set((model) => {
                    if (model.instructors.length === 0) {
                        model.instructors = instructors;
                    }
                });
            });
    }

    public add(instructor: Instructor) {
        this.http
            .post<InstructorDto>(this.url, fromInstructor(instructor), {
                headers: this.headers.set('Content-Type', 'application/json'),
            })
            .pipe(
                map((instructor) => {
                    return fromInstructorDto(instructor);
                }),
            )
            .subscribe((instructor) => {
                set((model) => {
                    model.instructors.push(instructor);
                });
            });
    }
}
