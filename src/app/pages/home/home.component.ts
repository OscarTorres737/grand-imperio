import { Component, AfterViewInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, NgFor],
  template: `
    <section data-tour="hero" class="min-h-[100dvh] flex flex-col lg:flex-row overflow-hidden">

      <div class="relative z-10 flex flex-col bg-[#0A0A0A] px-8 md:px-14 lg:px-16 xl:px-20
                  pt-28 pb-12 lg:pt-24 lg:pb-12 lg:justify-between"
           style="flex: 0 0 42%; min-height: 60vh">

        <div class="flex-1 flex flex-col justify-center lg:py-8">
          <p class="text-[#C9A84C] text-xs font-medium tracking-[0.15em] mb-5 hero-anim-1">Grand Imperio Social Venue</p>
          <h1 class="font-display font-semibold text-[#F5F0EB] leading-[1.05] tracking-[-0.02em] hero-anim-1"
              style="font-size: clamp(2.6rem, 5vw, 4.4rem)">
            El escenario<br>perfecto.
          </h1>

          <p class="text-[#F5F0EB]/50 text-[15px] leading-relaxed mt-6 mb-10 max-w-[22rem] hero-anim-2">
            Bodas, XV Años y eventos corporativos en Guadalupe, Nuevo León.
          </p>

          <div class="flex flex-col sm:flex-row gap-3 hero-anim-3">
            <a routerLink="/agendar"
               class="btn-grand inline-flex items-center justify-center px-7 py-3.5 rounded-full
                      bg-[#C9A84C] text-[#0A0A0A] text-sm font-medium hover:bg-[#E2C97A]">
              Agendar visita
            </a>
            <a routerLink="/galeria"
               class="btn-grand inline-flex items-center justify-center px-7 py-3.5 rounded-full
                      border border-[#F5F0EB]/15 text-[#F5F0EB]/70 text-sm font-medium hover:border-[#F5F0EB]/30 hover:text-[#F5F0EB]">
              Ver galería
            </a>
          </div>
        </div>

        <div class="hidden lg:flex items-center gap-4 pb-10 hero-anim-4">
          <span class="font-display font-semibold text-[#C9A84C] text-2xl leading-none">4.7</span>
          <div class="border-l border-[#F5F0EB]/10 pl-4">
            <p class="text-[#F5F0EB]/45 text-xs">566 reseñas</p>
            <p class="text-[#F5F0EB]/25 text-xs mt-0.5">Google</p>
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
      </div>
    </section>

    <section class="bg-[#0A0A0A] border-y border-[#F5F0EB]/8">
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-3 divide-x divide-[#F5F0EB]/8">
          <div class="py-10 px-6 lg:px-14 text-center reveal">
            <p class="font-display font-semibold text-[#F5F0EB] leading-none mb-2"
               style="font-size: clamp(1.8rem, 3.5vw, 2.6rem)">500+</p>
            <p class="text-[#F5F0EB]/40 text-xs">Eventos</p>
          </div>
          <div class="py-10 px-6 lg:px-14 text-center reveal stagger-1">
            <p class="font-display font-semibold text-[#C9A84C] leading-none mb-2"
               style="font-size: clamp(1.8rem, 3.5vw, 2.6rem)">4.7<span class="text-[0.6em]">★</span></p>
            <p class="text-[#F5F0EB]/40 text-xs">Google · 566 reseñas</p>
          </div>
          <div class="py-10 px-6 lg:px-14 text-center reveal stagger-2">
            <p class="font-display font-semibold text-[#F5F0EB] leading-none mb-2"
               style="font-size: clamp(1.8rem, 3.5vw, 2.6rem)">10+</p>
            <p class="text-[#F5F0EB]/40 text-xs">Años de experiencia</p>
          </div>
        </div>
      </div>
    </section>

    <section class="py-24 lg:py-32 bg-[#0A0A0A]">
      <div class="max-w-7xl mx-auto px-8 lg:px-16 xl:px-20">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-28 items-center">

          <div class="reveal">
            <h2 class="font-display font-semibold text-[#F5F0EB] leading-[1.2] tracking-[-0.01em] mb-8"
                style="font-size: clamp(1.6rem, 2.8vw, 2.4rem)">
              Donde cada evento cobra su dimensión real.
            </h2>
            <p class="text-[#F5F0EB]/50 text-[15px] leading-[1.8] mb-8 max-w-[420px]">
              Grand Imperio Social Venue es el espacio donde los momentos importantes de la vida cobran la magnitud que merecen. Instalaciones de primer nivel, atención al detalle y un equipo comprometido con tu visión.
            </p>
            <a routerLink="/disponibilidad"
               class="inline-flex items-center gap-3 text-[#C9A84C] text-sm font-medium group">
              <span>Consultar disponibilidad</span>
              <span class="block w-5 h-px bg-[#C9A84C] group-hover:w-9 transition-[width] duration-500"></span>
            </a>
          </div>

          <div class="img-zoom relative h-[380px] lg:h-[500px] overflow-hidden reveal stagger-1 rounded-2xl">
            <img src="https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=900&q=85"
                 alt="Evento de gala Grand Imperio"
                 class="w-full h-full object-cover">
          </div>
        </div>
      </div>
    </section>

    <section class="bg-[#0A0A0A] border-t border-[#F5F0EB]/8">
      <div class="max-w-7xl mx-auto px-8 lg:px-16 xl:px-20 pt-20 pb-10">
        <div class="flex items-end justify-between">
          <div class="reveal">
            <p class="text-[#C9A84C] text-xs font-medium mb-4">Nuestros espacios</p>
            <h2 class="font-display font-semibold text-[#F5F0EB] leading-[1.1] tracking-[-0.01em]"
                style="font-size: clamp(1.8rem, 3.5vw, 2.8rem)">
              Un venue, múltiples mundos.
            </h2>
          </div>
          <a routerLink="/galeria"
             class="reveal hidden md:inline-flex items-center gap-3 text-[#F5F0EB]/40 text-sm
                    hover:text-[#C9A84C] transition-colors duration-300 group mb-1">
            <span>Ver galería completa</span>
            <span class="block w-4 h-px bg-current group-hover:w-8 transition-[width] duration-500"></span>
          </a>
        </div>
      </div>

      <div class="px-8 lg:px-16 xl:px-20 pb-20">
        <div class="flex flex-col lg:flex-row gap-3">

          <div class="img-zoom group relative overflow-hidden h-[380px] lg:h-[560px] reveal rounded-2xl" style="flex: 2.2">
            <img src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1200&q=85"
                 alt="Salón Principal Grand Imperio"
                 class="w-full h-full object-cover">
            <div class="absolute inset-0"
                 style="background: linear-gradient(to top, rgba(10,10,10,0.9) 0%, rgba(10,10,10,0.05) 55%, transparent 100%)">
            </div>
            <div class="absolute bottom-0 left-0 right-0 p-8 lg:p-10">
              <h3 class="font-display font-semibold text-[#F5F0EB] text-xl lg:text-2xl mb-1">
                Salón Principal
              </h3>
              <p class="text-[#F5F0EB]/55 text-sm">Hasta 500 personas</p>
              <p class="text-[#F5F0EB]/40 text-[13px] mt-3 max-w-xs leading-relaxed
                         opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0
                         transition-[opacity,transform] duration-500">
                El espacio ideal para bodas y eventos de gala en gran formato.
              </p>
            </div>
          </div>

          <div class="flex flex-col gap-3" style="flex: 1">
            <div class="img-zoom group relative overflow-hidden h-[270px] lg:h-[273px] reveal stagger-1 rounded-2xl">
              <img src="https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=85"
                   alt="Terraza Imperial"
                   class="w-full h-full object-cover">
              <div class="absolute inset-0"
                   style="background: linear-gradient(to top, rgba(10,10,10,0.85) 0%, transparent 60%)">
              </div>
              <div class="absolute bottom-0 left-0 right-0 p-6">
                <h3 class="font-display font-semibold text-[#F5F0EB] text-base">Terraza Imperial</h3>
                <p class="text-[#F5F0EB]/50 text-xs mt-1">Hasta 200 personas</p>
              </div>
            </div>
            <div class="img-zoom group relative overflow-hidden h-[270px] lg:h-[273px] reveal stagger-2 rounded-2xl">
              <img src="https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=800&q=85"
                   alt="Salón VIP"
                   class="w-full h-full object-cover">
              <div class="absolute inset-0"
                   style="background: linear-gradient(to top, rgba(10,10,10,0.85) 0%, transparent 60%)">
              </div>
              <div class="absolute bottom-0 left-0 right-0 p-6">
                <h3 class="font-display font-semibold text-[#F5F0EB] text-base">Salón VIP</h3>
                <p class="text-[#F5F0EB]/50 text-xs mt-1">Hasta 100 personas</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-24 lg:py-28 bg-[#111111] border-t border-[#F5F0EB]/8">
      <div class="max-w-7xl mx-auto px-8 lg:px-16 xl:px-20 reveal">
        <h2 class="font-display font-semibold text-[#F5F0EB] leading-[1.1] tracking-[-0.01em] mb-12"
            style="font-size: clamp(1.8rem, 4vw, 3rem)">
          Celebramos contigo.
        </h2>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-y-5 gap-x-8">
          <div *ngFor="let type of eventTypes"
               class="flex items-center gap-3 group">
            <span class="block w-1.5 h-1.5 bg-[#C9A84C] rounded-full flex-shrink-0"></span>
            <span class="text-[#F5F0EB]/55 text-sm group-hover:text-[#F5F0EB]/85 transition-colors duration-300">
              {{ type }}
            </span>
          </div>
        </div>
      </div>
    </section>

    <section class="py-24 lg:py-32 bg-[#0A0A0A] border-t border-[#F5F0EB]/8">
      <div class="max-w-4xl mx-auto px-8 lg:px-16 xl:px-20">

        <div class="testimonial-content reveal" [class.fading]="testimonialFading()">
          <blockquote class="font-display font-medium text-[#F5F0EB] leading-[1.5] mb-10 tracking-[-0.005em]"
                      style="font-size: clamp(1.15rem, 2.2vw, 1.7rem)">
            "{{ testimonials[currentTestimonial()].text }}"
          </blockquote>
          <div class="flex items-center gap-4">
            <div class="w-9 h-9 rounded-full bg-[#C9A84C]/15 flex items-center justify-center text-[#C9A84C] text-sm font-medium">
              {{ testimonials[currentTestimonial()].name.charAt(0) }}
            </div>
            <div>
              <p class="text-[#F5F0EB]/80 text-sm font-medium">
                {{ testimonials[currentTestimonial()].name }}
              </p>
              <p class="text-[#F5F0EB]/35 text-xs mt-0.5">
                {{ testimonials[currentTestimonial()].event }}
              </p>
            </div>
          </div>
        </div>

        <div class="flex items-center gap-5 mt-12 reveal stagger-2">
          <button (click)="prevTestimonial()"
                  class="btn-grand w-10 h-10 rounded-full border border-[#F5F0EB]/10 flex items-center justify-center
                         text-[#F5F0EB]/40 hover:border-[#C9A84C]/50 hover:text-[#C9A84C]"
                  aria-label="Anterior">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M9 11L5 7L9 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
          <div class="flex items-center gap-2.5">
            <button *ngFor="let t of testimonials; let i = index"
                    (click)="goToTestimonial(i)"
                    class="h-[2px] rounded-full transition-[width,background-color] duration-300"
                    [style.width.px]="i === currentTestimonial() ? 28 : 8"
                    [style.background-color]="i === currentTestimonial() ? '#C9A84C' : 'rgba(245,240,235,0.18)'"
                    [attr.aria-label]="'Testimonio ' + (i + 1)">
            </button>
          </div>
          <button (click)="nextTestimonial()"
                  class="btn-grand w-10 h-10 rounded-full border border-[#F5F0EB]/10 flex items-center justify-center
                         text-[#F5F0EB]/40 hover:border-[#C9A84C]/50 hover:text-[#C9A84C]"
                  aria-label="Siguiente">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M5 11L9 7L5 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </section>

    <section class="relative overflow-hidden bg-[#0A0A0A] border-t border-[#F5F0EB]/8">
      <div class="absolute inset-0 pointer-events-none"
           style="background: radial-gradient(ellipse 55% 60% at 50% 110%, rgba(201,168,76,0.08) 0%, transparent 70%)">
      </div>

      <div class="relative max-w-7xl mx-auto px-8 lg:px-16 xl:px-20 py-24 lg:py-32 reveal">
        <p class="text-[#C9A84C] text-xs font-medium mb-6">Agenda tu visita</p>
        <h2 class="font-display font-semibold text-[#F5F0EB] leading-[1.1] tracking-[-0.02em] mb-8 max-w-2xl"
            style="font-size: clamp(2rem, 4.5vw, 3.6rem)">
          Tu evento merece el mejor escenario.
        </h2>
        <div class="flex flex-col sm:flex-row sm:items-center gap-6 mb-12">
          <a href="tel:8124049899"
             class="text-[#F5F0EB]/45 text-sm hover:text-[#C9A84C] transition-colors duration-300 tabular-nums">
            81 2404 9899
          </a>
          <span class="hidden sm:block w-px h-5 bg-[#F5F0EB]/10"></span>
          <span class="text-[#F5F0EB]/30 text-sm">Guadalupe, Nuevo León</span>
        </div>
        <a routerLink="/disponibilidad"
           class="btn-grand inline-flex items-center gap-4 px-8 py-3.5 rounded-full
                  bg-[#C9A84C] text-[#0A0A0A] text-sm font-medium hover:bg-[#E2C97A]">
          <span>Consultar disponibilidad</span>
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
