import { Component, AfterViewInit, OnInit, signal, computed } from '@angular/core';
import { NgFor, NgIf, CurrencyPipe } from '@angular/common';
import { SuppliersService } from '../../core/services/suppliers.service';
import { Supplier, SUPPLIER_CATEGORIES, SupplierCategory } from '../../core/models/supplier.model';

@Component({
  selector: 'app-suppliers',
  standalone: true,
  imports: [NgFor, NgIf, CurrencyPipe],
  template: `
    <section class="pt-32 lg:pt-36 pb-12 px-6 lg:px-16 xl:px-20 bg-[#0A0A0A]">
      <div class="max-w-7xl mx-auto">
        <h1 class="font-display font-semibold text-[#F5F0EB] leading-[1.1] tracking-[-0.01em]"
            style="font-size: clamp(2rem, 4.5vw, 3.4rem)">
          Nuestros <span class="text-[#C9A84C]">proveedores.</span>
        </h1>
        <p class="text-[#F5F0EB]/50 mt-4 text-[15px] leading-relaxed max-w-lg">
          Aliados de confianza para banquete, bebidas, música y animación. Coordinamos todo contigo para que solo te preocupes por celebrar.
        </p>
      </div>
    </section>

    <section class="bg-[#0A0A0A] px-6 lg:px-16 xl:px-20 sticky top-16 lg:top-[72px] z-[var(--z-sticky)] border-b border-[#F5F0EB]/8">
      <div class="max-w-7xl mx-auto flex gap-6 lg:gap-8 overflow-x-auto" role="tablist">
        <button (click)="setCategory(null)"
                role="tab" [attr.aria-selected]="activeCategory() === null"
                class="gallery-tab text-sm py-4 whitespace-nowrap"
                [class.tab-active]="activeCategory() === null"
                [style.color]="activeCategory() === null ? '#C9A84C' : 'rgba(245,240,235,0.40)'">
          Todos
        </button>
        <button *ngFor="let cat of categories" (click)="setCategory(cat.key)"
                role="tab" [attr.aria-selected]="activeCategory() === cat.key"
                class="gallery-tab text-sm py-4 whitespace-nowrap"
                [class.tab-active]="activeCategory() === cat.key"
                [style.color]="activeCategory() === cat.key ? '#C9A84C' : 'rgba(245,240,235,0.40)'">
          {{ cat.label }}
        </button>
      </div>
    </section>

    <section class="py-12 px-6 lg:px-16 xl:px-20 bg-[#0A0A0A] min-h-screen">
      <div class="max-w-7xl mx-auto">
        <div *ngIf="loading()" class="text-[#F5F0EB]/35 text-sm py-12">Cargando proveedores...</div>
        <div *ngIf="!loading() && filteredSuppliers().length === 0" class="text-[#F5F0EB]/35 text-sm py-12">
          Próximamente más proveedores en esta categoría.
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div *ngFor="let sup of filteredSuppliers()"
               class="reveal group relative overflow-hidden bg-[#111111] border border-[#F5F0EB]/8 rounded-2xl flex flex-col">
            <div class="relative overflow-hidden h-[200px] img-zoom">
              <img [src]="sup.imageUrl" [alt]="sup.name" class="w-full h-full object-cover">
              <span class="absolute top-3 left-3 bg-[#0A0A0A]/80 text-[#C9A84C] text-xs font-medium px-2.5 py-1 rounded-full">
                {{ categoryLabel(sup.category) }}
              </span>
            </div>
            <div class="p-6 flex flex-col flex-1">
              <h3 class="font-display font-semibold text-[#F5F0EB] text-lg mb-2">
                {{ sup.name }}
              </h3>
              <p class="text-[#F5F0EB]/50 text-[13px] leading-relaxed mb-4 flex-1">
                {{ sup.description }}
              </p>
              <div class="flex items-center justify-between border-t border-[#F5F0EB]/8 pt-4">
                <p class="text-[#C9A84C] text-sm font-medium tabular-nums">
                  {{ sup.priceFrom | currency:'MXN':'symbol':'1.0-0' }}
                  <span *ngIf="sup.priceTo" class="text-[#F5F0EB]/35 font-light"> – {{ sup.priceTo | currency:'MXN':'symbol':'1.0-0' }}</span>
                  <span *ngIf="!sup.priceTo" class="text-[#F5F0EB]/35 font-light"> en adelante</span>
                </p>
                <a [href]="'https://wa.me/52' + sup.phone" target="_blank" rel="noopener noreferrer"
                   class="btn-grand w-9 h-9 rounded-full flex items-center justify-center border border-[#C9A84C]/30 text-[#C9A84C] hover:bg-[#C9A84C] hover:text-[#0A0A0A]"
                   aria-label="Contactar por WhatsApp">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347M12 22a9.87 9.87 0 01-5.031-1.378l-3.741.982.998-3.648a9.86 9.86 0 01-1.51-5.26C2.717 6.937 6.866 2.8 12 2.8s9.283 4.137 9.283 9.236S17.134 21.27 12 21.27"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `
})
export class SuppliersComponent implements OnInit, AfterViewInit {
  categories = SUPPLIER_CATEGORIES;
  suppliers = signal<Supplier[]>([]);
  loading = signal(true);
  activeCategory = signal<SupplierCategory | null>(null);

  filteredSuppliers = computed(() => {
    const cat = this.activeCategory();
    const all = this.suppliers().filter(s => s.active);
    return cat ? all.filter(s => s.category === cat) : all;
  });

  constructor(private suppliersSvc: SuppliersService) {}

  ngOnInit(): void {
    this.suppliersSvc.getAll().subscribe(suppliers => {
      this.suppliers.set(suppliers);
      this.loading.set(false);
    });
  }

  setCategory(cat: SupplierCategory | null) {
    this.activeCategory.set(cat);
  }

  categoryLabel(key: SupplierCategory): string {
    return this.categories.find(c => c.key === key)?.label ?? key;
  }

  ngAfterViewInit(): void {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.08 }
    );
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  }
}
