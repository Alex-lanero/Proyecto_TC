import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '../pipes/translate-pipe';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.html',
  styleUrl: './header.scss'
})
export class HeaderComponent {

  authService = inject(AuthService);
  router = inject(Router);

  TranslatePipe = TranslatePipe;

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  changeLang(lang: string) {
    TranslatePipe.currentLang = lang;
    localStorage.setItem('lang', lang);
  }
}