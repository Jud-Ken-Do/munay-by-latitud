import { Injectable, inject, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { User, UserRole } from '../models/user.model';
import { SupabaseService } from './supabase.service';
import { ToastService } from './toast.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private supabase = inject(SupabaseService);
  private router = inject(Router);
  private toast = inject(ToastService);

  readonly user = signal<User | null>(null);
  readonly isLoggedIn = computed(() => !!this.user());
  readonly isAdmin = computed(() => this.user()?.role === 'admin');
  readonly userName = computed(() => this.user()?.name ?? '');

  /** Resolves once the initial session check is complete */
  readonly ready: Promise<void>;

  constructor() {
    this.ready = this.initAuth();
  }

  private async initAuth(): Promise<void> {
    try {
      const { data: { session } } = await this.supabase.client.auth.getSession();
      if (session?.user) {
        await this.loadProfile(session.user.id, session.user.email ?? '', session.user.app_metadata?.['provider'] ?? 'email');
      }
    } catch (e) {
      console.error('Auth init error:', e);
    }

    this.supabase.client.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session?.user) {
        await this.loadProfile(session.user.id, session.user.email ?? '', session.user.app_metadata?.['provider'] ?? 'email');
      } else if (event === 'SIGNED_OUT') {
        this.user.set(null);
      }
    });
  }

  private async loadProfile(userId: string, email: string, provider: string) {
    const { data } = await this.supabase.client
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (data) {
      this.user.set({
        id: userId,
        email,
        name: data.name || email.split('@')[0],
        role: data.role as UserRole,
        avatar: data.avatar_url,
        provider: provider as 'email' | 'google' | 'facebook',
      });
    }
  }

  async login(email: string, password: string): Promise<{ success: boolean; error?: string }> {
    const { error } = await this.supabase.client.auth.signInWithPassword({ email, password });
    if (error) return { success: false, error: error.message };
    return { success: true };
  }

  async register(name: string, email: string, password: string): Promise<{ success: boolean; error?: string }> {
    const { error } = await this.supabase.client.auth.signUp({
      email,
      password,
      options: { data: { name } },
    });
    if (error) return { success: false, error: error.message };
    return { success: true };
  }

  async socialLogin(provider: 'google' | 'facebook'): Promise<void> {
    const label = provider === 'google' ? 'Google' : 'Facebook';
    this.toast.show(`${label} login coming soon`);
  }

  async logout(): Promise<void> {
    await this.supabase.client.auth.signOut();
    this.user.set(null);
    this.router.navigate(['/']);
  }

  async forgotPassword(email: string): Promise<{ success: boolean; message: string }> {
    const { error } = await this.supabase.client.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin + '/login',
    });
    if (error) return { success: false, message: error.message };
    return { success: true, message: 'If this email exists, a reset link has been sent.' };
  }
}
