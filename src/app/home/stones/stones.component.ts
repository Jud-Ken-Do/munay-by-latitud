import { Component, inject } from '@angular/core';
import { DataService } from '../../services/data.service';
import { TranslatePipe } from '../../shared/translate.pipe';

@Component({
  selector: 'app-stones',
  standalone: true,
  imports: [TranslatePipe],
  template: `
    <section>
      <div class="sec-head">
        <div class="left">
          <span class="num">— {{ 'stones.section' | translate }}</span>
          <h2>{{ 'stones.title' | translate }}</h2>
        </div>
        <span class="lead">{{ 'stones.lead' | translate }}</span>
      </div>
      <div class="stones">
        @for (s of data.stones(); track s.en) {
          <div class="stone-card">
            <div class="top">
              <div class="swatch" [style.background]="s.color"></div>
              <div class="name">{{ s.es }}<small>{{ s.en }}</small></div>
            </div>
            <p class="desc">{{ s.meaning }}. Set in 950 sterling, finished by hand.</p>
            <div class="row">
              <span>{{ 'general.from' | translate }}</span>
              <span>{{ s.from }}</span>
            </div>
          </div>
        }
      </div>
    </section>
  `,
  styleUrl: './stones.component.scss'
})
export class StonesComponent {
  data = inject(DataService);
}
