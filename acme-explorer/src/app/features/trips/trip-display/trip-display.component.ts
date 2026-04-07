import { Component, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../../core/services/auth.service';
import { Trip } from '../models/trip.model';
import { TripService } from '../../../core/services/trip.service';
import { ApplicationService } from '../../../core/services/application.service';
import { Application } from '../models/application.model';

@Component({
  selector: 'app-trip-display',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './trip-display.component.html',
  styleUrl: './trip-display.component.scss'
})
export class TripDisplay implements OnInit {

  trips = signal<Trip[]>([]);
  applications = signal<Application[]>([]);
  loading = false;

  selectedDifficulty = signal<'all' | 'easy' | 'medium' | 'hard'>('all');
  searchTerm = signal('');

  constructor(
    public authService: AuthService,
    private tripService: TripService,
    private applicationService: ApplicationService,
    private router: Router
  ) {
    this.trips = this.tripService.trips;
    this.applications = this.applicationService.applications;
  }

  ngOnInit() {
    this.tripService.loadTrips();
    this.applicationService.loadApplications();
  }

  filteredTrips = computed(() => {
    let trips = this.trips();

    if (!this.authService.isManager()) {
      trips = trips.filter(t => !t.cancelled);
    }

    if (this.authService.isManager()) {
      const managerId = this.authService.currentUser()?.id;
      trips = trips.filter(t => t.managerId === managerId);
    }

    if (this.selectedDifficulty() !== 'all') {
      trips = trips.filter(
        t => t.difficulty === this.selectedDifficulty()
      );
    }

    if (this.searchTerm().trim() !== '') {
      const term = this.searchTerm().toLowerCase();

      trips = trips.filter(t =>
        t.title.toLowerCase().includes(term) ||
        t.description.toLowerCase().includes(term) ||
        t.city.toLowerCase().includes(term) ||
        t.country.toLowerCase().includes(term) ||
        t.ticker.toLowerCase().includes(term)
      );
    }

    return trips;
  });

  getAvailablePlaces(trip: Trip): number {
    const acceptedApplications = this.applications().filter(
      app => app.tripId === trip.id && app.status === 'ACCEPTED'
    );

    return trip.maxParticipants - acceptedApplications.length;
  }

  canCancel(trip: Trip): boolean {
    if (trip.cancelled) return false;

    const now = new Date();
    const start = new Date(trip.startDate);
    const diffDays = (start.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);

    return diffDays >= 7;
  }

  applyToTrip(trip: Trip) {
    if (trip.cancelled) {
      alert('This trip is cancelled');
      return;
    }

    const now = new Date();

    if (new Date(trip.startDate) < now) {
      alert('Trip already started');
      return;
    }

    this.applicationService.createApplication(
      trip.id,
      this.authService.currentUser()?.email || 'anonymous'
    );
  }

  cancelTrip(trip: Trip, event?: Event) {
    event?.stopPropagation();
    event?.preventDefault();
    this.tripService.cancelTrip(trip);
  }

  editTrip(trip: Trip, event?: Event) {
    event?.stopPropagation();
    event?.preventDefault();

    this.router.navigate(['/manager/edit-trip', trip.id]);
  }

  reactivateTrip(trip: Trip, event?: Event) {
    event?.stopPropagation();

    this.tripService.reactivateTrip(trip);
  }
}