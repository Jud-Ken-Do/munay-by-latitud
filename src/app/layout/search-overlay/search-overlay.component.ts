import { Component, inject, input, output, ElementRef, viewChild, effect } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IconComponent } from '../../shared/icon/icon.component';

@Component({
  selector: 'app-search-overlay',
  standalone: true,
  imports: [FormsModule, IconComponent],
  template: `
    <div class="scrim" [class.on]="isOpen()" (click)="close.emit()" style="z-index: 55"></div>
    <div class="search" [class.on]="isOpen()">
      <div class="search-inner">
        <div class="f">
          <app-icon name="search" [size]="22"/>
          <input
            #searchInput
            placeholder="Buscar · search rings, stones, collections…"
            [(ngModel)]="query"
            name="q"
            (keydown.enter)="submit()"
          />
          <button (click)="close.emit()" class="esc">Esc</button>
        </div>
        <div class="sug">
          <span class="lbl">Trending</span>
          @for (s of suggestions; track s) {
            <button (click)="selectSuggestion(s)">{{ s }}</button>
          }
        </div>
      </div>
    </div>
  `,
  styleUrl: './search-overlay.component.scss'
})
export class SearchOverlayComponent {
  isOpen = input<boolean>(false);
  close = output();
  query = '';
  suggestions = ['Filigrana', 'Esmeralda', 'Stacking rings', 'Garnet beaded', 'Pearl drops', 'Engraved'];

  searchInput = viewChild<ElementRef>('searchInput');

  private router = inject(Router);

  constructor() {
    effect(() => {
      if (this.isOpen()) {
        setTimeout(() => this.searchInput()?.nativeElement.focus(), 200);
      }
    });
  }

  submit() {
    const q = this.query.trim();
    if (!q) return;
    this.router.navigate(['/search'], { queryParams: { q } });
    this.close.emit();
    this.query = '';
  }

  selectSuggestion(s: string) {
    this.router.navigate(['/search'], { queryParams: { q: s } });
    this.close.emit();
    this.query = '';
  }
}
