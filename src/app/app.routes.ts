import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: 'login', loadComponent: () => import('./login/login.page').then(m => m.LoginPage) },
  { path: 'register', loadComponent: () => import('./register/register.page').then(m => m.RegisterPage) },
  { path: 'home', loadComponent: () => import('./home/home.page').then(m => m.HomePage) },
  { path: 'store', loadComponent: () => import('./store/store.page').then(m => m.StorePage) },
  { path: 'product/:id', loadComponent: () => import('./product-detail/product-detail.page').then(m => m.ProductDetailPage) },
  { path: 'cart', loadComponent: () => import('./cart/cart.page').then(m => m.CartPage) },
  { path: 'address', loadComponent: () => import('./address/address.page').then(m => m.AddressPage) },
  { path: 'delivery', loadComponent: () => import('./delivery/delivery.page').then(m => m.DeliveryPage) },
  { path: 'payment', loadComponent: () => import('./payment/payment.page').then(m => m.PaymentPage) },
  { path: 'order-summary', loadComponent: () => import('./order-summary/order-summary.page').then(m => m.OrderSummaryPage) },
  { path: 'order-success', loadComponent: () => import('./order-success/order-success.page').then(m => m.OrderSuccessPage) },
  { path: 'orders', loadComponent: () => import('./orders/orders.page').then(m => m.OrdersPage) },
  { path: 'order-tracking', loadComponent: () => import('./order-tracking/order-tracking.page').then(m => m.OrderTrackingPage) },
  { path: 'profile', loadComponent: () => import('./profile/profile.page').then(m => m.ProfilePage) },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' }
];
