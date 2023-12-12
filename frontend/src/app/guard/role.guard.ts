import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { KeycloakAuthGuard, KeycloakService } from 'keycloak-angular';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard extends KeycloakAuthGuard {

  constructor(protected override readonly router: Router, protected readonly keycloak: KeycloakService) {
    super(router, keycloak);
  }

  async isAccessAllowed(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean | UrlTree> {
    const requiredRoles = route.data['roles'];

    if (!(requiredRoles instanceof Array) || requiredRoles.length === 0) {
      return true;
    }

    if (!this.roles || this.roles.length === 0) {
      return false;
    }
    return requiredRoles.every(role => {
      let includesRole = this.roles.includes(role);

      if (role === 'user' && !includesRole) {
        this.router.navigate(['admin']);
        return true;
      } else if (role === 'admin' && !includesRole) {
        this.router.navigate(['']);
        return true;
      }

      console.log("YES")
      console.log(includesRole)
      return includesRole
    });
  }
}
