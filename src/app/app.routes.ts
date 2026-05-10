import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { guestGuard } from './guards/guest.guard';
import { adminGuard } from './guards/admin.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'wishlist', loadComponent: () => import('./wishlist/wishlist.component').then(m => m.WishlistComponent) },
  { path: 'shop', loadComponent: () => import('./category/category.component').then(m => m.CategoryComponent) },
  { path: 'category/:id', loadComponent: () => import('./category/category.component').then(m => m.CategoryComponent) },
  { path: 'product/:id', loadComponent: () => import('./product-detail/product-detail.component').then(m => m.ProductDetailComponent) },
  { path: 'search', loadComponent: () => import('./search/search-results.component').then(m => m.SearchResultsComponent) },

  // Auth
  { path: 'login', canActivate: [guestGuard], loadComponent: () => import('./auth/login/login.component').then(m => m.LoginComponent) },
  { path: 'register', canActivate: [guestGuard], loadComponent: () => import('./auth/register/register.component').then(m => m.RegisterComponent) },
  { path: 'forgot-password', canActivate: [guestGuard], loadComponent: () => import('./auth/forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent) },

  // Admin
  {
    path: 'admin',
    canActivate: [adminGuard],
    loadComponent: () => import('./admin/admin-layout/admin-layout.component').then(m => m.AdminLayoutComponent),
    children: [
      { path: '', redirectTo: 'products', pathMatch: 'full' },
      { path: 'products', loadComponent: () => import('./admin/product-list/product-list.component').then(m => m.ProductListComponent) },
      { path: 'products/new', loadComponent: () => import('./admin/product-form/product-form.component').then(m => m.ProductFormComponent) },
      { path: 'products/edit/:id', loadComponent: () => import('./admin/product-form/product-form.component').then(m => m.ProductFormComponent) },
      { path: 'orders', loadComponent: () => import('./admin/placeholder-page/placeholder-page.component').then(m => m.PlaceholderPageComponent) },
      { path: 'settings', loadComponent: () => import('./admin/placeholder-page/placeholder-page.component').then(m => m.PlaceholderPageComponent) },
    ],
  },
];
