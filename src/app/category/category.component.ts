import { Component, inject, signal, computed } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';
import { DataService } from '../services/data.service';
import { CartService } from '../services/cart.service';
import { WishlistService } from '../services/wishlist.service';
import { ProductCardComponent } from '../home/product-card/product-card.component';
import { IconComponent } from '../shared/icon/icon.component';
import { Product } from '../models/product.model';

type SortKey = 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'reviews';
type PriceRange = 'under-100' | '100-200' | '200-plus' | null;

const CATEGORY_LABELS: Record<string, { es: string; en: string }> = {
  anillos:  { es: 'Anillos',  en: 'Rings' },
  collares: { es: 'Collares', en: 'Necklaces' },
  pulseras: { es: 'Pulseras', en: 'Bracelets' },
  aretes:   { es: 'Aretes',   en: 'Earrings' },
};

const SORT_OPTIONS: { key: SortKey; label: string }[] = [
  { key: 'featured',   label: 'Featured' },
  { key: 'price-asc',  label: 'Price: Low to High' },
  { key: 'price-desc', label: 'Price: High to Low' },
  { key: 'rating',     label: 'Top Rated' },
  { key: 'reviews',    label: 'Most Reviewed' },
];

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [ProductCardComponent, IconComponent, RouterLink],
  template: `
    <div class="cat-page">

      <!-- Breadcrumb -->
      <nav class="breadcrumb" aria-label="Breadcrumb">
        <a routerLink="/">Home</a>
        <span class="sep">
          <app-icon name="arrowSm" [size]="12" />
        </span>
        @if (categoryId()) {
          <a routerLink="/shop">Shop</a>
          <span class="sep">
            <app-icon name="arrowSm" [size]="12" />
          </span>
          <span class="current">{{ categoryLabel() }}</span>
        } @else {
          <span class="current">Shop</span>
        }
      </nav>

      <!-- Page header -->
      <header class="page-header">
        <div class="page-header-left">
          <h1 class="page-title">{{ pageTitle() }}</h1>
        </div>
        <span class="product-count">{{ filteredProducts().length }} pieces</span>
      </header>

      <!-- Main layout -->
      <div class="cat-layout">

        <!-- Sidebar -->
        <aside class="sidebar">

          <!-- Category filter -->
          <div class="filter-group">
            <h3 class="filter-title">Category</h3>
            <ul class="filter-list">
              @for (cat of categoryOptions; track cat.value) {
                <li>
                  <label class="check-label">
                    <input
                      type="checkbox"
                      class="check-input"
                      [checked]="activeCategories().includes(cat.value)"
                      (change)="toggleCategory(cat.value)"
                    />
                    <span class="check-box"></span>
                    <span class="check-text">
                      <span class="check-es">{{ cat.es }}</span>
                      <span class="check-en">{{ cat.en }}</span>
                    </span>
                  </label>
                </li>
              }
            </ul>
          </div>

          <!-- Stone filter -->
          <div class="filter-group">
            <h3 class="filter-title">Stone</h3>
            <ul class="filter-list">
              @for (stone of stoneOptions; track stone) {
                <li>
                  <label class="check-label">
                    <input
                      type="checkbox"
                      class="check-input"
                      [checked]="activeStones().includes(stone)"
                      (change)="toggleStone(stone)"
                    />
                    <span class="check-box"></span>
                    <span class="check-text">{{ stone }}</span>
                  </label>
                </li>
              }
            </ul>
          </div>

          <!-- Price range filter -->
          <div class="filter-group">
            <h3 class="filter-title">Price</h3>
            <ul class="filter-list">
              @for (range of priceOptions; track range.value) {
                <li>
                  <label class="check-label">
                    <input
                      type="checkbox"
                      class="check-input"
                      [checked]="activePriceRange() === range.value"
                      (change)="togglePrice(range.value)"
                    />
                    <span class="check-box"></span>
                    <span class="check-text">{{ range.label }}</span>
                  </label>
                </li>
              }
            </ul>
          </div>

          <!-- Metal filter -->
          <div class="filter-group">
            <h3 class="filter-title">Metal</h3>
            <ul class="filter-list">
              @for (metal of metalOptions; track metal) {
                <li>
                  <label class="check-label">
                    <input
                      type="checkbox"
                      class="check-input"
                      [checked]="activeMetals().includes(metal)"
                      (change)="toggleMetal(metal)"
                    />
                    <span class="check-box"></span>
                    <span class="check-text">{{ metal }}</span>
                  </label>
                </li>
              }
            </ul>
          </div>

          <!-- Clear filters -->
          @if (hasActiveFilters()) {
            <button class="clear-btn" (click)="clearFilters()">
              <app-icon name="x" [size]="12" />
              Clear all filters
            </button>
          }

        </aside>

        <!-- Grid area -->
        <div class="grid-area">

          <!-- Sort bar -->
          <div class="sort-bar">
            <span class="sort-label">Sort by</span>
            <div class="sort-select-wrap">
              <select class="sort-select" [value]="sortKey()" (change)="onSortChange($event)">
                @for (opt of sortOptions; track opt.key) {
                  <option [value]="opt.key">{{ opt.label }}</option>
                }
              </select>
              <app-icon name="arrowSm" [size]="12" />
            </div>
            @if (hasActiveFilters()) {
              <div class="active-filters">
                @for (cat of activeCategories(); track cat) {
                  <span class="filter-pill">
                    {{ cat }}
                    <button (click)="toggleCategory(cat)" aria-label="Remove filter">
                      <app-icon name="x" [size]="10" />
                    </button>
                  </span>
                }
                @for (stone of activeStones(); track stone) {
                  <span class="filter-pill">
                    {{ stone }}
                    <button (click)="toggleStone(stone)" aria-label="Remove filter">
                      <app-icon name="x" [size]="10" />
                    </button>
                  </span>
                }
                @if (activePriceRange()) {
                  <span class="filter-pill">
                    {{ activePriceLabel() }}
                    <button (click)="activePriceRange.set(null)" aria-label="Remove filter">
                      <app-icon name="x" [size]="10" />
                    </button>
                  </span>
                }
                @for (metal of activeMetals(); track metal) {
                  <span class="filter-pill">
                    {{ metal }}
                    <button (click)="toggleMetal(metal)" aria-label="Remove filter">
                      <app-icon name="x" [size]="10" />
                    </button>
                  </span>
                }
              </div>
            }
          </div>

          <!-- Product grid -->
          @if (filteredProducts().length > 0) {
            <div class="product-grid">
              @for (p of filteredProducts(); track p.id) {
                <app-product-card
                  [product]="p"
                  [loved]="wishlist.isLoved(p.id)"
                  (addToCart)="onAdd($event)"
                  (toggleLove)="onToggleLove($event)"
                />
              }
            </div>
          } @else {
            <div class="empty-state">
              <p class="empty-title">No pieces found</p>
              <p class="empty-sub">Try adjusting your filters to discover more.</p>
              <button class="clear-btn-inline" (click)="clearFilters()">Clear filters</button>
            </div>
          }

        </div>
      </div>
    </div>
  `,
  styleUrl: './category.component.scss',
})
export class CategoryComponent {
  private data   = inject(DataService);
  private cart   = inject(CartService);
  readonly wishlist = inject(WishlistService);
  private route  = inject(ActivatedRoute);

