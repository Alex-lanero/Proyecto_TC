import { Routes } from '@angular/router';
import { TripDisplay } from './features/trips/trip-display/trip-display.component';
import { AuthComponent } from './features/auth/auth.component';
import { authGuard } from './core/guards/auth.guard';
import { HomeComponent } from './features/home/home.component';
import { ExplorerApplicationsComponent } from './features/trips/explorer-applications/explorer-applications.component';
import { ManagerApplicationsComponent } from './features/trips/manager-applications/manager-applications.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: AuthComponent },
  { path: 'home', component: HomeComponent },
  { path: 'trips', component: TripDisplay, canActivate: [authGuard] },

  { path: 'explorer-applications', component: ExplorerApplicationsComponent },
  { path: 'manager-applications/:id', component: ManagerApplicationsComponent }
];