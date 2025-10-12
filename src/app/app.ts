import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { switchMap } from 'rxjs';

import { Auth } from './core/auth';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
 
  protected readonly title = signal('productivity-planner');
  readonly #authenticationService = inject(Auth);

  constructor() {
    // this.#authentificationService.register('layeboly@gmail.com', 'passer123').subscribe((res) => {
    //   console.log(res);
    // });
  }
  onLogin() {
    const email = 'layeboly@gmail.com';
    const password = 'passer123';

    this.#authenticationService
      .login(email, password)
      .pipe(
        switchMap((response) => {
          console.log(response);
          const { email, localId, idToken } = response;
          return this.#authenticationService.save(email, localId, idToken);
        })
      )
      .subscribe((response) => console.log(response));
  }
}
