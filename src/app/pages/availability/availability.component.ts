import { Component, signal, computed, inject } from '@angular/core';
import { NgFor, NgIf, NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { AvailabilityService } from '../../core/services/availability.service';

@Component({
  selector: 'app-availability',
  standalone: true,
  imports: [NgFor, NgIf],
  template: `
    <!-- Header -->
    <section class="pt-36 pb-16 px-6 bg-[#0A0A0A] text-center">
      <span class="text-[#C9A84C] text-xs tracking-widest uppercase mb-4 block">Planifica tu visita</span>
      <h1 class="font-display text-5xl md:text-6xl text-[#F5F0EB] font-light mb-6">Disponibilidad</h1>
      <p class="text-[#F5F0EB]/40 max-w-lg mx-auto">Selecciona una fecha y horario para visitar nuestras instalaciones.</p>
      <div class="w-16 h-px bg-[#C9A84C] mx-auto mt-6"></div>
    </section>

    <section class="py-16 px-6 bg-[#0A0A0A]">
      <div class="max-w-4xl mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">

          <!-- Calendar -->
          <div class="border border-[#C9A84C]/20 p-8">
            <!-- Month navigation -->
            <div class="flex items-center justify-between mb-8">
              <button (click)="prevMonth()"
                      class="text-[#C9A84C] hover:text-[#E2C97A] transition-colors p-2 text-xl">‹</button>
              <h3 class="font-display text-xl text-[#F5F0EB] font-light tracking-wide">
                {{ monthNames[currentMonth()] }} {{ currentYear() }}
              </h3>
              <button (click)="nextMonth()"
                      class="text-[#C9A84C] hover:text-[#E2C97A] transition-colors p-2 text-xl">›</button>
            </div>

            <!-- Day headers -->
            <div class="grid grid-cols-7 mb-2">
              <div *ngFor="let d of dayNames" class="text-center text-[#F5F0EB]/30 text-xs tracking-widest uppercase py-2">
                {{ d }}
              </div>
            </div>

            <!-- Days grid -->
            <div class="grid grid-cols-7 gap-1">
              <div *ngFor="let day of calendarDays()"
                   [class]="getDayClass(day)"
                   (click)="day.date && selectDate(day.date)">
                <span *ngIf="day.day">{{ day.day }}</span>
              </div>
            </div>
          </div>

          <!-- Time Slots -->
          <div>
            <div *ngIf="!selectedDate()" class="h-full flex flex-col items-center justify-center text-center py-12">
              <div class="w-16 h-16 border border-[#C9A84C]/20 rounded-full flex items-center justify-center mb-4">
                <span class="text-[#C9A84C] text-2xl">📅</span>
              </div>
              <p class="text-[#F5F0EB]/30 text-sm">Selecciona una fecha para ver los horarios disponibles</p>
            </div>

            <div *ngIf="selectedDate()">
              <h3 class="font-display text-2xl text-[#F5F0EB] font-light mb-2">
                {{ formatSelectedDate() }}
              </h3>
              <p class="text-[#C9A84C] text-xs tracking-widest uppercase mb-8">Horarios disponibles</p>

              <div class="grid grid-cols-3 gap-2">
                <button *ngFor="let slot of timeSlots()"
                        (click)="selectSlot(slot)"
                        [class]="selectedSlot() === slot
                          ? 'bg-[#C9A84C] text-[#0A0A0A] border-[#C9A84C]'
                          : 'border-[#C9A84C]/20 text-[#F5F0EB]/60 hover:border-[#C9A84C]/60 hover:text-[#C9A84C]'"
                        class="border px-3 py-2.5 text-xs tracking-wider transition-all duration-200">
                  {{ slot }}
                </button>
              </div>

              <button *ngIf="selectedSlot()"
                      (click)="proceed()"
                      class="mt-8 w-full py-4 bg-[#C9A84C] text-[#0A0A0A] text-sm tracking-widest uppercase font-medium hover:bg-[#E2C97A] transition-all duration-300">
                Agendar esta Visita →
              </button>
            </div>
          </div>
        </div>

        <!-- Info Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-16">
          <div class="border border-[#C9A84C]/10 p-6 text-center">
            <p class="text-[#C9A84C] text-xs tracking-widest uppercase mb-2">Lunes – Sábado</p>
            <p class="font-display text-2xl text-[#F5F0EB] font-light">9:00 – 19:30</p>
          </div>
          <div class="border border-[#C9A84C]/10 p-6 text-center">
            <p class="text-[#C9A84C] text-xs tracking-widest uppercase mb-2">Domingo</p>
            <p class="font-display text-2xl text-[#F5F0EB] font-light">12:00 – 18:00</p>
          </div>
          <div class="border border-[#C9A84C]/10 p-6 text-center">
            <p class="text-[#C9A84C] text-xs tracking-widest uppercase mb-2">Duración visita</p>
            <p class="font-display text-2xl text-[#F5F0EB] font-light">~30 minutos</p>
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
    const base = 'flex items-center justify-center h-10 w-full text-sm cursor-pointer transition-all duration-200 ';
    if (!day.date || !day.day) return base + 'cursor-default';

    const today = new Date(); today.setHours(0,0,0,0);
    const isPast = day.date < today;
    const isSelected = this.selectedDate()?.toDateString() === day.date.toDateString();
    const isToday = day.date.toDateString() === today.toDateString();

    if (isSelected) return base + 'bg-[#C9A84C] text-[#0A0A0A] font-medium';
    if (isPast) return base + 'text-[#F5F0EB]/15 cursor-not-allowed';
    if (isToday) return base + 'text-[#C9A84C] border border-[#C9A84C]/40 hover:bg-[#C9A84C]/10';
    return base + 'text-[#F5F0EB]/60 hover:text-[#C9A84C] hover:bg-[#C9A84C]/10';
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
