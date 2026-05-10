import { Injectable, signal, computed, effect } from '@angular/core';

export interface Theme {
  primary: string;
  deep: string;
  soft: string;
  tint: string;
  heroFrom: string;
  heroVia: string;
  heroTo: string;
}

const THEMES: Record<string, Theme> = {
  lilac: { primary: '#8b6fa9', deep: '#5e4878', soft: '#ece3f3', tint: '#f3eef7', heroFrom: '#d8c8e3', heroVia: '#a48abe', heroTo: '#705590' },
  aubergine: { primary: '#6f4f74', deep: '#3f2645', soft: '#e7dde9', tint: '#f1ecf2', heroFrom: '#cdb6cf', heroVia: '#7a567f', heroTo: '#3a2540' },
  sage: { primary: '#6f8a72', deep: '#3f5e48', soft: '#dde8de', tint: '#eef3ee', heroFrom: '#c8d6c9', heroVia: '#8aa48d', heroTo: '#4f6b54' },
};

@Injectable({ providedIn: 'root' })
export class ThemeService {
  readonly themeName = signal<string>('lilac');
  readonly theme = computed(() => THEMES[this.themeName()] || THEMES['lilac']);

  constructor() {
    effect(() => {
      const t = this.theme();
      const r = document.documentElement.style;
      r.setProperty('--lilac', t.primary);
      r.setProperty('--lilac-deep', t.deep);
      r.setProperty('--lilac-soft', t.soft);
      r.setProperty('--lilac-tint', t.tint);
    });
  }
}
