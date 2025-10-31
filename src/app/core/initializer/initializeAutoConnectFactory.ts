import { Router } from '@angular/router';
import { AuthenticationService } from '../../core/port/authentication-service';
import { UserService } from '../../core/repository/user-service';
import { UserStore } from '../store/user.store';

import { concatMap, Observable, tap } from 'rxjs';

export function initializeAutoConnectFactory(
  authenticationService: AuthenticationService,
  userService: UserService,
  userStore: UserStore,
  router: Router
): () => Observable<void> {
  return () =>
    new Observable<void>((observer) => {
      const refreshToken = localStorage.getItem('jwtRefreshToken');

      if (!refreshToken) {
        observer.complete();
        return;
      }

      authenticationService
        .refreshToken(refreshToken)
        .pipe(
          tap(({ jwtToken }) => {
            localStorage.setItem('jwtToken', jwtToken);
          }),
          concatMap(({ userId, jwtToken }) => userService.fetch(userId, jwtToken))
        )
        .subscribe({
          next: (user) => {
            userStore.load(user);
            router.navigate(['/app/dashboard']);
            observer.complete();
          },
          error: () => {
            observer.complete();
          },
        });
    });
}
