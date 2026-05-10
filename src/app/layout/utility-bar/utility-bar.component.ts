import { Component, signal, computed, OnInit, OnDestroy, inject } from '@angular/core';
import { I18nService } from '../../services/i18n.service';

@Component({
  selector: 'app-utility-bar',
  standalone: true,
  template: `
    <div class="ubar">
      <div class="ubar-inner">
        <div class="left">
          <button class="lang-toggle" (click)="i18n.toggle()">{{ i18n.lang() === 'en' ? 'EN' : 'ES' }} · {{ i18n.lang() === 'en' ? 'ES' : 'EN' }}</button>
        </div>
        <div class="center">
          <span>{{ items()[currentIndex()] }}</span>
        </div>
        <div class="right">
          <span>Atelier · Medellin</span>
        </div>
      </div>
    </div>
  `,
  styleUrl: './utility-bar.component.scss'
})
export class UtilityBarComponent implements OnInit, OnDestroy {
  i18n = inject(I18nService);
  items = computed(() => [
    this.i18n.t('util.shipping'),
    this.i18n.t('util.handcrafted'),
    this.i18n.t('util.newCollection'),
    this.i18n.t('util.returns'),
  ]);
  currentIndex = signal(0);
  private intervalId: any;

  ngOnInit() {
    this.intervalId = setInterval(() => {
      this.currentIndex.update(i => (i + 1) % this.items().length);
    }, 4200);
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }
}
