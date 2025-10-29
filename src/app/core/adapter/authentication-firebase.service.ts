import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { catchError, map, Observable, of, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { EmailAlreadyTakenError } from '../../visitor/signup/email-already-taken.error';
import {
  AuthenticationService,
  LoginResponse,
  RegisterResponse,
} from '../port/authentication-service';

/**
 * Represents the payload of the response received when registering a new user in Firebase.
 *
 * @see https://firebase.google.com/docs/reference/rest/auth?hl=fr#section-create-email-password
 */
interface FirebaseResponseSignup {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

interface FirebaseResponseSignin {
  displayName: string;
  email: string;
  expiresIn: string;
  idToken: string;
  localId: string;
  refreshToken: string;
  registered: boolean;
}

@Injectable()
export class AuthenticationFirebaseService implements AuthenticationService {
  readonly #http = inject(HttpClient);

  register(email: string, password: string): Observable<RegisterResponse> {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseConfig.apiKey}`;
    const body = { email, password, returnSecureToken: true };

    return this.#http.post<FirebaseResponseSignup>(url, body).pipe(
      map((response) => ({
        jwtToken: response.idToken,
        jwtRefreshToken: response.refreshToken,
        expiresIn: response.expiresIn,
        userId: response.localId,
      })),
      catchError((error) => {
        if (error.error.error.message === 'EMAIL_EXISTS') {
          return of(new EmailAlreadyTakenError(email));
        }

        return throwError(() => error);
      })
    );
  }

  login(email: string, password: string): Observable<LoginResponse> {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseConfig.apiKey}`;
    const body = { email, password, returnSecureToken: true };

    return this.#http.post<FirebaseResponseSignin>(url, body).pipe(
      map((response) => ({
        jwtToken: response.idToken,
        jwtRefreshToken: response.refreshToken,
        expiresIn: response.expiresIn,
        userId: response.localId,
        isRegistered: response.registered,
      }))
    );
  }
}
