import { Component, input } from '@angular/core';

@Component({
  selector: 'app-placeholder-page',
  standalone: true,
  template: `
    <div class="placeholder">
      <h1>{{ title() }}</h1>
      <p>This section will be available once the backend is connected.</p>
    </div>
  `,
  styles: [`
    .placeholder {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 400px;
      text-align: center;
    }
    h1 {
      font-family: 'Cormorant Garamond', serif;
      font-size: 28px;
      color: var(--ink, #1a1520);
      margin: 0 0 8px;
    }
    p { font-size: 13px; color: var(--ink-3, #999); }
  `]
})
export class PlaceholderPageComponent {
  title = input<string>('Coming Soon');
}
