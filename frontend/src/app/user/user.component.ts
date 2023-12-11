import { Component } from '@angular/core';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  protected readonly keycloak: KeycloakService;
  protected userProfile: KeycloakProfile | undefined;

  constructor(keycloak: KeycloakService) {
    this.keycloak = keycloak;

    console.log(this.keycloak.isLoggedIn());

    keycloak.loadUserProfile().then(profile => {
      this.userProfile = profile;
    })
  }
}
