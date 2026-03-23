import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser = signal<string | null>(null);
  userRole = signal<'user' | 'admin' | null>(null);

  login(email: string, password: string): boolean {

    if (!email || !password) return false;

    // usuarios fake
    if (email === 'test@acme.com' && password === '1234') {
      this.currentUser.set(email);
      this.userRole.set('user');
      return true;
    }

    if (email === 'admin@acme.com' && password === '1234') {
      this.currentUser.set(email);
      this.userRole.set('admin');
      return true;
    }

    return false;
  }

  logout() {
    this.currentUser.set(null);
    this.userRole.set(null);
  }

  isLogged() {
    return this.currentUser() !== null;
  }

  getRole() {
    return this.userRole();
  }
}