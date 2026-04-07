import { Routes } from '@angular/router';

import { HomeComponent } from './features/home/home.component';
import { AuthComponent } from './features/auth/auth.component';
import { TripDisplay } from './features/trips/trip-display/trip-display.component';
import { ExplorerApplicationsComponent } from './features/trips/explorer-applications/explorer-applications.component';
import { ManagerApplicationsComponent } from './features/trips/manager-applications/manager-applications.component';
import { CreateTripComponent } from './features/trips/create-trip/create-trip.component'
import { TripDetailComponent } from './features/trips/trip-detail/trip-detail.component'
import { FavouritesComponent } from './features/trips/favourites/favourites.component';
import { AcceptedTripsComponent } from './features/trips/accepted-trips/accepted-trips.component';

// (lo crearemos luego)
import { AdminDashboardComponent } from './features/admin/dashboard/admin-dashboard.component';

export const routes: Routes = [

  // 🔹 PUBLICO
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: AuthComponent },
  { path: 'trips', component: TripDisplay },
  { path: 'trips/:id', component: TripDetailComponent },
  { path: 'explorer/favourites', component: FavouritesComponent },

  // 🔹 EXPLORER
  { path: 'explorer/applications', component: ExplorerApplicationsComponent },
  { path: 'explorer/trips', component: AcceptedTripsComponent },

  // 🔹 MANAGER
  { path: 'manager/applications', component: ManagerApplicationsComponent },
  { path: 'manager/create-trip', component: CreateTripComponent },
  { path: 'manager/edit-trip/:id', component: CreateTripComponent },

  // 🔹 ADMIN
  { path: 'admin/dashboard', component: AdminDashboardComponent },

  // 🔹 FALLBACK
  { path: '**', redirectTo: 'home' }

];