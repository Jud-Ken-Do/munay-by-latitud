import { Component, inject, signal, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { DataService } from '../../services/data.service';
import { ToastService } from '../../services/toast.service';
import { IconComponent } from '../../shared/icon/icon.component';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [FormsModule, RouterLink, IconComponent],
  template: `
    <div class="form-header">
      <a routerLink="/admin/products" class="back">
        <app-icon name="arrow" [size]="14" /> Back to products
      </a>
      <h1>{{ isEdit ? 'Edit' : 'New' }} Product</h1>
    </div>

    <form class="product-form" (ngSubmit)="onSave()">
      <div class="form-grid">
        <div class="form-main">
          <div class="card">
            <h2>Basic Info</h2>
            <div class="field">
              <label>Name (English)</label>
              <input type="text" [(ngModel)]="form.name" name="name" placeholder="Esmeralda Drop" required />
            </div>
            <div class="field">
              <label>Name (Spanish)</label>
              <input type="text" [(ngModel)]="form.nameEs" name="nameEs" placeholder="Aretes Esmeralda" required />
            </div>
            <div class="row">
              <div class="field">
                <label>Category</label>
                <select [(ngModel)]="form.cat" name="cat" required>
                  <option value="">Select category</option>
                  <option value="Anillos">Anillos · Rings</option>
                  <option value="Collares">Collares · Necklaces</option>
                  <option value="Pulseras">Pulseras · Bracelets</option>
                  <option value="Aretes">Aretes · Earrings</option>
                </select>
              </div>
              <div class="field">
                <label>Stone</label>
                <select [(ngModel)]="form.stone" name="stone" required>
                  <option value="">Select stone</option>
                  <option value="Emerald">Emerald</option>
                  <option value="Garnet">Garnet</option>
                  <option value="Amethyst">Amethyst</option>
                  <option value="Pearl">Pearl</option>
                  <option value="Silver">Silver</option>
                  <option value="Mixed">Mixed</option>
                </select>
              </div>
            </div>
            <div class="field">
              <label>Metal</label>
              <select [(ngModel)]="form.metal" name="metal" required>
                <option value="Plata 950">Plata 950</option>
                <option value="Plata 950 · 18k">Plata 950 · 18k</option>
              </select>
            </div>
          </div>

          <div class="card">
            <h2>Pricing</h2>
            <div class="row">
              <div class="field">
                <label>Price ($)</label>
                <input type="number" [(ngModel)]="form.price" name="price" min="0" required />
              </div>
              <div class="field">
                <label>Compare at ($)</label>
                <input type="number" [(ngModel)]="form.was" name="was" min="0" placeholder="Leave empty if no sale" />
              </div>
            </div>
          </div>

          <div class="card">
            <h2>Image</h2>
            <div class="field">
              <label>Image URL</label>
              <input type="url" [(ngModel)]="form.image" name="image" placeholder="https://images.unsplash.com/..." />
            </div>
            @if (form.image) {
              <div class="image-preview">
                <img [src]="form.image" alt="Preview" />
              </div>
            }
          </div>
        </div>

        <div class="form-side">
          <div class="card">
            <h2>Status</h2>
            <div class="field">
              <label>Label</label>
              <select [(ngModel)]="form.label" name="label">
                <option [ngValue]="null">None</option>
                <option value="New">New</option>
                <option value="Bestseller">Bestseller</option>
                <option value="Limited">Limited</option>
                <option value="Set of 3">Set of 3</option>
              </select>
            </div>
            <div class="field">
              <label>Label Style</label>
              <select [(ngModel)]="form.labelTone" name="labelTone">
                <option value="">Default</option>
                <option value="fresh">Fresh (green)</option>
                <option value="lilac">Lilac (purple)</option>
                <option value="warm">Warm (red)</option>
              </select>
            </div>
          </div>

          <div class="card">
            <h2>Display</h2>
            <div class="field">
              <label>Stone Color</label>
              <input type="color" [(ngModel)]="form.stoneDot" name="stoneDot" />
            </div>
            <div class="field">
              <label>Card Tone</label>
              <select [(ngModel)]="form.tone" name="tone">
                <option value="lilac">Lilac</option>
                <option value="emerald">Emerald</option>
                <option value="garnet">Garnet</option>
                <option value="amethyst">Amethyst</option>
                <option value="pearl">Pearl</option>
                <option value="bone">Bone</option>
                <option value="cream">Cream</option>
              </select>
            </div>
            <div class="row">
              <div class="field">
                <label>Rating</label>
                <input type="number" [(ngModel)]="form.rating" name="rating" min="1" max="5" />
              </div>
              <div class="field">
                <label>Reviews</label>
                <input type="number" [(ngModel)]="form.reviews" name="reviews" min="0" />
              </div>
            </div>
          </div>

          <div class="form-actions">
            <button type="submit" class="save-btn">
              {{ isEdit ? 'Update product' : 'Create product' }}
            </button>
            <a routerLink="/admin/products" class="cancel-link">Cancel</a>
          </div>
        </div>
      </div>
    </form>
  `,
  styleUrl: './product-form.component.scss'
})
export class ProductFormComponent implements OnInit {
  private data = inject(DataService);
  private toast = inject(ToastService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  isEdit = false;
  private editId = '';

  form: any = {
    name: '', nameEs: '', cat: '', price: 0, was: null,
    stone: '', stoneDot: '#8b6fa9', tone: 'lilac', label: null,
    labelTone: '', rating: 5, reviews: 0, metal: 'Plata 950',
    image: '',
  };

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      const product = this.data.products().find(p => p.id === id);
      if (product) {
        this.isEdit = true;
        this.editId = id;
        this.form = { ...product };
      }
    }
  }

  onSave() {
    if (!this.form.name || !this.form.cat || !this.form.price) {
      this.toast.show('Please fill required fields');
      return;
    }

    if (this.isEdit) {
      this.data.products.update(products =>
        products.map(p => p.id === this.editId ? {
          ...this.form,
          id: this.editId,
          swatches: p.swatches,
          was: this.form.was || null,
        } as Product : p)
      );
      this.toast.show('Updated · ' + this.form.name);
    } else {
      const newProduct: Product = {
        ...this.form,
        id: this.form.name.toLowerCase().replace(/\s+/g, '-') + '-' + Date.now(),
        was: this.form.was || null,
        swatches: [{ color: this.form.stoneDot, image: this.form.image || '' }],
      };
      this.data.products.update(products => [...products, newProduct]);
      this.toast.show('Created · ' + this.form.name);
    }

    this.router.navigate(['/admin/products']);
  }
}
