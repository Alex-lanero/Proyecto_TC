import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { ApplicationService } from '../../../core/services/application.service';
import { Application } from '../application.model';  // Ensure you have this model
import { DatePipe } from '@angular/common'; // For date formatting
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-explorer-applications',
  templateUrl: './explorer-applications.component.html',
  styleUrls: ['./explorer-applications.component.scss'],
  imports: [CommonModule, RouterLink],
  providers: [DatePipe]  // Include DatePipe in providers
})
export class ExplorerApplicationsComponent implements OnInit {

  applications: Application[] = [];

  // Inject services
  private authService = inject(AuthService);
  private applicationService = inject(ApplicationService);

  ngOnInit(): void {
    const explorerId = this.authService.currentUser();
    if (explorerId) {
      this.applicationService.getApplicationsByExplorer(explorerId).subscribe((data: Application[]) => {
        this.applications = data;
      });
    } else {
      console.error('Explorer ID is missing');
    }
  }
}