import { Component, signal, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UtilityBarComponent } from './layout/utility-bar/utility-bar.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { CartDrawerComponent } from './layout/cart-drawer/cart-drawer.component';
import { SearchOverlayComponent } from './layout/search-overlay/search-overlay.component';
import { ToastService } from './services/toast.service';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    UtilityBarComponent,
    HeaderComponent,
    FooterComponent,
    CartDrawerComponent,
    SearchOverlayComponent,
  ],
  template: `
    <app-utility-bar />
    <app-header (searchOpen)="searchOpen.set(true)" />
    <main>
      <router-outlet />
    </main>
    <app-footer />
    <app-cart-drawer />
    <app-search-overlay [isOpen]="searchOpen()" (close)="searchOpen.set(false)" />
    <div class="toast" [class.on]="toast.message()"><span class="dot"></span><span>{{ toast.message() }}</span></div>
  `,
  styles: [`
    main { min-height: 100vh; }
  `],
})
export class App {
  searchOpen = signal(false);
  toast = inject(ToastService);
}
