import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser = signal<string | null>(null);

  login(email: string, password: string): boolean {

    const validEmail = 'test@acme.com';
    const validPassword = '1234';

    if (email === validEmail && password === validPassword) {
      this.currentUser.set(email);
      return true;
    }

    return false;
  }

  logout() {
    this.currentUser.set(null);
  }

  isLogged() {
    return this.currentUser() !== null;
  }
}