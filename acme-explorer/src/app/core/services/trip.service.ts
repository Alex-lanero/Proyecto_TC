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
}