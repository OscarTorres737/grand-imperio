import { Component, OnInit, AfterViewInit, signal, computed, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgIf, NgFor, CurrencyPipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AppointmentsService } from '../../core/services/appointments.service';
import { AvailabilityService } from '../../core/services/availability.service';
import { PackagesService } from '../../core/services/packages.service';
import { VenuePackage } from '../../core/models/package.model';

@Component({
  selector: 'app-appointments',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgFor, RouterLink, CurrencyPipe],
  template: `
    <section class="pt-32 lg:pt-36 pb-10 px-6 bg-[#0A0A0A] text-center">
      <span class="text-[#C9A84C] text-xs font-medium mb-4 block">Visítanos</span>
      <h1 class="font-display text-4xl md:text-5xl text-[#F5F0EB] font-semibold mb-4">Agendar visita</h1>
      <p class="text-[#F5F0EB]/45 max-w-lg mx-auto">
        Elige fecha y horario, cuéntanos de tu evento y te damos un estimado al instante. Confirmamos por teléfono.
      </p>
    </section>

    <section data-tour="appointments" class="pb-24 px-6 bg-[#0A0A0A] min-h-screen">
      <div class="max-w-5xl mx-auto">

        <div *ngIf="submitted()"
             class="border border-[#C9A84C]/30 bg-[#C9A84C]/5 p-12 text-center rounded-2xl">
          <div class="w-16 h-16 border border-[#C9A84C] rounded-full flex items-center justify-center mx-auto mb-6">
            <span class="text-[#C9A84C] text-2xl">✓</span>
          </div>
          <h3 class="font-display text-3xl text-[#F5F0EB] font-light mb-4">¡Fecha apartada!</h3>
          <p class="text-[#F5F0EB]/50 mb-2">
            Tu solicitud para el {{ form.value.date }} a las {{ form.value.time }} fue enviada.
          </p>
          <p class="text-[#F5F0EB]/50 mb-2" *ngIf="estimatedTotal() > 0">
            Estimado aproximado: <span class="text-[#C9A84C] font-medium">{{ estimatedTotal() | currency:'MXN':'symbol':'1.0-0' }}</span>
          </p>
          <p class="text-[#F5F0EB]/50 mb-8">Nuestro equipo te llamará para confirmar los detalles y el precio final.</p>
          <a routerLink="/" class="inline-block px-8 py-3 border border-[#C9A84C] text-[#C9A84C] text-sm tracking-widest uppercase hover:bg-[#C9A84C] hover:text-[#0A0A0A] transition-all duration-300 rounded-full">
            Volver al Inicio
          </a>
        </div>

        <form *ngIf="!submitted()" [formGroup]="form" (ngSubmit)="submit()" class="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-10">

          <div class="flex flex-col gap-8">
            <div class="border border-[#F5F0EB]/10 rounded-2xl p-6 lg:p-7">
              <p class="text-[#C9A84C] text-[10px] tracking-[0.3em] uppercase mb-5">1. Elige fecha</p>

              <div class="flex items-center justify-between mb-5">
                <button type="button" (click)="prevMonth()"
                        class="text-[#C9A84C] hover:text-[#E2C97A] transition-colors p-2 text-xl">‹</button>
                <h3 class="font-display text-lg text-[#F5F0EB] font-light tracking-wide">
                  {{ monthNames[currentMonth()] }} {{ currentYear() }}
                </h3>
                <button type="button" (click)="nextMonth()"
                        class="text-[#C9A84C] hover:text-[#E2C97A] transition-colors p-2 text-xl">›</button>
              </div>

              <div class="grid grid-cols-7 mb-1">
                <div *ngFor="let d of dayNames" class="text-center text-[#F5F0EB]/30 text-[10px] tracking-widest uppercase py-2">
                  {{ d }}
                </div>
              </div>

              <div class="grid grid-cols-7 gap-1 mb-6">
                <div *ngFor="let day of calendarDays()"
                     [class]="getDayClass(day)"
                     (click)="day.date && selectDate(day.date)">
                  <span *ngIf="day.day">{{ day.day }}</span>
                </div>
              </div>

              <ng-container *ngIf="selectedDate() && !isReserved(selectedDate()!)">
                <p class="text-[#F5F0EB]/50 text-xs uppercase tracking-[0.2em] mb-3">Horarios disponibles</p>
                <div class="grid grid-cols-3 gap-2">
                  <button type="button" *ngFor="let slot of timeSlots()"
                          (click)="selectSlot(slot)"
                          [class]="form.value.time === slot
                            ? 'bg-[#C9A84C] text-[#0A0A0A] border-[#C9A84C]'
                            : 'border-[#C9A84C]/20 text-[#F5F0EB]/60 hover:border-[#C9A84C]/60 hover:text-[#C9A84C]'"
                          class="border rounded-full px-3 py-2 text-xs tracking-wider transition-all duration-200">
                    {{ slot }}
                  </button>
                </div>
              </ng-container>
              <p *ngIf="selectedDate() && isReserved(selectedDate()!)" class="text-[#F5F0EB]/40 text-xs">
                Esta fecha ya fue apartada. Elige otro día en el calendario.
              </p>
              <p *ngIf="!selectedDate()" class="text-[#F5F0EB]/25 text-xs">Selecciona un día para ver horarios.</p>

              <div class="flex items-center gap-4 mt-5 pt-4 border-t border-[#F5F0EB]/8">
                <div class="flex items-center gap-1.5">
                  <span class="w-2 h-2 rounded-full border border-[#C9A84C]/40"></span>
                  <span class="text-[#F5F0EB]/35 text-[11px]">Disponible</span>
                </div>
                <div class="flex items-center gap-1.5">
                  <span class="w-2 h-2 rounded-full bg-[#F5F0EB]/15"></span>
                  <span class="text-[#F5F0EB]/35 text-[11px]">Apartada</span>
                </div>
              </div>
            </div>

            <div class="border border-[#F5F0EB]/10 rounded-2xl p-6 lg:p-7">
              <p class="text-[#C9A84C] text-[10px] tracking-[0.3em] uppercase mb-5">2. Datos de contacto</p>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label class="block text-[#F5F0EB]/45 text-[10px] tracking-widest uppercase mb-2">Nombre completo *</label>
                  <input formControlName="name" type="text" placeholder="Tu nombre"
                         [class]="fieldClass('name')"
                         class="w-full bg-transparent border rounded-lg px-4 py-3 text-[#F5F0EB] placeholder-[#F5F0EB]/20 text-sm focus:outline-none transition-colors duration-300">
                  <p *ngIf="isInvalid('name')" class="text-red-400 text-xs mt-1">Campo requerido</p>
                </div>
                <div>
                  <label class="block text-[#F5F0EB]/45 text-[10px] tracking-widest uppercase mb-2">Teléfono *</label>
                  <input formControlName="phone" type="tel" placeholder="81 0000 0000"
                         [class]="fieldClass('phone')"
                         class="w-full bg-transparent border rounded-lg px-4 py-3 text-[#F5F0EB] placeholder-[#F5F0EB]/20 text-sm focus:outline-none transition-colors duration-300">
                  <p *ngIf="isInvalid('phone')" class="text-red-400 text-xs mt-1">Campo requerido</p>
                </div>
              </div>

              <div class="mt-5">
                <label class="block text-[#F5F0EB]/45 text-[10px] tracking-widest uppercase mb-2">Correo electrónico *</label>
                <input formControlName="email" type="email" placeholder="correo@ejemplo.com"
                       [class]="fieldClass('email')"
                       class="w-full bg-transparent border rounded-lg px-4 py-3 text-[#F5F0EB] placeholder-[#F5F0EB]/20 text-sm focus:outline-none transition-colors duration-300">
                <p *ngIf="isInvalid('email')" class="text-red-400 text-xs mt-1">Correo inválido</p>
              </div>
            </div>
          </div>

          <div class="flex flex-col gap-8">
            <div class="border border-[#F5F0EB]/10 rounded-2xl p-6 lg:p-7">
              <p class="text-[#C9A84C] text-[10px] tracking-[0.3em] uppercase mb-5">3. Detalles del evento</p>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label class="block text-[#F5F0EB]/45 text-[10px] tracking-widest uppercase mb-2">Tipo de evento *</label>
                  <select formControlName="eventType"
                          [class]="fieldClass('eventType')"
                          class="w-full bg-[#1A1A1A] border rounded-lg px-4 py-3 text-[#F5F0EB] text-sm focus:outline-none transition-colors duration-300 cursor-pointer">
                    <option value="" class="bg-[#1A1A1A]">Seleccionar tipo</option>
                    <option *ngFor="let t of eventTypes" [value]="t" class="bg-[#1A1A1A]">{{ t }}</option>
                  </select>
                  <p *ngIf="isInvalid('eventType')" class="text-red-400 text-xs mt-1">Campo requerido</p>
                </div>
                <div>
                  <label class="block text-[#F5F0EB]/45 text-[10px] tracking-widest uppercase mb-2">Paquete de referencia</label>
                  <select formControlName="packageId"
                          class="w-full bg-[#1A1A1A] border border-[#C9A84C]/20 rounded-lg px-4 py-3 text-[#F5F0EB] text-sm focus:outline-none transition-colors duration-300 cursor-pointer">
                    <option value="" class="bg-[#1A1A1A]">Sin paquete / no sé aún</option>
                    <option *ngFor="let pkg of packages()" [value]="pkg.id" class="bg-[#1A1A1A]">{{ pkg.name }}</option>
                  </select>
                </div>
              </div>

              <div class="mt-5">
                <label class="block text-[#F5F0EB]/45 text-[10px] tracking-widest uppercase mb-2">
                  Número de invitados — {{ form.value.guestCount }}
                </label>
                <input formControlName="guestCount" type="range" min="20" max="500" step="10"
                       class="w-full accent-[#C9A84C] h-1">
              </div>

              <div class="mt-5">
                <label class="block text-[#F5F0EB]/45 text-[10px] tracking-widest uppercase mb-2">Notas adicionales</label>
                <textarea formControlName="notes" rows="3"
                          placeholder="Cuéntanos más sobre tu evento..."
                          class="w-full bg-transparent border border-[#F5F0EB]/15 focus:border-[#C9A84C]/60 rounded-lg px-4 py-3 text-[#F5F0EB] placeholder-[#F5F0EB]/20 text-sm focus:outline-none transition-colors duration-300 resize-none"></textarea>
              </div>
            </div>

            <div class="bg-[#111111] border border-[#C9A84C]/25 rounded-2xl p-6 lg:p-7">
              <p class="text-[#F5F0EB]/40 text-[10px] font-semibold tracking-[0.3em] uppercase mb-3">Estimado aproximado</p>
              <p class="font-display font-black text-[#C9A84C] leading-none mb-4" style="font-size: clamp(2rem, 4vw, 2.8rem)">
                {{ estimatedTotal() > 0 ? (estimatedTotal() | currency:'MXN':'symbol':'1.0-0') : '— ' }}
              </p>
              <p *ngIf="!selectedPackage()" class="text-[#F5F0EB]/30 text-[12px] leading-relaxed mb-4">
                Selecciona un paquete de referencia para ver un estimado. Aun sin uno, puedes apartar tu fecha.
              </p>
              <div *ngIf="selectedPackage()" class="space-y-2 text-[12px] text-[#F5F0EB]/45 font-light border-t border-[#F5F0EB]/8 pt-4 mb-2">
                <div class="flex justify-between"><span>Paquete base</span><span>{{ selectedPackage()!.basePrice | currency:'MXN':'symbol':'1.0-0' }}</span></div>
                <div class="flex justify-between"><span>Invitados extra</span><span>{{ extraGuests() }}</span></div>
                <div class="flex justify-between"><span>Costo por extra</span><span>{{ extraCost() | currency:'MXN':'symbol':'1.0-0' }}</span></div>
              </div>
              <p class="text-[#F5F0EB]/25 text-[11px] font-light mt-2 leading-relaxed">
                Este es solo un estimado. Nuestro equipo te llamará al confirmar tu visita para darte tu cotización final.
              </p>
            </div>

            <button type="submit"
                    [disabled]="loading()"
                    class="w-full py-4 bg-[#C9A84C] text-[#0A0A0A] text-sm tracking-widest uppercase font-medium rounded-full hover:bg-[#E2C97A] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
              {{ loading() ? 'Enviando...' : 'Apartar esta fecha' }}
            </button>
            <p *ngIf="error()" class="text-red-400 text-xs text-center">{{ error() }}</p>

            <p class="text-[#F5F0EB]/20 text-xs text-center">
              También puedes llamarnos directamente al
              <a href="tel:8124049899" class="text-[#C9A84C] hover:underline">81 2404 9899</a>
            </p>
          </div>
        </form>
      </div>
    </section>
  `
})
export class AppointmentsComponent implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private appointmentsSvc = inject(AppointmentsService);
  private availSvc = inject(AvailabilityService);
  private packagesSvc = inject(PackagesService);

  submitted = signal(false);
  loading = signal(false);
  error = signal<string | null>(null);

  packages = signal<VenuePackage[]>([]);

  dayNames = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  monthNames = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];

  today = new Date();
  currentMonth = signal(this.today.getMonth());
  currentYear = signal(this.today.getFullYear());
  selectedDate = signal<Date | null>(null);

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

  eventTypes = ['Boda', 'XV Años', 'Cumpleaños', 'Evento Corporativo', 'Graduación', 'Bautizo', 'Primera Comunión', 'Otro'];

  form!: FormGroup;

  selectedPackage = computed(() => {
    const id = this.form?.value.packageId;
    if (!id) return null;
    return this.packages().find(p => p.id === id) ?? null;
  });

  extraGuests = computed(() => {
    const pkg = this.selectedPackage();
    if (!pkg) return 0;
    return Math.max(0, (this.form?.value.guestCount ?? 0) - pkg.basePersonCount);
  });

  extraCost = computed(() => {
    const pkg = this.selectedPackage();
    if (!pkg) return 0;
    return this.extraGuests() * pkg.pricePerExtraPerson;
  });

  estimatedTotal = computed(() => {
    const pkg = this.selectedPackage();
    if (!pkg) return 0;
    return pkg.basePrice + this.extraCost();
  });

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
      eventType: ['', Validators.required],
      packageId: [''],
      guestCount: [100],
      notes: ['']
    });

    this.packagesSvc.getAll().subscribe(pkgs => {
      this.packages.set(pkgs.filter(p => p.active));
    });

    this.route.queryParams.subscribe(params => {
      if (params['date']) {
        const d = new Date(params['date'] + 'T00:00:00');
        this.selectedDate.set(d);
        this.currentMonth.set(d.getMonth());
        this.currentYear.set(d.getFullYear());
        this.form.patchValue({ date: params['date'] });
      }
      if (params['time']) this.form.patchValue({ time: params['time'] });
    });
  }

  getDayClass(day: { day: number | null; date: Date | null }): string {
    const base = 'flex items-center justify-center h-9 w-full text-xs rounded-full cursor-pointer transition-all duration-200 ';
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
    this.form.patchValue({ date: date.toISOString().split('T')[0], time: '' });
  }

  selectSlot(slot: string) {
    this.form.patchValue({ time: slot });
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

  fieldClass(field: string): string {
    return this.isInvalid(field)
      ? 'border-red-500/50'
      : 'border-[#F5F0EB]/15 focus:border-[#C9A84C]/60';
  }

  isInvalid(field: string): boolean {
    const ctrl = this.form.get(field);
    return !!(ctrl?.invalid && ctrl?.touched);
  }

  async submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading.set(true);
    this.error.set(null);

    try {
      const pkg = this.selectedPackage();
      const { packageId, guestCount, ...rest } = this.form.value;
      await this.appointmentsSvc.create({
        ...rest,
        guestCount: guestCount ?? null,
        packageId: pkg?.id ?? null,
        packageName: pkg?.name ?? null,
        estimatedTotal: this.estimatedTotal() > 0 ? this.estimatedTotal() : null,
      });
      if (rest.date) this.availSvc.reserveDate(rest.date);
      this.submitted.set(true);
    } catch (e) {
      this.error.set('Ocurrió un error al enviar. Por favor intenta de nuevo o llámanos directamente.');
    } finally {
      this.loading.set(false);
    }
  }
}
