import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { environment } from '../environments/environment';
import { Auth } from './core/auth';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  url = environment.firebaseConfig.authDomain;
  protected readonly title = signal('productivity-planner');
  readonly #authentificationService = inject(Auth);

  constructor() {
    this.#authentificationService.register('layeboly@gmail.com', 'passer123').subscribe((res) => {
      console.log(res);
    });
  }
}
