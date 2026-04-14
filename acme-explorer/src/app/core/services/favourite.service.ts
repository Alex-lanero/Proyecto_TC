import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FavouriteList } from '../../shared/models/favourite-list.model';

@Injectable({
  providedIn: 'root'
})
export class FavouriteService {

  private apiUrl = 'http://localhost:3000/favouriteLists';

  favouriteLists = signal<FavouriteList[]>([]);

  constructor(private http: HttpClient) {}

  loadLists(email: string) {
    this.http.get<FavouriteList[]>(`${this.apiUrl}?explorerId=${email}`)
      .subscribe(data => {
        this.favouriteLists.set(data);
      });
  }

  createList(name: string, email: string) {

    const newList: FavouriteList = {
      id: Date.now().toString(),
      name,
      explorerId: email,
      tripIds: []
    };

    this.http.post(this.apiUrl, newList)
      .subscribe(() => this.loadLists(email));
  }

  addTripToList(listId: string, tripId: string, email: string) {

    const list = this.favouriteLists().find(l => l.id === listId);
    if (!list) return;

    if (list.tripIds.includes(tripId)) return;

    const updated: FavouriteList = {
      ...list,
      tripIds: [...list.tripIds, tripId]
    };

    this.http.put(`${this.apiUrl}/${listId}`, updated)
      .subscribe(() => this.loadLists(email));
  }

  removeTripFromList(listId: string, tripId: string, email: string) {

    const list = this.favouriteLists().find(l => l.id === listId);
    if (!list) return;

    const updated: FavouriteList = {
      ...list,
      tripIds: list.tripIds.filter((id: string) => id !== tripId)
    };

    this.http.put(`${this.apiUrl}/${listId}`, updated)
      .subscribe(() => this.loadLists(email));
  }

  isFavourite(tripId: string): boolean {
    return this.favouriteLists()
      .some(list => list.tripIds.includes(tripId));
  }

  deleteList(listId: string, email: string) {
    this.http.delete(`http://localhost:3000/favouriteLists/${listId}`)
      .subscribe(() => this.loadLists(email));
  }
}