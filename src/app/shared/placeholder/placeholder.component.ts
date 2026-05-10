import { Component, input, computed } from '@angular/core';

@Component({
  selector: 'app-placeholder',
  standalone: true,
  template: `
    @if (image()) {
      <img [src]="image()" [alt]="label()" class="img" loading="lazy" />
    } @else {
      <div class="ph" [style.background]="bgColor()">
        <span class="label">{{ label() }}</span>
      </div>
    }
  `,
  styles: [`
    :host { display: block; width: 100%; height: 100%; }
    .img {
      width: 100%; height: 100%; object-fit: cover;
      border-radius: inherit;
    }
    .ph {
      width: 100%; height: 100%; min-height: 180px;
      display: flex; align-items: center; justify-content: center;
      border-radius: inherit;
    }
    .label {
      font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase;
      color: rgba(255,255,255,0.6); font-family: 'Inter', monospace;
    }
  `]
})
export class PlaceholderComponent {
  tone = input<string>('lilac');
  label = input<string>('');
  image = input<string>('');

  private toneMap: Record<string, string> = {
    'lilac': '#c4a8d8', 'lilac-deep': '#7a5690', 'rose': '#d4a0a0',
    'emerald': '#6b9e7a', 'garnet': '#a05050', 'amethyst': '#9070b8',
    'pearl': '#d8d0c8', 'bone': '#d8d0c0', 'cream': '#d8ceb8',
    'ink': '#3a3540',
  };

  bgColor = computed(() => this.toneMap[this.tone()] || '#c4a8d8');
}
