import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonContent, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { checkmarkOutline, chevronBackOutline } from 'ionicons/icons';
import { AppStateService } from '../core/app-state.service';
import { BottomNavComponent } from '../shared/bottom-nav.component';

@Component({
  selector: 'app-add-card',
  standalone: true,
  imports: [CommonModule, FormsModule, IonContent, IonIcon, BottomNavComponent],
  templateUrl: './add-card.html',
  styleUrls: ['./add-card.scss']
})
export class AddCardPage {
  card = {
    number: '',
    holder: '',
    expiry: '',
    cvv: ''
  };

  message = '';
  isError = false;

  constructor(public state: AppStateService, private router: Router) {
    addIcons({ checkmarkOutline, chevronBackOutline });
  }

  goBack() {
    this.router.navigateByUrl('/saved-payments');
  }

  saveCard() {
    if (!this.card.number.trim() || !this.card.holder.trim() || !this.card.expiry.trim() || !this.card.cvv.trim()) {
      this.isError = true;
      this.message = 'Por favor completa todos los campos de la tarjeta.';
      return;
    }

    this.isError = false;
    this.message = 'Tarjeta guardada correctamente.';
    setTimeout(() => {
      this.router.navigateByUrl('/saved-payments');
    }, 800);
  }
}