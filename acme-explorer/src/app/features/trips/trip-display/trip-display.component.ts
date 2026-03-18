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

  private authService = inject(AuthService);
  private router = inject(Router);
  private tripService = inject(TripService);

  trips = signal<Trip[]>([]);

  ngOnInit() {
    this.tripService.getTrips().subscribe(data => {
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
    if (this.selectedDifficulty === 'all') {
      return this.trips();
    }

    return this.trips().filter(
      t => t.difficulty === this.selectedDifficulty
    );
  }

}