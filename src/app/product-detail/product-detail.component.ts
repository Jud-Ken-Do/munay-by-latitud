import { Component, inject, signal, computed } from '@angular/core';
import { LowerCasePipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';

import { Product } from '../models/product.model';
import { DataService } from '../services/data.service';
import { CartService } from '../services/cart.service';
import { WishlistService } from '../services/wishlist.service';
import { IconComponent } from '../shared/icon/icon.component';
import { StarsComponent } from '../shared/stars/stars.component';
import { PlaceholderComponent } from '../shared/placeholder/placeholder.component';
import { ProductCardComponent } from '../home/product-card/product-card.component';
import { SizeGuideComponent } from '../shared/size-guide/size-guide.component';

const SIZES = ['XS', 'S', 'M', 'L', 'XL'] as const;
type Size = typeof SIZES[number];

const ACCORDION_SECTIONS = [
  {
    id: 'materials',
    title: 'Materials & Care',
    content: `Each piece is hand-wrought from Plata 950 — the finest grade of silver used in Colombian artisan jewelry. To preserve its brilliance, clean gently with a soft cloth and store away from direct sunlight and moisture. Avoid contact with perfumes, chlorine, and harsh chemicals. With proper care, your Munay piece will carry its lustre for generations.`,
  },
  {
    id: 'sizing',
    title: 'Sizing',
    content: `Our rings are sized using the standard Colombian / US scale. If you are between sizes, we recommend sizing up for comfort. Bracelets are designed with a 17 cm inner circumference — suitable for most wrists. Necklaces are offered at 45 cm with a 5 cm extender. For a personalised fit, reach out to us at hola@munay.co and our artisans will adjust to your exact measurements at no extra cost.`,
  },
  {
    id: 'shipping',
    title: 'Shipping & Returns',
    content: `We ship worldwide from our atelier in Bogotá, Colombia. Standard international delivery takes 7–14 business days; express options (3–5 days) are available at checkout. All orders are packaged in our signature handcrafted box, wrapped in recycled tissue. Returns are accepted within 30 days on unworn items in original condition. Custom and personalised pieces are final sale.`,
  },
] as const;

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [
    LowerCasePipe,
    RouterLink,
    IconComponent,
    StarsComponent,
    PlaceholderComponent,
    ProductCardComponent,
    SizeGuideComponent,
  ],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
})
export class ProductDetailComponent {
  private route = inject(ActivatedRoute);
  private dataService = inject(DataService);
  private cartService = inject(CartService);
  readonly wishlist = inject(WishlistService);

  readonly sizes = SIZES;
  readonly accordionSections = ACCORDION_SECTIONS;

  private productId = toSignal(
    this.route.paramMap.pipe(map(params => params.get('id') ?? '')),
    { initialValue: '' }
  );

  readonly product = computed<Product | undefined>(() =>
    this.dataService.products().find(p => p.id === this.productId())
  );

  readonly relatedProducts = computed<Product[]>(() => {
    const current = this.product();
    if (!current) return [];
    return this.dataService
      .products()
      .filter(p => p.cat === current.cat && p.id !== current.id)
      .slice(0, 4);
  });

  readonly selectedSize = signal<Size | null>(null);
  readonly qty = signal(1);
  readonly sizeGuideOpen = signal(false);
  readonly activeSection = signal<string | null>(null);
  readonly activeThumb = signal(0);

  readonly thumbnailTones = computed<string[]>(() => {
    const p = this.product();
    if (!p) return ['lilac', 'lilac-deep', 'pearl', 'bone'];
    const tones = [p.tone, 'lilac-deep', 'pearl', 'bone'];
    return tones;
  });

  selectSize(size: Size) {
    this.selectedSize.set(size);
  }

  incrementQty() {
    this.qty.update(q => q + 1);
  }

  decrementQty() {
    this.qty.update(q => (q > 1 ? q - 1 : 1));
  }

  toggleLoved() {
    const p = this.product();
    if (p) this.wishlist.toggle(p.id);
  }

  isLoved(): boolean {
    const p = this.product();
    return p ? this.wishlist.isLoved(p.id) : false;
  }

  addToCart() {
    const p = this.product();
    if (!p) return;
    for (let i = 0; i < this.qty(); i++) {
      this.cartService.add(p);
    }
    this.cartService.open();
  }

  toggleSection(id: string) {
    this.activeSection.update(current => (current === id ? null : id));
  }

  isSectionOpen(id: string): boolean {
    return this.activeSection() === id;
  }

  selectThumb(index: number) {
    this.activeThumb.set(index);
  }

  onRelatedAddToCart(product: Product) {
    this.cartService.add(product);
  }
}
