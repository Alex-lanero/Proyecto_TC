import { Component, OnInit, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationService } from '../../../core/services/application.service';
import { AuthService } from '../../../core/services/auth.service';
import { Application } from '../models/application.model';
import { TripService } from '../../../core/services/trip.service';
import { Trip } from '../models/trip.model';

@Component({
  selector: 'app-explorer-applications',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './explorer-applications.component.html',
  styleUrl: './explorer-applications.component.scss'
})
export class ExplorerApplicationsComponent implements OnInit {

  objectKeys = Object.keys;

  applications = signal<Application[]>([]);
  trips = signal<Trip[]>([]);

  constructor(
    private applicationService: ApplicationService,
    private tripService: TripService,
    public authService: AuthService
  ) {
    this.applications = this.applicationService.applications;
    this.trips = this.tripService.trips;
  }

  ngOnInit() {
    this.applicationService.loadApplications();
    this.tripService.loadTrips();
  }

  myApplications = computed(() => {
    return this.applications().filter(
      app => app.explorerId === this.authService.currentUser()?.email
    );
  });

  // 🔹 agrupación por estado
  groupedApplications = computed(() => {
    const groups: Record<string, Application[]> = {};

    this.myApplications().forEach(app => {
      if (!groups[app.status]) {
        groups[app.status] = [];
      }
      groups[app.status].push(app);
    });

    return groups;
  });

  // 🔹 obtener nombre del trip
  getTripTitle(tripId: string): string {
    const trip = this.trips().find(t => t.id === tripId);
    return trip ? trip.title : 'Unknown trip';
  }

  pay(app: Application) {
    this.applicationService.payApplication(app.id);
  }

  cancel(app: Application) {
    this.applicationService.cancelApplication(app.id);
  }

}