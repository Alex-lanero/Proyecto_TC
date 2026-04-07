import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Trip } from '../../features/trips/models/trip.model';

@Injectable({
  providedIn: 'root'
})
export class TripService {

  private apiUrl = 'http://localhost:3000/trips';

  trips = signal<Trip[]>([]);

  constructor(private http: HttpClient) {}

  loadTrips() {
    this.http.get<Trip[]>(this.apiUrl).subscribe(data => {
      this.trips.set(data);
    });
  }

  cancelTrip(trip: Trip) {

    const now = new Date();
    const start = new Date(trip.startDate);

    const diffDays = (start.getTime() - now.getTime()) / (1000 * 60 * 60 * 24);

    if (diffDays < 7) {
      alert('Cannot cancel trip less than 7 days before start');
      return;
    }

    this.http.patch(`${this.apiUrl}/${trip.id}`, {
      cancelled: true
    }).subscribe(() => {
      this.loadTrips();
    });
  }

  createTrip(trip: Trip) {
    this.http.post(this.apiUrl, trip).subscribe(() => {
      this.loadTrips();
    });
  }

  updateTrip(trip: Trip) {
    this.http.put(`${this.apiUrl}/${trip.id}`, trip)
      .subscribe(() => {
        this.loadTrips();
      });
  }
  reactivateTrip(trip: Trip) {

    this.http.patch(`${this.apiUrl}/${trip.id}`, {
      cancelled: false
    }).subscribe(() => {
      this.loadTrips();
    });

  }
}