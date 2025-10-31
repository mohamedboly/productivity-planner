import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter, Router } from '@angular/router';

import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { AuthenticationFirebaseService } from './core/adapter/authentication-firebase.service';
import { initializeAutoConnectFactory } from './core/initializer/initializeAutoConnectFactory';
import { AuthenticationService } from './core/port/authentication-service';
import { UserService } from './core/repository/user-service';
import { UserStore } from './core/store/user.store';

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
    provideAppInitializer(() => {
      return initializeAutoConnectFactory(
        inject(AuthenticationService),
        inject(UserService),
        inject(UserStore),
        inject(Router)
      )();
    }),
  ],
};
