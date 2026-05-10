import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconComponent } from '../../shared/icon/icon.component';
import { PlaceholderComponent } from '../../shared/placeholder/placeholder.component';
import { ThemeService } from '../../services/theme.service';
import { TranslatePipe } from '../../shared/translate.pipe';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [IconComponent, PlaceholderComponent, RouterLink, TranslatePipe],
  template: `
    <section class="hero">
      <div class="hero-grid">
        <div class="hero-copy" [style.background]="theme.theme().tint">
          <div>
            <span class="kicker"><span class="bar" [style.background]="theme.theme().deep"></span>{{ 'hero.kicker' | translate }}</span>
            <h1 class="display">{{ 'hero.title' | translate }}</h1>
            <p class="hero-lead">{{ 'hero.lead' | translate }}</p>
            <div class="hero-cta">
              <a class="btn" routerLink="/shop">{{ 'hero.shopCollection' | translate }} <app-icon name="arrowSm" /></a>
              <a class="btn ghost" href="#story">{{ 'hero.ourAtelier' | translate }}</a>
            </div>
          </div>
          <div class="hero-meta">
            <div class="m"><span class="n">12 yr</span><span class="l">{{ 'hero.atelier' | translate }}</span></div>
            <div class="m"><span class="n">950</span><span class="l">{{ 'hero.sterling' | translate }}</span></div>
            <div class="m"><span class="n">1 of 1</span><span class="l">{{ 'hero.signed' | translate }}</span></div>
          </div>
        </div>
        <div class="hero-img" [style.background]="heroGradient()">
          <app-placeholder tone="lilac" label="" image="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&h=600&fit=crop" />
          <span class="badge"><span class="pulse"></span>{{ 'hero.madeIn' | translate }}</span>
          <div class="featured">
            <div>
              <h3>The <em>Esmeralda</em> Set</h3>
              <span class="price">From $248 · Plata 950</span>
            </div>
            <a class="quick" routerLink="/product/esmeralda-drop">{{ 'hero.shopSet' | translate }} <app-icon name="arrowSm" /></a>
          </div>
        </div>
      </div>
    </section>
  `,
  styleUrl: './hero.component.scss'
})
export class HeroComponent {
  theme = inject(ThemeService);
  heroGradient = () => `linear-gradient(135deg, ${this.theme.theme().heroFrom}, ${this.theme.theme().heroVia} 60%, ${this.theme.theme().heroTo})`;
}
