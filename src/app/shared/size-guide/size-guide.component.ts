import { Component, input, output, signal } from '@angular/core';
import { ModalComponent } from '../modal/modal.component';

@Component({
  selector: 'app-size-guide',
  standalone: true,
  imports: [ModalComponent],
  template: `
    <app-modal [isOpen]="isOpen()" title="Size Guide · Guia de Tallas" (close)="close.emit()">
      <div class="tabs">
        <button [class.on]="activeTab() === 'rings'" (click)="activeTab.set('rings')">Rings</button>
        <button [class.on]="activeTab() === 'bracelets'" (click)="activeTab.set('bracelets')">Bracelets</button>
        <button [class.on]="activeTab() === 'necklaces'" (click)="activeTab.set('necklaces')">Necklaces</button>
      </div>

      @switch (activeTab()) {
        @case ('rings') {
          <div class="guide-section">
            <p class="intro">Wrap a strip of paper around your finger. Mark where it overlaps, then measure the length in mm.</p>
            <table>
              <thead>
                <tr><th>Size</th><th>US</th><th>EU</th><th>Circumference</th><th>Diameter</th></tr>
              </thead>
              <tbody>
                <tr><td>XS</td><td>5</td><td>49</td><td>49.3 mm</td><td>15.7 mm</td></tr>
                <tr><td>S</td><td>6</td><td>52</td><td>52.4 mm</td><td>16.5 mm</td></tr>
                <tr><td>M</td><td>7</td><td>55</td><td>54.4 mm</td><td>17.3 mm</td></tr>
                <tr><td>L</td><td>8</td><td>57</td><td>57.5 mm</td><td>18.2 mm</td></tr>
                <tr><td>XL</td><td>9</td><td>60</td><td>59.5 mm</td><td>18.9 mm</td></tr>
              </tbody>
            </table>
            <div class="tip">
              <strong>Tip:</strong> If between sizes, go up. Silver warms to your body and fits closer over time.
            </div>
          </div>
        }
        @case ('bracelets') {
          <div class="guide-section">
            <p class="intro">Measure around your wrist just above the wrist bone. Add 1-2 cm for a comfortable fit.</p>
            <table>
              <thead>
                <tr><th>Size</th><th>Wrist</th><th>Bracelet Length</th></tr>
              </thead>
              <tbody>
                <tr><td>XS</td><td>14 cm</td><td>15.5 cm</td></tr>
                <tr><td>S</td><td>15 cm</td><td>16.5 cm</td></tr>
                <tr><td>M</td><td>16 cm</td><td>17.5 cm</td></tr>
                <tr><td>L</td><td>17 cm</td><td>18.5 cm</td></tr>
                <tr><td>XL</td><td>18 cm</td><td>19.5 cm</td></tr>
              </tbody>
            </table>
            <div class="tip">
              <strong>Tip:</strong> Our chain bracelets have a 2 cm extension for adjustability.
            </div>
          </div>
        }
        @case ('necklaces') {
          <div class="guide-section">
            <p class="intro">Choose your length based on where you'd like the pendant to sit.</p>
            <table>
              <thead>
                <tr><th>Style</th><th>Length</th><th>Sits at</th></tr>
              </thead>
              <tbody>
                <tr><td>Choker</td><td>36 cm</td><td>Base of neck</td></tr>
                <tr><td>Princess</td><td>42 cm</td><td>Collarbone</td></tr>
                <tr><td>Matinee</td><td>50 cm</td><td>Above bust</td></tr>
                <tr><td>Opera</td><td>60 cm</td><td>Below bust</td></tr>
              </tbody>
            </table>
            <div class="tip">
              <strong>Tip:</strong> All Munay necklaces include a 5 cm extension chain.
            </div>
          </div>
        }
      }
    </app-modal>
  `,
  styleUrl: './size-guide.component.scss'
})
export class SizeGuideComponent {
  isOpen = input<boolean>(false);
  close = output();
  activeTab = signal<'rings' | 'bracelets' | 'necklaces'>('rings');
}
