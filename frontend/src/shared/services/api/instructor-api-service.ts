import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiService } from "@services/api";
import { set, User } from "@models";

@Injectable({
    providedIn: "root",
})
export class InstructorApiService extends ApiService {
    constructor(http: HttpClient) {
        super(http, "instructors");
    }

    public getById(instructorId: string): Observable<User> {
        return this.http.get<User>(`${this.url}/${instructorId}`, {
            headers: this.headers,
        });
    }

    public getAllForOrganisation(): void {
        this.http
            .get<User[]>(this.url, {
                headers: this.headers,
            })
            .subscribe((instructors) => {
                set((model) => {
                    model.instructors = instructors;
                });
            });
    }
}
