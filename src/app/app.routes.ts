import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'wishlist', loadComponent: () => import('./wishlist/wishlist.component').then(m => m.WishlistComponent) },
  { path: 'shop', loadComponent: () => import('./category/category.component').then(m => m.CategoryComponent) },
  { path: 'category/:id', loadComponent: () => import('./category/category.component').then(m => m.CategoryComponent) },
  { path: 'product/:id', loadComponent: () => import('./product-detail/product-detail.component').then(m => m.ProductDetailComponent) },
  { path: 'search', loadComponent: () => import('./search/search-results.component').then(m => m.SearchResultsComponent) },
];
