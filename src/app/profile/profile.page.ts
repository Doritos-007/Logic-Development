import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { cardOutline, chevronForwardOutline, helpCircleOutline, locationOutline, logOutOutline, pencilOutline, person, receiptOutline } from 'ionicons/icons';
import { AppStateService } from '../core/app-state.service';
import { AuthService } from '../core/auth.service';
import { BrandHeaderComponent } from '../shared/brand-header.component';
import { BottomNavComponent } from '../shared/bottom-nav.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, IonContent, IonIcon, BrandHeaderComponent, BottomNavComponent],
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss']
})
export class ProfilePage {
  message = '';

  menu = [
    { icon: 'receipt-outline', title: 'Mis pedidos', sub: 'Consulta el estado de tus compras', route: '/orders' },
    { icon: 'location-outline', title: 'Direcciones', sub: 'Administra tus direcciones de entrega', route: '/saved-addresses' },
    { icon: 'card-outline', title: 'Métodos de pago', sub: 'Tarjetas y formas de pago', route: '/saved-payments' },
    { icon: 'help-circle-outline', title: 'Ayuda y soporte', sub: 'Estamos para ayudarte', route: '/support' }
  ];

  constructor(
    public state: AppStateService,
    private router: Router,
    private auth: AuthService
  ) {
    addIcons({
      cardOutline,
      chevronForwardOutline,
      helpCircleOutline,
      locationOutline,
      logOutOutline,
      pencilOutline,
      person,
      receiptOutline
    });
  }

  editProfile() {
    this.router.navigateByUrl('/edit-profile');
  }

  open(item: any) {
    if (item.route) this.router.navigateByUrl(item.route);
    else this.message = `${item.title}: disponible en la siguiente integración de servicios.`;
  }

  logout() {
    this.auth.logout();
    this.router.navigateByUrl('/login');
  }
}