import { Component, output, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconComponent } from '../../shared/icon/icon.component';
import { LogoComponent } from '../../shared/logo/logo.component';
import { CartService } from '../../services/cart.service';
import { MobileMenuComponent } from '../mobile-menu/mobile-menu.component';
import { I18nService } from '../../services/i18n.service';
import { ToastService } from '../../services/toast.service';
import { TranslatePipe } from '../../shared/translate.pipe';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [IconComponent, LogoComponent, MobileMenuComponent, RouterLink, TranslatePipe],
  template: `
    <header class="hdr">
      <div class="hdr-inner">
        <button class="menu-btn" (click)="mobileMenuOpen.set(true)">
          <app-icon name="menu" [size]="22" />
        </button>
        <nav class="nav">
          <a routerLink="/category/anillos">{{ 'nav.rings' | translate }}</a>
          <a routerLink="/category/collares">{{ 'nav.necklaces' | translate }}</a>
          <a routerLink="/category/pulseras">{{ 'nav.bracelets' | translate }}</a>
          <a routerLink="/category/aretes">{{ 'nav.earrings' | translate }}</a>
          <a routerLink="/shop" class="filigrana">{{ 'nav.filigrana' | translate }}</a>
        </nav>
        <app-logo />
        <div class="actions">
          <button class="hdr-locale" (click)="i18n.toggle()">{{ i18n.lang() === 'en' ? 'EN' : 'ES' }}</button>
          <button class="icon-btn" (click)="searchOpen.emit()"><app-icon name="search" /></button>
          <button class="icon-btn" (click)="toast.show('Account · Coming soon')"><app-icon name="user" /></button>
          <a class="icon-btn" routerLink="/wishlist"><app-icon name="heart" /></a>
          <button class="icon-btn" (click)="cart.open()">
            <app-icon name="bag" />
            @if (cart.count() > 0) {
              <span class="count">{{ cart.count() }}</span>
            }
          </button>
        </div>
      </div>
    </header>
    <app-mobile-menu [isOpen]="mobileMenuOpen()" (close)="mobileMenuOpen.set(false)" />
  `,
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  cart = inject(CartService);
  i18n = inject(I18nService);
  toast = inject(ToastService);
  searchOpen = output();
  mobileMenuOpen = signal(false);
}
