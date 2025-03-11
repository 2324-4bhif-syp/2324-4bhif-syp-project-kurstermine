import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs";
import { ApiService } from "@services/api/api.service";
import { CourseDto, fromCourse as fromModel } from "@models/dtos/course-dto";
import { Course, fromCourseDto as fromDto } from "@models/course";
import { set } from "@models/model";

@Injectable({
  providedIn: "root",
})
export class CourseApiService extends ApiService {
  constructor(http: HttpClient) {
    super(http, "courses");
  }

  public getAll() {
    this.http
      .get<CourseDto[]>(this.url, {
        headers: this.headers,
      })
      .pipe(map((dtos) => dtos.map(fromDto)))
      .subscribe((courses) => {
        set((model) => {
          if (model.courses.length === 0) {
            model.courses = courses;
          }
        });
      });
  }

  public add(course: Course, categoryId: number) {
    this.http
      .post<CourseDto>(`${this.url}/${categoryId}`, fromModel(course), {
        headers: this.headers.set("Content-Type", "application/json"),
      })
      .pipe(map(fromDto))
      .subscribe((course) => {
        set((model) => {
          model.courses.push(course);
        });
      });
  }

  // todo: delete
}
