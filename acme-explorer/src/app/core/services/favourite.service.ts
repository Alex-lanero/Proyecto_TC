import { Injectable, signal } from '@angular/core';
import { FavouriteList } from '../../features/trips/models/favourite-list.model';

@Injectable({
  providedIn: 'root'
})
export class FavouriteService {

  private storageKey(email: string) {
    return `favourites_${email}`;
  }

  favouriteLists = signal<FavouriteList[]>([]);

  load(email: string) {
    const raw = localStorage.getItem(this.storageKey(email));
    const data: FavouriteList[] = raw ? JSON.parse(raw) : [];
    this.favouriteLists.set(data);
  }

  save(email: string) {
    localStorage.setItem(
      this.storageKey(email),
      JSON.stringify(this.favouriteLists())
    );
  }

  createList(email: string, name: string) {
    const newList: FavouriteList = {
      id: Date.now().toString(),
      name,
      tripIds: []
    };

    this.favouriteLists.set([...this.favouriteLists(), newList]);
    this.save(email);
  }

  deleteList(email: string, listId: string) {
    this.favouriteLists.set(
      this.favouriteLists().filter(list => list.id !== listId)
    );
    this.save(email);
  }

  addTripToList(email: string, listId: string, tripId: string) {
    const updated = this.favouriteLists().map(list => {
      if (list.id !== listId) return list;
      if (list.tripIds.includes(tripId)) return list;

      return {
        ...list,
        tripIds: [...list.tripIds, tripId]
      };
    });

    this.favouriteLists.set(updated);
    this.save(email);
  }

  removeTripFromList(email: string, listId: string, tripId: string) {
    const updated = this.favouriteLists().map(list => {
      if (list.id !== listId) return list;

      return {
        ...list,
        tripIds: list.tripIds.filter(id => id !== tripId)
      };
    });

    this.favouriteLists.set(updated);
    this.save(email);
  }

  isTripInAnyList(tripId: string): boolean {
    return this.favouriteLists().some(list => list.tripIds.includes(tripId));
  }
}