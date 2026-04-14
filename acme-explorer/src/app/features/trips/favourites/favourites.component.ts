import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavouriteService } from '../../../core/services/favourite.service';
import { AuthService } from '../../../core/services/auth.service';
import { TripService } from '../../../core/services/trip.service';
import { FavouriteList } from '../models/favourite-list.model';
import { Trip } from '../models/trip.model';
import { RouterLink } from '@angular/router';
import { NotificationService } from '../../../core/services/notification.service';

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
    private tripService: TripService,
    private notificationService: NotificationService
  ) {
    this.favouriteLists = this.favouriteService.favouriteLists;
    this.trips = this.tripService.trips;
  }

  ngOnInit() {
    const email = this.authService.currentUser()?.email;
    if (!email) return;

    this.favouriteService.loadLists(email); // ✅ FIX
    this.tripService.loadTrips();
  }

  createList() {
    const email = this.authService.currentUser()?.email;
    const name = this.newListName().trim();

    if (!email || !name) {
      this.notificationService.show('Enter a list name', 'error');
      return;
    }

    this.favouriteService.createList(name, email); // ✅ FIX
    this.newListName.set('');
  }

  deleteList(listId: string) {
    const email = this.authService.currentUser()?.email;
    if (!email) return;

    this.favouriteService.deleteList(listId, email); // ✅ FIX
  }

  getTripsForList(list: FavouriteList): Trip[] {
    return this.trips().filter(trip => list.tripIds.includes(trip.id));
  }

  removeTrip(listId: string, tripId: string) {
    const email = this.authService.currentUser()?.email;
    if (!email) return;

    this.favouriteService.removeTripFromList(listId, tripId, email); // ✅ FIX
  }
}