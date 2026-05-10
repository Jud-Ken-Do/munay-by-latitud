import { Component, inject } from '@angular/core';
import { IconComponent } from '../../shared/icon/icon.component';
import { PlaceholderComponent } from '../../shared/placeholder/placeholder.component';
import { CartService } from '../../services/cart.service';
import { TranslatePipe } from '../../shared/translate.pipe';

@Component({
  selector: 'app-cart-drawer',
  standalone: true,
  imports: [IconComponent, PlaceholderComponent, TranslatePipe],
  template: `
    <div class="scrim" [class.on]="cart.isOpen()" (click)="cart.close()"></div>
    <aside class="drawer" [class.on]="cart.isOpen()">
      <div class="head">
        <div>
          <div class="t">{{ 'cart.title' | translate }}</div>
          <div class="sub">{{ cart.items().length }} {{ 'cart.pieces' | translate }}</div>
        </div>
        <button class="icon-btn" (click)="cart.close()"><app-icon name="x"/></button>
      </div>
      @if (cart.items().length === 0) {
        <div class="empty">
          <span class="ic"><app-icon name="bag" [size]="22"/></span>
          <div>
            <div class="empty-title">{{ 'cart.empty' | translate }}</div>
            <div class="empty-sub">{{ 'cart.addPiece' | translate }}</div>
          </div>
        </div>
      } @else {
        <div class="body">
          @for (item of cart.items(); track item.id) {
            <div class="item">
              <div class="img"><app-placeholder [tone]="item.tone" label="//"/></div>
              <div class="info">
                <span class="n">{{ item.name }}</span>
                <span class="meta">{{ item.metal }} · {{ item.stone }}</span>
                <span class="qty">
                  <button (click)="cart.setQty(item.id, item.qty - 1)"><app-icon name="minus" [size]="12"/></button>
                  <span class="num">{{ item.qty }}</span>
                  <button (click)="cart.setQty(item.id, item.qty + 1)"><app-icon name="plus" [size]="12"/></button>
                </span>
              </div>
              <div class="right-col">
                <span class="price">{{'$' + (item.price * item.qty)}}</span>
                <button class="x" (click)="cart.remove(item.id)">{{ 'cart.remove' | translate }}</button>
              </div>
            </div>
          }
        </div>
        <div class="foot">
          <div class="row"><span class="l">{{ 'cart.subtotal' | translate }}</span><span class="v">{{'$' + cart.subtotal()}}</span></div>
          <button class="checkout"><span>{{ 'cart.checkout' | translate }}</span><app-icon name="arrowSm"/></button>
          <span class="note">{{ 'cart.freeShipping' | translate }}</span>
        </div>
      }
    </aside>
  `,
  styleUrl: './cart-drawer.component.scss'
})
export class CartDrawerComponent {
  cart = inject(CartService);
}
