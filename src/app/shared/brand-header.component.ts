import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { arrowBackOutline, personCircleOutline } from 'ionicons/icons';

@Component({
  selector: 'app-brand-header',
  standalone: true,
  imports: [CommonModule, IonIcon],
  template: `
    <header class="app-brand-header">
      <button type="button" class="head-icon" [class.invisible]="!back" (click)="goBack()" aria-label="Volver">
        <ion-icon name="arrow-back-outline"></ion-icon>
      </button>
      <div class="brand-cluster" [class.centered]="back">
        <img src="assets/img/logo-cafe-cuauhtemoc.png" alt="" />
        <strong>Café Cuauhtémoc</strong>
      </div>
      <button type="button" class="avatar-button" (click)="goProfile()" aria-label="Perfil">
        <ion-icon name="person-circle-outline"></ion-icon>
      </button>
    </header>
  `,
  styles: [`
    :host{display:block}
    .app-brand-header{display:grid;grid-template-columns:auto 1fr auto;align-items:center;gap:10px;min-height:54px}
    .brand-cluster{display:flex;align-items:center;gap:9px;min-width:0}
    .brand-cluster.centered{justify-content:center}
    .brand-cluster img{width:37px;height:43px;object-fit:contain;flex:0 0 auto}
    .brand-cluster strong{font-size:18px;font-weight:800;letter-spacing:-.35px;white-space:nowrap}
    .head-icon,.avatar-button{width:42px;height:42px;border:0;background:transparent;padding:0;display:grid;place-items:center;cursor:pointer;color:#111}
    .head-icon.invisible{visibility:hidden;pointer-events:none}
    .head-icon ion-icon{font-size:27px}
    .avatar-button ion-icon{font-size:39px;color:#d7dce4}
  `]
})
export class BrandHeaderComponent {
  @Input() back = false;
  constructor(private router: Router) {
    addIcons({ arrowBackOutline, personCircleOutline });
  }

  goBack(): void { history.back(); }

  goProfile(): void {
    this.router.navigateByUrl('/profile');
  }
}
