import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, switchMap, tap } from 'rxjs';
import { AppStateService } from './app-state.service';

export interface FakeStoreUser {
  id: number;
  email: string;
  username: string;
  name: { firstname: string; lastname: string };
  phone: string;
  address: {
    city: string;
    street: string;
    number: number;
    zipcode: string;
  };
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private state = inject(AppStateService);
  private readonly apiUrl = 'https://fakestoreapi.com';

  login(identifier: string, password: string): Observable<FakeStoreUser> {
    return this.http.get<FakeStoreUser[]>(`${this.apiUrl}/users`).pipe(
      map((users) => {
        const clean = identifier.trim().toLowerCase();
        const found = users.find(
          (u) => u.username.toLowerCase() === clean || u.email.toLowerCase() === clean
        );
        return found ? found.username : identifier.trim();
      }),
      switchMap((username) =>
        this.http
          .post<{ token: string }>(`${this.apiUrl}/auth/login`, { username, password })
          .pipe(map((res) => ({ token: res.token, username })))
      ),
      switchMap(({ token, username }) => {
        localStorage.setItem('auth_token', token);
        return this.http.get<FakeStoreUser[]>(`${this.apiUrl}/users`).pipe(
          map((users) => users.find((u) => u.username === username)!)
        );
      }),
      tap((user) => {
        if (user) {
          this.state.setAuthenticatedUser(user);
        }
      })
    );
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    this.state.clearAuthenticatedUser();
  }
}