import { Component, OnInit, signal } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsersService } from '../../../core/services/users.service';
import { AppUser } from '../../../core/models/app-user.model';

@Component({
  selector: 'app-users-admin',
  standalone: true,
  imports: [NgFor, NgIf, FormsModule],
  template: `
    <div class="flex items-center justify-between mb-6">
      <h2 class="font-display font-black text-[#F5F0EB] uppercase text-xl">Usuarios y roles</h2>
      <button (click)="creating.set(!creating())" class="btn-grand px-5 py-2.5 bg-[#C9A84C] text-[#0A0A0A] text-[10px] font-bold tracking-[0.2em] uppercase">
        + Asignar rol
      </button>
    </div>

    <p class="text-[#F5F0EB]/35 text-[12px] font-light mb-8 max-w-xl leading-relaxed">
      Primero crea la cuenta en Firebase Authentication (correo y contraseña). Después pega aquí su UID para asignarle un rol y darle acceso al panel.
    </p>

    <div *ngIf="creating()" class="bg-[#111111] border border-[#C9A84C]/20 p-6 mb-8 grid grid-cols-1 md:grid-cols-2 gap-5">
      <div class="field-wrap"><label class="field-label">UID (Firebase Auth)</label><input class="field-input" [(ngModel)]="draft.uid"></div>
      <div class="field-wrap"><label class="field-label">Correo</label><input class="field-input" [(ngModel)]="draft.email"></div>
      <div class="field-wrap"><label class="field-label">Nombre</label><input class="field-input" [(ngModel)]="draft.displayName"></div>
      <div class="field-wrap">
        <label class="field-label">Rol</label>
        <select class="field-input" [(ngModel)]="draft.role">
          <option value="editor">Editor — gestiona contenido</option>
          <option value="admin">Admin — control total</option>
        </select>
      </div>
      <div class="md:col-span-2 flex gap-3 mt-2">
        <button (click)="save()" class="btn-grand px-6 py-3 bg-[#C9A84C] text-[#0A0A0A] text-[10px] font-bold tracking-[0.2em] uppercase">Guardar</button>
        <button (click)="creating.set(false)" class="btn-grand px-6 py-3 border border-[#F5F0EB]/20 text-[#F5F0EB]/60 text-[10px] font-bold tracking-[0.2em] uppercase">Cancelar</button>
      </div>
    </div>

    <div class="divide-y divide-[#F5F0EB]/8">
      <div *ngFor="let u of users()" class="flex items-center justify-between py-4 gap-4">
        <div class="min-w-0">
          <p class="text-[#F5F0EB] text-sm font-semibold truncate">{{ u.displayName || u.email }}</p>
          <p class="text-[#F5F0EB]/40 text-[12px] truncate">{{ u.email }}</p>
        </div>
        <div class="flex items-center gap-3 flex-shrink-0">
          <select class="field-input !py-2 !text-xs" [ngModel]="u.role" (ngModelChange)="updateRole(u.uid, $event)">
            <option value="editor">Editor</option>
            <option value="admin">Admin</option>
          </select>
          <button (click)="remove(u.uid)" class="btn-grand w-9 h-9 flex items-center justify-center border border-[#F5F0EB]/15 text-[#F5F0EB]/55 hover:border-red-400/60 hover:text-red-400" aria-label="Quitar acceso">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M3 6h18M8 6V4h8v2m-9 0l1 14h8l1-14" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>
          </button>
        </div>
      </div>
      <p *ngIf="!users().length" class="text-[#F5F0EB]/35 text-sm py-8">Sin usuarios registrados todavía.</p>
    </div>
  `
})
export class UsersAdminComponent implements OnInit {
  users = signal<AppUser[]>([]);
  creating = signal(false);
  draft: { uid: string; email: string; displayName: string; role: 'admin' | 'editor' } = {
    uid: '', email: '', displayName: '', role: 'editor'
  };

  constructor(private svc: UsersService) {}

  ngOnInit(): void {
    this.svc.getAll().subscribe(u => this.users.set(u));
  }

  async save() {
    if (!this.draft.uid.trim()) return;
    await this.svc.upsertRole(this.draft.uid.trim(), this.draft.email, this.draft.displayName, this.draft.role);
    this.draft = { uid: '', email: '', displayName: '', role: 'editor' };
    this.creating.set(false);
  }

  async updateRole(uid: string, role: 'admin' | 'editor') {
    await this.svc.updateRole(uid, role);
  }

  async remove(uid: string) {
    if (confirm('¿Quitar el acceso de este usuario al panel?')) await this.svc.remove(uid);
  }
}
