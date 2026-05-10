import { Component } from '@angular/core';
import { IconComponent } from '../../shared/icon/icon.component';
import { TranslatePipe } from '../../shared/translate.pipe';

interface InstaPost {
  image: string;
  url: string;
}

// To replace with real images: swap the Unsplash URLs with actual product photos
const POSTS: InstaPost[] = [
  { url: 'https://www.instagram.com/munaybylatitud/p/DRy7LVEk0dY/', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=300&h=300&fit=crop' },
  { url: 'https://www.instagram.com/munaybylatitud/p/DRy_I-jE8sL/', image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=300&h=300&fit=crop' },
  { url: 'https://www.instagram.com/munaybylatitud/reel/DNFoPdAxBwm/', image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=300&h=300&fit=crop' },
  { url: 'https://www.instagram.com/munaybylatitud/p/DNkS8w2RM4U/', image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=300&h=300&fit=crop' },
  { url: 'https://www.instagram.com/bysagebloom/p/DNkNeuEzh--/', image: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=300&h=300&fit=crop' },
  { url: 'https://www.instagram.com/munaybylatitud/p/DJQx947xCEa/', image: 'https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?w=300&h=300&fit=crop' },
  { url: 'https://www.instagram.com/munaybylatitud/p/DJQtE2TRA8H/', image: 'https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?w=300&h=300&fit=crop' },
  { url: 'https://www.instagram.com/munaybylatitud/p/DJQkaYURxhg/', image: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=300&h=300&fit=crop' },
  { url: 'https://www.instagram.com/munaybylatitud/reel/DHC86BYRP18/', image: 'https://images.unsplash.com/photo-1602173574767-37ac01994b2a?w=300&h=300&fit=crop' },
  { url: 'https://www.instagram.com/munaybylatitud/p/DFwj8BnyGsg/', image: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=300&h=300&fit=crop' },
  { url: 'https://www.instagram.com/munaybylatitud/p/DFVOkwvy7nK/', image: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?w=300&h=300&fit=crop' },
  { url: 'https://www.instagram.com/munaybylatitud/p/DDLRgeXS7XH/', image: 'https://images.unsplash.com/photo-1619119069152-a2b331eb392a?w=300&h=300&fit=crop' },
  { url: 'https://www.instagram.com/munaybylatitud/p/DBtLkMIy2Mn/', image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=300&h=300&fit=crop&q=80' },
  { url: 'https://www.instagram.com/munaybylatitud/p/C65QdEgxF9C/', image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=300&h=300&fit=crop&q=80' },
  { url: 'https://www.instagram.com/munaybylatitud/reel/C4KWD6yxStz/', image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=300&h=300&fit=crop&q=80' },
];

@Component({
  selector: 'app-community',
  standalone: true,
  imports: [IconComponent, TranslatePipe],
  template: `
    <section>
      <div class="sec-head">
        <div class="left">
          <span class="num">— {{ 'community.section' | translate }}</span>
          <h2>{{ 'community.title' | translate }}</h2>
        </div>
        <a href="https://www.instagram.com/munaybylatitud/" target="_blank" rel="noopener" class="insta-link">
          &#64;munaybylatitud <app-icon name="arrowSm"/>
        </a>
      </div>
      <div class="insta">
        @for (post of posts; track $index) {
          <a [href]="post.url" target="_blank" rel="noopener" class="cell">
            <img [src]="post.image" alt="Instagram post" loading="lazy" />
            <span class="h">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </span>
          </a>
        }
      </div>
    </section>
  `,
  styleUrl: './community.component.scss'
})
export class CommunityComponent {
  posts = POSTS;
}
