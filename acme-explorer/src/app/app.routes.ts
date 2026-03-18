import { Routes } from '@angular/router';
import { TripDisplay } from './features/trips/trip-display/trip-display.component';
import { AuthComponent } from './features/auth/auth.component';
import { authGuard } from './core/guards/auth.guard';
import { HomeComponent } from './features/home/home.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: AuthComponent },
  { path: 'home', component: HomeComponent },
  { path: 'trips', component: TripDisplay, canActivate: [authGuard] }
];