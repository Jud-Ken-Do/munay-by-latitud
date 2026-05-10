import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '../../shared/translate.pipe';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, TranslatePipe],
  template: `
    <footer>
      <div class="ftr">
        <div class="brand">
          <span class="word">MUNAY</span>
          <p>{{ 'footer.description' | translate }}</p>
          <div class="where">
            <span>Medellin · CO</span>
            <span>Ships worldwide</span>
          </div>
        </div>
        <div class="col">
          <h4>Shop</h4>
          <a routerLink="/category/anillos">{{ 'nav.rings' | translate }}</a>
          <a routerLink="/category/collares">{{ 'nav.necklaces' | translate }}</a>
          <a routerLink="/category/pulseras">{{ 'nav.bracelets' | translate }}</a>
          <a routerLink="/category/aretes">{{ 'nav.earrings' | translate }}</a>
          <a routerLink="/shop">{{ 'nav.filigrana' | translate }}</a>
          <span>Gift cards</span>
        </div>
        <div class="col">
          <h4>Atelier</h4>
          <a href="#story">Our story</a>
          <a href="#story">The makers</a>
          <span>Stones · sourcing</span>
          <span>Sustainability</span>
          <span>Press</span>
        </div>
        <div class="col">
          <h4>Care</h4>
          <span>Sizing guide</span>
          <span>Caring for silver</span>
          <span>Repair for life</span>
          <span>Returns · 14 days</span>
          <span>Shipping</span>
        </div>
        <div class="col">
          <h4>Contact</h4>
          <a href="mailto:hola@munaybylatitud.com">hola&#64;munaybylatitud.com</a>
          <a href="https://wa.me/60149146470" target="_blank" rel="noopener">Whatsapp</a>
          <a href="https://www.instagram.com/munaybylatitud/" target="_blank" rel="noopener">Instagram</a>
          <span>Find us at events</span>
        </div>
      </div>
      <div class="ftr-bottom">
        <span>&copy; 2026 Munay by Latitud · Hecho con amor</span>
        <div class="pays">
          <span class="pay">Visa</span>
          <span class="pay">M·card</span>
          <span class="pay">Amex</span>
          <span class="pay">PayPal</span>
          <span class="pay">Apple</span>
        </div>
        <span>Privacy · Terms · Cookies</span>
      </div>
    </footer>
  `,
  styleUrl: './footer.component.scss'
})
export class FooterComponent {}
