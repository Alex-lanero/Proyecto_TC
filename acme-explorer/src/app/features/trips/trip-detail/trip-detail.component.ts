import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { TripService } from '../../../core/services/trip.service';
import { ApplicationService } from '../../../core/services/application.service';
import { AuthService } from '../../../core/services/auth.service';
import { Trip } from '../models/trip.model';

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
}