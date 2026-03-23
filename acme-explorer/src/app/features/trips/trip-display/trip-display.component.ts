import { Component, inject, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Trip } from '../trip.model';
import { AuthService } from '../../../core/services/auth.service';
import { TripService } from '../../../core/services/trip.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-trip-display',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './trip-display.component.html',
  styleUrl: './trip-display.component.scss',
})
export class TripDisplay implements OnInit {

  loading = true;
  selectedDifficulty = 'all';
  showForm = false;

  newTrip: any = {
    id: '',
    version: 0,
    ticker: '',
    title: '',
    description: '',
    price: 0,
    city: '',
    country: '',
    difficulty: 'easy',
    maxParticipants: 0,
    startDate: '',
    endDate: '',
    pictures: [''],
    cancelled: false,
    role: 'user'
  };

  public authService = inject(AuthService);
  private router = inject(Router);
  private tripService = inject(TripService);

  trips = signal<Trip[]>([]);

  ngOnInit() {
    const role = this.authService.getRole();
    this.tripService.getTripsByRole(role!).subscribe(data => {
      this.trips.set(
        data.map(trip => ({ ...trip, cancelled: false }))
      );
      this.loading = false;
    });
  }

  cancelTrip(trip: Trip) {
    trip.cancelled = true;
  }

  filteredTrips() {
    const role = this.authService.getRole();

    return this.trips().filter(trip => {
      const matchDifficulty =
        this.selectedDifficulty === 'all' ||
        trip.difficulty === this.selectedDifficulty;

      const matchRole =
        trip.role === role || trip.role === 'admin';

      return matchDifficulty && matchRole;
    });
  }

  createTrip() {

    const tripToSend = {
      ...this.newTrip,
      id: Date.now().toString(),
      ticker: this.generateTicker()
    };

    this.tripService.createTrip(tripToSend).subscribe(() => {
      this.showForm = false;

      const role = this.authService.getRole();
      this.tripService.getTripsByRole(role!).subscribe(data => {
        this.trips.set(data);
      });
    });
  }

  generateTicker(): string {
    const date = new Date();
    const y = date.getFullYear().toString().slice(2);
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');

    const letters = Math.random().toString(36).substring(2, 6).toUpperCase();

    return `${y}${m}${d}-${letters}`;
  }

}