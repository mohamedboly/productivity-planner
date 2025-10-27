import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ignoreElements, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User } from '../../entity/user.interface';
import { UserService } from '../repository/user-service';

@Injectable()
export class UserFirebaseService implements UserService {
  readonly #http = inject(HttpClient);

  readonly #FIRESTORE_URL = `https://firestore.googleapis.com/v1/projects/${environment.firebaseConfig.projectId}/databases/(default)/documents`;
  readonly #USER_COLLECTION_ID = 'users';
  readonly #FIREBASE_API_KEY = environment.firebaseConfig.apiKey;
  readonly #USER_COLLECTION_URL = `${this.#FIRESTORE_URL}/${this.#USER_COLLECTION_ID}?key=${
    this.#FIREBASE_API_KEY
  }&documentId=`;

  create(user: User, bearerToken: string): Observable<void> {
    const url = `${this.#USER_COLLECTION_URL}${user.id}`;
    const body = {
      fields: {
        name: { stringValue: user.name },
        email: { stringValue: user.email },
      },
    };
    const headers = new HttpHeaders({
      Authorization: `Bearer ${bearerToken}`,
    });
    const options = { headers };
    return this.#http.post(url, body, options).pipe(ignoreElements());
  }
}
