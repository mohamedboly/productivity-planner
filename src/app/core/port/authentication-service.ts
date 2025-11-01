import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InvalidCredentialError } from '../../visitor/login/domain/invalid-credential.error';
import { EmailAlreadyTakenError } from '../../visitor/signup/email-already-taken.error';
import { AuthenticationFirebaseService } from '../adapter/authentication-firebase.service';

export type RegisterResponse = RegisterPayload | EmailAlreadyTakenError;
export type LoginResponse = LoginPayload | InvalidCredentialError;

interface RegisterPayload {
  jwtToken: string;
  jwtRefreshToken: string;
  expiresIn: string;
  userId: string;
}

interface LoginPayload {
  jwtToken: string;
  jwtRefreshToken: string;
  expiresIn: string;
  userId: string;
  isRegistered: boolean;
}

@Injectable({
  providedIn: 'root',
  useClass: AuthenticationFirebaseService,
})
export abstract class AuthenticationService {
  abstract register(email: string, password: string): Observable<RegisterResponse>;

  abstract login(email: string, password: string): Observable<LoginResponse>;

  /**
   * Retrieves a new JWT token using the provided refresh token.
   *
   * @param refreshToken - The refresh token used to obtain a new JWT.
   * @returns An Observable that emits the new JWT token as a string.
   */
  abstract refreshToken(refreshToken: string): Observable<{ jwtToken: string; userId: string }>;
}
