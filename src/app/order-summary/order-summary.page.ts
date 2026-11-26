import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { cardOutline, locationOutline, carOutline } from 'ionicons/icons';
import { AppStateService } from '../core/app-state.service';
import { BrandHeaderComponent } from '../shared/brand-header.component';
import { BottomNavComponent } from '../shared/bottom-nav.component';

@Component({
  selector: 'app-order-summary',
  standalone: true,
  imports: [CommonModule, IonContent, IonIcon, BrandHeaderComponent, BottomNavComponent],
  templateUrl: './order-summary.page.html',
  styleUrls: ['./order-summary.page.scss']
})
export class OrderSummaryPage {
  private http = inject(HttpClient);

  processing = false;
  paymentError = '';

  constructor(public state: AppStateService, private router: Router) {
    addIcons({ cardOutline, locationOutline, carOutline });
  }

  edit(path: string) {
    this.state.returnTo = '/order-summary';
    this.router.navigateByUrl(path);
  }

  confirm() {
    if (this.processing) return;
    this.paymentError = '';

    if (this.state.selectedPayment !== 'card') {
      this.router.navigateByUrl('/order-success');
      return;
    }

    const paymentMethodId = localStorage.getItem('stripe_payment_method_id');
    if (!paymentMethodId) {
      this.paymentError = 'Ingresa una tarjeta válida antes de confirmar tu compra.';
      return;
    }

    this.processing = true;

    this.http
      .post<{ success: boolean; paymentIntentId: string }>('http://localhost:3000/create-payment-intent', {
        amountMxn: this.state.total(),
        paymentMethodId
      })
      .subscribe({
        next: () => {
          this.processing = false;
          localStorage.removeItem('stripe_payment_method_id');
          this.router.navigateByUrl('/order-success');
        },
        error: (err) => {
          this.processing = false;
          this.paymentError = err.error?.error || 'No se pudo procesar el pago con Stripe.';
        }
      });
  }

  deliveryLabel() {
    return this.state.selectedDelivery === 'express'
      ? 'Entrega exprés'
      : this.state.selectedDelivery === 'pickup'
      ? 'Recoger en tienda'
      : 'Envío estándar';
  }

  paymentLabel() {
    const last4 = localStorage.getItem('card_last4') || '3456';
    return this.state.selectedPayment === 'spei'
      ? 'Transferencia SPEI'
      : this.state.selectedPayment === 'cash'
      ? 'Pago contra entrega'
      : `Tarjeta de crédito terminada en ${last4}`;
  }
}