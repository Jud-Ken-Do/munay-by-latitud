import { Component, inject, signal, computed } from '@angular/core';
import { ProductCardComponent } from '../product-card/product-card.component';
import { DataService } from '../../services/data.service';
import { CartService } from '../../services/cart.service';
import { WishlistService } from '../../services/wishlist.service';
import { Product } from '../../models/product.model';
import { TranslatePipe } from '../../shared/translate.pipe';

@Component({
  selector: 'app-best-sellers',
  standalone: true,
  imports: [ProductCardComponent, TranslatePipe],
  template: `
    <section id="prods">
      <div class="sec-head">
        <div class="left">
          <span class="num">— {{ 'best.section' | translate }}</span>
          <h2>{{ 'best.title' | translate }}</h2>
        </div>
        <span class="lead">{{ 'best.lead' | translate }}</span>
      </div>
      <div class="filters">
        @for (c of cats; track c) {
          <button [class.on]="filter() === c" (click)="filter.set(c)">{{ c === 'All' ? ('best.all' | translate) : c }}</button>
        }
      </div>
      <div class="prods">
        @for (p of filteredProducts(); track p.id) {
          <app-product-card
            [product]="p"
            [loved]="wishlist.isLoved(p.id)"
            (addToCart)="onAdd($event)"
            (toggleLove)="onToggleLove($event)"
          />
        }
      </div>
    </section>
  `,
  styleUrl: './best-sellers.component.scss'
})
export class BestSellersComponent {
  private data = inject(DataService);
  private cart = inject(CartService);
  readonly wishlist = inject(WishlistService);

  cats = ['All', 'Anillos', 'Collares', 'Pulseras', 'Aretes'];
  filter = signal('All');

  filteredProducts = computed(() => {
    const f = this.filter();
    return f === 'All' ? this.data.products() : this.data.products().filter(p => p.cat === f);
  });

  onAdd(p: Product) {
    this.cart.add(p);
  }

  onToggleLove(id: string) {
    this.wishlist.toggle(id);
  }
}
