import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [RouterLink],
  template: `
    <section class="pt-32 lg:pt-36 pb-10 px-6 lg:px-16 xl:px-24 bg-[#0A0A0A]">
      <div class="max-w-7xl mx-auto">
        <h1 class="font-display text-4xl md:text-5xl text-[#F5F0EB] font-semibold leading-tight">Contacto</h1>
        <p class="text-[#F5F0EB]/50 mt-3 text-[15px] leading-relaxed max-w-sm">
          Estamos disponibles de lunes a sábado para atenderte.
        </p>
      </div>
    </section>

    <section class="py-12 px-6 lg:px-16 xl:px-24 bg-[#0A0A0A]">
      <div class="max-w-7xl mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-[1fr_400px] xl:grid-cols-[1fr_440px] gap-16 lg:gap-24">

          <div class="order-2 lg:order-1">
            <div class="relative overflow-hidden h-[360px] lg:h-[480px] rounded-2xl">
              <iframe
                src="https://maps.google.com/maps?q=Benito+Juarez+1937,+Villas+del+Rio,+67204+Guadalupe,+Nuevo+Leon,+Mexico&output=embed&z=16"
                width="100%"
                height="100%"
                style="border:0; filter: grayscale(100%) invert(88%) contrast(85%);"
                allowfullscreen
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
                title="Ubicación Grand Imperio Social Venue">
              </iframe>
            </div>
            <a href="https://maps.google.com/?q=Benito+Juárez+1937,+Villas+del+Río,+67204+Guadalupe+NL"
               target="_blank" rel="noopener noreferrer"
               class="mt-5 inline-flex items-center gap-3 text-[#C9A84C] text-sm group">
              <span>Abrir en Google Maps</span>
              <span class="block w-4 h-px bg-[#C9A84C] group-hover:w-8 transition-all duration-500"></span>
            </a>
          </div>

          <div class="order-1 lg:order-2">

            <div class="mb-12">
              <p class="text-[#C9A84C] text-xs font-medium mb-6">Donde encontrarnos</p>
              <div class="space-y-6">
                <div>
                  <p class="text-[#F5F0EB]/70 text-sm leading-relaxed">
                    Benito Juárez 1937, Villas del Río<br>
                    67204 Guadalupe, Nuevo León
                  </p>
                </div>
                <div class="border-t border-[#F5F0EB]/8 pt-6">
                  <p class="text-[#C9A84C] text-xs font-medium mb-3">Telefono</p>
                  <a href="tel:8124049899"
                     class="text-[#F5F0EB]/70 text-sm hover:text-[#C9A84C] transition-colors duration-300">
                    81 2404 9899
                  </a>
                </div>
                <div class="border-t border-[#F5F0EB]/8 pt-6">
                  <p class="text-[#C9A84C] text-xs font-medium mb-3">WhatsApp</p>
                  <a href="https://wa.me/528124049899" target="_blank" rel="noopener noreferrer"
                     class="text-[#F5F0EB]/70 text-sm hover:text-[#C9A84C] transition-colors duration-300">
                    Escríbenos directamente
                  </a>
                </div>
              </div>
            </div>

            <div>
              <p class="text-[#C9A84C] text-xs font-medium mb-6">Horario de atencion</p>
              <div class="space-y-0">
                <div class="flex justify-between items-baseline py-3 border-b border-[#F5F0EB]/8">
                  <span class="text-[#F5F0EB]/50 text-sm">Lunes a Sábado</span>
                  <span class="text-[#F5F0EB]/70 text-sm tabular-nums">9:00 am - 7:30 pm</span>
                </div>
                <div class="flex justify-between items-baseline py-3">
                  <span class="text-[#F5F0EB]/50 text-sm">Domingo</span>
                  <span class="text-[#F5F0EB]/70 text-sm tabular-nums">12:00 pm - 6:00 pm</span>
                </div>
              </div>
            </div>

            <div class="mt-12 pt-10 border-t border-[#F5F0EB]/8">
              <a routerLink="/agendar"
                 class="btn-grand inline-block px-8 py-3.5 rounded-full bg-[#C9A84C] text-[#0A0A0A] text-sm font-medium hover:bg-[#E2C97A]">
                Agendar una visita
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  `
})
export class ContactComponent {}
