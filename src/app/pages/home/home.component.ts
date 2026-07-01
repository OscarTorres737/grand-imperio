import { Component, AfterViewInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, NgFor],
  template: `
    <section class="min-h-[100dvh] flex flex-col lg:flex-row overflow-hidden">

      <div class="relative z-10 flex flex-col bg-[#0A0A0A] px-8 md:px-14 lg:px-16 xl:px-20
                  pt-28 pb-12 lg:pt-24 lg:pb-12 lg:justify-between"
           style="flex: 0 0 42%; min-height: 60vh">

        <div class="flex-1 flex flex-col justify-center lg:py-8">
          <h1 class="font-display font-black text-[#F5F0EB] uppercase leading-[0.95] tracking-[-0.03em] hero-anim-1"
              style="font-size: clamp(3.2rem, 5.5vw, 5.8rem)">
            El<br>
            Escenario<br>
            <span class="text-[#C9A84C]">Perfecto.</span>
          </h1>

          <div class="w-14 h-[3px] bg-[#C9A84C] mt-8 mb-7 hero-anim-2"></div>

          <p class="text-[#F5F0EB]/55 text-[14px] font-light leading-relaxed tracking-wide mb-10 max-w-[20rem] hero-anim-2"
             style="letter-spacing: 0.02em">
            Bodas, XV Años y eventos corporativos en Guadalupe, Nuevo León.
          </p>

          <div class="flex flex-col sm:flex-row gap-3 hero-anim-3">
            <a routerLink="/agendar"
               class="btn-grand inline-flex items-center justify-center px-8 py-3.5
                      bg-[#C9A84C] text-[#0A0A0A] text-[10px] font-bold tracking-[0.28em]
                      uppercase hover:bg-[#E2C97A]">
              Agendar Visita
            </a>
            <a routerLink="/galeria"
               class="btn-grand inline-flex items-center justify-center px-8 py-3.5
                      border border-[#F5F0EB]/20 text-[#F5F0EB]/60 text-[10px] font-semibold
                      tracking-[0.28em] uppercase hover:border-[#C9A84C]/60 hover:text-[#C9A84C]">
              Ver Galería
            </a>
          </div>
        </div>

        <div class="hidden lg:flex items-center gap-4 pb-10 hero-anim-4">
          <span class="font-display font-black text-[#C9A84C] text-3xl leading-none">4.7</span>
          <div class="border-l border-[#F5F0EB]/10 pl-4">
            <p class="text-[#F5F0EB]/50 text-[10px] tracking-[0.2em] uppercase">566 reseñas</p>
            <p class="text-[#F5F0EB]/25 text-[9px] tracking-[0.15em] uppercase mt-0.5">Google</p>
          </div>
        </div>
      </div>

      <div class="relative overflow-hidden h-[50vh] lg:h-auto" style="flex: 1">
        <img src="https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1600&q=85"
             alt="Grand Imperio Social Venue — salón principal"
             class="w-full h-full object-cover hero-anim-1"
             loading="eager"
             style="animation-duration: 1.2s">
        <div class="absolute inset-y-0 left-0 w-12 hidden lg:block"
             style="background: linear-gradient(to right, #0A0A0A, transparent)">
        </div>
        <div class="absolute bottom-10 right-8 hidden lg:flex flex-col items-center gap-2">
          <span class="text-[#F5F0EB]/25 text-[8px] tracking-[0.35em] uppercase"
                style="writing-mode: vertical-rl; transform: rotate(180deg)">Scroll</span>
          <div class="w-px h-10 bg-[#F5F0EB]/15"></div>
        </div>
      </div>
    </section>

    <section class="bg-[#111111] border-y border-[#C9A84C]/15">
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-3 divide-x divide-[#C9A84C]/15">
          <div class="py-10 px-6 lg:px-14 text-center reveal">
            <p class="font-display font-black text-[#F5F0EB] leading-none mb-2"
               style="font-size: clamp(2.2rem, 4.5vw, 3.8rem)">500+</p>
            <p class="text-[#F5F0EB]/35 text-[9px] font-medium tracking-[0.3em] uppercase">Eventos</p>
          </div>
          <div class="py-10 px-6 lg:px-14 text-center reveal stagger-1">
            <p class="font-display font-black text-[#C9A84C] leading-none mb-2"
               style="font-size: clamp(2.2rem, 4.5vw, 3.8rem)">4.7<span class="text-[0.6em]">★</span></p>
            <p class="text-[#F5F0EB]/35 text-[9px] font-medium tracking-[0.3em] uppercase">Google · 566 reseñas</p>
          </div>
          <div class="py-10 px-6 lg:px-14 text-center reveal stagger-2">
            <p class="font-display font-black text-[#F5F0EB] leading-none mb-2"
               style="font-size: clamp(2.2rem, 4.5vw, 3.8rem)">10+</p>
            <p class="text-[#F5F0EB]/35 text-[9px] font-medium tracking-[0.3em] uppercase">Años de experiencia</p>
          </div>
        </div>
      </div>
    </section>

    <section class="py-24 lg:py-36 bg-[#0A0A0A]">
      <div class="max-w-7xl mx-auto px-8 lg:px-16 xl:px-20">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-28 items-center">

          <div class="reveal">
            <div class="flex gap-6 items-stretch mb-10">
              <div class="w-[3px] bg-[#C9A84C] self-stretch flex-shrink-0"></div>
              <h2 class="font-display font-black text-[#F5F0EB] uppercase leading-[1.05] tracking-[-0.02em]"
                  style="font-size: clamp(1.7rem, 3vw, 2.8rem)">
                Donde cada evento<br>
                cobra su dimensión<br>
                real.
              </h2>
            </div>
            <p class="text-[#F5F0EB]/55 text-[15px] font-light leading-[1.8] mb-10 max-w-[420px]">
              Grand Imperio Social Venue es el espacio donde los momentos importantes de la vida cobran la magnitud que merecen. Instalaciones de primer nivel, atención al detalle y un equipo comprometido con tu visión.
            </p>
            <a routerLink="/disponibilidad"
               class="inline-flex items-center gap-4 text-[#C9A84C] text-[10px] font-semibold tracking-[0.3em] uppercase group">
              <span>Consultar disponibilidad</span>
              <span class="block w-6 h-px bg-[#C9A84C] group-hover:w-14 transition-[width] duration-500"></span>
            </a>
          </div>

          <div class="img-zoom relative h-[400px] lg:h-[540px] overflow-hidden reveal stagger-1">
            <img src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=900&q=85"
                 alt="Evento de gala Grand Imperio"
                 class="w-full h-full object-cover">
            <div class="absolute -bottom-3 -right-3 w-24 h-24 border border-[#C9A84C]/30 pointer-events-none"></div>
          </div>
        </div>
      </div>
    </section>

    <section class="bg-[#0A0A0A] border-t border-[#F5F0EB]/5">
      <div class="max-w-7xl mx-auto px-8 lg:px-16 xl:px-20 pt-20 pb-12">
        <div class="flex items-end justify-between">
          <div class="reveal">
            <p class="text-[#C9A84C] text-[9px] font-semibold tracking-[0.5em] uppercase mb-4">
              Nuestros espacios
            </p>
            <h2 class="font-display font-black text-[#F5F0EB] uppercase leading-[1.0] tracking-[-0.02em]"
                style="font-size: clamp(2rem, 4vw, 3.5rem)">
              Un venue,<br>múltiples mundos.
            </h2>
          </div>
          <a routerLink="/galeria"
             class="reveal hidden md:inline-flex items-center gap-3 text-[#F5F0EB]/30 text-[9px]
                    font-semibold tracking-[0.35em] uppercase hover:text-[#C9A84C]
                    transition-colors duration-300 group mb-1">
            <span>Ver galería completa</span>
            <span class="block w-4 h-px bg-current group-hover:w-8 transition-[width] duration-500"></span>
          </a>
        </div>
      </div>

      <div class="px-8 lg:px-16 xl:px-20 pb-20">
        <div class="flex flex-col lg:flex-row gap-3">

          <div class="img-zoom group relative overflow-hidden h-[400px] lg:h-[580px] reveal" style="flex: 2.2">
            <img src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1200&q=85"
                 alt="Salón Principal Grand Imperio"
                 class="w-full h-full object-cover">
            <div class="absolute inset-0"
                 style="background: linear-gradient(to top, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.1) 50%, transparent 100%)">
            </div>
            <div class="absolute bottom-0 left-0 right-0 p-8 lg:p-10">
              <div class="w-8 h-[2px] bg-[#C9A84C] mb-4"></div>
              <h3 class="font-display font-black text-[#F5F0EB] uppercase tracking-wide text-xl lg:text-2xl mb-1">
                Salón Principal
              </h3>
              <p class="text-[#F5F0EB]/50 text-sm font-light tracking-wide">Hasta 500 personas</p>
              <p class="text-[#F5F0EB]/40 text-[13px] font-light mt-3 max-w-xs leading-relaxed
                         opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0
                         transition-[opacity,transform] duration-500">
                El espacio ideal para bodas y eventos de gala en gran formato.
              </p>
            </div>
          </div>

          <div class="flex flex-col gap-3" style="flex: 1">
            <div class="img-zoom group relative overflow-hidden h-[280px] lg:h-[283px] reveal stagger-1">
              <img src="https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=85"
                   alt="Terraza Imperial"
                   class="w-full h-full object-cover">
              <div class="absolute inset-0"
                   style="background: linear-gradient(to top, rgba(10,10,10,0.9) 0%, transparent 60%)">
              </div>
              <div class="absolute bottom-0 left-0 right-0 p-6">
                <div class="w-5 h-[2px] bg-[#C9A84C] mb-3"></div>
                <h3 class="font-display font-black text-[#F5F0EB] uppercase text-base tracking-wide">Terraza Imperial</h3>
                <p class="text-[#F5F0EB]/45 text-xs font-light mt-1">Hasta 200 personas</p>
              </div>
            </div>
            <div class="img-zoom group relative overflow-hidden h-[280px] lg:h-[283px] reveal stagger-2">
              <img src="https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=800&q=85"
                   alt="Salón VIP"
                   class="w-full h-full object-cover">
              <div class="absolute inset-0"
                   style="background: linear-gradient(to top, rgba(10,10,10,0.9) 0%, transparent 60%)">
              </div>
              <div class="absolute bottom-0 left-0 right-0 p-6">
                <div class="w-5 h-[2px] bg-[#C9A84C] mb-3"></div>
                <h3 class="font-display font-black text-[#F5F0EB] uppercase text-base tracking-wide">Salón VIP</h3>
                <p class="text-[#F5F0EB]/45 text-xs font-light mt-1">Hasta 100 personas</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-24 lg:py-32 bg-[#111111] border-t border-[#F5F0EB]/5">
      <div class="max-w-7xl mx-auto px-8 lg:px-16 xl:px-20 reveal">
        <h2 class="font-display font-black text-[#F5F0EB] uppercase leading-[0.95] tracking-[-0.03em] mb-14"
            style="font-size: clamp(2.5rem, 6vw, 5.5rem)">
          Celebramos<br>
          <span class="text-[#C9A84C]">contigo.</span>
        </h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-y-5 gap-x-8">
          <div *ngFor="let type of eventTypes"
               class="flex items-center gap-3 group">
            <span class="block w-1.5 h-1.5 bg-[#C9A84C] rounded-full flex-shrink-0"></span>
            <span class="text-[#F5F0EB]/55 text-[13px] font-medium tracking-[0.05em]
                         group-hover:text-[#F5F0EB]/80 transition-colors duration-300">
              {{ type }}
            </span>
          </div>
        </div>
      </div>
    </section>

    <section class="py-24 lg:py-36 bg-[#0A0A0A] border-t border-[#F5F0EB]/5">
      <div class="max-w-5xl mx-auto px-8 lg:px-16 xl:px-20">

        <div class="font-display font-black text-[#C9A84C]/10 leading-none select-none mb-4 reveal"
             style="font-size: 9rem" aria-hidden="true">"</div>

        <div class="testimonial-content reveal stagger-1" [class.fading]="testimonialFading()">
          <blockquote class="font-display font-semibold text-[#F5F0EB] leading-[1.45] mb-10 tracking-[-0.01em]"
                      style="font-size: clamp(1.25rem, 2.5vw, 2rem)">
            {{ testimonials[currentTestimonial()].text }}
          </blockquote>
          <div class="flex items-center gap-5">
            <div class="w-10 h-[2px] bg-[#C9A84C]"></div>
            <div>
              <p class="text-[#F5F0EB]/80 text-[13px] font-semibold tracking-wide">
                {{ testimonials[currentTestimonial()].name }}
              </p>
              <p class="text-[#F5F0EB]/35 text-[11px] font-light tracking-wide mt-0.5">
                {{ testimonials[currentTestimonial()].event }}
              </p>
            </div>
          </div>
        </div>

        <div class="flex items-center gap-5 mt-12 reveal stagger-2">
          <button (click)="prevTestimonial()"
                  class="btn-grand w-10 h-10 border border-[#C9A84C]/25 flex items-center justify-center
                         text-[#F5F0EB]/35 hover:border-[#C9A84C] hover:text-[#C9A84C]"
                  aria-label="Anterior">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M9 11L5 7L9 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          <div class="flex items-center gap-2.5">
            <button *ngFor="let t of testimonials; let i = index"
                    (click)="goToTestimonial(i)"
                    class="h-[2px] transition-[width,background-color] duration-300"
                    [style.width.px]="i === currentTestimonial() ? 28 : 8"
                    [style.background-color]="i === currentTestimonial() ? '#C9A84C' : 'rgba(245,240,235,0.18)'"
                    [attr.aria-label]="'Testimonio ' + (i + 1)">
            </button>
          </div>
          <button (click)="nextTestimonial()"
                  class="btn-grand w-10 h-10 border border-[#C9A84C]/25 flex items-center justify-center
                         text-[#F5F0EB]/35 hover:border-[#C9A84C] hover:text-[#C9A84C]"
                  aria-label="Siguiente">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M5 11L9 7L5 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </section>

    <section class="relative overflow-hidden bg-[#0A0A0A] border-t border-[#C9A84C]/20">
      <div class="absolute inset-0 pointer-events-none"
           style="background: radial-gradient(ellipse 55% 60% at 50% 110%, rgba(201,168,76,0.08) 0%, transparent 70%)">
      </div>

      <div class="relative max-w-7xl mx-auto px-8 lg:px-16 xl:px-20 py-24 lg:py-36 reveal">
        <p class="text-[#C9A84C] text-[9px] font-semibold tracking-[0.5em] uppercase mb-8">
          Agenda tu visita
        </p>
        <h2 class="font-display font-black text-[#F5F0EB] uppercase leading-[0.95] tracking-[-0.03em] mb-8 max-w-3xl"
            style="font-size: clamp(2.2rem, 5vw, 5rem)">
          Tu evento merece<br>
          el mejor<br>
          <span class="text-[#C9A84C]">escenario.</span>
        </h2>
        <div class="flex flex-col sm:flex-row sm:items-center gap-6 mb-12">
          <a href="tel:8124049899"
             class="text-[#F5F0EB]/40 text-sm font-light tracking-widest hover:text-[#C9A84C] transition-colors duration-300 tabular-nums">
            81 2404 9899
          </a>
          <span class="hidden sm:block w-px h-5 bg-[#F5F0EB]/10"></span>
          <span class="text-[#F5F0EB]/25 text-sm font-light tracking-wide">Guadalupe, Nuevo León</span>
        </div>
        <a routerLink="/disponibilidad"
           class="btn-grand inline-flex items-center gap-5 px-10 py-4
                  bg-[#C9A84C] text-[#0A0A0A] text-[10px] font-bold tracking-[0.3em] uppercase
                  hover:bg-[#E2C97A]">
          <span>Consultar Disponibilidad</span>
          <svg width="14" height="8" viewBox="0 0 14 8" fill="none" aria-hidden="true">
            <path d="M1 4h12M8 1l5 3-5 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </a>
      </div>
    </section>
  `
})
export class HomeComponent implements AfterViewInit {
  currentTestimonial = signal(0);
  testimonialFading = signal(false);

