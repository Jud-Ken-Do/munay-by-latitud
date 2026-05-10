import { Injectable, inject, signal } from '@angular/core';
import { Product, Category, Stone } from '../models/product.model';
import { SupabaseService } from './supabase.service';

@Injectable({ providedIn: 'root' })
export class DataService {
  private supabase = inject(SupabaseService);

  readonly products = signal<Product[]>([]);
  readonly categories = signal<Category[]>([]);
  readonly stones = signal<Stone[]>([]);
  readonly loading = signal(true);

  constructor() {
    this.loadAll();
  }

  async loadAll() {
    this.loading.set(true);
    await Promise.all([this.loadProducts(), this.loadCategories(), this.loadStones()]);
    this.loading.set(false);
  }

  async loadProducts() {
    const { data, error } = await this.supabase.client
      .from('products')
      .select('*')
      .eq('active', true)
      .order('created_at', { ascending: false });

    if (!error && data) {
      this.products.set(data.map(row => this.mapProduct(row)));
    }
  }

  async loadCategories() {
    const { data, error } = await this.supabase.client
      .from('categories')
      .select('*')
      .order('sort_order');

    if (!error && data) {
      this.categories.set(data.map(row => ({
        id: row.id,
        es: row.es,
        en: row.en,
        count: row.count,
        tone: row.tone,
      })));
    }
  }

  async loadStones() {
    const { data, error } = await this.supabase.client
      .from('stones')
      .select('*');

    if (!error && data) {
      this.stones.set(data.map(row => ({
        es: row.es,
        en: row.en,
        from: row.origin,
        meaning: row.meaning,
        color: row.color,
      })));
    }
  }

  async createProduct(product: Partial<Product>): Promise<boolean> {
    const row = this.mapToRow(product);
    const { error } = await this.supabase.client
      .from('products')
      .insert(row);

    if (!error) {
      await this.loadProducts();
      return true;
    }
    console.error('Create product error:', error);
    return false;
  }

  async updateProduct(id: string, product: Partial<Product>): Promise<boolean> {
    const row = this.mapToRow(product);
    const { error } = await this.supabase.client
      .from('products')
      .update(row)
      .eq('id', id);

    if (!error) {
      await this.loadProducts();
      return true;
    }
    console.error('Update product error:', error);
    return false;
  }

  async deleteProduct(id: string): Promise<boolean> {
    const { error } = await this.supabase.client
      .from('products')
      .delete()
      .eq('id', id);

    if (!error) {
      this.products.update(ps => ps.filter(p => p.id !== id));
      return true;
    }
    console.error('Delete product error:', error);
    return false;
  }

  private mapProduct(row: any): Product {
    return {
      id: row.id,
      name: row.name,
      nameEs: row.name_es,
      cat: row.category_id ? row.category_id.charAt(0).toUpperCase() + row.category_id.slice(1) : '',
      price: Number(row.price),
      was: row.was ? Number(row.was) : null,
      stone: row.stone,
      stoneDot: row.stone_dot,
      tone: row.tone,
      label: row.label,
      labelTone: row.label_tone || '',
      rating: Number(row.rating),
      reviews: row.reviews,
      metal: row.metal,
      image: row.image || '',
      swatches: Array.isArray(row.swatches) ? row.swatches : [],
    };
  }

  private mapToRow(product: Partial<Product>): any {
    const row: any = {};
    if (product.id !== undefined) row.id = product.id;
    if (product.name !== undefined) row.name = product.name;
    if (product.nameEs !== undefined) row.name_es = product.nameEs;
    if (product.cat !== undefined) row.category_id = product.cat.toLowerCase();
    if (product.price !== undefined) row.price = product.price;
    if (product.was !== undefined) row.was = product.was;
    if (product.stone !== undefined) row.stone = product.stone;
    if (product.stoneDot !== undefined) row.stone_dot = product.stoneDot;
    if (product.tone !== undefined) row.tone = product.tone;
    if (product.label !== undefined) row.label = product.label;
    if (product.labelTone !== undefined) row.label_tone = product.labelTone;
    if (product.rating !== undefined) row.rating = product.rating;
    if (product.reviews !== undefined) row.reviews = product.reviews;
    if (product.metal !== undefined) row.metal = product.metal;
    if (product.image !== undefined) row.image = product.image;
    if (product.swatches !== undefined) row.swatches = product.swatches;
    return row;
  }
}
