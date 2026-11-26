import { CommonModule } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonContent, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { cardOutline, cashOutline, businessOutline, eyeOutline } from 'ionicons/icons';
import { loadStripe, Stripe, StripeCardElement } from '@stripe/stripe-js';
import { AppStateService } from '../core/app-state.service';
import { BrandHeaderComponent } from '../shared/brand-header.component';
import { BottomNavComponent } from '../shared/bottom-nav.component';
import { CheckoutStepsComponent } from '../shared/checkout-steps.component';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, FormsModule, IonContent, IonIcon, BrandHeaderComponent, BottomNavComponent, CheckoutStepsComponent],
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss']
})
export class PaymentPage implements AfterViewInit {
  private readonly stripePublicKey = 'pk_test_51UfK9a3i1h0MIyCsljuz22mFT75bYtwJQ8buww5Q2pfjPvIs3T8KerVZ3pCgQWD7Nf7B12eY4pKtMOCBzFOXjWHs00RSEPctwX';
  private stripe: Stripe | null = null;
  private cardElement: StripeCardElement | null = null;

  saveCard = true;
  billing = 'same';
  cardName = '';
  stripeError = '';
  processing = false;

  constructor(public state: AppStateService, private router: Router) {
    addIcons({ cardOutline, cashOutline, businessOutline, eyeOutline });
    this.cardName = this.state.currentUser.fullName;
  }

  async ngAfterViewInit() {
    this.stripe = await loadStripe(this.stripePublicKey);
    if (this.state.selectedPayment === 'card') {
      this.mountCardElement();
    }
  }

  ionViewWillEnter() {
    this.cardName = this.state.currentUser.fullName;
    if (this.stripe && this.state.selectedPayment === 'card') {
      setTimeout(() => this.mountCardElement(), 50);
    }
  }

  selectPayment(method: string) {
    this.state.selectedPayment = method;
    this.stripeError = '';
    if (method === 'card') {
      setTimeout(() => this.mountCardElement(), 50);
    }
  }

  private mountCardElement() {
    if (!this.stripe) return;
    const container = document.getElementById('stripe-card-element');
    if (!container) return;

    if (this.cardElement) {
      this.cardElement.unmount();
    }

    const elements = this.stripe.elements();
    this.cardElement = elements.create('card', {
      style: {
        base: {
          fontSize: '15px',
          color: '#1f2937',
          '::placeholder': { color: '#9ca3af' }
        }
      }
    });
    this.cardElement.mount('#stripe-card-element');
    this.cardElement.on('change', (event) => {
      this.stripeError = event.error ? event.error.message : '';
    });
  }

  async next() {
    if (this.state.selectedPayment === 'card') {
      if (!this.stripe || !this.cardElement) {
        this.stripeError = 'Configura tu clave pk_test_ de Stripe.';
        return;
      }

      this.processing = true;
      this.stripeError = '';

      const { error, paymentMethod } = await this.stripe.createPaymentMethod({
        type: 'card',
        card: this.cardElement,
        billing_details: {
          name: this.cardName || this.state.currentUser.fullName,
          email: this.state.currentUser.email
        }
      });

      this.processing = false;

      if (error) {
        this.stripeError = error.message || 'Verifica los datos de tu tarjeta.';
        return;
      }

      // Guarda el ID del método de pago para cobrarlo en server.js y los últimos 4 dígitos
      if (paymentMethod?.id) {
        localStorage.setItem('stripe_payment_method_id', paymentMethod.id);
      }
      if (paymentMethod?.card?.last4) {
        localStorage.setItem('card_last4', paymentMethod.card.last4);
      }
    }

    const destination = this.state.returnTo || '/order-summary';
    this.state.returnTo = null;
    this.router.navigateByUrl(destination);
  }
}