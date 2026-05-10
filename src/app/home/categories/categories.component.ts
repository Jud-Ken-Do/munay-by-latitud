import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconComponent } from '../../shared/icon/icon.component';
import { PlaceholderComponent } from '../../shared/placeholder/placeholder.component';
import { DataService } from '../../services/data.service';
import { TranslatePipe } from '../../shared/translate.pipe';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [IconComponent, PlaceholderComponent, RouterLink, TranslatePipe],
  template: `
    <section>
      <div class="sec-head">
        <div class="left">
          <span class="num">— {{ 'cat.section' | translate }}</span>
          <h2>{{ 'cat.title' | translate }}</h2>
        </div>
        <span class="lead">{{ 'cat.lead' | translate }}</span>
      </div>
      <div class="cat-grid">
        @for (c of data.categories(); track c.id; let i = $index) {
          <a class="cat" [routerLink]="['/category', c.id]">
            <app-placeholder [tone]="c.tone" [label]="'// ' + c.es.toLowerCase() + ' · category'" [image]="categoryImages[c.id]" />
            <span class="meta">— 0{{ i + 1 }} · {{ c.count }} pieces</span>
            <div class="label">
              <div class="name">
                <span class="es">{{ c.es }}</span>
                <span class="en">{{ c.en }}</span>
              </div>
              <div class="arrow"><app-icon name="arrowSm" [strokeWidth]="1.6" /></div>
            </div>
          </a>
        }
      </div>
    </section>
  `,
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {
  data = inject(DataService);

  categoryImages: Record<string, string> = {
    'anillos': 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=533&fit=crop',
    'collares': 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=533&fit=crop',
    'pulseras': 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=400&h=533&fit=crop',
    'aretes': 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=533&fit=crop',
  };
}
