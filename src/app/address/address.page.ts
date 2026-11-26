import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonContent, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { addOutline, businessOutline, callOutline, locationOutline, mailOutline, personOutline } from 'ionicons/icons';
import { AppStateService, DeliveryAddress } from '../core/app-state.service';
import { BrandHeaderComponent } from '../shared/brand-header.component';
import { BottomNavComponent } from '../shared/bottom-nav.component';

@Component({
  selector: 'app-address',
  standalone: true,
  imports: [CommonModule, FormsModule, IonContent, IonIcon, BrandHeaderComponent, BottomNavComponent],
  templateUrl: './address.page.html',
  styleUrls: ['./address.page.scss']
})
export class AddressPage implements OnInit {
  editingId: string | null = null;
  editingLabel = '';
  returnTo: string | null = null;

  form = {
    name: '',
    street: '',
    colony: '',
    city: '',
    state: 'Chiapas',
    zip: '',
    phone: ''
  };

  constructor(
    public state: AppStateService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    addIcons({ addOutline, businessOutline, callOutline, locationOutline, mailOutline, personOutline });
  }

  get addresses(): DeliveryAddress[] {
    return this.state.addresses;
  }

  get selected(): string {
    return this.state.selectedAddressId;
  }

  set selected(value: string) {
    this.state.selectedAddressId = value;
  }

  ngOnInit() {
    this.returnTo = this.route.snapshot.queryParamMap.get('returnTo');

    const current = this.state.getCurrentAddress();
    if (current) {
      this.editingId = current.id;
      this.editingLabel = current.label;
      this.form = {
        name: current.name,
        street: current.street,
        colony: current.colony,
        city: current.city,
        state: current.state,
        zip: current.zip,
        phone: current.phone
      };
    }
  }

  editAddress(item: DeliveryAddress, event: Event) {
    event.preventDefault();
    event.stopPropagation();

    this.state.selectedAddressId = item.id;
    this.editingId = item.id;
    this.editingLabel = item.label;
    this.form = {
      name: item.name,
      street: item.street,
      colony: item.colony,
      city: item.city,
      state: item.state,
      zip: item.zip,
      phone: item.phone
    };
    this.scrollToForm();
  }

  startNewAddress() {
    this.editingId = null;
    this.editingLabel = '';
    this.form = {
      name: '',
      street: '',
      colony: '',
      city: '',
      state: 'Veracruz',
      zip: '',
      phone: ''
    };
    this.scrollToForm();
  }

  private scrollToForm() {
    setTimeout(() => {
      document.getElementById('addressFormTitle')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  }

  next() {
    if (this.editingId) {
      const index = this.state.addresses.findIndex((a) => a.id === this.editingId);
      if (index !== -1) {
        this.state.addresses[index] = {
          ...this.state.addresses[index],
          ...this.form
        };
      }
    } else if (this.form.street.trim() && this.form.city.trim()) {
      const newId = 'addr-' + Date.now();
      this.state.addresses.push({
        id: newId,
        label: `Dirección ${this.state.addresses.length + 1}`,
        isDefault: false,
        ...this.form
      });
      this.state.selectedAddressId = newId;
    }

    this.router.navigateByUrl(this.returnTo || '/delivery');
  }
}