import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../entity/user.interface';
import { UserFirebaseService } from '../adapter/user-firebase-service';

@Injectable({
  providedIn: 'root',
  useClass: UserFirebaseService,
})
export abstract class UserService {
  abstract create(user: User, bearerToken: string): Observable<void>;
  // fetch(id: string): Observable<User> {}
  // delete(user: User): Observable<void> {}
  // update(user: User): Observable<void> {};
}
