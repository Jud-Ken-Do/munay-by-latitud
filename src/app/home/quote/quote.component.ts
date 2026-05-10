import { Component } from '@angular/core';

@Component({
  selector: 'app-quote',
  standalone: true,
  template: `
    <div class="quote">
      <div class="glyph">"</div>
      <q>
        Cada pieza guarda el pulso de quien la hizo.
        <br/>
        <em>Every piece holds the pulse of the hand that made it.</em>
      </q>
      <span class="who">— Sara Latitud · Founder & Silversmith</span>
    </div>
  `,
  styleUrl: './quote.component.scss'
})
export class QuoteComponent {}
