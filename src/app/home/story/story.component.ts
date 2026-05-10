import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconComponent } from '../../shared/icon/icon.component';
import { PlaceholderComponent } from '../../shared/placeholder/placeholder.component';
import { TranslatePipe } from '../../shared/translate.pipe';

@Component({
  selector: 'app-story',
  standalone: true,
  imports: [IconComponent, PlaceholderComponent, RouterLink, TranslatePipe],
  template: `
    <section id="story" class="story-section">
      <div class="story">
        <div class="img">
          <app-placeholder tone="ink" label="" image="https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=600&h=750&fit=crop" />
        </div>
        <div class="text">
          <span class="num">— {{ 'story.section' | translate }}</span>
          <h2>{{ 'story.title' | translate }}</h2>
          <p>{{ 'story.text' | translate }}</p>
          <div class="points">
            <div class="p">
              <span class="h">Hammered, not stamped</span>
              <span class="b">Each ring spends 40+ minutes at the bench. The marks you'll find are ours.</span>
            </div>
            <div class="p">
              <span class="h">Stones with a place</span>
              <span class="b">Emeralds from Muzo, garnets from Antioquia, amethysts from Boyaca. Sourced traceable.</span>
            </div>
            <div class="p">
              <span class="h">Signed by the maker</span>
              <span class="b">A tiny initial, struck on the inside. So you always know whose hands it came from.</span>
            </div>
            <div class="p">
              <span class="h">Repaired for life</span>
              <span class="b">Send it home. We'll re-stone, re-polish, resize — for as long as you wear it.</span>
            </div>
          </div>
          <div class="actions">
            <a class="btn btn-light" routerLink="/shop">{{ 'story.meetMakers' | translate }} <app-icon name="arrowSm"/></a>
            <a class="btn btn-outline" routerLink="/shop">{{ 'story.visitAtelier' | translate }}</a>
          </div>
        </div>
      </div>
    </section>
  `,
  styleUrl: './story.component.scss'
})
export class StoryComponent {}
