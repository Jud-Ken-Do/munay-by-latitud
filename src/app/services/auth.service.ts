import { Injectable, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { User, UserRole } from '../models/user.model';

// Mock admin account for testing
const MOCK_ADMIN: User = {
  id: 'admin-1',
  email: 'admin@munaybylatitud.com',
  name: 'Sara Latitud',
  role: 'admin',
  provider: 'email',
};

@Injectable({ providedIn: 'root' })
export class AuthService {
  readonly user = signal<User | null>(this.loadUser());
  readonly isLoggedIn = computed(() => !!this.user());
  readonly isAdmin = computed(() => this.user()?.role === 'admin');
  readonly userName = computed(() => this.user()?.name ?? '');

  constructor(private router: Router) {}

  login(email: string, password: string): { success: boolean; error?: string } {
    // Mock: admin account
    if (email === 'admin@munaybylatitud.com' && password === 'admin123') {
      this.setUser(MOCK_ADMIN);
      return { success: true };
    }
    // Mock: any other email/password creates a customer
    if (email && password.length >= 6) {
      this.setUser({
        id: 'user-' + Date.now(),
        email,
        name: email.split('@')[0],
        role: 'customer',
        provider: 'email',
      });
      return { success: true };
    }
    return { success: false, error: 'Invalid email or password' };
  }

  register(name: string, email: string, password: string): { success: boolean; error?: string } {
    if (!name || !email || password.length < 6) {
      return { success: false, error: 'Please fill all fields (password min 6 chars)' };
    }
    this.setUser({
      id: 'user-' + Date.now(),
      email,
      name,
      role: 'customer',
      provider: 'email',
    });
    return { success: true };
  }

  socialLogin(provider: 'google' | 'facebook'): void {
    // Mock: simulate social login — in production this will go through Supabase OAuth
    this.setUser({
      id: 'social-' + Date.now(),
      email: `user@${provider}.com`,
      name: provider === 'google' ? 'Google User' : 'Facebook User',
      role: 'customer',
      provider,
    });
    this.router.navigate(['/']);
  }

  logout(): void {
    this.user.set(null);
    localStorage.removeItem('munay-user');
    this.router.navigate(['/']);
  }

  forgotPassword(email: string): { success: boolean; message: string } {
    // Mock: always succeed
    return { success: true, message: 'If this email exists, a reset link has been sent.' };
  }

  private setUser(user: User): void {
    this.user.set(user);
    localStorage.setItem('munay-user', JSON.stringify(user));
  }

  private loadUser(): User | null {
    try {
      const data = localStorage.getItem('munay-user');
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  }
}
