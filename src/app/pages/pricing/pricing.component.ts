import { Component, AfterViewInit, OnInit, signal, computed, ElementRef, ViewChild } from '@angular/core';
import { NgFor, NgIf, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PackagesService } from '../../core/services/packages.service';
import { QuoteRequestsService } from '../../core/services/quote-requests.service';
import { VenuePackage } from '../../core/models/package.model';

@Component({
  selector: 'app-pricing',
  standalone: true,
  imports: [NgFor, NgIf, CurrencyPipe, FormsModule],
  template: `
    <section class="pt-32 lg:pt-36 pb-12 px-6 lg:px-16 xl:px-20 bg-[#0A0A0A]">
      <div class="max-w-7xl mx-auto">
        <h1 class="font-display font-semibold text-[#F5F0EB] leading-[1.1] tracking-[-0.01em]"
            style="font-size: clamp(2rem, 4.5vw, 3.4rem)">
          Paquetes y <span class="text-[#C9A84C]">cotización.</span>
        </h1>
        <p class="text-[#F5F0EB]/50 mt-4 text-[15px] leading-relaxed max-w-lg">
          Elige una base, ajusta el número de invitados y obtén tu estimado al instante. Te contactamos para confirmar los detalles finales.
        </p>
      </div>
    </section>

    <section data-tour="pricing" class="px-6 lg:px-16 xl:px-20 pb-20 bg-[#0A0A0A]">
      <div class="max-w-7xl mx-auto">
        <div *ngIf="loading()" class="text-[#F5F0EB]/35 text-sm py-12">Cargando paquetes...</div>
        <div *ngIf="!loading() && packages().length === 0" class="text-[#F5F0EB]/35 text-sm py-12">
          Aún no hay paquetes publicados. Contáctanos directamente para cotizar tu evento.
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-4" *ngIf="packages().length">
          <div *ngFor="let pkg of packages(); let i = index"
               class="reveal relative overflow-hidden bg-[#111111] border border-[#F5F0EB]/8 rounded-2xl flex flex-col"
               [class.lg:col-span-2]="i === 0">

            <div class="relative overflow-hidden img-zoom" [class.h-[260px]]="i !== 0" [class.h-[320px]]="i === 0">
              <img [src]="pkg.imageUrl" [alt]="pkg.name" class="w-full h-full object-cover">
              <div *ngIf="pkg.featured"
                   class="absolute top-4 left-4 bg-[#C9A84C] text-[#0A0A0A] text-xs font-medium px-3 py-1.5 rounded-full">
                Más solicitado
              </div>
            </div>

            <div class="flex-1 flex flex-col p-7 lg:p-8">
              <h3 class="font-display font-semibold text-[#F5F0EB] text-xl lg:text-2xl mb-2">
                {{ pkg.name }}
              </h3>
              <p class="text-[#F5F0EB]/40 text-sm mb-5">
                Base {{ pkg.basePersonCount }} personas
              </p>

              <p class="font-display font-semibold text-[#C9A84C] leading-none mb-1" style="font-size: clamp(1.6rem, 2.6vw, 2.2rem)">
                {{ pkg.basePrice | currency:'MXN':'symbol':'1.0-0' }}
              </p>
              <p class="text-[#F5F0EB]/35 text-xs mb-6">
                + {{ pkg.pricePerExtraPerson | currency:'MXN':'symbol':'1.0-0' }} por persona extra
              </p>

              <ul class="space-y-2.5 mb-8 flex-1">
                <li *ngFor="let item of pkg.includes" class="flex items-start gap-2.5 text-[#F5F0EB]/55 text-[13px] leading-snug">
                  <svg width="13" height="13" viewBox="0 0 14 14" fill="none" class="flex-shrink-0 mt-0.5 text-[#C9A84C]">
                    <path d="M2.5 7.5L5.5 10.5L11.5 3.5" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  <span>{{ item }}</span>
                </li>
              </ul>

              <button (click)="selectPackage(pkg)"
                      class="btn-grand w-full px-6 py-3 rounded-full text-sm font-medium text-center"
                      [class]="selectedPackage()?.id === pkg.id
                        ? 'bg-[#C9A84C] text-[#0A0A0A]'
                        : 'border border-[#F5F0EB]/15 text-[#F5F0EB]/65 hover:border-[#C9A84C]/50 hover:text-[#C9A84C]'">
                {{ selectedPackage()?.id === pkg.id ? 'Paquete seleccionado' : 'Cotizar este paquete' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section #calculator class="py-20 lg:py-28 px-6 lg:px-16 xl:px-20 bg-[#111111] border-t border-[#C9A84C]/15">
      <div class="max-w-4xl mx-auto">
        <p class="text-[#C9A84C] text-xs font-medium mb-4">Calculadora</p>
        <h2 class="font-display font-semibold text-[#F5F0EB] leading-[1.1] tracking-[-0.01em] mb-10"
            style="font-size: clamp(1.6rem, 3vw, 2.4rem)">
          Tu estimado, al instante.
        </h2>

        <div *ngIf="!submitted()" class="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-12">

          <div class="flex flex-col gap-6">
            <div class="field-wrap">
              <label class="field-label" for="pkgSel">Paquete base</label>
              <select id="pkgSel" class="field-input" [ngModel]="selectedPackage()?.id" (ngModelChange)="selectPackageById($event)">
                <option [ngValue]="null" disabled>Selecciona un paquete</option>
                <option *ngFor="let pkg of packages()" [ngValue]="pkg.id">{{ pkg.name }}</option>
              </select>
            </div>

            <div class="field-wrap">
              <label class="field-label" for="guests">Número de invitados — {{ guestCount() }}</label>
              <input id="guests" type="range" min="50" max="500" step="10"
                     class="w-full accent-[#C9A84C] h-1 mt-3"
                     [ngModel]="guestCount()" (ngModelChange)="guestCount.set($event)">
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div class="field-wrap">
                <label class="field-label" for="eventType">Tipo de evento</label>
                <select id="eventType" class="field-input" [(ngModel)]="form.eventType">
                  <option value="Boda">Boda</option>
                  <option value="XV Años">XV Años</option>
                  <option value="Evento Corporativo">Evento Corporativo</option>
                  <option value="Graduación">Graduación</option>
                  <option value="Cumpleaños">Cumpleaños</option>
                  <option value="Otro">Otro</option>
                </select>
              </div>
              <div class="field-wrap">
                <label class="field-label" for="name">Nombre completo</label>
                <input id="name" type="text" class="field-input" [(ngModel)]="form.name" required>
              </div>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div class="field-wrap">
                <label class="field-label" for="phone">Teléfono</label>
                <input id="phone" type="tel" class="field-input" [(ngModel)]="form.phone" required>
              </div>
              <div class="field-wrap">
                <label class="field-label" for="email">Email</label>
                <input id="email" type="email" class="field-input" [(ngModel)]="form.email">
              </div>
            </div>

            <div class="field-wrap">
              <label class="field-label" for="notes">Notas (opcional)</label>
              <input id="notes" type="text" class="field-input" [(ngModel)]="form.notes" placeholder="Detalles adicionales de tu evento">
            </div>
          </div>

          <div class="bg-[#0A0A0A] border border-[#F5F0EB]/10 rounded-2xl p-8 flex flex-col h-fit">
            <p class="text-[#F5F0EB]/35 text-xs font-medium mb-3">Total estimado</p>
            <p class="font-display font-semibold text-[#C9A84C] leading-none mb-6" style="font-size: clamp(1.9rem, 3.4vw, 2.6rem)">
              {{ estimatedTotal() | currency:'MXN':'symbol':'1.0-0' }}
            </p>
            <div class="space-y-2 text-[13px] text-[#F5F0EB]/45 border-t border-[#F5F0EB]/8 pt-5 mb-7">
              <div class="flex justify-between"><span>Paquete base</span><span>{{ selectedPackage()?.basePrice ? (selectedPackage()!.basePrice | currency:'MXN':'symbol':'1.0-0') : '—' }}</span></div>
              <div class="flex justify-between"><span>Invitados extra</span><span>{{ extraGuests() }}</span></div>
              <div class="flex justify-between"><span>Costo por extra</span><span>{{ extraCost() | currency:'MXN':'symbol':'1.0-0' }}</span></div>
            </div>
            <button (click)="submitQuote()"
                    [disabled]="!canSubmit() || saving()"
                    class="btn-grand w-full px-6 py-3.5 rounded-full bg-[#C9A84C] text-[#0A0A0A] text-sm font-medium disabled:opacity-35 disabled:cursor-not-allowed">
              {{ saving() ? 'Enviando...' : 'Solicitar cotización' }}
            </button>
            <p class="text-[#F5F0EB]/25 text-xs mt-4 leading-relaxed">
              Este es un estimado. Confirmaremos el precio final contigo por teléfono o WhatsApp.
            </p>
          </div>
        </div>

        <div *ngIf="submitted()" class="text-center py-16 reveal visible">
          <div class="w-14 h-14 border border-[#C9A84C] rounded-full flex items-center justify-center mx-auto mb-6">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" class="text-[#C9A84C]">
              <path d="M4 12.5L9 17.5L20 6.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <h3 class="font-display font-semibold text-[#F5F0EB] text-2xl mb-3">Cotización recibida</h3>
          <p class="text-[#F5F0EB]/45 text-sm max-w-md mx-auto leading-relaxed">
            Gracias, {{ form.name }}. Nuestro equipo te contactará pronto para confirmar los detalles de tu evento.
          </p>
          <a [href]="whatsappLink()" target="_blank" rel="noopener noreferrer"
             class="btn-grand inline-flex items-center gap-3 mt-8 px-8 py-3.5 rounded-full bg-[#25D366] text-[#0A0A0A] text-sm font-medium">
            Confirmar por WhatsApp
          </a>
        </div>
      </div>
    </section>
  `
})
export class PricingComponent implements OnInit, AfterViewInit {
  @ViewChild('calculator') calculatorRef!: ElementRef<HTMLElement>;

