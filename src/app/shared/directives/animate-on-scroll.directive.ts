import { Directive, ElementRef, OnInit, OnDestroy, input } from '@angular/core';

@Directive({
  selector: '[appAnimateOnScroll]',
  standalone: true,
})
export class AnimateOnScrollDirective implements OnInit, OnDestroy {
  animation = input<string>('fade-up');
  private observer?: IntersectionObserver;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.el.nativeElement.classList.add('aos', `aos-${this.animation()}`);
    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.el.nativeElement.classList.add('aos-visible');
          this.observer?.unobserve(this.el.nativeElement);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }
}
