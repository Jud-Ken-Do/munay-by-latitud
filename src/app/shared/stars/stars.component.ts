import { Component, input } from '@angular/core';

@Component({
  selector: 'app-stars',
  standalone: true,
  template: `
    <span class="stars">
      @for (i of [1,2,3,4,5]; track i) {
        <span [style.opacity]="i <= rating() ? 1 : 0.25">★</span>
      }
    </span>
  `,
  styles: [`
    .stars { color: #d4a86a; font-size: 11px; letter-spacing: 1px; }
  `]
})
export class StarsComponent {
  rating = input.required<number>();
}
