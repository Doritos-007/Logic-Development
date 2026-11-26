import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonContent, IonIcon } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import {
  callOutline,
  chevronBackOutline,
  eyeOffOutline,
  eyeOutline,
  lockClosedOutline,
  mailOutline,
  person,
  personOutline
} from 'ionicons/icons';
import { AppStateService } from '../core/app-state.service';
import { BottomNavComponent } from '../shared/bottom-nav.component';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, IonContent, IonIcon, BottomNavComponent],
  templateUrl: './edit-profile.html',
  styleUrls: ['./edit-profile.scss']
})
export class EditProfilePage {
  user = {
    name: '',
    email: '',
    phone: ''
  };

  passwords = {
    newPassword: '',
    confirmPassword: ''
  };

  showNewPass = false;
  showConfirmPass = false;
  message = '';
  isError = false;

  constructor(public state: AppStateService, private router: Router) {
    addIcons({
      callOutline,
      chevronBackOutline,
      eyeOffOutline,
      eyeOutline,
      lockClosedOutline,
      mailOutline,
      person,
      personOutline
    });
    this.loadUserData();
  }

  ionViewWillEnter() {
    this.loadUserData();
  }

  private loadUserData() {
    this.user = {
      name: this.state.currentUser.fullName || '',
      email: this.state.currentUser.email || '',
      phone: this.state.currentUser.phone || ''
    };
    this.message = '';
    this.isError = false;
  }

  goBack() {
    this.router.navigateByUrl('/profile');
  }

  saveChanges() {
    if (!this.user.name.trim() || !this.user.email.trim()) {
      this.isError = true;
      this.message = 'El nombre y el correo electrónico son obligatorios.';
      return;
    }

    if (this.passwords.newPassword || this.passwords.confirmPassword) {
      if (this.passwords.newPassword !== this.passwords.confirmPassword) {
        this.isError = true;
        this.message = 'Las contraseñas no coinciden.';
        return;
      }
    }

    // Actualiza el usuario global en AppStateService
    this.state.currentUser = {
      ...this.state.currentUser,
      fullName: this.user.name.trim(),
      email: this.user.email.trim(),
      phone: this.user.phone.trim()
    };

    // Guarda en localStorage para conservar los datos si se recarga la página
    localStorage.setItem('cafe_current_user', JSON.stringify(this.state.currentUser));

    this.isError = false;
    this.message = 'Perfil actualizado correctamente.';
    this.passwords = { newPassword: '', confirmPassword: '' };

    setTimeout(() => {
      this.router.navigateByUrl('/profile');
    }, 700);
  }
}