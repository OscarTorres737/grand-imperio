import { Component, OnInit, signal } from '@angular/core';
import { NgFor, NgIf, CurrencyPipe, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QuoteRequestsService } from '../../../core/services/quote-requests.service';
import { QuoteRequest } from '../../../core/models/quote-request.model';

@Component({
  selector: 'app-leads-admin',
  standalone: true,
  imports: [NgFor, NgIf, CurrencyPipe, DatePipe, FormsModule],
  template: `
    <h2 class="font-display font-black text-[#F5F0EB] uppercase text-xl mb-8">Cotizaciones recibidas</h2>

    <div class="divide-y divide-[#F5F0EB]/8">
      <div *ngFor="let lead of leads()" class="flex flex-col sm:flex-row sm:items-center justify-between py-5 gap-4">
        <div class="min-w-0">
          <div class="flex items-center gap-3 mb-1">
            <p class="text-[#F5F0EB] text-sm font-semibold">{{ lead.name }}</p>
            <span class="text-[9px] font-bold tracking-[0.15em] uppercase px-2 py-0.5"
                  [class]="lead.status === 'nuevo' ? 'bg-[#C9A84C]/15 text-[#C9A84C]' : lead.status === 'contactado' ? 'bg-blue-400/15 text-blue-300' : 'bg-[#F5F0EB]/10 text-[#F5F0EB]/40'">
              {{ lead.status }}
            </span>
          </div>
          <p class="text-[#F5F0EB]/45 text-[12px]">{{ lead.phone }} · {{ lead.eventType }} · {{ lead.guestCount }} invitados · {{ lead.packageName }}</p>
          <p class="text-[#F5F0EB]/30 text-[11px] mt-1">{{ lead.createdAt | date:'d MMM, HH:mm' }} · estimado {{ lead.estimatedTotal | currency:'MXN':'symbol':'1.0-0' }}</p>
        </div>
        <div class="flex items-center gap-3 flex-shrink-0">
          <select class="field-input !py-2 !text-xs" [ngModel]="lead.status" (ngModelChange)="updateStatus(lead.id!, $event)">
            <option value="nuevo">Nuevo</option>
            <option value="contactado">Contactado</option>
            <option value="cerrado">Cerrado</option>
          </select>
          <a [href]="'https://wa.me/52' + lead.phone" target="_blank" rel="noopener noreferrer"
             class="btn-grand w-9 h-9 flex items-center justify-center border border-[#C9A84C]/30 text-[#C9A84C]" aria-label="WhatsApp">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 14.4c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-1 1.2-.1.2-.3.2-.6.1-.3-.2-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.4.1-.6.1-.1.3-.3.4-.5.2-.2.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.2-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5 0 1.5 1.1 2.9 1.2 3.1.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.3-.7.3-1.3.2-1.4-.1-.1-.3-.2-.6-.4"/></svg>
          </a>
          <button (click)="remove(lead.id!)" class="btn-grand w-9 h-9 flex items-center justify-center border border-[#F5F0EB]/15 text-[#F5F0EB]/55 hover:border-red-400/60 hover:text-red-400" aria-label="Eliminar">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M3 6h18M8 6V4h8v2m-9 0l1 14h8l1-14" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"/></svg>
          </button>
        </div>
      </div>
      <p *ngIf="!leads().length" class="text-[#F5F0EB]/35 text-sm py-8">Sin cotizaciones todavía.</p>
    </div>
  `
})
export class LeadsAdminComponent implements OnInit {
  leads = signal<QuoteRequest[]>([]);

  constructor(private svc: QuoteRequestsService) {}

  ngOnInit(): void {
    this.svc.getAll().subscribe(l => this.leads.set(l));
  }

  async updateStatus(id: string, status: QuoteRequest['status']) {
    await this.svc.updateStatus(id, status);
  }

  async remove(id: string) {
    if (confirm('¿Eliminar esta cotización?')) await this.svc.remove(id);
  }
}
