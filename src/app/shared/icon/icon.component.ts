import { Component, input } from '@angular/core';

@Component({
  selector: 'app-icon',
  standalone: true,
  template: `
    @switch (name()) {
      @case ('search') {
        <svg [attr.width]="size()" [attr.height]="size()" viewBox="0 0 24 24" fill="none" stroke="currentColor" [attr.stroke-width]="strokeWidth()" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/>
        </svg>
      }
      @case ('user') {
        <svg [attr.width]="size()" [attr.height]="size()" viewBox="0 0 24 24" fill="none" stroke="currentColor" [attr.stroke-width]="strokeWidth()" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 5-6 8-6s6.5 2 8 6"/>
        </svg>
      }
      @case ('heart') {
        <svg [attr.width]="size()" [attr.height]="size()" viewBox="0 0 24 24" fill="none" stroke="currentColor" [attr.stroke-width]="strokeWidth()" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10z"/>
        </svg>
      }
      @case ('bag') {
        <svg [attr.width]="size()" [attr.height]="size()" viewBox="0 0 24 24" fill="none" stroke="currentColor" [attr.stroke-width]="strokeWidth()" stroke-linecap="round" stroke-linejoin="round">
          <path d="M5 8h14l-1 12H6L5 8z"/><path d="M9 8a3 3 0 0 1 6 0"/>
        </svg>
      }
      @case ('arrow') {
        <svg [attr.width]="size()" [attr.height]="size()" viewBox="0 0 24 24" fill="none" stroke="currentColor" [attr.stroke-width]="strokeWidth()" stroke-linecap="round" stroke-linejoin="round">
          <path d="M5 12h14"/><path d="m13 6 6 6-6 6"/>
        </svg>
      }
      @case ('arrowSm') {
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" [attr.stroke-width]="strokeWidth()" stroke-linecap="round" stroke-linejoin="round">
          <path d="M5 12h14"/><path d="m13 6 6 6-6 6"/>
        </svg>
      }
      @case ('plus') {
        <svg [attr.width]="size()" [attr.height]="size()" viewBox="0 0 24 24" fill="none" stroke="currentColor" [attr.stroke-width]="strokeWidth()" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 5v14M5 12h14"/>
        </svg>
      }
      @case ('minus') {
        <svg [attr.width]="size()" [attr.height]="size()" viewBox="0 0 24 24" fill="none" stroke="currentColor" [attr.stroke-width]="strokeWidth()" stroke-linecap="round" stroke-linejoin="round">
          <path d="M5 12h14"/>
        </svg>
      }
      @case ('x') {
        <svg [attr.width]="size()" [attr.height]="size()" viewBox="0 0 24 24" fill="none" stroke="currentColor" [attr.stroke-width]="strokeWidth()" stroke-linecap="round" stroke-linejoin="round">
          <path d="M6 6l12 12M18 6L6 18"/>
        </svg>
      }
      @case ('menu') {
        <svg [attr.width]="size()" [attr.height]="size()" viewBox="0 0 24 24" fill="none" stroke="currentColor" [attr.stroke-width]="strokeWidth()" stroke-linecap="round" stroke-linejoin="round">
          <path d="M4 7h16M4 12h16M4 17h16"/>
        </svg>
      }
      @case ('globe') {
        <svg [attr.width]="size()" [attr.height]="size()" viewBox="0 0 24 24" fill="none" stroke="currentColor" [attr.stroke-width]="strokeWidth()" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18"/>
        </svg>
      }
    }
  `,
  styles: [`:host { display: inline-flex; align-items: center; }`]
})
export class IconComponent {
  name = input.required<string>();
  size = input<number>(18);
  strokeWidth = input<number>(1.5);
}
