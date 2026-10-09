import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonContent, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  arrowBackOutline,
  callOutline,
  checkmarkOutline,
  eyeOffOutline,
  eyeOutline,
  lockClosedOutline,
  mailOutline,
  personOutline
} from 'ionicons/icons';

function samePassword(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password')?.value;
  const confirm = control.get('confirmPassword')?.value;
  return password && confirm && password !== confirm ? { passwordMismatch: true } : null;
}

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, IonContent, IonIcon]
})
export class RegisterPage {
  private fb = inject(FormBuilder);

  showPassword = false;
  showConfirmPassword = false;
  statusMessage = '';

  registerForm = this.fb.group(
    {
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9+\s()-]{10,20}$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      terms: [false, Validators.requiredTrue]
    },
    { validators: samePassword }
  );

  constructor(private router: Router) {
    addIcons({ arrowBackOutline, callOutline, checkmarkOutline, eyeOffOutline, eyeOutline, lockClosedOutline, mailOutline, personOutline });
  }

  back(): void {
    this.router.navigateByUrl('/login');
  }

  togglePassword(): void {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  submit(): void {
    this.statusMessage = '';
    this.registerForm.markAllAsTouched();
    if (this.registerForm.invalid) return;

    // Punto de integración para el servicio/API de registro.
    this.router.navigateByUrl('/home');
  }
}
