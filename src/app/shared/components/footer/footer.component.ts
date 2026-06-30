import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink],
  template: `
    <footer class="bg-[#0A0A0A] border-t border-[#F5F0EB]/8 pt-16 pb-10">
      <div class="max-w-7xl mx-auto px-6 lg:px-16 xl:px-24">

        <div class="grid grid-cols-1 md:grid-cols-[1fr_auto_auto] gap-12 lg:gap-20 mb-16">

          <!-- Brand -->
          <div class="max-w-xs">
            <img src="logo.png" alt="Grand Imperio Social Venue" class="h-12 w-auto mb-6"
                 onerror="this.style.display='none'; this.nextElementSibling.style.display='block'">
            <span class="font-display text-lg tracking-[0.25em] text-[#F5F0EB] mb-6 block hidden">
              GRAND IMPERIO
            </span>
            <p class="text-[#F5F0EB]/38 text-sm leading-relaxed">
              El escenario perfecto para los momentos más importantes de tu vida.
            </p>
          </div>

          <!-- Navigation -->
          <div>
            <p class="text-[#F5F0EB]/30 text-[10px] tracking-[0.28em] uppercase mb-6">Navegacion</p>
            <ul class="space-y-3.5">
              <li><a routerLink="/"              class="text-[#F5F0EB]/45 text-sm hover:text-[#F5F0EB]/80 transition-colors duration-300 link-underline">Inicio</a></li>
              <li><a routerLink="/galeria"       class="text-[#F5F0EB]/45 text-sm hover:text-[#F5F0EB]/80 transition-colors duration-300 link-underline">Galería</a></li>
              <li><a routerLink="/cotizacion"    class="text-[#F5F0EB]/45 text-sm hover:text-[#F5F0EB]/80 transition-colors duration-300 link-underline">Cotización</a></li>
              <li><a routerLink="/proveedores"   class="text-[#F5F0EB]/45 text-sm hover:text-[#F5F0EB]/80 transition-colors duration-300 link-underline">Proveedores</a></li>
              <li><a routerLink="/disponibilidad" class="text-[#F5F0EB]/45 text-sm hover:text-[#F5F0EB]/80 transition-colors duration-300 link-underline">Disponibilidad</a></li>
              <li><a routerLink="/agendar"       class="text-[#F5F0EB]/45 text-sm hover:text-[#F5F0EB]/80 transition-colors duration-300 link-underline">Agendar Visita</a></li>
              <li><a routerLink="/contacto"      class="text-[#F5F0EB]/45 text-sm hover:text-[#F5F0EB]/80 transition-colors duration-300 link-underline">Contacto</a></li>
            </ul>
          </div>

          <!-- Contact & Hours -->
          <div>
            <p class="text-[#F5F0EB]/30 text-[10px] tracking-[0.28em] uppercase mb-6">Contacto</p>
            <ul class="space-y-3 text-sm text-[#F5F0EB]/45 mb-8">
              <li class="leading-relaxed">
                Benito Juárez 1937, Villas del Río<br>
                67204 Guadalupe, N.L.
              </li>
              <li>
                <a href="tel:8124049899" class="hover:text-[#C9A84C] transition-colors duration-300">81 2404 9899</a>
              </li>
              <li>
                <a href="https://wa.me/528124049899" target="_blank" rel="noopener noreferrer"
                   class="hover:text-[#C9A84C] transition-colors duration-300">WhatsApp</a>
              </li>
            </ul>
            <p class="text-[#F5F0EB]/30 text-[10px] tracking-[0.28em] uppercase mb-3">Horario</p>
            <p class="text-xs text-[#F5F0EB]/38 leading-6">
              Lun - Sab: 9:00 am - 7:30 pm<br>
              Domingo: 12:00 pm - 6:00 pm
            </p>
          </div>
        </div>

        <div class="border-t border-[#F5F0EB]/8 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p class="text-[#F5F0EB]/25 text-xs tracking-wide">
            © {{ currentYear }} Grand Imperio Social Venue. Todos los derechos reservados.
          </p>
          <div class="flex gap-6">
            <a href="#" class="text-[#F5F0EB]/25 hover:text-[#C9A84C] transition-colors duration-300 text-xs tracking-wide link-underline">Instagram</a>
            <a href="#" class="text-[#F5F0EB]/25 hover:text-[#C9A84C] transition-colors duration-300 text-xs tracking-wide link-underline">Facebook</a>
            <a routerLink="/admin/login" class="text-[#F5F0EB]/15 hover:text-[#F5F0EB]/40 transition-colors duration-300 text-xs tracking-wide link-underline">Staff</a>
          </div>
        </div>
      </div>
    </footer>
  `
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
}
