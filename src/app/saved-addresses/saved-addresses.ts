import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { chevronBackOutline, createOutline, locationOutline, trashOutline } from 'ionicons/icons';
import { AppStateService } from '../core/app-state.service';
import { BottomNavComponent } from '../shared/bottom-nav.component';

@Component({
  selector: 'app-saved-addresses',
  standalone: true,
  imports: [CommonModule, IonContent, IonIcon, BottomNavComponent],
  templateUrl: './saved-addresses.html',
  styleUrls: ['./saved-addresses.scss']
})
export class SavedAddressesPage {
  addresses = [
    {
      id: 1,
      label: 'Casa',
      street: 'Av. Principal 123, Centro',
      city: 'Cuitláhuac, Veracruz',
      isDefault: true
    },
    {
      id: 2,
      label: 'Trabajo',
      street: 'Calle Reforma 45',
      city: 'Cuitláhuac, Veracruz',
      isDefault: false
    }
  ];

  constructor(public state: AppStateService, private router: Router) {
    addIcons({ chevronBackOutline, createOutline, locationOutline, trashOutline });
  }

  goBack() {
    this.router.navigateByUrl('/profile');
  }

  editAddress(item: any) {
    this.router.navigateByUrl('/add-address');
  }

  removeAddress(id: number) {
    this.addresses = this.addresses.filter(addr => addr.id !== id);
  }

  goToAddAddress() {
    this.router.navigateByUrl('/add-address');
  }
}