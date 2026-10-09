import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { cardOutline, locationOutline, carOutline } from 'ionicons/icons';
import { AppStateService } from '../core/app-state.service';
import { BrandHeaderComponent } from '../shared/brand-header.component';
import { BottomNavComponent } from '../shared/bottom-nav.component';
@Component({selector:'app-order-summary',standalone:true,imports:[CommonModule,IonContent,IonIcon,BrandHeaderComponent,BottomNavComponent],templateUrl:'./order-summary.page.html',styleUrls:['./order-summary.page.scss']})
export class OrderSummaryPage{
 constructor(public state:AppStateService,private router:Router){addIcons({cardOutline,locationOutline,carOutline});}
 edit(path:string){this.router.navigateByUrl(path)} confirm(){this.router.navigateByUrl('/order-success')}
 deliveryLabel(){return this.state.selectedDelivery==='express'?'Entrega exprés':this.state.selectedDelivery==='pickup'?'Recoger en tienda':'Envío estándar'}
 paymentLabel(){return this.state.selectedPayment==='spei'?'Transferencia SPEI':this.state.selectedPayment==='cash'?'Pago contra entrega':'Tarjeta de crédito terminada en 3456'}
}
