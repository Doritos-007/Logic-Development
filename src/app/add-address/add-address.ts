import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonContent, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { chevronBackOutline, location } from 'ionicons/icons';
import { AppStateService } from '../core/app-state.service';
import { BottomNavComponent } from '../shared/bottom-nav.component';

@Component({
  selector: 'app-add-address',
  standalone: true,
  imports: [CommonModule, FormsModule, IonContent, IonIcon, BottomNavComponent],
  templateUrl: './add-address.html',
  styleUrls: ['./add-address.scss']
})
export class AddAddressPage {
  address = {
    street: '',
    extNumber: '',
    intNumber: '',
    neighborhood: '',
    city: '',
    zipCode: '',
    references: ''
  };

  message = '';
  isError = false;

  constructor(public state: AppStateService, private router: Router) {
    addIcons({ chevronBackOutline, location });
  }

  goBack() {
    this.router.navigateByUrl('/saved-addresses');
  }

  useCurrentLocation() {
    this.address.street = 'Av. Principal';
    this.address.extNumber = '123';
    this.address.neighborhood = 'Centro';
    this.address.city = 'Cuitláhuac';
    this.address.zipCode = '94910';
    this.isError = false;
    this.message = 'Ubicación actual cargada.';
  }

  saveAddress() {
    if (!this.address.street.trim() || !this.address.extNumber.trim() || !this.address.neighborhood.trim() || !this.address.city.trim() || !this.address.zipCode.trim()) {
      this.isError = true;
      this.message = 'Por favor completa los campos obligatorios de la dirección.';
      return;
    }

    this.isError = false;
    this.message = 'Dirección guardada correctamente.';
    setTimeout(() => {
      this.router.navigateByUrl('/saved-addresses');
    }, 800);
  }
}