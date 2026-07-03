import { Component, HostListener, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TourService } from '../../../core/services/tour.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <nav [class]="navClass()"
         class="fixed top-0 left-0 right-0 z-[var(--z-sticky)] bg-[#0A0A0A]/95 backdrop-blur-md border-b transition-[box-shadow,border-color] duration-400">
      <div class="max-w-7xl mx-auto px-5 sm:px-6 lg:px-16 xl:px-24">
        <div class="flex items-center justify-between h-16 lg:h-[72px]">

          <a routerLink="/" class="flex items-center shrink-0">
            <img src="logo.png" alt="Grand Imperio Social Venue" class="h-8 lg:h-9 w-auto"
                 onerror="this.style.display='none'; this.nextElementSibling.style.display='block'">
            <span class="font-display text-sm tracking-[0.24em] text-[#F5F0EB] hidden leading-none">
              GRAND IMPERIO
            </span>
          </a>

          <div class="hidden lg:flex items-center gap-8 xl:gap-10">
            <div data-tour="nav-links" class="flex items-center gap-7 xl:gap-8">
              <a routerLink="/" routerLinkActive="active-link !text-[#F5F0EB]" [routerLinkActiveOptions]="{exact:true}"
                 class="nav-link text-[13px] font-medium text-[#F5F0EB]/50 hover:text-[#F5F0EB] transition-colors duration-250 py-1 whitespace-nowrap">
                Inicio
              </a>
              <a routerLink="/galeria" routerLinkActive="active-link !text-[#F5F0EB]"
                 class="nav-link text-[13px] font-medium text-[#F5F0EB]/50 hover:text-[#F5F0EB] transition-colors duration-250 py-1 whitespace-nowrap">
                Galería
              </a>
              <a routerLink="/cotizacion" routerLinkActive="active-link !text-[#F5F0EB]"
                 class="nav-link text-[13px] font-medium text-[#F5F0EB]/50 hover:text-[#F5F0EB] transition-colors duration-250 py-1 whitespace-nowrap">
                Cotización
              </a>
              <a routerLink="/proveedores" routerLinkActive="active-link !text-[#F5F0EB]"
                 class="nav-link text-[13px] font-medium text-[#F5F0EB]/50 hover:text-[#F5F0EB] transition-colors duration-250 py-1 whitespace-nowrap">
                Proveedores
              </a>
              <a routerLink="/disponibilidad" routerLinkActive="active-link !text-[#F5F0EB]"
                 class="nav-link text-[13px] font-medium text-[#F5F0EB]/50 hover:text-[#F5F0EB] transition-colors duration-250 py-1 whitespace-nowrap">
                Disponibilidad
              </a>
              <a routerLink="/contacto" routerLinkActive="active-link !text-[#F5F0EB]"
                 class="nav-link text-[13px] font-medium text-[#F5F0EB]/50 hover:text-[#F5F0EB] transition-colors duration-250 py-1 whitespace-nowrap">
                Contacto
              </a>
            </div>

            <div class="flex items-center gap-3">
              <button type="button" (click)="tour.start()"
                      class="inline-flex items-center justify-center px-3 py-2 text-[13px] font-medium text-[#F5F0EB]/50 hover:text-[#C9A84C] transition-colors duration-250">
                Tour
              </button>

              <a routerLink="/agendar"
                 class="btn-grand bg-[#C9A84C] px-5 py-2.5 rounded-full text-[13px] font-semibold text-[#0A0A0A] hover:bg-[#E2C97A] whitespace-nowrap">
                Agendar visita
              </a>
            </div>
          </div>

          <div class="flex lg:hidden items-center gap-1">
            <button type="button" (click)="tour.start()"
                    class="inline-flex items-center justify-center px-3 py-2 text-[12px] font-medium text-[#F5F0EB]/60 hover:text-[#C9A84C] transition-colors duration-250"
                    aria-label="Iniciar tour">
              Tour
            </button>

            <button (click)="toggleMenu()"
                    class="flex flex-col gap-[5px] p-3 -mr-2 w-11 h-11 items-center justify-center"
                    [attr.aria-expanded]="menuOpen()"
                    aria-label="Abrir menú">
              <span class="w-5 h-px bg-[#F5F0EB] transition-[transform,opacity] duration-250 block origin-center"
                    [style.transform]="menuOpen() ? 'rotate(45deg) translateY(3px)' : ''"></span>
              <span class="w-5 h-px bg-[#F5F0EB] transition-[opacity] duration-200 block"
                    [style.opacity]="menuOpen() ? '0' : '1'"></span>
              <span class="w-5 h-px bg-[#F5F0EB] transition-[transform,opacity] duration-250 block origin-center"
                    [style.transform]="menuOpen() ? 'rotate(-45deg) translateY(-3px)' : ''"></span>
            </button>
          </div>
        </div>

        <div class="lg:hidden border-t border-[#F5F0EB]/8 overflow-hidden bg-[#0A0A0A]"
             [style.max-height]="menuOpen() ? '420px' : '0px'"
             [style.opacity]="menuOpen() ? '1' : '0'"
             [style.pointer-events]="menuOpen() ? 'auto' : 'none'"
             [style.transition]="menuOpen()
               ? 'max-height 350ms cubic-bezier(0.23,1,0.32,1), opacity 220ms cubic-bezier(0.23,1,0.32,1)'
               : 'max-height 250ms cubic-bezier(0.77,0,0.175,1), opacity 150ms cubic-bezier(0.77,0,0.175,1)'">
          <div class="py-5 flex flex-col gap-1">
            <a routerLink="/" (click)="closeMenu()"
               class="text-[14px] font-medium text-[#F5F0EB]/60 hover:text-[#F5F0EB] transition-colors py-3 px-1 block min-h-[44px] flex items-center">
              Inicio
            </a>
            <a routerLink="/galeria" (click)="closeMenu()"
               class="text-[14px] font-medium text-[#F5F0EB]/60 hover:text-[#F5F0EB] transition-colors py-3 px-1 block min-h-[44px] flex items-center">
              Galería
            </a>
            <a routerLink="/cotizacion" (click)="closeMenu()"
               class="text-[14px] font-medium text-[#F5F0EB]/60 hover:text-[#F5F0EB] transition-colors py-3 px-1 block min-h-[44px] flex items-center">
              Cotización
            </a>
            <a routerLink="/proveedores" (click)="closeMenu()"
               class="text-[14px] font-medium text-[#F5F0EB]/60 hover:text-[#F5F0EB] transition-colors py-3 px-1 block min-h-[44px] flex items-center">
              Proveedores
            </a>
            <a routerLink="/disponibilidad" (click)="closeMenu()"
               class="text-[14px] font-medium text-[#F5F0EB]/60 hover:text-[#F5F0EB] transition-colors py-3 px-1 block min-h-[44px] flex items-center">
              Disponibilidad
            </a>
            <a routerLink="/contacto" (click)="closeMenu()"
               class="text-[14px] font-medium text-[#F5F0EB]/60 hover:text-[#F5F0EB] transition-colors py-3 px-1 block min-h-[44px] flex items-center">
              Contacto
            </a>
            <a routerLink="/agendar" (click)="closeMenu()"
               class="btn-grand bg-[#C9A84C] mt-3 px-6 py-3 rounded-full text-[13px] font-semibold text-[#0A0A0A] text-center hover:bg-[#E2C97A] block">
              Agendar visita
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

  constructor(public tour: TourService) {}

  navClass() {
    const active = this.scrolled() || this.menuOpen();
    return active
      ? 'border-[#F5F0EB]/10 shadow-[0_16px_40px_-24px_rgba(0,0,0,0.85)]'
      : 'border-[#F5F0EB]/6 shadow-none';
  }

  @HostListener('window:scroll')
  onScroll() {
    this.scrolled.set(window.scrollY > 40);
  }

  toggleMenu() { this.menuOpen.update(v => !v); }
  closeMenu() { this.menuOpen.set(false); }
}
