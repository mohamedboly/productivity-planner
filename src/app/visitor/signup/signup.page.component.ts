import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Visitor } from '../../entity/user.interface';
import { EmailAlreadyTakenError } from './email-already-taken.error';
import { RegisterUserUseCase } from './register-user.use-case';

@Component({
  standalone: true,
  imports: [FormsModule],
  templateUrl: './signup.page.component.html',
  styleUrl: './signup.page.component.scss',
})
export class SignupPageComponent {
  readonly isLoading = signal(false);
  readonly #registerUserUseCase = inject(RegisterUserUseCase);
  readonly #router = inject(Router);

  readonly name = signal('');
  readonly email = signal('');
  readonly password = signal('');
  readonly confirmPassword = signal('');

  readonly isPasswordMatch = computed(() => this.password() === this.confirmPassword());

  readonly emailAlreadyTakenError = signal<EmailAlreadyTakenError | null>(null);
  readonly isEmailAlreadyTaken = computed(
    () => this.emailAlreadyTakenError()?.email === this.email()
  );

  onSubmit() {
    this.isLoading.set(true);

    const visitor: Visitor = {
      name: this.name(),
      email: this.email(),
      password: this.password(),
    };

    this.#registerUserUseCase
      .execute(visitor)
      .then(() => this.#router.navigate(['/app/dashboard']))
      .catch((error) => {
        console.log(error);
        if (error instanceof EmailAlreadyTakenError) {
          this.emailAlreadyTakenError.set(error);
        }
        // Si on finit de traiter toutes les erreurs metiers et de les afficher dans l'UI,
        // on peut envisager d'afficher une erreur générique pour les autres erreurs technique avec un handler global.
      });
  }
}
