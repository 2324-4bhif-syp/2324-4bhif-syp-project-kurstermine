import { Component, inject, OnInit } from "@angular/core";
import { RouterModule, RouterOutlet } from "@angular/router";
import { Roles, set } from "@models";
import { userProfileToUser } from "@models/model";
import {
  AppointmentApiService,
  AppointmentManagementApiService,
  OrganisationApiService,
  CourseApiService,
  TokenApiService,
  CategoryApiService,
} from "@services/api";
import { KeycloakService } from "keycloak-angular";

@Component({
  standalone: true,
  imports: [RouterOutlet, RouterModule],
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  private appointmentApiService = inject(AppointmentApiService);
  private appointmentManagementApiService = inject(
    AppointmentManagementApiService,
  );
  private organisationApiService = inject(OrganisationApiService);
  private coursesApiService = inject(CourseApiService);
  private tokenApiService = inject(TokenApiService);
  private categoryApiService = inject(CategoryApiService);
  private keycloak = inject(KeycloakService);

  protected isAdmin = false;

  public ngOnInit(): void {
    this.isAdmin = this.keycloak.getUserRoles().includes(Roles.Admin);
    this.keycloak.getKeycloakInstance().loadUserProfile().then((profile) => {
      set((model) => {
        model.currentUser = userProfileToUser(profile);
      });
    });

    this.appointmentApiService.getAll();
    this.appointmentManagementApiService.getAll();
    this.organisationApiService.getAll();
    this.coursesApiService.getAll();
    this.tokenApiService.getAll();
    this.categoryApiService.getAll();
  }

  protected onBtnLogout(): void {
    this.keycloak
      .logout()
      .catch((reason) => console.log("Logout failed: " + reason));
  }
}
