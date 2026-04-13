import { Injectable, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../shared/models/user.model';
import { UserRole } from '../../shared/models/user-role.type';
import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000/users';

  private platformId = inject(PLATFORM_ID);

  currentUser = signal<User | null>(null);
  role = signal<UserRole>('anonymous');

  isAuthenticated = computed(() => this.role() !== 'anonymous');
  isAnonymous = computed(() => this.role() === 'anonymous');

  isExplorer = computed(() => this.role() === 'explorer');
  isManager = computed(() => this.role() === 'manager');
  isAdministrator = computed(() => this.role() === 'administrator');

  constructor(private http: HttpClient) {

    if (isPlatformBrowser(this.platformId)) {

      const storedUser = localStorage.getItem('user');

      if (storedUser) {
        const user = JSON.parse(storedUser);

        this.currentUser.set(user);
        this.role.set(user.role);
      }

    }
  }

  login(email: string, password: string): Promise<boolean> {

    return new Promise(resolve => {

      this.http.get<User[]>(`${this.apiUrl}?email=${email}&password=${password}`)
        .subscribe(users => {

          if (users.length > 0) {
            const user = users[0];

            this.currentUser.set(user);
            this.role.set(user.role);

            if (isPlatformBrowser(this.platformId)) {
              localStorage.setItem('user', JSON.stringify(user));
            }

            resolve(true);
          } else {
            resolve(false);
          }

        });

    });
  }

  register(email: string, password: string): Promise<boolean> {

    const newUser: User = {
      id: Date.now().toString(),
      email,
      password,
      role: 'explorer'
    };

    return new Promise(resolve => {

      this.http.post(this.apiUrl, newUser).subscribe(() => {
        resolve(true);
      });

    });
  }

  logout() {
    this.currentUser.set(null);
    this.role.set('anonymous');

    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('user');
    }
  }
}