import { Component, signal } from '@angular/core';
import { NgIf, NgSwitch, NgSwitchCase } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { PackagesAdminComponent } from './packages-admin.component';
import { SuppliersAdminComponent } from './suppliers-admin.component';
import { LeadsAdminComponent } from './leads-admin.component';
import { UsersAdminComponent } from './users-admin.component';

type Tab = 'packages' | 'suppliers' | 'leads' | 'users';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [NgIf, NgSwitch, NgSwitchCase, PackagesAdminComponent, SuppliersAdminComponent, LeadsAdminComponent, UsersAdminComponent],
  template: `
    <div class="min-h-[100dvh] bg-[#0A0A0A]">
      <!-- Top bar -->
      <header class="border-b border-[#F5F0EB]/8 px-6 lg:px-12 py-5 flex items-center justify-between">
        <div>
          <p class="font-display font-black text-[#F5F0EB] uppercase text-sm tracking-wide">Grand Imperio · Panel</p>
          <p class="text-[#F5F0EB]/35 text-[11px] mt-0.5">{{ auth.currentUser()?.displayName || auth.currentUser()?.email }} · {{ auth.currentUser()?.role }}</p>
        </div>
        <button (click)="logout()" class="btn-grand px-5 py-2.5 border border-[#F5F0EB]/20 text-[#F5F0EB]/60 text-[10px] font-bold tracking-[0.2em] uppercase hover:border-red-400/50 hover:text-red-400">
          Cerrar sesión
        </button>
      </header>

      <div class="flex flex-col lg:flex-row">
        <!-- Tabs -->
        <nav class="flex lg:flex-col gap-1 px-6 lg:px-4 py-4 lg:py-8 lg:w-56 lg:flex-shrink-0 overflow-x-auto border-b lg:border-b-0 lg:border-r border-[#F5F0EB]/8">
          <button (click)="tab.set('packages')" class="text-left px-4 py-3 text-[11px] font-semibold tracking-[0.15em] uppercase whitespace-nowrap transition-colors duration-200"
                  [class]="tab() === 'packages' ? 'bg-[#C9A84C]/12 text-[#C9A84C]' : 'text-[#F5F0EB]/45 hover:text-[#F5F0EB]/75'">Paquetes</button>
          <button (click)="tab.set('suppliers')" class="text-left px-4 py-3 text-[11px] font-semibold tracking-[0.15em] uppercase whitespace-nowrap transition-colors duration-200"
                  [class]="tab() === 'suppliers' ? 'bg-[#C9A84C]/12 text-[#C9A84C]' : 'text-[#F5F0EB]/45 hover:text-[#F5F0EB]/75'">Proveedores</button>
          <button (click)="tab.set('leads')" class="text-left px-4 py-3 text-[11px] font-semibold tracking-[0.15em] uppercase whitespace-nowrap transition-colors duration-200"
                  [class]="tab() === 'leads' ? 'bg-[#C9A84C]/12 text-[#C9A84C]' : 'text-[#F5F0EB]/45 hover:text-[#F5F0EB]/75'">Cotizaciones</button>
          <button *ngIf="auth.hasRole('admin')" (click)="tab.set('users')" class="text-left px-4 py-3 text-[11px] font-semibold tracking-[0.15em] uppercase whitespace-nowrap transition-colors duration-200"
                  [class]="tab() === 'users' ? 'bg-[#C9A84C]/12 text-[#C9A84C]' : 'text-[#F5F0EB]/45 hover:text-[#F5F0EB]/75'">Usuarios</button>
        </nav>

        <!-- Content -->
        <main class="flex-1 px-6 lg:px-12 py-10 max-w-4xl" [ngSwitch]="tab()">
          <app-packages-admin *ngSwitchCase="'packages'" />
          <app-suppliers-admin *ngSwitchCase="'suppliers'" />
          <app-leads-admin *ngSwitchCase="'leads'" />
          <app-users-admin *ngSwitchCase="'users'" />
        </main>
      </div>
    </div>
  `
})
export class AdminDashboardComponent {
  tab = signal<Tab>('packages');

  constructor(public auth: AuthService, private router: Router) {}

  async logout() {
    await this.auth.logout();
    this.router.navigate(['/admin/login']);
  }
}
