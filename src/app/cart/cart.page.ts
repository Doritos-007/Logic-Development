import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonContent, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { addOutline, informationCircleOutline, removeOutline, trashOutline } from 'ionicons/icons';
import { AppStateService, CartItem } from '../core/app-state.service';
import { BrandHeaderComponent } from '../shared/brand-header.component';
import { BottomNavComponent } from '../shared/bottom-nav.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, IonContent, IonIcon, BrandHeaderComponent, BottomNavComponent],
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss']
})
export class CartPage {
  constructor(
    public state: AppStateService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    addIcons({ addOutline, informationCircleOutline, removeOutline, trashOutline });
  }

  inc(i: CartItem) {
    this.state.increase(i);
  }

  dec(i: CartItem) {
    this.state.decrease(i);
  }

  remove(i: CartItem) {
    this.state.remove(i);
  }

  next() {
    const returnTo = this.route.snapshot.queryParamMap.get('returnTo');
    this.router.navigateByUrl(returnTo || '/address');
  }
}