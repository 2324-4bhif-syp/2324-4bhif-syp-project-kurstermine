import { APP_INITIALIZER, ApplicationConfig, Provider } from '@angular/core';
import { provideRouter, withDebugTracing } from '@angular/router';

import { routes } from "./app.routes";
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch, withInterceptorsFromDi } from "@angular/common/http";
import { KeycloakBearerInterceptor, KeycloakService } from 'keycloak-angular';
import { initializeKeycloak } from './other/init/keycloak-init.factory';
import { provideAnimationsAsync } from "@angular/platform-browser/animations/async";

const KeycloakBearerInterceptorProvider: Provider = {
	provide: HTTP_INTERCEPTORS,
	useClass: KeycloakBearerInterceptor,
	multi: true
};

// Provider for Keycloak Initialization
const KeycloakInitializerProvider: Provider = {
	provide: APP_INITIALIZER,
	useFactory: initializeKeycloak,
	multi: true,
	deps: [KeycloakService]
}

export const appConfig: ApplicationConfig = {
	providers: [
		KeycloakInitializerProvider,
		KeycloakBearerInterceptorProvider,
		KeycloakService,

		provideRouter(routes, withDebugTracing()),
		provideHttpClient(withFetch()),
		provideHttpClient(withInterceptorsFromDi()),
		provideAnimationsAsync()
	]
};