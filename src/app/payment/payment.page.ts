import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonContent, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { cardOutline, cashOutline, businessOutline, eyeOutline } from 'ionicons/icons';
import { AppStateService } from '../core/app-state.service';
import { BrandHeaderComponent } from '../shared/brand-header.component';
import { BottomNavComponent } from '../shared/bottom-nav.component';
import { CheckoutStepsComponent } from '../shared/checkout-steps.component';
@Component({selector:'app-payment',standalone:true,imports:[CommonModule,FormsModule,IonContent,IonIcon,BrandHeaderComponent,BottomNavComponent,CheckoutStepsComponent],templateUrl:'./payment.page.html',styleUrls:['./payment.page.scss']})
export class PaymentPage{
 saveCard=true; billing='same'; card={name:'Juan Pérez García',number:'1234 5678 9012 3456',expiry:'MM / AA',cvv:'123'};
 constructor(public state:AppStateService,private router:Router){addIcons({cardOutline,cashOutline,businessOutline,eyeOutline});}
 next(){this.router.navigateByUrl('/order-summary')}
}
