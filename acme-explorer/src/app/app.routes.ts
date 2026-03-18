import { Routes } from '@angular/router';
import { TripDisplay } from './features/trips/trip-display/trip-display.component';
import { AuthComponent } from './features/auth/auth.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', component: AuthComponent },
  { path: 'trips', component: TripDisplay, canActivate: [authGuard] }
];