  // Route param as signal
  readonly categoryId = toSignal(
    this.route.paramMap.pipe(map(p => p.get('id'))),
    { initialValue: null }
  );

  // Filter state
  readonly activeCategories  = signal<string[]>([]);
  readonly activeStones      = signal<string[]>([]);
  readonly activePriceRange  = signal<PriceRange>(null);
  readonly activeMetals      = signal<string[]>([]);
  readonly sortKey           = signal<SortKey>('featured');


  // Static options
  readonly categoryOptions = [
    { value: 'Anillos',  es: 'Anillos',  en: 'Rings' },
    { value: 'Collares', es: 'Collares', en: 'Necklaces' },
    { value: 'Pulseras', es: 'Pulseras', en: 'Bracelets' },
    { value: 'Aretes',   es: 'Aretes',   en: 'Earrings' },
  ];
  readonly stoneOptions  = ['Emerald', 'Garnet', 'Amethyst', 'Pearl', 'Silver'];
  readonly priceOptions  = [
    { value: 'under-100' as PriceRange, label: 'Under $100' },
    { value: '100-200'   as PriceRange, label: '$100 – $200' },
    { value: '200-plus'  as PriceRange, label: '$200+' },
  ];
  readonly metalOptions  = ['Plata 950', 'Plata 950 · 18k'];
  readonly sortOptions   = SORT_OPTIONS;

