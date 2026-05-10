import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconComponent } from '../../shared/icon/icon.component';

@Component({
  selector: 'app-mobile-menu',
  standalone: true,
  imports: [IconComponent, RouterLink],
  template: `
    @if (isOpen()) {
      <div class="overlay" (click)="close.emit()"></div>
    }
    <aside class="drawer" [class.open]="isOpen()">
      <div class="drawer-header">
        <span class="drawer-brand">Munay</span>
        <button class="close-btn" (click)="close.emit()">
          <app-icon name="x" [size]="20" />
        </button>
      </div>

      <nav class="drawer-nav">
        <a [routerLink]="['/category', 'anillos']" (click)="close.emit()">
          <span class="link-es">Anillos</span>
          <span class="link-en">Rings</span>
        </a>
        <a [routerLink]="['/category', 'collares']" (click)="close.emit()">
          <span class="link-es">Collares</span>
          <span class="link-en">Necklaces</span>
        </a>
        <a [routerLink]="['/category', 'pulseras']" (click)="close.emit()">
          <span class="link-es">Pulseras</span>
          <span class="link-en">Bracelets</span>
        </a>
        <a [routerLink]="['/category', 'aretes']" (click)="close.emit()">
          <span class="link-es">Aretes</span>
          <span class="link-en">Earrings</span>
        </a>
        <a routerLink="/shop" (click)="close.emit()" class="filigrana-link">
          Filigrana
        </a>
      </nav>

      <div class="drawer-footer">
        <button class="lang-btn">EN / ES</button>
      </div>
    </aside>
  `,
  styleUrl: './mobile-menu.component.scss'
})
export class MobileMenuComponent {
  isOpen = input<boolean>(false);
  close = output<void>();
}