  eventTypes = [
    'Bodas', 'XV Años', 'Eventos Corporativos', 'Graduaciones',
    'Cumpleaños', 'Coctelería', 'Conciertos', 'Convenciones'
  ];

  testimonials = [
    {
      name: 'María González',
      event: 'Boda — Marzo 2024',
      text: 'Un lugar absolutamente hermoso. El equipo estuvo con nosotros en cada detalle. Nuestra boda superó todas nuestras expectativas.'
    },
    {
      name: 'Carlos Ramírez',
      event: 'Evento Corporativo — Enero 2024',
      text: 'Excelente servicio y profesionalismo. Las instalaciones son de primer nivel. Nuestros clientes quedaron completamente impresionados.'
    },
    {
      name: 'Sofía Martínez',
      event: 'XV Años — Noviembre 2023',
      text: 'El sueño de mi hija hecho realidad. Cada rincón del lugar es perfecto. El personal fue increíblemente atento durante todo el evento.'
    }
  ];

  goToTestimonial(index: number) {
    if (index === this.currentTestimonial()) return;
    this.testimonialFading.set(true);
    setTimeout(() => {
      this.currentTestimonial.set(index);
      this.testimonialFading.set(false);
    }, 220);
  }

  nextTestimonial() {
    this.goToTestimonial((this.currentTestimonial() + 1) % this.testimonials.length);
  }

  prevTestimonial() {
    this.goToTestimonial((this.currentTestimonial() - 1 + this.testimonials.length) % this.testimonials.length);
  }

  ngAfterViewInit(): void {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.08 }
    );
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  }
}
