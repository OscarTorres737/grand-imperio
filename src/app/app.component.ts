import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { WhatsappButtonComponent } from './shared/components/whatsapp-button/whatsapp-button.component';
import { TourOverlayComponent } from './shared/components/tour-overlay/tour-overlay.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent, WhatsappButtonComponent, TourOverlayComponent],
  template: `
    <app-navbar />

    <main>
      <router-outlet />
    </main>

    <app-footer />
    <app-whatsapp-button />
    <app-tour-overlay />
  `
})
export class AppComponent {}
