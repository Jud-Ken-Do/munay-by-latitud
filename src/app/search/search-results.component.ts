import { Component, inject, computed } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { DataService } from '../services/data.service';
import { CartService } from '../services/cart.service';
import { WishlistService } from '../services/wishlist.service';
import { ProductCardComponent } from '../home/product-card/product-card.component';
import { IconComponent } from '../shared/icon/icon.component';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [RouterLink, ProductCardComponent, IconComponent],
  template: `
    <div class="search-page">

      <nav class="breadcrumb">
        <a routerLink="/">Home</a>
        <span class="sep">/</span>
        <span>Search</span>
      </nav>

      <header class="page-header">
        @if (query()) {
          <h1>Results for <em>'{{ query() }}'</em></h1>
          <p class="result-count">
            {{ results().length }} {{ results().length === 1 ? 'piece' : 'pieces' }} found
          </p>
        } @else {
          <h1>Search</h1>
          <p class="result-count">Enter a term to discover pieces</p>
        }
      </header>

      @if (query() && results().length > 0) {
        <div class="product-grid">
          @for (p of results(); track p.id) {
            <app-product-card
              [product]="p"
              [loved]="wishlist.isLoved(p.id)"
              (addToCart)="onAddToCart($event)"
              (toggleLove)="onToggleLove($event)"
            />
          }
        </div>
      } @else if (query()) {
        <div class="empty-state">
          <div class="empty-icon">
            <app-icon name="search" [size]="48" />
          </div>
          <p class="empty-title">No results found</p>
          <p class="empty-sub">
            We couldn't find anything matching <strong>'{{ query() }}'</strong>.
          </p>
          <div class="suggestions">
            <p class="sug-label">Try searching for</p>
            <div class="sug-list">
              @for (s of suggestionTerms; track s) {
                <a [routerLink]="['/search']" [queryParams]="{ q: s }" class="sug-chip">{{ s }}</a>
              }
            </div>
          </div>
          <a routerLink="/" class="shop-link">
            Back to home
            <app-icon name="arrow" [size]="16" />
          </a>
        </div>
      } @else {
        <div class="empty-state">
          <div class="empty-icon">
            <app-icon name="search" [size]="48" />
          </div>
          <p class="empty-title">What are you looking for?</p>
          <p class="empty-sub">Explore rings, necklaces, bracelets, earrings and more.</p>
          <div class="suggestions">
            <p class="sug-label">Popular searches</p>
            <div class="sug-list">
              @for (s of suggestionTerms; track s) {
                <a [routerLink]="['/search']" [queryParams]="{ q: s }" class="sug-chip">{{ s }}</a>
              }
            </div>
          </div>
        </div>
      }

    </div>
  `,
  styleUrl: './search-results.component.scss'
})
export class SearchResultsComponent {
  private data = inject(DataService);
  private cart = inject(CartService);
  readonly wishlist = inject(WishlistService);
  private route = inject(ActivatedRoute);

  private readonly queryParamMap = toSignal(this.route.queryParamMap);

  readonly query = computed(() => (this.queryParamMap()?.get('q') ?? '').trim());

  readonly results = computed(() => {
    const q = this.query().toLowerCase();
    if (!q) return [];
    return this.data.products().filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.nameEs.toLowerCase().includes(q) ||
      p.stone.toLowerCase().includes(q) ||
      p.metal.toLowerCase().includes(q) ||
      p.cat.toLowerCase().includes(q)
    );
  });

  readonly suggestionTerms = ['Filigrana', 'Esmeralda', 'Stacking rings', 'Garnet', 'Pearl', 'Anillos'];

  onAddToCart(p: Product) {
    this.cart.add(p);
    this.cart.open();
  }

  onToggleLove(id: string) {
    this.wishlist.toggle(id);
  }
}
