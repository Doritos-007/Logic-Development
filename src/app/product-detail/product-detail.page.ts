import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonContent, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowBackOutline, cartOutline, flameOutline, leafOutline, locationOutline, removeOutline, addOutline } from 'ionicons/icons';
import { AppStateService, Product } from '../core/app-state.service';
import { BottomNavComponent } from '../shared/bottom-nav.component';

@Component({ selector:'app-product-detail', standalone:true, imports:[CommonModule,IonContent,IonIcon,BottomNavComponent], templateUrl:'./product-detail.page.html', styleUrls:['./product-detail.page.scss'] })
export class ProductDetailPage {
  product: Product;
  quantity=1; weight='250 g'; price=195;
  readonly presentations=[{label:'250 g',price:195},{label:'500 g',price:345},{label:'1 kg',price:650}];
  constructor(public state:AppStateService, private route:ActivatedRoute, private router:Router){
    addIcons({arrowBackOutline,cartOutline,flameOutline,leafOutline,locationOutline,removeOutline,addOutline});
    const id=this.route.snapshot.paramMap.get('id');
    this.product=this.state.products.find(p=>p.id===id) ?? this.state.products[0];
    this.price=this.product.id==='pergamino'?195:this.product.price;
  }
  back(){history.back();}
  select(label:string,price:number){this.weight=label;this.price=price;}
  inc(){this.quantity++;} dec(){if(this.quantity>1)this.quantity--;}
  add(){ for(let i=0;i<this.quantity;i++) this.state.addToCart(this.product,this.weight,this.price); }
  buy(){ this.add(); this.router.navigateByUrl('/cart'); }
  goCart(){this.router.navigateByUrl('/cart');}
}
