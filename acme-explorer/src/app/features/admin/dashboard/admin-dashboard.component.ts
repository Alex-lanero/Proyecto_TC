import { Component, OnInit, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TripService } from '../../../core/services/trip.service';
import { ApplicationService } from '../../../core/services/application.service';
import { Trip } from '../../trips/models/trip.model';
import { Application } from '../../trips/models/application.model';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent implements OnInit {

  trips = signal<Trip[]>([]);
  applications = signal<Application[]>([]);
  newManagerEmail = signal('');
  newManagerPassword = signal('');

  constructor(
    private tripService: TripService,
    private applicationService: ApplicationService,
    private http: HttpClient,
    private notificationService: NotificationService
  ) {
    this.trips = this.tripService.trips;
    this.applications = this.applicationService.applications;
  }

  ngOnInit() {
    this.tripService.loadTrips();
    this.applicationService.loadApplications();
  }

  // 🔹 métricas básicas
  totalTrips = computed(() => this.trips().length);

  totalApplications = computed(() => this.applications().length);

  // 🔹 ratio por estado
  applicationsByStatus = computed(() => {
    const result: Record<string, number> = {};

    this.applications().forEach(app => {
      result[app.status] = (result[app.status] || 0) + 1;
    });

    return result;
  });

  createManager() {

    const email = this.newManagerEmail();
    const password = this.newManagerPassword();

    if (!email || !password) {
      this.notificationService.show('Fill all fields', 'error');
      return;
    }

    const newUser = {
      id: Date.now().toString(),
      email,
      password,
      role: 'manager'
    };

    this.http.post('http://localhost:3000/users', newUser)
      .subscribe(() => {
        this.notificationService.show('Manager created', 'success');

        this.newManagerEmail.set('');
        this.newManagerPassword.set('');
      });
  }

  objectKeys = Object.keys;
}