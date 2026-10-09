import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { chevronForwardOutline } from 'ionicons/icons';
import { AppStateService } from '../core/app-state.service';
import { BrandHeaderComponent } from '../shared/brand-header.component';
import { BottomNavComponent } from '../shared/bottom-nav.component';
@Component({selector:'app-orders',standalone:true,imports:[CommonModule,IonContent,IonIcon,BrandHeaderComponent,BottomNavComponent],templateUrl:'./orders.page.html',styleUrls:['./orders.page.scss']})
export class OrdersPage{
 filter='Todos'; filters=['Todos','En proceso','Entregados','Cancelados'];
 orders=[
 {id:'#CCU-2024-0876',date:'12 nov 2024',count:'2 productos',total:'$840 MXN',status:'Entregado',cls:'delivered'},
 {id:'#CCU-2024-0763',date:'28 oct 2024',count:'3 productos',total:'$1,125 MXN',status:'En camino',cls:'road'},
 {id:'#CCU-2024-0689',date:'15 oct 2024',count:'1 producto',total:'$345 MXN',status:'Preparando',cls:'prep'},
 {id:'#CCU-2024-0521',date:'2 oct 2024',count:'2 productos',total:'$550 MXN',status:'Entregado',cls:'delivered'},
 {id:'#CCU-2024-0418',date:'18 sep 2024',count:'1 producto',total:'$210 MXN',status:'Entregado',cls:'delivered'}];
 constructor(public state:AppStateService,private router:Router){addIcons({chevronForwardOutline});}
 open(){this.router.navigateByUrl('/order-tracking')}
}
