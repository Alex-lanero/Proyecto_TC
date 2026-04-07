import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Application } from '../../features/trips/models/application.model';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  private apiUrl = 'http://localhost:3000/applications';

  applications = signal<Application[]>([]);

  constructor(private http: HttpClient) {}

  loadApplications() {
    this.http.get<Application[]>(this.apiUrl).subscribe(data => {
      this.applications.set(data);
    });
  }

  createApplication(tripId: string, explorerId: string) {

    const existing = this.applications().find(app =>
      app.tripId === tripId &&
      app.explorerId === explorerId &&
      app.status !== 'REJECTED'
    );

    if (existing) {
      alert('You already applied to this trip');
      return;
    }

    const newApp = {
      id: Date.now().toString(),
      version: 1,
      tripId,
      explorerId,
      moment: new Date(),
      status: 'PENDING',
      comments: ''
    };

    this.http.post(this.apiUrl, newApp).subscribe(() => {
      this.loadApplications();
    });
  }

  updateStatus(applicationId: string, status: string) {
    this.http.patch(`${this.apiUrl}/${applicationId}`, {
      status
    }).subscribe(() => {
      this.loadApplications();
    });
  }

  payApplication(applicationId: string) {
    this.updateStatus(applicationId, 'ACCEPTED');
  }

  cancelApplication(applicationId: string) {
    this.http.delete(`${this.apiUrl}/${applicationId}`).subscribe(() => {
      this.loadApplications();
    });
  }
}