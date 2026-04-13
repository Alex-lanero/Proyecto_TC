import { Component, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../../core/services/auth.service';
import { Trip } from '../models/trip.model';
import { TripService } from '../../../core/services/trip.service';
import { ApplicationService } from '../../../core/services/application.service';
import { Application } from '../models/application.model';
import { FavouriteService } from '../../../core/services/favourite.service';
import { NotificationService } from '../../../core/services/notification.service';

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

  selectedTripForFav = signal<string | null>(null);

  constructor(
    public authService: AuthService,
    private tripService: TripService,
    private applicationService: ApplicationService,
    private router: Router,
    public favouriteService: FavouriteService,
    private notificationService: NotificationService
  ) {
    this.trips = this.tripService.trips;
    this.applications = this.applicationService.applications;
  }

  ngOnInit() {
    this.tripService.loadTrips();
    this.applicationService.loadApplications();

    const email = this.authService.currentUser()?.email;
    if (email) {
      this.favouriteService.load(email);
    }
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
      this.notificationService.show('This trip is cancelled', 'error');
      return;
    }

    const now = new Date();

    if (new Date(trip.startDate) < now) {
      this.notificationService.show('Trip already started', 'error');
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

  addToFavourites(trip: Trip, event?: Event) {
    event?.stopPropagation();
    event?.preventDefault();

    const email = this.authService.currentUser()?.email;
    if (!email) {
      this.notificationService.show('You must be logged in as explorer', 'error');
      return;
    }

    this.favouriteService.load(email);

    const lists = this.favouriteService.favouriteLists();

    if (lists.length === 0) {
      this.notificationService.show('Create a favourite list first', 'error');
      return;
    }

    // MVP: añade a la primera lista
    this.favouriteService.addTripToList(email, lists[0].id, trip.id);
    this.notificationService.show('Trip added to favourites', 'success');
  }

  isFavourite(tripId: string): boolean {
    return this.favouriteService.isTripInAnyList(tripId);
  }

  openFavouriteSelector(tripId: string, event?: Event) {
    event?.stopPropagation();
    this.selectedTripForFav.set(tripId);
  }

  closeFavouriteSelector() {
    this.selectedTripForFav.set(null);
  }

  confirmAddToFavourites(tripId: string, listId: string) {

    const email = this.authService.currentUser()?.email;
    if (!email) return;

    this.favouriteService.addTripToList(email, listId, tripId);

    this.selectedTripForFav.set(null);

    this.notificationService.show('Added to favourites', 'success');
  }

  hasApplied(tripId: string): boolean {

    const email = this.authService.currentUser()?.email;

    return this.applicationService.applications().some(app =>
      app.tripId === tripId &&
      app.explorerId === email &&
      app.status !== 'REJECTED'
    );
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

  getCountdown(startDate: string | Date): string {

    const now = new Date();
    const start = new Date(startDate);

    const diff = start.getTime() - now.getTime();

    if (diff <= 0) return 'Started';

    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

    return `Starts in ${days} day${days > 1 ? 's' : ''}`;
  }

  getTripBadges(trip: any): string[] {

    const badges: string[] = [];

    // FULL
    if (trip.maxParticipants <= 0) {
      badges.push('FULL');
    }

    // CANCELLED
    if (trip.cancelled) {
      badges.push('CANCELLED');
    }

    // COMING SOON (empieza en menos de 3 días)
    const diff = new Date(trip.startDate).getTime() - new Date().getTime();
    const days = diff / (1000 * 60 * 60 * 24);

    if (days > 0 && days <= 3) {
      badges.push('COMING SOON');
    }

    return badges;
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

  goToPaymentFromTrip(trip: any, event: Event) {
    event.stopPropagation();

    const app = this.getApplication(trip.id);

    if (!app) return;

    this.router.navigate(['/payment', app.id, trip.price]);
  }
}