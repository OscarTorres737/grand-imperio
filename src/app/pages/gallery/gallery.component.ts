import { Component, signal, computed, HostListener } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';

interface GalleryImage {
  url: string;
  category: 'venue' | 'events' | 'details';
  alt: string;
}

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [NgFor, NgIf],
  template: `
    <section class="pt-32 lg:pt-36 pb-10 px-6 lg:px-16 xl:px-24 bg-[#0A0A0A]">
      <div class="max-w-7xl mx-auto">
        <h1 class="font-display text-4xl md:text-5xl text-[#F5F0EB] font-semibold leading-tight">Galería</h1>
        <p class="text-[#F5F0EB]/50 mt-3 text-[15px] leading-relaxed max-w-md">
          Espacios, eventos y detalles que hacen de cada celebración un momento único.
        </p>
      </div>
    </section>

    <section class="bg-[#0A0A0A] px-6 lg:px-16 xl:px-24 sticky top-16 lg:top-[72px] z-[var(--z-sticky)] border-b border-[#F5F0EB]/8">
      <div class="max-w-7xl mx-auto flex gap-7 lg:gap-9" role="tablist">
        <button *ngFor="let tab of tabs"
                (click)="setTab(tab.key)"
                role="tab"
                [attr.aria-selected]="activeTab() === tab.key"
                class="gallery-tab text-sm py-4 pb-[15px] relative"
                [class.tab-active]="activeTab() === tab.key"
                [style.color]="activeTab() === tab.key ? '#C9A84C' : 'rgba(245,240,235,0.40)'">
          {{ tab.label }}
        </button>
      </div>
    </section>

    <section data-tour="gallery-grid" class="py-10 px-6 lg:px-16 xl:px-24 bg-[#0A0A0A] min-h-screen" role="tabpanel">
      <div class="max-w-7xl mx-auto columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
        <div *ngFor="let img of filteredImages()"
             class="break-inside-avoid group relative overflow-hidden cursor-pointer img-zoom rounded-xl"
             (click)="openLightbox(img)"
             tabindex="0"
             [attr.aria-label]="'Ver imagen: ' + img.alt"
             (keydown.enter)="openLightbox(img)"
             (keydown.space)="openLightbox(img)">
          <img [src]="img.url" [alt]="img.alt"
               loading="lazy"
               class="w-full object-cover">
          <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
               style="background: rgba(10,10,10,0.35)" aria-hidden="true">
            <div class="w-10 h-10 border border-[#F5F0EB]/60 flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" class="text-[#F5F0EB]">
                <path d="M8 3v10M3 8h10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div *ngIf="lightboxOpen()"
         class="fixed inset-0 flex items-center justify-center"
         [style.z-index]="'var(--z-modal)'"
         style="background: rgba(10,10,10,0.96)"
         (click)="closeLightbox()"
         role="dialog"
         [attr.aria-label]="'Imagen: ' + (lightboxImage()?.alt || '')">

      <button class="absolute top-4 right-4 w-11 h-11 flex items-center justify-center text-[#F5F0EB]/50 hover:text-[#F5F0EB] transition-colors duration-200"
              aria-label="Cerrar"
              (click)="closeLightbox()">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
      </button>

      <img *ngIf="lightboxImage()"
           [src]="lightboxImage()!.url"
           [alt]="lightboxImage()!.alt"
           class="max-w-[90vw] max-h-[88vh] object-contain"
           style="animation: lightboxIn 0.25s cubic-bezier(0.23,1,0.32,1) both"
           (click)="$event.stopPropagation()">

      <p class="absolute bottom-6 left-0 right-0 text-center text-[#F5F0EB]/35 text-xs tracking-wide">
        {{ lightboxImage()?.alt }}
      </p>
    </div>
  `,
  styles: [`
    @keyframes lightboxIn {
      from { opacity: 0; transform: scale(0.96); }
      to   { opacity: 1; transform: scale(1); }
    }
  `]
})
export class GalleryComponent {
  activeTab = signal<'all' | 'venue' | 'events' | 'details'>('all');
  lightboxImage = signal<GalleryImage | null>(null);
  lightboxOpen = signal(false);

  tabs = [
    { key: 'all'     as const, label: 'Todos'    },
    { key: 'venue'   as const, label: 'Venue'    },
    { key: 'events'  as const, label: 'Eventos'  },
    { key: 'details' as const, label: 'Detalles' },
  ];

  images: GalleryImage[] = [
    { url: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=80', category: 'venue',   alt: 'Salón principal Grand Imperio' },
    { url: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&q=80', category: 'events',  alt: 'Boda en Grand Imperio' },
    { url: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&q=80', category: 'events',  alt: 'Evento de gala' },
    { url: 'https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=800&q=80', category: 'venue',   alt: 'Interior del venue' },
    { url: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&q=80', category: 'venue',   alt: 'Terraza Imperial' },
    { url: 'https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=800&q=80', category: 'venue',   alt: 'Salón VIP' },
    { url: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&q=80', category: 'details', alt: 'Decoración floral' },
    { url: 'https://images.unsplash.com/photo-1543573610-cb5591c1d3c0?w=800&q=80', category: 'details', alt: 'Mesa de banquete' },
    { url: 'https://images.unsplash.com/photo-1509927083803-4bd519298ac4?w=800&q=80', category: 'events',  alt: 'Celebración XV Años' },
    { url: 'https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec?w=800&q=80', category: 'events',  alt: 'Evento corporativo' },
    { url: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80', category: 'events',  alt: 'Música en vivo' },
    { url: 'https://images.unsplash.com/photo-1550159930-40066082a4fc?w=800&q=80', category: 'details', alt: 'Detalles de decoración' },
  ];

  filteredImages = computed(() => {
    const tab = this.activeTab();
    return tab === 'all' ? this.images : this.images.filter(img => img.category === tab);
  });

  setTab(tab: 'all' | 'venue' | 'events' | 'details') {
    this.activeTab.set(tab);
  }

  openLightbox(img: GalleryImage) {
    this.lightboxImage.set(img);
    this.lightboxOpen.set(true);
    document.body.style.overflow = 'hidden';
  }

  closeLightbox() {
    this.lightboxOpen.set(false);
    this.lightboxImage.set(null);
    document.body.style.overflow = '';
  }

  @HostListener('document:keydown.escape')
  onEscape() { if (this.lightboxOpen()) this.closeLightbox(); }
}
