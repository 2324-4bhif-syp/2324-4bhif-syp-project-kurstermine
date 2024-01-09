import { KeycloakService } from 'keycloak-angular';

export function initializeKeycloak(keycloak: KeycloakService) {
    return () =>
        keycloak.init({
            config: {
                url: 'https://babyapp.ddns.net/keycloak',
                realm: 'htl',
                clientId: 'angular-service',
            },
            initOptions: {
                pkceMethod: 'S256',
                // must match to the configured value in keycloak
                redirectUri: 'http://localhost:4200',
                // this will solved the error
                checkLoginIframe: false,
            },
            loadUserProfileAtStartUp: true,
        });
}