  packages = signal<VenuePackage[]>([]);
  loading = signal(true);
  selectedPackage = signal<VenuePackage | null>(null);
  guestCount = signal(100);
  saving = signal(false);
  submitted = signal(false);

  form = { name: '', phone: '', email: '', notes: '', eventType: 'Boda' };

  extraGuests = computed(() => {
    const pkg = this.selectedPackage();
    if (!pkg) return 0;
    return Math.max(0, this.guestCount() - pkg.basePersonCount);
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

  canSubmit = computed(() =>
    !!this.selectedPackage() && this.form.name.trim().length > 1 && this.form.phone.trim().length >= 10
  );

  constructor(private packagesSvc: PackagesService, private quoteSvc: QuoteRequestsService) {}

  ngOnInit(): void {
    this.packagesSvc.getAll().subscribe(pkgs => {
      this.packages.set(pkgs.filter(p => p.active));
      this.loading.set(false);
      if (pkgs.length && !this.selectedPackage()) {
        const featured = pkgs.find(p => p.featured) ?? pkgs[0];
        this.selectedPackage.set(featured);
        this.guestCount.set(featured.basePersonCount);
      }
    });
  }

  selectPackage(pkg: VenuePackage) {
    this.selectedPackage.set(pkg);
    this.guestCount.set(pkg.basePersonCount);
    this.calculatorRef?.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  selectPackageById(id: string) {
    const pkg = this.packages().find(p => p.id === id);
    if (pkg) this.selectPackage(pkg);
  }

  async submitQuote() {
    if (!this.canSubmit() || this.saving()) return;
    this.saving.set(true);
    const pkg = this.selectedPackage()!;
    await this.quoteSvc.create({
      name: this.form.name,
      phone: this.form.phone,
      email: this.form.email,
      guestCount: this.guestCount(),
      eventType: this.form.eventType,
      packageId: pkg.id ?? null,
      packageName: pkg.name,
      estimatedTotal: this.estimatedTotal(),
      notes: this.form.notes,
    });
    this.saving.set(false);
    this.submitted.set(true);
  }

  whatsappLink(): string {
    const msg = `Hola, soy ${this.form.name}. Acabo de solicitar una cotización para ${this.guestCount()} invitados (${this.selectedPackage()?.name}), estimado ${this.estimatedTotal()}. Me gustaría confirmar los detalles.`;
    return `https://wa.me/528124049899?text=${encodeURIComponent(msg)}`;
  }

  ngAfterViewInit(): void {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.08 }
    );
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  }
}
