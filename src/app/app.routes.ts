import { Routes } from '@angular/router';
import { AuthLayout } from './layouts/auth-layout/auth-layout';
import { BlankLayout } from './layouts/blank-layout/blank-layout';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { authGuard } from './core/guards/auth-guard';
import { isLoggedGuard } from './core/guards/is-logged-guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: '',
    component: AuthLayout,
    canActivate: [isLoggedGuard],
    title: 'Auth',
    children: [
      { path: 'login', component: Login, title: 'Login' },
      { path: 'register', component: Register, title: 'Register' },
    ],
  },
  {
    path: '',
    component: BlankLayout,
    canActivate: [authGuard],
    title: 'Blank',
    children: [
      {
        path: 'home',
        loadComponent: () => import('./pages/home/home').then((c) => c.Home),

        title: 'Home',
      },
      {
        path: 'details/:slug/:id',
        loadComponent: () =>
          import('./pages/details/details').then((c) => c.Details),
        title: 'Details',
      },
      {
        path: 'details/:id',
        loadComponent: () =>
          import('./pages/details/details').then((c) => c.Details),
        title: 'Details',
      },
      {
        path: 'cart',
        loadComponent: () => import('./pages/cart/cart').then((c) => c.Cart),
        title: 'Cart',
      },
      {
        path: 'brands',
        loadComponent: () =>
          import('./pages/brands/brands').then((c) => c.Brands),
        title: 'Brands',
      },
      {
        path: 'category',
        loadComponent: () =>
          import('./pages/categories/categories').then((c) => c.Categories),
        title: 'Categories',
      },
      {
        path: 'allorders',
        loadComponent: () =>
          import('./features/allorders/allorders').then((c) => c.Allorders),
        title: 'All Orders',
      },
      {
        path: 'products',
        loadComponent: () =>
          import('./pages/productes/productes').then((c) => c.Productes),
        title: 'Products',
      },
      {
        path: 'checkout/:id',
        loadComponent: () =>
          import('./pages/checkout/checkout').then((c) => c.Checkout),
        title: 'Checkout',
      },
      {
        path: '**',
        loadComponent: () =>
          import('./pages/not-founnd/not-founnd').then((c) => c.NotFounnd),
        title: 'Not Found',
      },
    ],
  },
];
