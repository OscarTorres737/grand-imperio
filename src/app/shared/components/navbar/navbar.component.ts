import { Component, signal, HostListener } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <nav [class]="navClass()"
         class="fixed top-0 left-0 right-0 z-[var(--z-sticky)] transition-[background-color,border-color,backdrop-filter] duration-400">
      <!-- Scrim permanente: garantiza legibilidad del logo/links sin importar qué haya detrás
           (imagen clara del hero, video, etc.), incluso antes de hacer scroll -->
      <div class="absolute inset-0 -z-10 pointer-events-none transition-opacity duration-400"
           [style.opacity]="scrolled() ? '0' : '1'"
           style="background: linear-gradient(to bottom, rgba(10,10,10,0.65) 0%, rgba(10,10,10,0.32) 60%, transparent 100%)">
      </div>
      <div class="max-w-7xl mx-auto px-6 lg:px-16 xl:px-24">
        <div class="flex items-center justify-between h-[68px]">

          <!-- Logo -->
          <a routerLink="/" class="flex items-center shrink-0">
            <img src="logo.png" alt="Grand Imperio Social Venue" class="h-10 w-auto"
                 onerror="this.style.display='none'; this.nextElementSibling.style.display='block'">
            <span class="font-display text-base tracking-[0.28em] text-[#F5F0EB] hidden leading-none">
              GRAND IMPERIO
            </span>
          </a>

          <!-- Desktop nav -->
          <div class="hidden lg:flex items-center gap-6 xl:gap-7">
            <!-- Emil: nav-link class uses scaleX underline; routerLinkActive adds active-link -->
            <a routerLink="/" routerLinkActive="active-link !text-[#C9A84C]" [routerLinkActiveOptions]="{exact:true}"
               class="nav-link text-[11px] tracking-[0.15em] uppercase text-[#F5F0EB]/55 hover:text-[#F5F0EB] transition-colors duration-250 py-1 whitespace-nowrap">
              Inicio
            </a>
            <a routerLink="/galeria" routerLinkActive="active-link !text-[#C9A84C]"
               class="nav-link text-[11px] tracking-[0.15em] uppercase text-[#F5F0EB]/55 hover:text-[#F5F0EB] transition-colors duration-250 py-1 whitespace-nowrap">
              Galería
            </a>
            <a routerLink="/cotizacion" routerLinkActive="active-link !text-[#C9A84C]"
               class="nav-link text-[11px] tracking-[0.15em] uppercase text-[#F5F0EB]/55 hover:text-[#F5F0EB] transition-colors duration-250 py-1 whitespace-nowrap">
              Cotización
            </a>
            <a routerLink="/proveedores" routerLinkActive="active-link !text-[#C9A84C]"
               class="nav-link text-[11px] tracking-[0.15em] uppercase text-[#F5F0EB]/55 hover:text-[#F5F0EB] transition-colors duration-250 py-1 whitespace-nowrap">
              Proveedores
            </a>
            <a routerLink="/disponibilidad" routerLinkActive="active-link !text-[#C9A84C]"
               class="nav-link text-[11px] tracking-[0.15em] uppercase text-[#F5F0EB]/55 hover:text-[#F5F0EB] transition-colors duration-250 py-1 whitespace-nowrap">
              Disponibilidad
            </a>
            <a routerLink="/contacto" routerLinkActive="active-link !text-[#C9A84C]"
               class="nav-link text-[11px] tracking-[0.15em] uppercase text-[#F5F0EB]/55 hover:text-[#F5F0EB] transition-colors duration-250 py-1 whitespace-nowrap">
              Contacto
            </a>
            <!-- ui-ux-pro-max: min 44px touch target; btn-grand for precise transitions -->
            <a routerLink="/agendar"
               class="btn-grand bg-[#0A0A0A] ml-1 px-5 py-3 border border-[#C9A84C]/60 text-[#C9A84C] text-[11px] tracking-[0.15em] uppercase hover:bg-[#C9A84C] hover:border-[#C9A84C] hover:text-[#0A0A0A] whitespace-nowrap">
              Agendar Visita
            </a>
          </div>

          <!-- Mobile hamburger — 44×44 touch target -->
          <button (click)="toggleMenu()"
                  class="lg:hidden flex flex-col gap-[5px] p-3 -mr-3 w-11 h-11 items-center justify-center"
                  [attr.aria-expanded]="menuOpen()"
                  aria-label="Abrir menú">
            <span class="w-5 h-px bg-[#F5F0EB] transition-[transform,opacity] duration-250 block origin-center"
                  [class.rotate-45]="menuOpen()"
                  [style.transform]="menuOpen() ? 'rotate(45deg) translateY(3px)' : ''"></span>
            <span class="w-5 h-px bg-[#F5F0EB] transition-[opacity] duration-200 block"
                  [style.opacity]="menuOpen() ? '0' : '1'"></span>
            <span class="w-5 h-px bg-[#F5F0EB] transition-[transform,opacity] duration-250 block origin-center"
                  [style.transform]="menuOpen() ? 'rotate(-45deg) translateY(-3px)' : ''"></span>
          </button>
        </div>

        <!-- Mobile menu — Emil: opacity+transform, NOT max-height (layout property) -->
        <div class="lg:hidden border-t border-[#F5F0EB]/8 overflow-hidden"
             [style.max-height]="menuOpen() ? '360px' : '0px'"
             [style.opacity]="menuOpen() ? '1' : '0'"
             [style.transition]="menuOpen()
               ? 'max-height 350ms cubic-bezier(0.23,1,0.32,1), opacity 200ms cubic-bezier(0.23,1,0.32,1)'
               : 'max-height 250ms cubic-bezier(0.77,0,0.175,1), opacity 150ms cubic-bezier(0.77,0,0.175,1)'">
          <div class="py-6 flex flex-col gap-1">
            <a routerLink="/" (click)="closeMenu()"
               class="text-[11px] tracking-[0.2em] uppercase text-[#F5F0EB]/55 hover:text-[#F5F0EB] transition-colors py-3 px-1 block min-h-[44px] flex items-center">
              Inicio
            </a>
            <a routerLink="/galeria" (click)="closeMenu()"
               class="text-[11px] tracking-[0.2em] uppercase text-[#F5F0EB]/55 hover:text-[#F5F0EB] transition-colors py-3 px-1 block min-h-[44px] flex items-center">
              Galería
            </a>
            <a routerLink="/cotizacion" (click)="closeMenu()"
               class="text-[11px] tracking-[0.2em] uppercase text-[#F5F0EB]/55 hover:text-[#F5F0EB] transition-colors py-3 px-1 block min-h-[44px] flex items-center">
              Cotización
            </a>
            <a routerLink="/proveedores" (click)="closeMenu()"
               class="text-[11px] tracking-[0.2em] uppercase text-[#F5F0EB]/55 hover:text-[#F5F0EB] transition-colors py-3 px-1 block min-h-[44px] flex items-center">
              Proveedores
            </a>
            <a routerLink="/disponibilidad" (click)="closeMenu()"
               class="text-[11px] tracking-[0.2em] uppercase text-[#F5F0EB]/55 hover:text-[#F5F0EB] transition-colors py-3 px-1 block min-h-[44px] flex items-center">
              Disponibilidad
            </a>
            <a routerLink="/contacto" (click)="closeMenu()"
               class="text-[11px] tracking-[0.2em] uppercase text-[#F5F0EB]/55 hover:text-[#F5F0EB] transition-colors py-3 px-1 block min-h-[44px] flex items-center">
              Contacto
            </a>
            <a routerLink="/agendar" (click)="closeMenu()"
               class="btn-grand bg-[#0A0A0A] mt-3 px-6 py-3 border border-[#C9A84C]/60 text-[#C9A84C] text-[11px] tracking-[0.2em] uppercase text-center hover:bg-[#C9A84C] hover:text-[#0A0A0A] block">
              Agendar Visita
            </a>
          </div>
        </div>
      </div>
    </nav>
  `
})
export class NavbarComponent {
  menuOpen = signal(false);
  scrolled = signal(false);

  navClass() {
    return this.scrolled()
      ? 'bg-[#0A0A0A]/96 backdrop-blur-md border-b border-[#F5F0EB]/6'
      : 'bg-transparent';
  }

  @HostListener('window:scroll')
  onScroll() {
    this.scrolled.set(window.scrollY > 40);
  }

  toggleMenu() { this.menuOpen.update(v => !v); }
  closeMenu() { this.menuOpen.set(false); }
}
