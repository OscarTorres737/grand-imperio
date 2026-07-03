import { Component, HostListener } from '@angular/core';
import { NgIf } from '@angular/common';
import { TourService } from '../../../core/services/tour.service';

@Component({
  selector: 'app-tour-overlay',
  standalone: true,
  imports: [NgIf],
  template: `
    <ng-container *ngIf="tour.active()">
      <div class="fixed inset-0 z-[var(--z-toast)]" style="background: rgba(6,6,6,0.55)"
           (click)="tour.stop()"></div>

      <div class="tour-frame" *ngIf="rect() as r"
           [style.top.px]="r.top - 8"
           [style.left.px]="r.left - 8"
           [style.width.px]="r.width + 16"
           [style.height.px]="r.height + 16"></div>

      <div *ngIf="tour.locating() && !rect()"
           class="fixed inset-0 z-[var(--z-toast)] flex items-center justify-center pointer-events-none">
        <span class="text-[#F5F0EB]/70 text-xs uppercase tracking-[0.3em]">Buscando sección…</span>
      </div>

      <div class="tour-card w-[calc(100vw-32px)] max-w-sm rounded-2xl border border-[#C9A84C]/20 bg-[#111111] p-6 shadow-[0_30px_80px_-20px_rgba(0,0,0,0.85)]"
           [style.top.px]="cardPos().top"
           [style.left.px]="cardPos().left">
        <div class="flex items-center justify-between gap-4 mb-3">
          <span class="text-[#C9A84C] text-[10px] uppercase tracking-[0.3em]">
            Paso {{ tour.stepIndex() + 1 }} / {{ tour.steps.length }}
          </span>
          <button type="button" (click)="tour.stop()" aria-label="Cerrar tour"
                  class="text-[#F5F0EB]/50 hover:text-[#F5F0EB] text-xs uppercase tracking-[0.2em]">
            Cerrar
          </button>
        </div>

        <h3 class="text-lg font-semibold text-[#F5F0EB] mb-2">{{ tour.currentStep.title }}</h3>
        <p class="text-[#F5F0EB]/65 text-sm leading-relaxed mb-5">{{ tour.currentStep.description }}</p>

        <div class="flex items-center gap-2">
          <button type="button" (click)="tour.prev()" [disabled]="tour.stepIndex() === 0"
                  class="flex-1 rounded-full border border-[#F5F0EB]/15 py-2.5 text-xs uppercase tracking-[0.15em] text-[#F5F0EB]/70 disabled:opacity-30 hover:border-[#F5F0EB]/30 transition-colors">
            Anterior
          </button>
          <button type="button" (click)="tour.next()"
                  class="flex-1 rounded-full bg-[#C9A84C] py-2.5 text-xs uppercase tracking-[0.15em] text-[#0A0A0A] hover:bg-[#E2C97A] transition-colors">
            {{ tour.stepIndex() === tour.steps.length - 1 ? 'Finalizar' : 'Siguiente' }}
          </button>
        </div>
      </div>
    </ng-container>
  `
})
export class TourOverlayComponent {
  constructor(public tour: TourService) {}

  rect() {
    return this.tour.targetRect();
  }

  cardPos() {
    const r = this.rect();
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const cardWidth = Math.min(vw - 32, 384);
    const cardHeight = 220;

    if (!r) {
      return { top: vh / 2 - cardHeight / 2, left: (vw - cardWidth) / 2 };
    }

    const spaceBelow = vh - r.bottom;
    const spaceAbove = r.top;
    let top: number;
    if (spaceBelow > cardHeight + 24) {
      top = r.bottom + 20;
    } else if (spaceAbove > cardHeight + 24) {
      top = r.top - cardHeight - 20;
    } else {
      top = Math.max(16, vh - cardHeight - 16);
    }

    let left = r.left + r.width / 2 - cardWidth / 2;
    left = Math.max(16, Math.min(left, vw - cardWidth - 16));

    return { top, left };
  }

  @HostListener('window:resize')
  @HostListener('window:scroll')
  onViewportChange() {
    this.tour.refreshRect();
  }
}
