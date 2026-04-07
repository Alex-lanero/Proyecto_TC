import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationService } from '../../../core/services/application.service';
import { Application } from '../models/application.model';
import { TripService } from '../../../core/services/trip.service';
import { Trip } from '../models/trip.model';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-manager-applications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './manager-applications.component.html',
  styleUrl: './manager-applications.component.scss'
})
export class ManagerApplicationsComponent implements OnInit {

  applications = signal<Application[]>([]);
  trips = signal<Trip[]>([]);

  constructor(
    private applicationService: ApplicationService,
    private tripService: TripService,
    private authService: AuthService
  ) {
    this.applications = this.applicationService.applications;
    this.trips = this.tripService.trips;
  }

  ngOnInit() {
    this.applicationService.loadApplications();
    this.tripService.loadTrips();
  }

  filteredApplications = computed(() => {
    const managerId = this.authService.currentUser()?.id;

    const myTrips = this.trips().filter(
      t => t.managerId === managerId
    );

    const myTripIds = myTrips.map(t => t.id);

    return this.applications().filter(
      app => myTripIds.includes(app.tripId)
    );
  });

  reject(app: Application) {
    const trip = this.trips().find(t => t.id === app.tripId);

    if (trip?.managerId !== this.authService.currentUser()?.id) {
      alert('Not your trip');
      return;
    }

    this.applicationService.updateStatus(app.id, 'REJECTED');
  }

  markDue(app: Application) {
    const trip = this.trips().find(t => t.id === app.tripId);

    if (trip?.managerId !== this.authService.currentUser()?.id) {
      alert('Not your trip');
      return;
    }

    this.applicationService.updateStatus(app.id, 'DUE');
  }

  getTripTitle(tripId: string): string {
    const trip = this.trips().find(t => t.id === tripId);
    return trip ? trip.title : 'Unknown trip';
  }
}