import { Component, input, output, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconComponent } from '../../shared/icon/icon.component';
import { StarsComponent } from '../../shared/stars/stars.component';
import { PlaceholderComponent } from '../../shared/placeholder/placeholder.component';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [IconComponent, StarsComponent, PlaceholderComponent, RouterLink],
  template: `
    <div class="prod">
      <a class="prod-img" [routerLink]="['/product', product().id]">
        <app-placeholder [tone]="product().tone" [label]="'// ' + product().id" [image]="displayImage()" />
        @if (product().label) {
          <span class="tag-pill" [class]="product().labelTone">{{ product().label }}</span>
        }
        <button class="heart" [class.on]="loved()" (click)="$event.preventDefault(); toggleLove.emit(product().id)">
          <app-icon name="heart" [size]="16" />
        </button>
        <span class="stone"><span class="dot" [style.background]="product().stoneDot"></span>{{ product().stone }}</span>
        <div class="swatches">
          @for (s of product().swatches; track s.color; let i = $index) {
            <button class="swatch" [style.background]="s.color" [class.active]="selectedSwatch() === i" (click)="$event.preventDefault(); selectedSwatch.set(i)"></button>
          }
        </div>
        <button class="qa" (click)="$event.preventDefault(); addToCart.emit(product())">
          <span>Quick add</span>
          <app-icon name="plus" [size]="14" />
        </button>
      </a>
      <a class="prod-info" [routerLink]="['/product', product().id]">
        <div class="row1">
          <div class="name">{{ product().name }}</div>
          <div class="price">
            @if (product().was) {
              <s>{{ '$' + product().was }}</s>
            }
            {{ '$' + product().price }}
          </div>
        </div>
        <div class="meta">
          <app-stars [rating]="product().rating" />
          <span>({{ product().reviews }})</span>
          <span class="sep">·</span>
          <span>{{ product().metal }}</span>
        </div>
      </a>
    </div>
  `,
  styleUrl: './product-card.component.scss'
})
export class ProductCardComponent {
  product = input.required<Product>();
  loved = input<boolean>(false);
  addToCart = output<Product>();
  toggleLove = output<string>();

  selectedSwatch = signal<number>(0);

  displayImage = computed(() => {
    const p = this.product();
    const sw = p.swatches;
    const idx = this.selectedSwatch();
    const swatchImage = idx < sw.length ? sw[idx]?.image : '';
    return swatchImage || p.image || '';
  });
}
