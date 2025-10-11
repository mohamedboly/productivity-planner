import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

interface FirebaseResponseRegisting {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

@Injectable({
  providedIn: 'root',
})
export class Auth {
  readonly #http = inject(HttpClient);
  register(email: string, password: string): Observable<FirebaseResponseRegisting> {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseConfig.apiKey}`;
    const body = { email, password, returnSecureToken: true };
    return this.#http.post<FirebaseResponseRegisting>(url, body);
  }
}
