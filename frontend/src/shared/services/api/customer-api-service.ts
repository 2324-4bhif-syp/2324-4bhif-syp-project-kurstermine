import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiService } from "@services/api/api.service";
import { User } from "@models";

@Injectable({
    providedIn: "root",
})
export class CustomerApiService extends ApiService {
    constructor(http: HttpClient) {
        super(http, "customers");
    }

    public getById(customerId: string): Observable<User> {
        return this.http
            .get<User>(`${this.url}/${customerId}`, {
                headers: this.headers,
            });
    }
}
