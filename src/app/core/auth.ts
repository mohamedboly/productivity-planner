import { HttpClient, HttpHeaders } from '@angular/common/http';
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

interface FirebaseResponseSignin {
  displayName: string;
  email: string;
  expiresIn: string;
  idToken: string;
  localId: string;
  refreshToken: string;
  registered: boolean;
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
  login(email: string, password: string): Observable<FirebaseResponseSignin> {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseConfig.apiKey}`;
    const body = { email, password, returnSecureToken: true };
    return this.#http.post<FirebaseResponseSignin>(url, body);
  }
  save(email: string, userId: string, bearerToken: string): Observable<unknown> {
    const baseUrl = `https://firestore.googleapis.com/v1/projects/${environment.firebaseConfig.projectId}/databases/(default)/documents`;
    const userFirestoreCollectionId = 'users';
    const url = `${baseUrl}/${userFirestoreCollectionId}?key=${environment.firebaseConfig.apiKey}&documentId=${userId}`;
    const body = {
      fields: {
        email: { stringValue: email },
      },
    };

    const headers = new HttpHeaders({
      Authorization: `Bearer ${bearerToken}`,
    });
    const options = { headers };

    return this.#http.post(url, body, options);
  }
}
