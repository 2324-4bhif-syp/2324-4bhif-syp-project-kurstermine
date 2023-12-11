import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {fromInstructor, InstructorDto} from "../../models/dtos/instructor-dto";
import {fromInstructorDto, Instructor} from "../../models/instructor";
import {ApiService} from "./api.service";

@Injectable({
  providedIn: 'root'
})
export class InstructorApiService extends ApiService<Instructor, InstructorDto>{
  constructor(http: HttpClient) {
    super(http, "instructors", fromInstructorDto);
  }

  public add(instructor: Instructor): Observable<Instructor> {
    return this.http.post<InstructorDto>(this.url, fromInstructor(instructor), {
      headers: this.headers.set("Content-Type", "application/json")
    }).pipe(
      map(instructor => {
        return fromInstructorDto(instructor)
      })
    )
  }
}
