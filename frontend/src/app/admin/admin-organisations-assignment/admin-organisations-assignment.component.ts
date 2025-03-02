import {Component, ElementRef, inject, OnInit, ViewChild} from '@angular/core';
import {StoreService} from "@services";
import {distinctUntilChanged, map} from "rxjs";
import {AdminUserApiService} from "@services/api/admin-user-api.service";
import {AsyncPipe} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AdminUser} from "@models/admin-user";
import {KeycloakService} from "keycloak-angular";
import {Organisation, Roles} from "@models";

@Component({
  selector: 'app-admin-organisations-assignment',
  standalone: true,
  imports: [
    AsyncPipe,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './admin-organisations-assignment.component.html',
  styleUrl: './admin-organisations-assignment.component.css'
})
export class AdminOrganisationsAssignmentComponent implements OnInit{
  protected adminUserApi = inject(AdminUserApiService);
  @ViewChild("OrganisationAdder") protected organisationAdder!: ElementRef<HTMLDialogElement>;
  private readonly keycloak = inject(KeycloakService);
  private connectedUserId?: string;

  protected user!: AdminUser;
  protected selectedOrganisation?: Organisation;

  ngOnInit() {
    this.adminUserApi.getAll();
    this.keycloak.loadUserProfile().then(userProfile => {
      this.connectedUserId = userProfile.id;
    })
  }

  protected viewModel = inject(StoreService).store.pipe(
    map((model) => ({
      adminUsers: model.adminUsers.filter(u => u.roles.includes(Roles.Organisator)),
      organisations: model.organisations
    })),
    distinctUntilChanged(),
  );

  openOrganisationAdder(user: AdminUser) {
    console.log(this.organisationAdder);
    this.organisationAdder.nativeElement.showModal();
    this.user = user;
  }

  hasOrganisation(user: AdminUser) {
    return user.organisation !== null
  }

  close() {
    this.organisationAdder.nativeElement.close();
  }

  addOrganisation() {
    if(this.selectedOrganisation !== undefined && this.selectedOrganisation.id !== undefined) {
      this.adminUserApi.addOrganisation(this.user.id!, this.selectedOrganisation.id);
    }

    this.close();
  }

  deleteOrganisation(id: string) {
    if (!this.connectedUserId || this.connectedUserId === id) {
      return;
    }
    this.adminUserApi.deleteOrganisation(id);
  }
}
