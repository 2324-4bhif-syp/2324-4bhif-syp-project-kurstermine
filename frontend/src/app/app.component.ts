import { Component, inject, OnInit } from "@angular/core";
import { RouterModule, RouterOutlet } from "@angular/router";
import { Roles, set, User } from "@models";
import { userProfileToUser } from "@models/model";
import {
    AppointmentApiService,
    AppointmentManagementApiService,
    OrganisationApiService,
    CourseApiService,
    TokenApiService,
    CategoryApiService,
    InstructorApiService,
} from "@services/api";
import { KeycloakService } from "keycloak-angular";
import {FormsModule} from "@angular/forms";
import {AdminUserApiService} from "@services/api/admin-user-api.service";

@Component({
    standalone: true,
  imports: [RouterOutlet, RouterModule, FormsModule],
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
    private instructorApiService = inject(InstructorApiService);
    private categoryApiService = inject(CategoryApiService);
    protected adminUserApi = inject(AdminUserApiService);
    private keycloak = inject(KeycloakService);
    protected currentRole!: string;

    public ngOnInit(): void {
        this.keycloak
            .getKeycloakInstance()
            .loadUserProfile()
            .then((profile) => {
                this.currentRole = this.getRoles().at(0)!;
                const user: User = userProfileToUser(profile);
                    set((model) => {
                        model.currentUser = user;
                    });

                    if (user.id !== undefined) {
                        this.tokenApiService.getAllForUser(user.id);
                    }

                    if (this.getRoles().includes(Roles.Organisator)) {
                        this.tokenApiService.getAllForOrganisation();
                        this.instructorApiService.getAllForOrganisation();
                        if (user.id) {
                          this.adminUserApi.getOrganisationForUser(user.id)
                        }
                    }

                    this.appointmentApiService.getAll();
                    this.appointmentManagementApiService.getAll();
                    this.organisationApiService.getAll();
                    this.coursesApiService.getAll();
                    this.categoryApiService.getAll();
            });
    }

    getRoles() {
        return this.keycloak.getUserRoles()
            .filter(role => (Object.values(Roles) as string[]).includes(role));
    }

    protected onBtnLogout(): void {
        this.keycloak
            .logout()
            .catch((reason) => console.log("Logout failed: " + reason));
    }

  protected readonly Roles = Roles;
}
