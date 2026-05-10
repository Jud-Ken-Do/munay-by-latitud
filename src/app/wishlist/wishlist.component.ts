import { Component, inject, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { WishlistService } from '../services/wishlist.service';
import { DataService } from '../services/data.service';
import { CartService } from '../services/cart.service';
import { ProductCardComponent } from '../home/product-card/product-card.component';
import { IconComponent } from '../shared/icon/icon.component';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [RouterLink, ProductCardComponent, IconComponent],
  template: `
    <div class="wishlist-page">

      <nav class="breadcrumb">
        <a routerLink="/">Home</a>
        <span class="sep">/</span>
        <span>Wishlist</span>
      </nav>

      <header class="page-header">
        <div class="title-row">
          <h1>Your Wishlist</h1>
          <span class="heart-icon"><app-icon name="heart" [size]="28" /></span>
          @if (wishlist.count() > 0) {
            <span class="count-badge">{{ wishlist.count() }}</span>
          }
        </div>
      </header>

      @if (products().length > 0) {
        <div class="product-grid">
          @for (p of products(); track p.id) {
            <app-product-card
              [product]="p"
              [loved]="wishlist.isLoved(p.id)"
              (addToCart)="onAddToCart($event)"
              (toggleLove)="onToggleLove($event)"
            />
          }
        </div>
      } @else {
        <div class="empty-state">
          <div class="empty-icon">
            <app-icon name="heart" [size]="48" />
          </div>
          <p class="empty-title">Your wishlist is empty</p>
          <p class="empty-sub">Save the pieces that speak to you and come back when you're ready.</p>
          <a routerLink="/" class="shop-link">
            Start shopping
            <app-icon name="arrow" [size]="16" />
          </a>
        </div>
      }

    </div>
  `,
  styleUrl: './wishlist.component.scss'
})
export class WishlistComponent {
  readonly wishlist = inject(WishlistService);
  private data = inject(DataService);
  private cart = inject(CartService);

  readonly products = computed(() => {
    const ids = this.wishlist.items();
    return this.data.products().filter(p => ids.includes(p.id));
  });

  onAddToCart(p: Product) {
    this.cart.add(p);
    this.cart.open();
  }

  onToggleLove(id: string) {
    this.wishlist.toggle(id);
  }
}
