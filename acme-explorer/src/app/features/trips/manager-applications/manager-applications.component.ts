// src/app/features/trips/manager-applications/manager-applications.component.ts
import { Component, OnInit, inject, signal } from '@angular/core';
import { ApplicationService } from '../../../core/services/application.service';
import { Application } from '../../trips/application.model';  // Ensure you have this model
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-manager-applications',
  templateUrl: './manager-applications.component.html',
  styleUrls: ['./manager-applications.component.scss'],
  imports: [CommonModule]
})
export class ManagerApplicationsComponent implements OnInit {
  private applicationService = inject(ApplicationService);

  applications = signal<Application[]>([]); // Usamos signal() para almacenar las applications
  loading = true;

  ngOnInit(): void {
    this.loadApplications();
  }

  loadApplications(): void {
    this.applicationService.getAllApplications().subscribe(data => {
      this.applications.set(data);  // Cargamos las applications en el signal
      this.loading = false;  // Actualizamos el estado a 'false' cuando los datos se cargan
    });
  }

  acceptApplication(application: Application): void {
    this.applicationService.updateApplicationStatus(application.id, 'ACCEPTED').subscribe(() => {
      application.status = 'ACCEPTED';  // Actualizamos el estado en la UI inmediatamente
    });
  }

  rejectApplication(application: Application): void {
    this.applicationService.updateApplicationStatus(application.id, 'REJECTED').subscribe(() => {
      application.status = 'REJECTED';  // Actualizamos el estado en la UI inmediatamente
    });
  }
}