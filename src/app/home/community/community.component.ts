import { Component } from '@angular/core';
import { IconComponent } from '../../shared/icon/icon.component';
import { PlaceholderComponent } from '../../shared/placeholder/placeholder.component';
import { TranslatePipe } from '../../shared/translate.pipe';

@Component({
  selector: 'app-community',
  standalone: true,
  imports: [IconComponent, PlaceholderComponent, TranslatePipe],
  template: `
    <section>
      <div class="sec-head">
        <div class="left">
          <span class="num">— {{ 'community.section' | translate }}</span>
          <h2>{{ 'community.title' | translate }}</h2>
        </div>
        <a href="https://www.instagram.com/munaybylatitud/" target="_blank" rel="noopener" class="insta-link">
          &#64;munaybylatitud <app-icon name="arrowSm"/>
        </a>
      </div>
      <div class="insta">
        @for (t of tones; track $index) {
          <a href="https://www.instagram.com/munaybylatitud/" target="_blank" rel="noopener" class="cell">
            <app-placeholder [tone]="t" label="" />
            <span class="h">View · {{ ($index + 1).toString().padStart(2, '0') }}</span>
          </a>
        }
      </div>
    </section>
  `,
  styleUrl: './community.component.scss'
})
export class CommunityComponent {
  tones = ['lilac','garnet','bone','emerald','amethyst','cream','lilac','garnet','bone','emerald','amethyst','cream'];
}