  // Derived label for page heading
  readonly categoryLabel = computed(() => {
    const id = this.categoryId();
    if (!id) return '';
    const entry = CATEGORY_LABELS[id.toLowerCase()];
    return entry ? `${entry.es} · ${entry.en}` : id;
  });

  readonly pageTitle = computed(() => {
    const id = this.categoryId();
    if (!id) return 'Shop All';
    const entry = CATEGORY_LABELS[id.toLowerCase()];
    return entry ? `${entry.es} · ${entry.en}` : id;
  });

  // Active price label for pill display
  readonly activePriceLabel = computed(() => {
    const r = this.activePriceRange();
    return this.priceOptions.find(o => o.value === r)?.label ?? '';
  });

  readonly hasActiveFilters = computed(() =>
    this.activeCategories().length > 0 ||
    this.activeStones().length > 0 ||
    this.activePriceRange() !== null ||
    this.activeMetals().length > 0
  );

  // Core filtering + sorting pipeline
  readonly filteredProducts = computed(() => {
    const catId     = this.categoryId();
    const cats      = this.activeCategories();
    const stones    = this.activeStones();
    const price     = this.activePriceRange();
    const metals    = this.activeMetals();
    const sort      = this.sortKey();

    let products = this.data.products();

    // If on a /category/:id route, seed the category filter automatically
    // unless the user has manually chosen sidebar categories
    if (catId && cats.length === 0) {
      const label = CATEGORY_LABELS[catId.toLowerCase()];
      if (label) {
        products = products.filter(p => p.cat.toLowerCase() === label.es.toLowerCase());
      }
    } else if (cats.length > 0) {
      products = products.filter(p => cats.includes(p.cat));
    }

    if (stones.length > 0) {
      products = products.filter(p => stones.includes(p.stone));
    }

    if (price === 'under-100') {
      products = products.filter(p => p.price < 100);
    } else if (price === '100-200') {
      products = products.filter(p => p.price >= 100 && p.price <= 200);
    } else if (price === '200-plus') {
      products = products.filter(p => p.price > 200);
    }

    if (metals.length > 0) {
      products = products.filter(p => metals.includes(p.metal));
    }

    // Sort
    const sorted = [...products];
    if (sort === 'price-asc')  sorted.sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') sorted.sort((a, b) => b.price - a.price);
    if (sort === 'rating')     sorted.sort((a, b) => b.rating - a.rating);
    if (sort === 'reviews')    sorted.sort((a, b) => b.reviews - a.reviews);

    return sorted;
  });

  // Toggle helpers
  toggleCategory(cat: string) {
    this.activeCategories.update(cs =>
      cs.includes(cat) ? cs.filter(c => c !== cat) : [...cs, cat]
    );
  }

  toggleStone(stone: string) {
    this.activeStones.update(ss =>
      ss.includes(stone) ? ss.filter(s => s !== stone) : [...ss, stone]
    );
  }

  togglePrice(range: PriceRange) {
    this.activePriceRange.update(current => current === range ? null : range);
  }

  toggleMetal(metal: string) {
    this.activeMetals.update(ms =>
      ms.includes(metal) ? ms.filter(m => m !== metal) : [...ms, metal]
    );
  }

  clearFilters() {
    this.activeCategories.set([]);
    this.activeStones.set([]);
    this.activePriceRange.set(null);
    this.activeMetals.set([]);
  }

  onSortChange(event: Event) {
    const value = (event.target as HTMLSelectElement).value as SortKey;
    this.sortKey.set(value);
  }

  onAdd(p: Product) {
    this.cart.add(p);
  }

  onToggleLove(id: string) {
    this.wishlist.toggle(id);
  }
}
