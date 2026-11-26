import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { callOutline, chevronBackOutline, logoWhatsapp } from 'ionicons/icons';
import { AppStateService } from '../core/app-state.service';
import { BottomNavComponent } from '../shared/bottom-nav.component';

@Component({
  selector: 'app-support',
  standalone: true,
  imports: [CommonModule, IonContent, IonIcon, BottomNavComponent],
  templateUrl: './support.html',
  styleUrls: ['./support.scss']
})
export class SupportPage {
  constructor(public state: AppStateService, private router: Router) {
    addIcons({ callOutline, chevronBackOutline, logoWhatsapp });
  }

  goBack() {
    this.router.navigateByUrl('/profile');
  }
}