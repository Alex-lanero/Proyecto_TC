import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationService } from '../../../core/services/application.service';
import { AuthService } from '../../../core/services/auth.service';
import { Application } from '../models/application.model';
import { TripService } from '../../../core/services/trip.service';
import { Trip } from '../models/trip.model';

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

  reject(app: Application) {
    this.applicationService.updateStatus(app.id, 'REJECTED');
  }

  markDue(app: Application) {
    this.applicationService.updateStatus(app.id, 'DUE');
  }

  getTripTitle(tripId: string): string {
    const trip = this.trips().find(t => t.id === tripId);
    return trip ? trip.title : 'Unknown trip';
  }

  filteredApplications = computed(() => {

    const managerId = this.authService.currentUser()?.id;

    // 1. coger trips del manager
    const myTrips = this.trips().filter(
      t => t.managerId === managerId
    );

    const myTripIds = myTrips.map(t => t.id);

    // 2. filtrar applications de esos trips
    return this.applications().filter(
      app => myTripIds.includes(app.tripId)
    );

  });
}