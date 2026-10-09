import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { cardOutline, checkmark, documentTextOutline, locationOutline, carOutline } from 'ionicons/icons';

@Component({
  selector: 'app-checkout-steps',
  standalone: true,
  imports: [CommonModule, IonIcon],
  template: `
    <div class="steps">
      <div class="step" [class.done]="active>1" [class.current]="active===1">
        <div class="circle"><ion-icon [name]="active>1 ? 'checkmark' : 'location-outline'"></ion-icon></div><span>Dirección</span>
      </div>
      <div class="line" [class.done]="active>1"></div>
      <div class="step" [class.done]="active>2" [class.current]="active===2">
        <div class="circle"><ion-icon [name]="active>2 ? 'checkmark' : 'car-outline'"></ion-icon></div><span>Entrega</span>
      </div>
      <div class="line" [class.done]="active>2"></div>
      <div class="step" [class.done]="active>3" [class.current]="active===3">
        <div class="circle"><span *ngIf="active===3">3</span><ion-icon *ngIf="active!==3" name="card-outline"></ion-icon></div><span>Pago</span>
      </div>
      <div class="line" [class.done]="active>3"></div>
      <div class="step" [class.current]="active===4">
        <div class="circle"><span *ngIf="active===4">4</span><ion-icon *ngIf="active!==4" name="document-text-outline"></ion-icon></div><span>Resumen</span>
      </div>
    </div>
  `,
  styles: [`
    .steps{display:grid;grid-template-columns:auto 1fr auto 1fr auto 1fr auto;align-items:start;margin:14px 6px 16px}
    .step{display:flex;flex-direction:column;align-items:center;gap:5px;color:#667085;font-size:11px;min-width:58px}.circle{width:31px;height:31px;border-radius:50%;background:#e9edf3;color:#667085;display:grid;place-items:center;font-weight:700}.circle ion-icon{font-size:17px}.line{height:2px;background:#e2e6ec;margin-top:15px;min-width:22px}.step.done .circle,.step.current .circle{background:#08a54e;color:#fff}.step.done,.step.current{color:#089944}.line.done{background:#08a54e}
  `]
})
export class CheckoutStepsComponent {
  @Input() active = 1;
  constructor(){ addIcons({ cardOutline, checkmark, documentTextOutline, locationOutline, carOutline }); }
}
