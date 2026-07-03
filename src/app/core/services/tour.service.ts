import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

export interface TourStep {
  route: string;
  selector: string;
  title: string;
  description: string;
}

@Injectable({ providedIn: 'root' })
export class TourService {
  readonly steps: TourStep[] = [
    {
      route: '/',
      selector: '[data-tour="hero"]',
      title: 'Bienvenida',
      description: 'Este es el inicio: la primera impresión de Grand Imperio Social Venue, con acceso directo a agendar tu visita.',
    },
    {
      route: '/',
      selector: '[data-tour="nav-links"]',
      title: 'Menú principal',
      description: 'Desde aquí navegas todo el sitio: galería, cotización, proveedores, disponibilidad y contacto.',
    },
    {
      route: '/galeria',
      selector: '[data-tour="gallery-grid"]',
      title: 'Galería',
      description: 'Explora fotos reales de nuestros espacios, eventos y detalles, organizadas por categoría.',
    },
    {
      route: '/cotizacion',
      selector: '[data-tour="pricing"]',
      title: 'Cotización',
      description: 'Consulta paquetes y precios para armar el presupuesto de tu evento.',
    },
    {
      route: '/disponibilidad',
      selector: '[data-tour="availability"]',
      title: 'Disponibilidad',
      description: 'Revisa el calendario y encuentra fechas libres para tu evento.',
    },
    {
      route: '/agendar',
      selector: '[data-tour="appointments"]',
      title: 'Agendar visita',
      description: 'Reserva una cita para conocer el salón en persona y resolver tus dudas.',
    },
    {
      route: '/contacto',
      selector: '[data-tour="whatsapp"]',
      title: 'Contacto directo',
      description: 'Si prefieres algo más rápido, escríbenos por WhatsApp desde cualquier página.',
    },
  ];

  readonly active = signal(false);
  readonly stepIndex = signal(0);
  readonly targetRect = signal<DOMRect | null>(null);
  readonly locating = signal(false);

  constructor(private router: Router) {}

  get currentStep(): TourStep {
    return this.steps[this.stepIndex()];
  }

  start() {
    this.stepIndex.set(0);
    this.active.set(true);
    this.goToCurrentStep();
  }

  stop() {
    this.active.set(false);
    this.targetRect.set(null);
  }

  next() {
    if (this.stepIndex() >= this.steps.length - 1) {
      this.stop();
      return;
    }
    this.stepIndex.update(i => i + 1);
    this.goToCurrentStep();
  }

  prev() {
    if (this.stepIndex() === 0) return;
    this.stepIndex.update(i => i - 1);
    this.goToCurrentStep();
  }

  private goToCurrentStep() {
    const step = this.currentStep;
    this.locating.set(true);
    this.targetRect.set(null);

    const currentPath = '/' + this.router.url.split('?')[0].split('#')[0].replace(/^\//, '');
    const navigate = currentPath !== step.route
      ? this.router.navigateByUrl(step.route)
      : Promise.resolve(true);

    navigate.then(() => this.locateTarget(step.selector));
  }

  private locateTarget(selector: string, attempt = 0) {
    const el = document.querySelector(selector);
    if (!el) {
      if (attempt < 40) {
        requestAnimationFrame(() => this.locateTarget(selector, attempt + 1));
      } else {
        this.locating.set(false);
      }
      return;
    }

    el.scrollIntoView({ behavior: 'smooth', block: 'center' });

    setTimeout(() => {
      this.targetRect.set(el.getBoundingClientRect());
      this.locating.set(false);
    }, 320);
  }

  refreshRect() {
    if (!this.active()) return;
    const el = document.querySelector(this.currentStep.selector);
    if (el) this.targetRect.set(el.getBoundingClientRect());
  }
}
