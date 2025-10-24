import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { AuthenticationFirebaseService } from './core/adapter/authentication-firebase.service';
import { AuthenticationService } from './core/port/authentication-service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    {
      provide: AuthenticationService,
      useClass: AuthenticationFirebaseService,
    },
  ],
};
