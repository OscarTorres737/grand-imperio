import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [FormsModule, NgIf],
  template: `
    <section class="min-h-[100dvh] flex items-center justify-center px-6 bg-[#0A0A0A]">
      <div class="w-full max-w-sm">
        <div class="w-8 h-[3px] bg-[#C9A84C] mb-8 mx-auto"></div>
        <h1 class="font-display font-black text-[#F5F0EB] uppercase text-center text-2xl tracking-tight mb-2">
          Panel Administrativo
        </h1>
        <p class="text-[#F5F0EB]/40 text-center text-[13px] font-light mb-10">Grand Imperio Social Venue</p>

        <form (ngSubmit)="login()" class="flex flex-col gap-6">
          <div class="field-wrap">
            <label class="field-label" for="email">Correo</label>
            <input id="email" type="email" class="field-input" [(ngModel)]="email" name="email" required autocomplete="username">
          </div>
          <div class="field-wrap">
            <label class="field-label" for="password">Contraseña</label>
            <input id="password" type="password" class="field-input" [(ngModel)]="password" name="password" required autocomplete="current-password">
          </div>

          <p *ngIf="error()" class="text-red-400/80 text-[12px] font-light">{{ error() }}</p>

          <button type="submit" [disabled]="loading()"
                  class="btn-grand w-full px-6 py-3.5 bg-[#C9A84C] text-[#0A0A0A] text-[10px] font-bold
                         tracking-[0.25em] uppercase disabled:opacity-40">
            {{ loading() ? 'Ingresando...' : 'Ingresar' }}
          </button>
        </form>
      </div>
    </section>
  `
})
export class AdminLoginComponent {
  email = '';
  password = '';
  loading = signal(false);
  error = signal('');

  constructor(private auth: AuthService, private router: Router) {}

  async login() {
    this.error.set('');
    this.loading.set(true);
    try {
      const appUser = await this.auth.login(this.email, this.password);

      if (appUser) {
        this.router.navigate(['/admin']);
      } else {
        this.error.set(
          this.auth.authError() ||
          'Tu cuenta no tiene un rol asignado en Firestore. Pide a un admin que te dé de alta.'
        );
      }
    } catch {
      this.error.set('Correo o contraseña incorrectos.');
    } finally {
      this.loading.set(false);
    }
  }
}
