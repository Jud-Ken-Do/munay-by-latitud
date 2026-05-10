import { Component } from '@angular/core';
import { TranslatePipe } from '../../shared/translate.pipe';

@Component({
  selector: 'app-quechua-strip',
  standalone: true,
  imports: [TranslatePipe],
  template: `
    <div class="qstrip">
      <div class="qstrip-inner">
        <span class="glyph">&#171;</span>
        <span class="word">Munay <small>Quechua</small></span>
        <span class="meaning">— {{ 'quechua.meaning' | translate }}</span>
        <span class="tag"><span class="dot" [style.background]="'#3f7a5a'"></span>Esmeralda</span>
        <span class="tag"><span class="dot" [style.background]="'#8a3a3a'"></span>Granate</span>
        <span class="tag"><span class="dot" [style.background]="'#7a5da8'"></span>Amatista</span>
      </div>
    </div>
  `,
  styleUrl: './quechua-strip.component.scss'
})
export class QuechuaStripComponent {}
