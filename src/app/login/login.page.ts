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
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, IonContent, IonIcon]
})
export class LoginPage {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);

  showPassword = false;
  loading = false;
  statusMessage = '';

  loginForm = this.fb.group({
    email: ['johnd', [Validators.required]],
    password: ['m38rmF$', [Validators.required, Validators.minLength(4)]]
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
    if (this.loginForm.invalid || this.loading) return;

    this.loading = true;
    this.statusMessage = 'Verificando credenciales...';

    const { email, password } = this.loginForm.value;

    this.auth.login(email!, password!).subscribe({
      next: () => {
        this.loading = false;
        this.statusMessage = '';
        this.router.navigateByUrl('/home');
      },
      error: () => {
        this.loading = false;
        this.statusMessage = 'Usuario o contraseña incorrectos en Fake Store API.';
      }
    });
  }

  continueAsGuest(): void {
    this.router.navigateByUrl('/home');
  }

  goToRegister(): void {
    this.router.navigateByUrl('/register');
  }
}