import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ToastService {
  readonly message = signal<string | null>(null);
  private timeout: any;

  show(msg: string) {
    this.message.set(msg);
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => this.message.set(null), 2200);
  }
}
