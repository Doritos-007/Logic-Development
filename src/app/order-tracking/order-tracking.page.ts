import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { checkmark, leafOutline, locationOutline, carOutline } from 'ionicons/icons';
import { AppStateService } from '../core/app-state.service';
import { BrandHeaderComponent } from '../shared/brand-header.component';
import { BottomNavComponent } from '../shared/bottom-nav.component';
@Component({selector:'app-order-tracking',standalone:true,imports:[CommonModule,IonContent,IonIcon,BrandHeaderComponent,BottomNavComponent],templateUrl:'./order-tracking.page.html',styleUrls:['./order-tracking.page.scss']})
export class OrderTrackingPage{constructor(public state:AppStateService,private router:Router){addIcons({checkmark,leafOutline,locationOutline,carOutline});}}
