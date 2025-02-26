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
          model.adminUsers = appointments;
        });
      });
  }

  addRole(userId: string, role: string) {
    this.http
      .put(`${this.url}/${userId}?role=${role}`, {})
      .subscribe(() => {
        this.getAll();
      });
  }

  deleteRole(userId: string, role: string) {
    this.http
      .delete(`${this.url}/${userId}?role=${role}`, {})
      .subscribe(() => {
        this.getAll();
      });
  }
}
