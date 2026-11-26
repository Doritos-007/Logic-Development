import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { IonContent, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { cartOutline, optionsOutline, searchOutline, star } from 'ionicons/icons';
import { AppStateService, Product } from '../core/app-state.service';
import { BrandHeaderComponent } from '../shared/brand-header.component';
import { BottomNavComponent } from '../shared/bottom-nav.component';

@Component({
  selector:'app-store', standalone:true,
  imports:[CommonModule,FormsModule,IonContent,IonIcon,BrandHeaderComponent,BottomNavComponent],
  templateUrl:'./store.page.html',styleUrls:['./store.page.scss']
})
export class StorePage {
  query=''; active='Todos'; categories=['Todos','En grano','Molido','Tostado','Accesorios'];
  constructor(public state:AppStateService, private router:Router){ addIcons({cartOutline,optionsOutline,searchOutline,star}); }
  get filtered(){ const q=this.query.trim().toLowerCase(); return this.state.products.filter(p=>(this.active==='Todos'||p.category===this.active)&&(q===''||p.name.toLowerCase().includes(q)||p.subtitle.toLowerCase().includes(q))); }
  open(product:Product){ this.router.navigate(['/product',product.id]); }
  add(product:Product,e:Event){ e.stopPropagation(); this.state.addToCart(product); }
}
