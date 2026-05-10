import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { IconComponent } from '../../shared/icon/icon.component';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet, IconComponent],
  template: `
    <div class="admin">
      <aside class="sidebar">
        <div class="sidebar-header">
          <span class="brand">MUNAY</span>
          <span class="sub">Admin Panel</span>
        </div>
        <nav class="sidebar-nav">
          <a routerLink="/admin/products" routerLinkActive="active">
            <app-icon name="bag" [size]="16" />
            Products
          </a>
          <a routerLink="/admin/orders" routerLinkActive="active">
            <app-icon name="bag" [size]="16" />
            Orders
          </a>
          <a routerLink="/admin/settings" routerLinkActive="active">
            <app-icon name="globe" [size]="16" />
            Settings
          </a>
        </nav>
        <div class="sidebar-footer">
          <div class="user-info">
            <span class="name">{{ auth.userName() }}</span>
            <span class="role">Admin</span>
          </div>
          <a routerLink="/" class="back-link">
            <app-icon name="arrow" [size]="14" />
            Back to store
          </a>
        </div>
      </aside>
      <main class="content">
        <router-outlet />
      </main>
    </div>
  `,
  styleUrl: './admin-layout.component.scss'
})
export class AdminLayoutComponent {
  auth = inject(AuthService);
}
