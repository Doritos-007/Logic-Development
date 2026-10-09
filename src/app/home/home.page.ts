import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowForwardOutline, cartOutline, searchOutline } from 'ionicons/icons';
import { AppStateService, Product } from '../core/app-state.service';
import { BrandHeaderComponent } from '../shared/brand-header.component';
import { BottomNavComponent } from '../shared/bottom-nav.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, IonContent, IonIcon, BrandHeaderComponent, BottomNavComponent],
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage {
  categories = [
    { label: 'En grano', image: 'assets/img/category-grano.png' },
    { label: 'Molido', image: 'assets/img/category-molido.png' },
    { label: 'Tostado', image: 'assets/img/category-tostado.png' },
    { label: 'Accesorios', image: 'assets/img/category-accesorios.png' }
  ];

  constructor(public state: AppStateService, private router: Router) {
    addIcons({ arrowForwardOutline, cartOutline, searchOutline });
  }

  goStore(): void { this.router.navigateByUrl('/store'); }
  openProduct(product: Product): void { this.router.navigate(['/product', product.id]); }
  add(product: Product, event?: Event): void {
    event?.stopPropagation();
    this.state.addToCart(product);
  }
}
