import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  cartOutline,
  homeOutline,
  personOutline,
  storefrontOutline,
  cart,
  home,
  person,
  storefront
} from 'ionicons/icons';

@Component({
  selector: 'app-bottom-nav',
  standalone: true,
  imports: [CommonModule, IonIcon],
  template: `
    <nav class="bottom-nav" aria-label="Navegación principal">
      <button type="button" [class.active]="active==='home'" (click)="go('/home')">
        <ion-icon [name]="active==='home' ? 'home' : 'home-outline'"></ion-icon><span>Inicio</span>
      </button>
      <button type="button" [class.active]="active==='store'" (click)="go('/store')">
        <ion-icon [name]="active==='store' ? 'storefront' : 'storefront-outline'"></ion-icon><span>Tienda</span>
      </button>
      <button type="button" class="cart-btn" [class.active]="active==='cart'" (click)="go('/cart')">
        <span class="icon-wrap"><ion-icon [name]="active==='cart' ? 'cart' : 'cart-outline'"></ion-icon><b *ngIf="count>0">{{ count }}</b></span><span>Carrito</span>
      </button>
      <button type="button" [class.active]="active==='profile'" (click)="go('/profile')">
        <ion-icon [name]="active==='profile' ? 'person' : 'person-outline'"></ion-icon><span>Perfil</span>
      </button>
    </nav>
  `,
  styles: [`
    :host{display:block}
    .bottom-nav{position:sticky;bottom:0;z-index:20;display:grid;grid-template-columns:repeat(4,1fr);align-items:end;background:#fff;border-top:1px solid #e6e8ec;padding:8px 2px calc(6px + env(safe-area-inset-bottom));margin:14px -18px -18px}
    button{position:relative;border:0;background:transparent;color:#667085;display:flex;flex-direction:column;align-items:center;gap:2px;font-size:11px;cursor:pointer;min-height:46px}
    ion-icon{font-size:24px}.active{color:#009c45;font-weight:700}.icon-wrap{position:relative;display:inline-grid;place-items:center}.icon-wrap b{position:absolute;top:-8px;right:-11px;min-width:18px;height:18px;border-radius:999px;background:#ff3b30;color:#fff;font-size:10px;display:grid;place-items:center;padding:0 4px}
  `]
})
export class BottomNavComponent {
  @Input() active: 'home' | 'store' | 'cart' | 'profile' = 'home';
  @Input() count = 0;
  constructor(private router: Router) {
    addIcons({ cartOutline, homeOutline, personOutline, storefrontOutline, cart, home, person, storefront });
  }
  go(url: string): void { this.router.navigateByUrl(url); }
}
