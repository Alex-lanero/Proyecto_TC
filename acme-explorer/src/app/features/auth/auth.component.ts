import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('500ms ease-out',
          style({ opacity: 1, transform: 'translateY(0)' })
        )
      ])
    ])
  ]
})
export class AuthComponent {

  email = '';
  password = '';
  errorMessage = '';

  constructor(
    public authService: AuthService,
    private router: Router
  ) {}

  login() {

    if (!this.email || !this.password) {
      this.errorMessage = 'Please fill all fields';
      return;
    }

    const success = this.authService.login(this.email, this.password);

    if (success) {
      this.errorMessage = '';
      this.router.navigate(['/home']);
    } else {
      this.errorMessage = 'Invalid credentials';
    }
  }

  logout() {
    this.authService.logout();
  }
}