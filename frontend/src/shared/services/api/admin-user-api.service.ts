import {Injectable} from "@angular/core";
import {ApiService} from "@services/api/api.service";
import {HttpClient} from "@angular/common/http";
import {Organisation, set} from "@models";
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
      .subscribe((users) => {
        set((model) => {
          model.adminUsers = users;
        });
      });
  }

  getOrganisationForUser(userId: string) {
    this.http
      .get<Organisation>(`${this.url}/${userId}`, {
        headers: this.headers,
      }).subscribe((organisation) => {
        set((model) => {
          model.organisationOfCurrentUser = organisation;
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

  addOrganisation(userId: string, organisationId: number) {
    this.http
      .put(`${this.url}/${userId}/${organisationId}`, {})
      .subscribe(() => {
        this.getAll();
      });
  }

  deleteOrganisation(userId: string) {
    this.http
      .delete(`${this.url}/${userId}/organisation`, {})
      .subscribe(() => {
        this.getAll();
      });
  }
}
