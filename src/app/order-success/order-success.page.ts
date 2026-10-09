import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { checkmark, copyOutline, documentTextOutline, leafOutline, carOutline } from 'ionicons/icons';
import { AppStateService } from '../core/app-state.service';
import { BrandHeaderComponent } from '../shared/brand-header.component';
import { BottomNavComponent } from '../shared/bottom-nav.component';
@Component({selector:'app-order-success',standalone:true,imports:[CommonModule,IonContent,IonIcon,BrandHeaderComponent,BottomNavComponent],templateUrl:'./order-success.page.html',styleUrls:['./order-success.page.scss']})
export class OrderSuccessPage{
 copied=false;
 constructor(public state:AppStateService,private router:Router){addIcons({checkmark,copyOutline,documentTextOutline,leafOutline,carOutline});}
 copy(){this.copied=true; navigator.clipboard?.writeText('#CCU-2024-0876').catch(()=>{});}
 view(){this.router.navigateByUrl('/order-tracking')} home(){this.router.navigateByUrl('/home')}
}
