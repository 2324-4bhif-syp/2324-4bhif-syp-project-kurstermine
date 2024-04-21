import { KeycloakService } from 'keycloak-angular';
import {environment} from "../../../environments/environment";

export function initializeKeycloak(keycloak: KeycloakService) {
    return () =>
        keycloak.init({
            config: {
                url: environment.keycloakUrl,
                realm: 'htl',
                clientId: 'angular-service',
            },
            initOptions: {
                pkceMethod: 'S256',
                // must match to the configured value in keycloak
                redirectUri: environment.angularUrl,
                // this will solved the error
                checkLoginIframe: false,
            },
            loadUserProfileAtStartUp: true,
            enableBearerInterceptor: true,
            bearerPrefix: 'Bearer',
        });
}
