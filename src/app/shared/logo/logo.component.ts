import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-logo',
  standalone: true,
  imports: [RouterLink],
  template: `
    <a routerLink="/" class="logo">
      <div class="mark">
        <svg width="28" height="28" viewBox="0 0 40 40" fill="none">
          <circle cx="20" cy="20" r="19" fill="#ece3f3" />
          <path d="M10 26 C 14 14, 26 12, 30 18 C 26 22, 22 24, 18 26 Z" fill="#5e4878" opacity=".95"/>
          <circle cx="14" cy="22" r="1.6" fill="#dcc098" />
        </svg>
        <span class="word">MUNAY</span>
      </div>
      <span class="sub">By Latitud · Joyeria</span>
    </a>
  `,
  styles: [`
    .logo { text-decoration: none; color: inherit; display: flex; flex-direction: column; align-items: center; gap: 2px; }
    .mark { display: flex; align-items: center; gap: 8px; }
    .word { font-family: 'Cormorant Garamond', serif; font-size: 22px; font-weight: 600; letter-spacing: 0.18em; color: var(--lilac-deep, #5e4878); }
    .sub { font-size: 9px; letter-spacing: 0.22em; text-transform: uppercase; color: var(--ink-3, #999); font-family: 'Inter', sans-serif; }
  `]
})
export class LogoComponent {}
