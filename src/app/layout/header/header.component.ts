import { Component, output, inject, signal, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconComponent } from '../../shared/icon/icon.component';
import { LogoComponent } from '../../shared/logo/logo.component';
import { CartService } from '../../services/cart.service';
import { AuthService } from '../../services/auth.service';
import { MobileMenuComponent } from '../mobile-menu/mobile-menu.component';
import { I18nService } from '../../services/i18n.service';
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

          @if (auth.isLoggedIn()) {
            <div class="user-menu">
              <button class="icon-btn user-btn" (click)="toggleUserMenu($event)">
                <app-icon name="user" />
                <span class="user-name">{{ auth.userName() }}</span>
              </button>
              @if (userMenuOpen()) {
                <div class="dropdown">
                  @if (auth.isAdmin()) {
                    <a routerLink="/admin" class="dropdown-item" (click)="userMenuOpen.set(false)">
                      Admin Dashboard
                    </a>
                  }
                  <a routerLink="/wishlist" class="dropdown-item" (click)="userMenuOpen.set(false)">
                    My Wishlist
                  </a>
                  <button class="dropdown-item logout" (click)="onLogout()">
                    Sign out
                  </button>
                </div>
              }
            </div>
          } @else {
            <a class="icon-btn" routerLink="/login"><app-icon name="user" /></a>
          }

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
  auth = inject(AuthService);
  i18n = inject(I18nService);
  searchOpen = output();
  mobileMenuOpen = signal(false);
  userMenuOpen = signal(false);

  toggleUserMenu(event: Event) {
    event.stopPropagation();
    this.userMenuOpen.set(!this.userMenuOpen());
  }

  onLogout() {
    this.userMenuOpen.set(false);
    this.auth.logout();
  }

  @HostListener('document:click')
  onDocumentClick() {
    this.userMenuOpen.set(false);
  }
}
