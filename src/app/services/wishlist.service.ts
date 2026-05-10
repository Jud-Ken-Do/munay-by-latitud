import { Injectable, signal, computed, effect } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class WishlistService {
  readonly items = signal<string[]>(this.load());

  readonly count = computed(() => this.items().length);

  constructor() {
    effect(() => {
      localStorage.setItem('munay-wishlist', JSON.stringify(this.items()));
    });
  }

  toggle(id: string) {
    this.items.update(ids =>
      ids.includes(id) ? ids.filter(x => x !== id) : [...ids, id]
    );
  }

  isLoved(id: string): boolean {
    return this.items().includes(id);
  }

  private load(): string[] {
    try {
      return JSON.parse(localStorage.getItem('munay-wishlist') || '[]');
    } catch {
      return [];
    }
  }
}
