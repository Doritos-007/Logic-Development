import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { cardOutline, chevronForwardOutline, heartOutline, helpCircleOutline, locationOutline, logOutOutline, notificationsOutline, pencilOutline, receiptOutline, settingsOutline } from 'ionicons/icons';
import { AppStateService } from '../core/app-state.service';
import { BrandHeaderComponent } from '../shared/brand-header.component';
import { BottomNavComponent } from '../shared/bottom-nav.component';
@Component({selector:'app-profile',standalone:true,imports:[CommonModule,IonContent,IonIcon,BrandHeaderComponent,BottomNavComponent],templateUrl:'./profile.page.html',styleUrls:['./profile.page.scss']})
export class ProfilePage{
 message='';
 menu=[{icon:'receipt-outline',title:'Mis pedidos',sub:'Consulta el estado de tus compras',route:'/orders'},{icon:'location-outline',title:'Direcciones',sub:'Administra tus direcciones de entrega',route:'/address'},{icon:'card-outline',title:'Métodos de pago',sub:'Tarjetas y formas de pago',route:'/payment'},{icon:'heart-outline',title:'Favoritos',sub:'Tus productos favoritos'},{icon:'notifications-outline',title:'Notificaciones',sub:'Recibe novedades y promociones'},{icon:'help-circle-outline',title:'Ayuda y soporte',sub:'Estamos para ayudarte'},{icon:'settings-outline',title:'Configuración',sub:'Idioma, privacidad y más'}];
 constructor(public state:AppStateService,private router:Router){addIcons({cardOutline,chevronForwardOutline,heartOutline,helpCircleOutline,locationOutline,logOutOutline,notificationsOutline,pencilOutline,receiptOutline,settingsOutline});}
 open(item:any){if(item.route)this.router.navigateByUrl(item.route);else this.message=`${item.title}: disponible en la siguiente integración de servicios.`}
 logout(){this.router.navigateByUrl('/login')}
}
