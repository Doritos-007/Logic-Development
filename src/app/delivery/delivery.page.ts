import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { flashOutline, leafOutline, storefrontOutline, carOutline } from 'ionicons/icons';
import { AppStateService } from '../core/app-state.service';
import { BrandHeaderComponent } from '../shared/brand-header.component';
import { BottomNavComponent } from '../shared/bottom-nav.component';
import { CheckoutStepsComponent } from '../shared/checkout-steps.component';
@Component({selector:'app-delivery',standalone:true,imports:[CommonModule,IonContent,IonIcon,BrandHeaderComponent,BottomNavComponent,CheckoutStepsComponent],templateUrl:'./delivery.page.html',styleUrls:['./delivery.page.scss']})
export class DeliveryPage{
 constructor(public state:AppStateService,private router:Router){addIcons({flashOutline,leafOutline,storefrontOutline,carOutline});}
 select(v:string){this.state.selectedDelivery=v} next(){this.router.navigateByUrl('/payment')}
}
