import { Component, OnInit, inject } from '@angular/core';
import { ApplicationService } from '../../../core/services/application.service';
import { ActivatedRoute } from '@angular/router';
import { Application } from '../../trips/application.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-manager-applications',
  templateUrl: './manager-applications.component.html',
  imports: [CommonModule],
  styleUrls: ['./manager-applications.component.scss']
})
export class ManagerApplicationsComponent implements OnInit {
  private applicationService = inject(ApplicationService);
  private route = inject(ActivatedRoute);

  tripId: string = '';
  applications: Application[] = [];

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.tripId = params.get('id')!;  // Capturamos el tripId desde la URL
      this.loadApplications();
    });
  }

  loadApplications(): void {
    this.applicationService.getApplicationsByTrip(this.tripId).subscribe(data => {
      this.applications = data;
    });
  }

  acceptApplication(application: Application): void {
    this.applicationService.updateApplicationStatus(application.id, 'ACCEPTED').subscribe(() => {
      application.status = 'ACCEPTED';
    });
  }

  rejectApplication(application: Application): void {
    this.applicationService.updateApplicationStatus(application.id, 'REJECTED').subscribe(() => {
      application.status = 'REJECTED';
    });
  }
}