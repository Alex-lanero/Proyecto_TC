import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Trip } from '../trip.model';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-trip-display',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './trip-display.component.html',
  styleUrl: './trip-display.component.scss',
})
export class TripDisplay {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  trip: Trip = {
    id: '1',
    version: 0,
    ticker: '250318-ABCD',
    title: 'Mountain Adventure',
    description: 'Explore the mountains with expert guides.',
    price: 120,

    city: 'Granada',
    country: 'Spain',

    difficulty: 'medium',

    maxParticipants: 10,
    startDate: '2025-06-01',
    endDate: '2025-06-05',

    pictures: ['/images/mountain.jpg'],
    cancelled: false
  };

  cancelTrip() {
    this.trip.cancelled = true;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']); // vuelve al login
  }
}