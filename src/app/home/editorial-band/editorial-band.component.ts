import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconComponent } from '../../shared/icon/icon.component';
import { PlaceholderComponent } from '../../shared/placeholder/placeholder.component';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-editorial-band',
  standalone: true,
  imports: [IconComponent, PlaceholderComponent, RouterLink],
  template: `
    <section class="edit-band">
      <div class="edit-band-inner" [style.background]="gradient()">
        <app-placeholder tone="lilac-deep" label="" image="https://images.unsplash.com/photo-1630019852942-f89202989a59?w=1200&h=600&fit=crop" />
        <div class="text">
          <span class="kicker"><span class="bar"></span>New collection · 12 pieces</span>
          <h3>Filigrana — <em>thread of silver,</em> spun by hand.</h3>
          <p>An ancient Andean technique: silver pulled into a single thread, then woven into lace. Twelve pieces, each one a small piece of architecture.</p>
          <div class="actions">
            <a class="btn" routerLink="/shop">Discover Filigrana <app-icon name="arrowSm"/></a>
            <a class="btn ghost" href="#story">Read the story</a>
          </div>
        </div>
        <div class="floats">
          <div class="float f1"><app-placeholder tone="bone" label="" image="https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=300&h=400&fit=crop" /></div>
          <div class="float f2"><app-placeholder tone="amethyst" label="" image="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=300&h=400&fit=crop" /></div>
          <div class="float f3"><app-placeholder tone="cream" label="" image="https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=300&h=400&fit=crop" /></div>
        </div>
      </div>
    </section>
  `,
  styleUrl: './editorial-band.component.scss'
})
export class EditorialBandComponent {
  private theme = inject(ThemeService);
  gradient = () => `linear-gradient(135deg, ${this.theme.theme().heroFrom}, ${this.theme.theme().heroVia} 50%, ${this.theme.theme().heroTo})`;
}
