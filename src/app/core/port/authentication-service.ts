import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EmailAlreadyTakenError } from '../../visitor/signup/email-already-taken.error';
import { AuthenticationFirebaseService } from '../adapter/authentication-firebase.service';

export type RegisterResponse = RegisterPayload | EmailAlreadyTakenError;
export type LoginResponse = LoginPayload;

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
}
