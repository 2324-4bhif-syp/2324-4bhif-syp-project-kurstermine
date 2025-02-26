import {Injectable} from "@angular/core";
import {ApiService} from "@services/api/api.service";
import {HttpClient} from "@angular/common/http";
import {set} from "@models";
import {AdminUser} from "@models/admin-user";

@Injectable({
  providedIn: "root",
})
export class AdminUserApiService extends ApiService {
  constructor(http: HttpClient) {
    super(http, "users");
  }

  getAll() {
    this.http
      .get<AdminUser[]>(this.url, {
        headers: this.headers,
      })
      .subscribe((appointments) => {
        set((model) => {
          if (model.adminUsers.length === 0) {
            model.adminUsers = appointments;
          }
        });
      });
  }
}
