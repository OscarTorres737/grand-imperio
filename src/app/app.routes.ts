import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home/home.component').then(m => m.HomeComponent) },
  { path: 'galeria', loadComponent: () => import('./pages/gallery/gallery.component').then(m => m.GalleryComponent) },
  { path: 'disponibilidad', loadComponent: () => import('./pages/availability/availability.component').then(m => m.AvailabilityComponent) },
  { path: 'agendar', loadComponent: () => import('./pages/appointments/appointments.component').then(m => m.AppointmentsComponent) },
  { path: 'cotizacion', loadComponent: () => import('./pages/pricing/pricing.component').then(m => m.PricingComponent) },
  { path: 'proveedores', loadComponent: () => import('./pages/suppliers/suppliers.component').then(m => m.SuppliersComponent) },
  { path: 'contacto', loadComponent: () => import('./pages/contact/contact.component').then(m => m.ContactComponent) },
  { path: 'admin/login', loadComponent: () => import('./pages/admin/login/admin-login.component').then(m => m.AdminLoginComponent) },
  {
    path: 'admin',
    loadComponent: () => import('./pages/admin/dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent),
    canActivate: [authGuard]
  },
  { path: '**', redirectTo: '' }
];
