import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslatePipe } from '../../shared/translate.pipe';

@Component({
  selector: 'app-newsletter',
  standalone: true,
  imports: [FormsModule, TranslatePipe],
  template: `
    <section class="news">
      <div class="news-inner">
        <div>
          <span class="kicker"><span class="bar"></span>{{ 'news.kicker' | translate }}</span>
          <h2>{{ 'news.title' | translate }}</h2>
          <p>{{ 'news.text' | translate }}</p>
        </div>
        <div class="form">
          <form class="field" (submit)="onSubmit($event)">
            <input type="email" required placeholder="your-email&#64;ejemplo.com"
                   [(ngModel)]="email" name="email" />
            <button type="submit">{{ sent() ? ('news.subscribed' | translate) : ('news.subscribe' | translate) }}</button>
          </form>
          <div class="perks">
            <span class="p"><span class="dot"></span>$20 welcome credit</span>
            <span class="p"><span class="dot"></span>Early access · drops</span>
            <span class="p"><span class="dot"></span>Studio postcards</span>
          </div>
        </div>
      </div>
    </section>
  `,
  styleUrl: './newsletter.component.scss'
})
export class NewsletterComponent {
  email = '';
  sent = signal(false);

  onSubmit(e: Event) {
    e.preventDefault();
    if (this.email) {
      this.sent.set(true);
      this.email = '';
    }
  }
}
