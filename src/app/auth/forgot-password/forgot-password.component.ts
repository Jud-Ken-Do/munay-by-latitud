import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LogoComponent } from '../../shared/logo/logo.component';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [FormsModule, RouterLink, LogoComponent],
  template: `
    <div class="auth-page">
      <div class="auth-card">
        <div class="auth-header">
          <app-logo />
          <h1>Reset password</h1>
          <p>Enter your email and we'll send you a reset link</p>
        </div>

        <form class="auth-form" (ngSubmit)="onSubmit()">
          @if (success()) {
            <div class="success-msg">{{ message() }}</div>
          }
          @if (error()) {
            <div class="error-msg">{{ error() }}</div>
          }
          <div class="field">
            <label for="email">Email</label>
            <input id="email" type="email" placeholder="hola&#64;ejemplo.com" [(ngModel)]="email" name="email" required />
          </div>
          <button type="submit" class="submit-btn" [disabled]="loading() || success()">
            {{ loading() ? 'Sending...' : success() ? 'Link sent' : 'Send reset link' }}
          </button>
        </form>

        <p class="switch-text">
          <a routerLink="/login">Back to sign in</a>
        </p>
      </div>
    </div>
  `,
  styleUrl: './forgot-password.component.scss'
})
export class ForgotPasswordComponent {
  private auth = inject(AuthService);

  email = '';
  error = signal('');
  success = signal(false);
  message = signal('');
  loading = signal(false);

  onSubmit() {
    this.loading.set(true);
    this.error.set('');
    if (!this.email) {
      this.error.set('Please enter your email');
      this.loading.set(false);
      return;
    }
    const result = this.auth.forgotPassword(this.email);
    if (result.success) {
      this.success.set(true);
      this.message.set(result.message);
    }
    this.loading.set(false);
  }
}
