import { Component, OnInit, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationService } from '../../../core/services/application.service';
import { TripService } from '../../../core/services/trip.service';
import { AuthService } from '../../../core/services/auth.service';
import { RouterLink } from '@angular/router';
import { Application } from '../models/application.model';
import { Trip } from '../models/trip.model';

@Component({
  selector: 'app-accepted-trips',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './accepted-trips.component.html',
  styleUrl: './accepted-trips.component.scss'
})
export class AcceptedTripsComponent implements OnInit {

  trips = signal<Trip[]>([]);
  applications = signal<Application[]>([]);

  constructor(
    private applicationService: ApplicationService,
    private tripService: TripService,
    private authService: AuthService
  ) {
    this.trips = this.tripService.trips;
    this.applications = this.applicationService.applications;
  }

  ngOnInit() {
    this.applicationService.loadApplications();
    this.tripService.loadTrips();
  }

  acceptedTrips = computed(() => {

    const email = this.authService.currentUser()?.email;

    const acceptedApps = this.applications().filter(app =>
      app.explorerId === email &&
      app.status === 'ACCEPTED'
    );

    return this.trips().filter(trip =>
      acceptedApps.some(app => app.tripId === trip.id)
    );

  });
}