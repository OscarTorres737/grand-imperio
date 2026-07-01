import { Component, OnInit, signal } from '@angular/core';
import { NgFor, NgIf, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PackagesService } from '../../../core/services/packages.service';
import { VenuePackage } from '../../../core/models/package.model';

const EMPTY: Omit<VenuePackage, 'id'> = {
  name: '', basePersonCount: 100, basePrice: 13000, pricePerExtraPerson: 130,
  maxPersonCount: 500, includes: [], imageUrl: '', featured: false, order: 0, active: true
};

@Component({
  selector: 'app-packages-admin',
  standalone: true,
  imports: [NgFor, NgIf, CurrencyPipe, FormsModule],
  template: `
    <div class="flex items-center justify-between mb-8">
      <h2 class="font-display font-black text-[#F5F0EB] uppercase text-xl">Paquetes</h2>
      <button (click)="startCreate()" class="btn-grand px-5 py-2.5 bg-[#C9A84C] text-[#0A0A0A] text-[10px] font-bold tracking-[0.2em] uppercase">
        + Nuevo paquete
      </button>
    </div>

    <div *ngIf="editing()" class="bg-[#111111] border border-[#C9A84C]/20 p-6 mb-8 grid grid-cols-1 md:grid-cols-2 gap-5">
      <div class="field-wrap"><label class="field-label">Nombre</label><input class="field-input" [(ngModel)]="draft.name"></div>
      <div class="field-wrap"><label class="field-label">Imagen (URL)</label><input class="field-input" [(ngModel)]="draft.imageUrl"></div>
      <div class="field-wrap"><label class="field-label">Personas base</label><input type="number" class="field-input" [(ngModel)]="draft.basePersonCount"></div>
      <div class="field-wrap"><label class="field-label">Máximo de personas</label><input type="number" class="field-input" [(ngModel)]="draft.maxPersonCount"></div>
      <div class="field-wrap"><label class="field-label">Precio base (MXN)</label><input type="number" class="field-input" [(ngModel)]="draft.basePrice"></div>
      <div class="field-wrap"><label class="field-label">Precio por persona extra</label><input type="number" class="field-input" [(ngModel)]="draft.pricePerExtraPerson"></div>
      <div class="field-wrap md:col-span-2"><label class="field-label">Incluye (separado por comas)</label>
        <input class="field-input" [ngModel]="draft.includes.join(', ')" (ngModelChange)="setIncludes($event)">
      </div>
      <div class="field-wrap"><label class="field-label">Orden</label><input type="number" class="field-input" [(ngModel)]="draft.order"></div>
      <div class="flex items-center gap-6 pt-6">
        <label class="flex items-center gap-2 text-[#F5F0EB]/60 text-sm"><input type="checkbox" [(ngModel)]="draft.featured"> Destacado</label>
        <label class="flex items-center gap-2 text-[#F5F0EB]/60 text-sm"><input type="checkbox" [(ngModel)]="draft.active"> Activo</label>
      </div>
      <div class="md:col-span-2 flex gap-3 mt-2">
        <button (click)="save()" class="btn-grand px-6 py-3 bg-[#C9A84C] text-[#0A0A0A] text-[10px] font-bold tracking-[0.2em] uppercase">Guardar</button>
        <button (click)="cancel()" class="btn-grand px-6 py-3 border border-[#F5F0EB]/20 text-[#F5F0EB]/60 text-[10px] font-bold tracking-[0.2em] uppercase">Cancelar</button>
      </div>
    </div>

    <div class="divide-y divide-[#F5F0EB]/8">
      <div *ngFor="let pkg of packages()" class="flex items-center justify-between py-4 gap-4">
        <div class="flex items-center gap-4 min-w-0">
          <img [src]="pkg.imageUrl" class="w-14 h-14 object-cover flex-shrink-0" [alt]="pkg.name">
          <div class="min-w-0">
            <p class="text-[#F5F0EB] text-sm font-semibold truncate">{{ pkg.name }} <span *ngIf="!pkg.active" class="text-red-400/70 text-[10px] ml-2 uppercase">Inactivo</span></p>
            <p class="text-[#F5F0EB]/40 text-[12px] tabular-nums">{{ pkg.basePersonCount }} pers · {{ pkg.basePrice | currency:'MXN':'symbol':'1.0-0' }}</p>
          </div>
        </div>
        <div class="flex gap-2 flex-shrink-0">
          <button (click)="startEdit(pkg)" class="btn-grand w-9 h-9 flex items-center justify-center border border-[#F5F0EB]/15 text-[#F5F0EB]/55 hover:border-[#C9A84C] hover:text-[#C9A84C]" aria-label="Editar">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 20h9M16.5 3.5a2.1 2.1 0 013 3L7 19l-4 1 1-4L16.5 3.5z" stroke="currentColor" stroke-width="1.6"/></svg>
          </button>
          <button (click)="remove(pkg.id!)" class="btn-grand w-9 h-9 flex items-center justify-center border border-[#F5F0EB]/15 text-[#F5F0EB]/55 hover:border-red-400/60 hover:text-red-400" aria-label="Eliminar">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M3 6h18M8 6V4h8v2m-9 0l1 14h8l1-14" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>
          </button>
        </div>
      </div>
      <p *ngIf="!packages().length" class="text-[#F5F0EB]/35 text-sm py-8">Sin paquetes todavía.</p>
    </div>
  `
})
export class PackagesAdminComponent implements OnInit {
  packages = signal<VenuePackage[]>([]);
  editing = signal(false);
  editingId = signal<string | null>(null);
  draft: Omit<VenuePackage, 'id'> = { ...EMPTY, includes: [] };

  constructor(private svc: PackagesService) {}

  ngOnInit(): void {
    this.svc.getAll().subscribe(p => this.packages.set(p));
  }

  startCreate() {
    this.draft = { ...EMPTY, includes: [] };
    this.editingId.set(null);
    this.editing.set(true);
  }

  startEdit(pkg: VenuePackage) {
    this.draft = { ...pkg, includes: [...pkg.includes] };
    this.editingId.set(pkg.id!);
    this.editing.set(true);
  }

  setIncludes(value: string) {
    this.draft.includes = value.split(',').map(s => s.trim()).filter(Boolean);
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
    if (confirm('¿Eliminar este paquete?')) await this.svc.remove(id);
  }
}
