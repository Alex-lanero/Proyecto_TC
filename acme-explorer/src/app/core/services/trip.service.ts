import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trip } from '../../features/trips/trip.model';

@Injectable({
  providedIn: 'root'
})
export class TripService {

  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:3000/trips';

  getTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.apiUrl);
  }

  getTripsByRole(role: string) {
    return this.http.get<Trip[]>(`http://localhost:3000/trips?role=${role}`);
  }

  createTrip(trip: Trip) {
    return this.http.post('http://localhost:3000/trips', trip);
  }

}