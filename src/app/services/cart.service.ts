import { Injectable, signal, computed, inject } from '@angular/core';
import { Product } from '../models/product.model';
import { ToastService } from './toast.service';

export interface CartItem extends Product {
  qty: number;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private toast = inject(ToastService);
  readonly items = signal<CartItem[]>([]);
  readonly count = computed(() => this.items().reduce((s, i) => s + i.qty, 0));
  readonly subtotal = computed(() => this.items().reduce((s, i) => s + i.price * i.qty, 0));
  readonly isOpen = signal(false);

  add(product: Product) {
    this.items.update(items => {
      const existing = items.find(i => i.id === product.id);
      if (existing) {
        return items.map(i => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...items, { ...product, qty: 1 }];
    });
    this.toast.show('Added · ' + product.name);
  }

  remove(id: string) {
    this.items.update(items => items.filter(i => i.id !== id));
  }

  setQty(id: string, qty: number) {
    if (qty < 1) return;
    this.items.update(items => items.map(i => i.id === id ? { ...i, qty } : i));
  }

  open() { this.isOpen.set(true); }
  close() { this.isOpen.set(false); }
  toggle() { this.isOpen.update(v => !v); }
}
