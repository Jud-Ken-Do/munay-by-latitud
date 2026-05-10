import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DataService } from '../../services/data.service';
import { ToastService } from '../../services/toast.service';
import { IconComponent } from '../../shared/icon/icon.component';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [RouterLink, IconComponent],
  template: `
    <div class="page-header">
      <div>
        <h1>Products</h1>
        <p class="count">{{ data.products().length }} pieces</p>
      </div>
      <a routerLink="/admin/products/new" class="add-btn">
        <app-icon name="plus" [size]="16" />
        Add product
      </a>
    </div>

    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Category</th>
            <th>Stone</th>
            <th>Price</th>
            <th>Rating</th>
            <th>Label</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          @for (p of data.products(); track p.id) {
            <tr>
              <td>
                <div class="thumb">
                  @if (p.image) {
                    <img [src]="p.image" [alt]="p.name" />
                  } @else {
                    <div class="thumb-ph" [style.background]="'#c4a8d8'"></div>
                  }
                </div>
              </td>
              <td>
                <div class="name">{{ p.name }}</div>
                <div class="name-es">{{ p.nameEs }}</div>
              </td>
              <td><span class="badge">{{ p.cat }}</span></td>
              <td>
                <span class="stone-dot" [style.background]="p.stoneDot"></span>
                {{ p.stone }}
              </td>
              <td>
                <span class="price">
                  @if (p.was) { <s>{{ '$' + p.was }}</s> }
                  {{ '$' + p.price }}
                </span>
              </td>
              <td>{{ p.rating }}/5 ({{ p.reviews }})</td>
              <td>
                @if (p.label) {
                  <span class="label-tag">{{ p.label }}</span>
                }
              </td>
              <td>
                <div class="actions">
                  <a [routerLink]="['/admin/products/edit', p.id]" class="action-btn">
                    Edit
                  </a>
                  <button class="action-btn delete" (click)="confirmDelete(p)">
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          }
        </tbody>
      </table>
    </div>

    @if (deleteTarget()) {
      <div class="modal-backdrop" (click)="deleteTarget.set(null)">
        <div class="modal" (click)="$event.stopPropagation()">
          <h3>Delete product?</h3>
          <p>Are you sure you want to delete <strong>{{ deleteTarget()!.name }}</strong>? This cannot be undone.</p>
          <div class="modal-actions">
            <button class="cancel-btn" (click)="deleteTarget.set(null)">Cancel</button>
            <button class="delete-btn" (click)="onDelete()">Delete</button>
          </div>
        </div>
      </div>
    }
  `,
  styleUrl: './product-list.component.scss'
})
export class ProductListComponent {
  data = inject(DataService);
  private toast = inject(ToastService);
  deleteTarget = signal<Product | null>(null);

  confirmDelete(p: Product) {
    this.deleteTarget.set(p);
  }

  async onDelete() {
    const p = this.deleteTarget();
    if (!p) return;
    const success = await this.data.deleteProduct(p.id);
    if (success) {
      this.toast.show('Deleted · ' + p.name);
    } else {
      this.toast.show('Failed to delete product');
    }
    this.deleteTarget.set(null);
  }
}
