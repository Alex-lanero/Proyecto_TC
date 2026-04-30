import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { TripService } from '../../../core/services/trip.service';
import { ApplicationService } from '../../../core/services/application.service';
import { AuthService } from '../../../core/services/auth.service';
import { Trip } from '../models/trip.model';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-trip-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trip-detail.component.html',
  styleUrl: './trip-detail.component.scss'
})
export class TripDetailComponent implements OnInit {

  trip = signal<Trip | null>(null);

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private tripService: TripService,
    private applicationService: ApplicationService,
    public authService: AuthService
  ) {}

  ngOnInit() {

    const id = this.route.snapshot.paramMap.get('id');

    this.tripService.loadTrips();

    setTimeout(() => {
      const trip = this.tripService.trips().find(t => t.id === id);
      this.trip.set(trip || null);
    }, 300);
  }

  apply() {
    const trip = this.trip();
    if (!trip) return;

    this.applicationService.createApplication(
      trip.id,
      this.authService.currentUser()?.email || 'anonymous'
    );
  }
  getApplication(tripId: string) {
    const user = this.authService.currentUser();

    return this.applicationService.applications()
      .find(app =>
        app.tripId === tripId &&
        app.explorerId === user?.email
      );
  }

  getApplicationStatus(tripId: string): string | null {
    const app = this.getApplication(tripId);
    return app ? app.status : null;
  }

  canApply(trip: any): boolean {
    const user = this.authService.currentUser();

    if (!user) return false;
    if (trip.cancelled) return false;
    if (new Date(trip.startDate) < new Date()) return false;

    const alreadyApplied = this.applicationService.applications()
      .some(app =>
        app.tripId === trip.id &&
        app.explorerId === user.email
      );

    return !alreadyApplied;
  }

  applyToTrip(trip: any) {
    this.applicationService.createApplication(
      trip.id,
      this.authService.currentUser()?.email || ''
    );
  }

  goToPayment(trip: any) {
    const app = this.getApplication(trip.id);
    if (!app) return;

    this.router.navigate(['/payment', app.id, trip.price]);
  }
}