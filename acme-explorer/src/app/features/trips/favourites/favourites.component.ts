import { Component, OnInit, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavouriteService } from '../../../core/services/favourite.service';
import { AuthService } from '../../../core/services/auth.service';
import { TripService } from '../../../core/services/trip.service';
import { FavouriteList } from '../models/favourite-list.model';
import { Trip } from '../models/trip.model';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-favourites',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './favourites.component.html',
  styleUrl: './favourites.component.scss'
})
export class FavouritesComponent implements OnInit {

  newListName = signal('');

  favouriteLists = signal<FavouriteList[]>([]);
  trips = signal<Trip[]>([]);

  constructor(
    private favouriteService: FavouriteService,
    public authService: AuthService,
    private tripService: TripService
  ) {
    // 🔥 AQUÍ (no arriba)
    this.favouriteLists = this.favouriteService.favouriteLists;
    this.trips = this.tripService.trips;
  }

  ngOnInit() {
    const email = this.authService.currentUser()?.email;
    if (!email) return;

    this.favouriteService.load(email);
    this.tripService.loadTrips();
  }

  createList() {
    const email = this.authService.currentUser()?.email;
    const name = this.newListName().trim();

    if (!email || !name) {
      alert('Enter a list name');
      return;
    }

    this.favouriteService.createList(email, name);
    this.newListName.set('');
  }

  deleteList(listId: string) {
    const email = this.authService.currentUser()?.email;
    if (!email) return;

    this.favouriteService.deleteList(email, listId);
  }

  getTripsForList(list: FavouriteList): Trip[] {
    return this.trips().filter(trip => list.tripIds.includes(trip.id));
  }

  removeTrip(listId: string, tripId: string) {
    const email = this.authService.currentUser()?.email;
    if (!email) return;

    this.favouriteService.removeTripFromList(email, listId, tripId);
  }
}