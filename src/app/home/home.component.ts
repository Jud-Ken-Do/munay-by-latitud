import { Component } from '@angular/core';
import { HeroComponent } from './hero/hero.component';
import { QuechuaStripComponent } from './quechua-strip/quechua-strip.component';
import { CategoriesComponent } from './categories/categories.component';
import { BestSellersComponent } from './best-sellers/best-sellers.component';
import { StoryComponent } from './story/story.component';
import { StonesComponent } from './stones/stones.component';
import { EditorialBandComponent } from './editorial-band/editorial-band.component';
import { QuoteComponent } from './quote/quote.component';
import { CommunityComponent } from './community/community.component';
import { NewsletterComponent } from './newsletter/newsletter.component';
import { AnimateOnScrollDirective } from '../shared/directives/animate-on-scroll.directive';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeroComponent,
    QuechuaStripComponent,
    CategoriesComponent,
    BestSellersComponent,
    StoryComponent,
    StonesComponent,
    EditorialBandComponent,
    QuoteComponent,
    CommunityComponent,
    NewsletterComponent,
    AnimateOnScrollDirective,
  ],
  template: `
    <app-hero appAnimateOnScroll />
    <app-quechua-strip appAnimateOnScroll />
    <app-categories appAnimateOnScroll />
    <app-best-sellers appAnimateOnScroll />
    <app-story appAnimateOnScroll />
    <app-stones appAnimateOnScroll />
    <app-editorial-band appAnimateOnScroll />
    <app-quote appAnimateOnScroll />
    <app-community appAnimateOnScroll />
    <app-newsletter appAnimateOnScroll />
  `,
})
export class HomeComponent {}
