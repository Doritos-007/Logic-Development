import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonContent, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { addOutline, businessOutline, callOutline, locationOutline, mailOutline, personOutline } from 'ionicons/icons';
import { AppStateService } from '../core/app-state.service';
import { BrandHeaderComponent } from '../shared/brand-header.component';
import { BottomNavComponent } from '../shared/bottom-nav.component';

@Component({selector:'app-address',standalone:true,imports:[CommonModule,FormsModule,IonContent,IonIcon,BrandHeaderComponent,BottomNavComponent],templateUrl:'./address.page.html',styleUrls:['./address.page.scss']})
export class AddressPage{
 selected='home'; form={name:'Juan Pérez García',street:'Calle Primavera 123',colony:'Col. Centro',city:'Tuxtla Gutiérrez',state:'Chiapas',zip:'29000',phone:'+52 961 234 5678'};
 constructor(public state:AppStateService,private router:Router){addIcons({addOutline,businessOutline,callOutline,locationOutline,mailOutline,personOutline});}
 next(){this.router.navigateByUrl('/delivery')}
}
