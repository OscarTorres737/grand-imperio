import { Component, OnInit, signal } from '@angular/core';
import { NgFor, NgIf, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SuppliersService } from '../../../core/services/suppliers.service';
import { Supplier, SUPPLIER_CATEGORIES } from '../../../core/models/supplier.model';

const EMPTY: Omit<Supplier, 'id'> = {
  name: '', category: 'banquetes', description: '', priceFrom: 0, priceTo: null,
  imageUrl: '', phone: '', order: 0, active: true
};

@Component({
  selector: 'app-suppliers-admin',
  standalone: true,
  imports: [NgFor, NgIf, CurrencyPipe, FormsModule],
  template: `
    <div class="flex items-center justify-between mb-8">
      <h2 class="font-display font-black text-[#F5F0EB] uppercase text-xl">Proveedores</h2>
      <button (click)="startCreate()" class="btn-grand px-5 py-2.5 bg-[#C9A84C] text-[#0A0A0A] text-[10px] font-bold tracking-[0.2em] uppercase">
        + Nuevo proveedor
      </button>
    </div>

    <div *ngIf="editing()" class="bg-[#111111] border border-[#C9A84C]/20 p-6 mb-8 grid grid-cols-1 md:grid-cols-2 gap-5">
      <div class="field-wrap"><label class="field-label">Nombre</label><input class="field-input" [(ngModel)]="draft.name"></div>
      <div class="field-wrap">
        <label class="field-label">Categoría</label>
        <select class="field-input" [(ngModel)]="draft.category">
          <option *ngFor="let c of categories" [value]="c.key">{{ c.label }}</option>
        </select>
      </div>
      <div class="field-wrap md:col-span-2"><label class="field-label">Descripción</label><input class="field-input" [(ngModel)]="draft.description"></div>
      <div class="field-wrap"><label class="field-label">Imagen (URL)</label><input class="field-input" [(ngModel)]="draft.imageUrl"></div>
      <div class="field-wrap"><label class="field-label">Teléfono (10 dígitos)</label><input class="field-input" [(ngModel)]="draft.phone"></div>
      <div class="field-wrap"><label class="field-label">Precio desde (MXN)</label><input type="number" class="field-input" [(ngModel)]="draft.priceFrom"></div>
      <div class="field-wrap"><label class="field-label">Precio hasta (opcional)</label><input type="number" class="field-input" [ngModel]="draft.priceTo" (ngModelChange)="draft.priceTo = $event || null"></div>
      <div class="field-wrap"><label class="field-label">Orden</label><input type="number" class="field-input" [(ngModel)]="draft.order"></div>
      <div class="flex items-center gap-6 pt-6">
        <label class="flex items-center gap-2 text-[#F5F0EB]/60 text-sm"><input type="checkbox" [(ngModel)]="draft.active"> Activo</label>
      </div>
      <div class="md:col-span-2 flex gap-3 mt-2">
        <button (click)="save()" class="btn-grand px-6 py-3 bg-[#C9A84C] text-[#0A0A0A] text-[10px] font-bold tracking-[0.2em] uppercase">Guardar</button>
        <button (click)="cancel()" class="btn-grand px-6 py-3 border border-[#F5F0EB]/20 text-[#F5F0EB]/60 text-[10px] font-bold tracking-[0.2em] uppercase">Cancelar</button>
      </div>
    </div>

    <div class="divide-y divide-[#F5F0EB]/8">
      <div *ngFor="let sup of suppliers()" class="flex items-center justify-between py-4 gap-4">
        <div class="flex items-center gap-4 min-w-0">
          <img [src]="sup.imageUrl" class="w-14 h-14 object-cover flex-shrink-0" [alt]="sup.name">
          <div class="min-w-0">
            <p class="text-[#F5F0EB] text-sm font-semibold truncate">{{ sup.name }} <span *ngIf="!sup.active" class="text-red-400/70 text-[10px] ml-2 uppercase">Inactivo</span></p>
            <p class="text-[#F5F0EB]/40 text-[12px] tabular-nums">{{ categoryLabel(sup.category) }} · {{ sup.priceFrom | currency:'MXN':'symbol':'1.0-0' }}{{ sup.priceTo ? ' - ' + (sup.priceTo | currency:'MXN':'symbol':'1.0-0') : '+' }}</p>
          </div>
        </div>
        <div class="flex gap-2 flex-shrink-0">
          <button (click)="startEdit(sup)" class="btn-grand w-9 h-9 flex items-center justify-center border border-[#F5F0EB]/15 text-[#F5F0EB]/55 hover:border-[#C9A84C] hover:text-[#C9A84C]" aria-label="Editar">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 20h9M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4L16.5 3.5z" stroke="currentColor" stroke-width="1.6"/></svg>
          </button>
          <button (click)="remove(sup.id!)" class="btn-grand w-9 h-9 flex items-center justify-center border border-[#F5F0EB]/15 text-[#F5F0EB]/55 hover:border-red-400/60 hover:text-red-400" aria-label="Eliminar">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M3 6h18M8 6V4h8v2m-9 0l1 14h8l1-14" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>
          </button>
        </div>
      </div>
      <p *ngIf="!suppliers().length" class="text-[#F5F0EB]/35 text-sm py-8">Sin proveedores todavía.</p>
    </div>
  `
})
export class SuppliersAdminComponent implements OnInit {
  categories = SUPPLIER_CATEGORIES;
  suppliers = signal<Supplier[]>([]);
  editing = signal(false);
  editingId = signal<string | null>(null);
  draft: Omit<Supplier, 'id'> = { ...EMPTY };

  constructor(private svc: SuppliersService) {}

  ngOnInit(): void {
    this.svc.getAll().subscribe(s => this.suppliers.set(s));
  }

  startCreate() {
    this.draft = { ...EMPTY };
    this.editingId.set(null);
    this.editing.set(true);
  }

  startEdit(sup: Supplier) {
    this.draft = { ...sup };
    this.editingId.set(sup.id!);
    this.editing.set(true);
  }

  async save() {
    if (this.editingId()) {
      await this.svc.update(this.editingId()!, this.draft);
    } else {
      await this.svc.create(this.draft);
    }
    this.cancel();
  }

  cancel() {
    this.editing.set(false);
    this.editingId.set(null);
  }

  async remove(id: string) {
    if (confirm('¿Eliminar este proveedor?')) await this.svc.remove(id);
  }

  categoryLabel(key: string): string {
    return this.categories.find(c => c.key === key)?.label ?? key;
  }
}
