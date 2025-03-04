import {Component, ElementRef, inject, OnInit, ViewChild} from '@angular/core';
import {StoreService} from "@services";
import {distinctUntilChanged, map} from "rxjs";
import {AsyncPipe} from "@angular/common";
import {AdminUserApiService} from "@services/api/admin-user-api.service";
import {FormsModule} from "@angular/forms";
import {AdminUser} from "@models/admin-user";
import {Roles} from "@models";
import {KeycloakService} from "keycloak-angular";

@Component({
  selector: 'app-admin-roles',
  standalone: true,
  imports: [
    AsyncPipe,
    FormsModule
  ],
  templateUrl: './admin-roles.component.html'
})
export class AdminRolesComponent implements OnInit {
  protected adminUserApi = inject(AdminUserApiService);
  @ViewChild("RoleAdder") protected roleAdder!: ElementRef<HTMLDialogElement>;

  protected viewModel = inject(StoreService).store.pipe(
    map((model) => model.adminUsers),
    distinctUntilChanged(),
  );

  protected userRole: string = "";
  protected user!: AdminUser;
  readonly roles = [Roles.Admin, Roles.Organisator, Roles.Instructor];
  private readonly keycloak = inject(KeycloakService);
  private connectedUserId?: string;

  openRoleAdder(user: AdminUser) {
    console.log(this.roleAdder);
    this.roleAdder.nativeElement.showModal();
    this.user = user;
  }

  ngOnInit() {
    this.adminUserApi.getAll();
    this.keycloak.loadUserProfile().then(userProfile => {
      this.connectedUserId = userProfile.id;
    })
  }

  close() {
    this.roleAdder.nativeElement.close();
  }

  addRole() {
    console.log(this.userRole);
    this.adminUserApi.addRole(this.user.id!, this.userRole);
    this.close();
  }

  getRoles() {
    if (!this.user) {
      return this.roles;
    }
    return this.roles.filter((role) => !this.user.roles.includes(role));
  }

  deleteRole(id: string, role: string) {
    if (!this.connectedUserId || this.connectedUserId === id) {
      return;
    }
    this.adminUserApi.deleteRole(id, role);
  }
}
