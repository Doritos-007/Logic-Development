import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { checkmarkOutline, chevronBackOutline } from 'ionicons/icons';
import { AppStateService } from '../core/app-state.service';
import { BottomNavComponent } from '../shared/bottom-nav.component';

@Component({
  selector: 'app-saved-payments',
  standalone: true,
  imports: [CommonModule, IonContent, IonIcon, BottomNavComponent],
  templateUrl: './saved-payments.html',
  styleUrls: ['./saved-payments.scss']
})
export class SavedPaymentsPage {
  cards = [
    {
      id: 1,
      brand: 'VISA',
      last4: '4821',
      holder: 'JUAN PÉREZ',
      expiry: '08/28',
      isDefault: true
    },
    {
      id: 2,
      brand: 'MASTERCARD',
      last4: '1906',
      holder: 'JUAN PÉREZ',
      expiry: '11/27',
      isDefault: false
    }
  ];

  constructor(public state: AppStateService, private router: Router) {
    addIcons({ checkmarkOutline, chevronBackOutline });
  }

  goBack() {
    this.router.navigateByUrl('/profile');
  }

  removeCard(id: number) {
    this.cards = this.cards.filter(card => card.id !== id);
  }

  goToAddCard() {
    this.router.navigateByUrl('/add-card');
  }
}