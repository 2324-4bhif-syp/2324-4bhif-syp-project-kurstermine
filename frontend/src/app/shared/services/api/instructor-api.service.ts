import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../../environments/environment.development";
import {map, Observable} from "rxjs";
import {fromInstructor, InstructorDto} from "../../models/dtos/instructor-dto";
import {fromInstructorDto, Instructor} from "../../models/instructor";

@Injectable({
  providedIn: 'root'
})
export class InstructorApiService {

  protected http: HttpClient;
  protected url: string;
  protected headers: HttpHeaders;

  constructor(http: HttpClient) {
    this.http = http;
    this.url = `${environment.apiUrl}/instructors`;
    this.headers = new HttpHeaders().set("Accept", "application/json");
  }

  public getAll(): Observable<Instructor[]> {
    return this.http.get<InstructorDto[]>(this.url, {
      headers: this.headers
    }).pipe(
      map(instructors => {
        return instructors.map<Instructor>(fromInstructorDto);
      })
    )
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
