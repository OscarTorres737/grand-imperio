import { Component, OnInit, signal, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgIf, NgFor } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AppointmentsService } from '../../core/services/appointments.service';

@Component({
  selector: 'app-appointments',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf, NgFor, RouterLink],
  template: `
    <section class="pt-36 pb-16 px-6 bg-[#0A0A0A] text-center">
      <span class="text-[#C9A84C] text-xs tracking-widest uppercase mb-4 block">Visítanos</span>
      <h1 class="font-display text-5xl md:text-6xl text-[#F5F0EB] font-light mb-6">Agendar Visita</h1>
      <p class="text-[#F5F0EB]/40 max-w-lg mx-auto">
        Completa el formulario y nuestro equipo confirmará tu visita a la brevedad.
      </p>
      <div class="w-16 h-px bg-[#C9A84C] mx-auto mt-6"></div>
    </section>

    <section class="py-16 px-6 bg-[#0A0A0A] min-h-screen">
      <div class="max-w-2xl mx-auto">

        <div *ngIf="submitted()"
             class="border border-[#C9A84C]/30 bg-[#C9A84C]/5 p-12 text-center">
          <div class="w-16 h-16 border border-[#C9A84C] rounded-full flex items-center justify-center mx-auto mb-6">
            <span class="text-[#C9A84C] text-2xl">✓</span>
          </div>
          <h3 class="font-display text-3xl text-[#F5F0EB] font-light mb-4">¡Visita Agendada!</h3>
          <p class="text-[#F5F0EB]/50 mb-2">Tu solicitud ha sido enviada exitosamente.</p>
          <p class="text-[#F5F0EB]/50 mb-8">Nos pondremos en contacto contigo a la brevedad para confirmar.</p>
          <a routerLink="/" class="inline-block px-8 py-3 border border-[#C9A84C] text-[#C9A84C] text-sm tracking-widest uppercase hover:bg-[#C9A84C] hover:text-[#0A0A0A] transition-all duration-300">
            Volver al Inicio
          </a>
        </div>

        <form *ngIf="!submitted()" [formGroup]="form" (ngSubmit)="submit()" class="space-y-6">

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-[#C9A84C] text-xs tracking-widest uppercase mb-2">Nombre completo *</label>
              <input formControlName="name" type="text"
                     placeholder="Tu nombre"
                     [class]="fieldClass('name')"
                     class="w-full bg-transparent border px-4 py-3 text-[#F5F0EB] placeholder-[#F5F0EB]/20 text-sm focus:outline-none transition-colors duration-300">
              <p *ngIf="isInvalid('name')" class="text-red-400 text-xs mt-1">Campo requerido</p>
            </div>

            <div>
              <label class="block text-[#C9A84C] text-xs tracking-widest uppercase mb-2">Teléfono *</label>
              <input formControlName="phone" type="tel"
                     placeholder="81 0000 0000"
                     [class]="fieldClass('phone')"
                     class="w-full bg-transparent border px-4 py-3 text-[#F5F0EB] placeholder-[#F5F0EB]/20 text-sm focus:outline-none transition-colors duration-300">
              <p *ngIf="isInvalid('phone')" class="text-red-400 text-xs mt-1">Campo requerido</p>
            </div>
          </div>

          <div>
            <label class="block text-[#C9A84C] text-xs tracking-widest uppercase mb-2">Correo electrónico *</label>
            <input formControlName="email" type="email"
                   placeholder="correo@ejemplo.com"
                   [class]="fieldClass('email')"
                   class="w-full bg-transparent border px-4 py-3 text-[#F5F0EB] placeholder-[#F5F0EB]/20 text-sm focus:outline-none transition-colors duration-300">
            <p *ngIf="isInvalid('email')" class="text-red-400 text-xs mt-1">Correo inválido</p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-[#C9A84C] text-xs tracking-widest uppercase mb-2">Fecha de visita *</label>
              <input formControlName="date" type="date"
                     [min]="minDate"
                     [class]="fieldClass('date')"
                     class="w-full bg-[#1A1A1A] border px-4 py-3 text-[#F5F0EB] text-sm focus:outline-none transition-colors duration-300 cursor-pointer">
              <p *ngIf="isInvalid('date')" class="text-red-400 text-xs mt-1">Campo requerido</p>
            </div>

            <div>
              <label class="block text-[#C9A84C] text-xs tracking-widest uppercase mb-2">Hora *</label>
              <select formControlName="time"
                      [class]="fieldClass('time')"
                      class="w-full bg-[#1A1A1A] border px-4 py-3 text-[#F5F0EB] text-sm focus:outline-none transition-colors duration-300 cursor-pointer">
                <option value="" class="bg-[#1A1A1A]">Seleccionar hora</option>
                <option *ngFor="let t of timeOptions" [value]="t" class="bg-[#1A1A1A]">{{ t }}</option>
              </select>
              <p *ngIf="isInvalid('time')" class="text-red-400 text-xs mt-1">Campo requerido</p>
            </div>
          </div>

          <div>
            <label class="block text-[#C9A84C] text-xs tracking-widest uppercase mb-2">Tipo de evento que planea *</label>
            <select formControlName="eventType"
                    [class]="fieldClass('eventType')"
                    class="w-full bg-[#1A1A1A] border px-4 py-3 text-[#F5F0EB] text-sm focus:outline-none transition-colors duration-300 cursor-pointer">
              <option value="" class="bg-[#1A1A1A]">Seleccionar tipo</option>
              <option *ngFor="let t of eventTypes" [value]="t" class="bg-[#1A1A1A]">{{ t }}</option>
            </select>
            <p *ngIf="isInvalid('eventType')" class="text-red-400 text-xs mt-1">Campo requerido</p>
          </div>

          <div>
            <label class="block text-[#C9A84C] text-xs tracking-widest uppercase mb-2">Notas adicionales</label>
            <textarea formControlName="notes" rows="4"
                      placeholder="Cuéntanos más sobre tu evento, número de invitados estimado, fecha tentativa..."
                      class="w-full bg-transparent border border-[#C9A84C]/20 focus:border-[#C9A84C]/60 px-4 py-3 text-[#F5F0EB] placeholder-[#F5F0EB]/20 text-sm focus:outline-none transition-colors duration-300 resize-none"></textarea>
          </div>

          <div class="pt-4">
            <button type="submit"
                    [disabled]="loading()"
                    class="w-full py-4 bg-[#C9A84C] text-[#0A0A0A] text-sm tracking-widest uppercase font-medium hover:bg-[#E2C97A] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
              {{ loading() ? 'Enviando...' : 'Confirmar Visita' }}
            </button>
            <p *ngIf="error()" class="text-red-400 text-xs text-center mt-3">{{ error() }}</p>
          </div>

          <p class="text-[#F5F0EB]/20 text-xs text-center">
            También puedes llamarnos directamente al
            <a href="tel:8124049899" class="text-[#C9A84C] hover:underline">81 2404 9899</a>
          </p>
        </form>
      </div>
    </section>
  `
})
export class AppointmentsComponent implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private appointmentsSvc = inject(AppointmentsService);

  submitted = signal(false);
  loading = signal(false);
  error = signal<string | null>(null);

  minDate = new Date().toISOString().split('T')[0];

  timeOptions: string[] = [];
  eventTypes = ['Boda', 'XV Años', 'Cumpleaños', 'Evento Corporativo', 'Graduación', 'Bautizo', 'Primera Comunión', 'Otro'];

  form!: FormGroup;

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required],
      eventType: ['', Validators.required],
      notes: ['']
    });

    this.route.queryParams.subscribe(params => {
      if (params['date']) this.form.patchValue({ date: params['date'] });
      if (params['time']) this.form.patchValue({ time: params['time'] });
    });

    for (let h = 9; h < 20; h++) {
      for (const m of [0, 30]) {
        if (h === 19 && m === 30) break;
        this.timeOptions.push(`${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}`);
      }
    }
  }

  fieldClass(field: string): string {
    return this.isInvalid(field)
      ? 'border-red-500/50'
      : 'border-[#C9A84C]/20 focus:border-[#C9A84C]/60';
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
      await this.appointmentsSvc.create(this.form.value);
      this.submitted.set(true);
    } catch (e) {
      this.error.set('Ocurrió un error al enviar. Por favor intenta de nuevo o llámanos directamente.');
    } finally {
      this.loading.set(false);
    }
  }
}
