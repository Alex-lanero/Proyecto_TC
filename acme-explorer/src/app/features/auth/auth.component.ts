import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent {

  email = signal('');
  password = signal('');
  isRegisterMode = signal(false);
  error = signal('');

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  async submit() {

    if (this.isRegisterMode()) {

      await this.authService.register(this.email(), this.password());
      this.isRegisterMode.set(false);
      this.error.set('User created. Please login.');

    } else {

      const success = await this.authService.login(this.email(), this.password());

      if (success) {
        this.router.navigate(['/home']);
      } else {
        this.error.set('Invalid credentials');
      }

    }
  }

  toggleMode() {
    this.isRegisterMode.set(!this.isRegisterMode());
    this.error.set('');
  }
}