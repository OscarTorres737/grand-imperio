import { Component, signal, computed, inject } from '@angular/core';
import { NgFor, NgIf, NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { AvailabilityService } from '../../core/services/availability.service';

@Component({
  selector: 'app-availability',
  standalone: true,
  imports: [NgFor, NgIf],
  template: `
    <section class="pt-32 lg:pt-36 pb-12 px-6 bg-[#0A0A0A] text-center">
      <span class="text-[#C9A84C] text-xs font-medium mb-4 block">Planifica tu visita</span>
      <h1 class="font-display text-4xl md:text-5xl text-[#F5F0EB] font-semibold mb-4">Disponibilidad</h1>
      <p class="text-[#F5F0EB]/45 max-w-lg mx-auto">Selecciona una fecha y horario para visitar nuestras instalaciones.</p>
    </section>

    <section data-tour="availability" class="py-12 px-6 bg-[#0A0A0A]">
      <div class="max-w-4xl mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">

          <div class="border border-[#F5F0EB]/10 rounded-2xl p-8">
            <div class="flex items-center justify-between mb-8">
              <button (click)="prevMonth()"
                      class="text-[#C9A84C] hover:text-[#E2C97A] transition-colors p-2 text-xl">‹</button>
              <h3 class="font-display text-lg text-[#F5F0EB] font-medium">
                {{ monthNames[currentMonth()] }} {{ currentYear() }}
              </h3>
              <button (click)="nextMonth()"
                      class="text-[#C9A84C] hover:text-[#E2C97A] transition-colors p-2 text-xl">›</button>
            </div>

            <div class="grid grid-cols-7 mb-2">
              <div *ngFor="let d of dayNames" class="text-center text-[#F5F0EB]/30 text-xs tracking-widest uppercase py-2">
                {{ d }}
              </div>
            </div>

            <div class="grid grid-cols-7 gap-1">
              <div *ngFor="let day of calendarDays()"
                   [class]="getDayClass(day)"
                   (click)="day.date && selectDate(day.date)">
                <span *ngIf="day.day">{{ day.day }}</span>
              </div>
            </div>

            <div class="flex items-center gap-5 mt-6 pt-5 border-t border-[#F5F0EB]/8">
              <div class="flex items-center gap-2">
                <span class="w-2.5 h-2.5 rounded-full border border-[#C9A84C]/40"></span>
                <span class="text-[#F5F0EB]/40 text-xs">Disponible</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="w-2.5 h-2.5 rounded-full bg-[#F5F0EB]/15"></span>
                <span class="text-[#F5F0EB]/40 text-xs">Apartada</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="w-2.5 h-2.5 rounded-full bg-[#C9A84C]"></span>
                <span class="text-[#F5F0EB]/40 text-xs">Seleccionada</span>
              </div>
            </div>
          </div>

          <div>
            <div *ngIf="!selectedDate()" class="h-full flex flex-col items-center justify-center text-center py-12">
              <div class="w-14 h-14 border border-[#F5F0EB]/10 rounded-full flex items-center justify-center mb-4">
                <span class="text-[#C9A84C] text-xl">📅</span>
              </div>
              <p class="text-[#F5F0EB]/35 text-sm">Selecciona una fecha para ver los horarios disponibles</p>
            </div>

            <div *ngIf="selectedDate() && isReserved(selectedDate()!)" class="py-12 text-center">
              <p class="text-[#F5F0EB]/50 text-sm">Esta fecha ya fue apartada por otro evento.</p>
              <p class="text-[#F5F0EB]/30 text-xs mt-2">Elige otra fecha disponible en el calendario.</p>
            </div>

            <div *ngIf="selectedDate() && !isReserved(selectedDate()!)">
              <h3 class="font-display text-xl text-[#F5F0EB] font-semibold mb-1">
                {{ formatSelectedDate() }}
              </h3>
              <p class="text-[#C9A84C] text-xs font-medium mb-6">Horarios disponibles</p>

              <div class="grid grid-cols-3 gap-2">
                <button *ngFor="let slot of timeSlots()"
                        (click)="selectSlot(slot)"
                        [class]="selectedSlot() === slot
                          ? 'bg-[#C9A84C] text-[#0A0A0A] border-[#C9A84C]'
                          : 'border-[#F5F0EB]/15 text-[#F5F0EB]/60 hover:border-[#C9A84C]/60 hover:text-[#C9A84C]'"
                        class="border rounded-full px-3 py-2.5 text-sm transition-all duration-200">
                  {{ slot }}
                </button>
              </div>

              <button *ngIf="selectedSlot()"
                      (click)="proceed()"
                      class="mt-8 w-full py-3.5 rounded-full bg-[#C9A84C] text-[#0A0A0A] text-sm font-medium hover:bg-[#E2C97A] transition-all duration-300">
                Agendar esta visita →
              </button>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-16">
          <div class="border border-[#F5F0EB]/8 rounded-2xl p-6 text-center">
            <p class="text-[#C9A84C] text-xs font-medium mb-2">Lunes – Sábado</p>
            <p class="font-display text-xl text-[#F5F0EB] font-semibold">9:00 – 19:30</p>
          </div>
          <div class="border border-[#F5F0EB]/8 rounded-2xl p-6 text-center">
            <p class="text-[#C9A84C] text-xs font-medium mb-2">Domingo</p>
            <p class="font-display text-xl text-[#F5F0EB] font-semibold">12:00 – 18:00</p>
          </div>
          <div class="border border-[#F5F0EB]/8 rounded-2xl p-6 text-center">
            <p class="text-[#C9A84C] text-xs font-medium mb-2">Duración visita</p>
            <p class="font-display text-xl text-[#F5F0EB] font-semibold">~30 minutos</p>
          </div>
        </div>
      </div>
    </section>
  `
})
export class AvailabilityComponent {
  private router = inject(Router);
  private availSvc = inject(AvailabilityService);

  dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  monthNames = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];

  today = new Date();
  currentMonth = signal(this.today.getMonth());
  currentYear = signal(this.today.getFullYear());
  selectedDate = signal<Date | null>(null);
  selectedSlot = signal<string | null>(null);

  timeSlots = computed(() => {
    const d = this.selectedDate();
    if (!d) return [];
    return this.availSvc.getSlotsForDate(d);
  });

  calendarDays = computed(() => {
    const year = this.currentYear();
    const month = this.currentMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const days: { day: number | null; date: Date | null }[] = [];

    for (let i = 0; i < firstDay; i++) days.push({ day: null, date: null });
    for (let d = 1; d <= daysInMonth; d++) {
      days.push({ day: d, date: new Date(year, month, d) });
    }
    return days;
  });

  getDayClass(day: { day: number | null; date: Date | null }): string {
    const base = 'flex items-center justify-center h-10 w-full text-sm rounded-full cursor-pointer transition-all duration-200 ';
    if (!day.date || !day.day) return base + 'cursor-default';

    const today = new Date(); today.setHours(0,0,0,0);
    const isPast = day.date < today;
    const isReserved = this.availSvc.isDateReserved(day.date);
    const isSelected = this.selectedDate()?.toDateString() === day.date.toDateString();
    const isToday = day.date.toDateString() === today.toDateString();

    if (isSelected) return base + 'bg-[#C9A84C] text-[#0A0A0A] font-medium';
    if (isPast) return base + 'text-[#F5F0EB]/15 cursor-not-allowed';
    if (isReserved) return base + 'text-[#F5F0EB]/20 bg-[#F5F0EB]/[0.04] line-through cursor-not-allowed';
    if (isToday) return base + 'text-[#C9A84C] border border-[#C9A84C]/40 hover:bg-[#C9A84C]/10';
    return base + 'text-[#F5F0EB]/60 hover:text-[#C9A84C] hover:bg-[#C9A84C]/10';
  }

  isReserved(date: Date): boolean {
    return this.availSvc.isDateReserved(date);
  }

  selectDate(date: Date) {
    const today = new Date(); today.setHours(0,0,0,0);
    if (date < today) return;
    this.selectedDate.set(date);
    this.selectedSlot.set(null);
  }

  selectSlot(slot: string) { this.selectedSlot.set(slot); }

  formatSelectedDate(): string {
    const d = this.selectedDate();
    if (!d) return '';
    const days = ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'];
    return `${days[d.getDay()]}, ${d.getDate()} de ${this.monthNames[d.getMonth()]}`;
  }

  prevMonth() {
    if (this.currentMonth() === 0) {
      this.currentMonth.set(11);
      this.currentYear.update(y => y - 1);
    } else {
      this.currentMonth.update(m => m - 1);
    }
  }

  nextMonth() {
    if (this.currentMonth() === 11) {
      this.currentMonth.set(0);
      this.currentYear.update(y => y + 1);
    } else {
      this.currentMonth.update(m => m + 1);
    }
  }

  proceed() {
    const date = this.selectedDate();
    const slot = this.selectedSlot();
    if (!date || !slot) return;

    const dateStr = date.toISOString().split('T')[0];
    this.router.navigate(['/agendar'], { queryParams: { date: dateStr, time: slot } });
  }
}
