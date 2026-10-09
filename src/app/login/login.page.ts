import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonContent, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  cartOutline,
  eyeOffOutline,
  eyeOutline,
  lockClosedOutline,
  mailOutline
} from 'ionicons/icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, IonContent, IonIcon]
})
export class LoginPage {
  private fb = inject(FormBuilder);

  showPassword = false;
  statusMessage = '';

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  constructor(private router: Router) {
    addIcons({ cartOutline, eyeOffOutline, eyeOutline, lockClosedOutline, mailOutline });
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  submit(): void {
    this.statusMessage = '';
    this.loginForm.markAllAsTouched();
    if (this.loginForm.invalid) return;

    // Punto de integración para el servicio/API de autenticación.
    this.router.navigateByUrl('/home');
  }

  continueAsGuest(): void {
    this.router.navigateByUrl('/home');
  }

  goToRegister(): void {
    this.router.navigateByUrl('/register');
  }
}
