// src/app/core/services/application.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Application } from '../../features/trips/application.model';

@Injectable({
  providedIn: 'root',
})
export class ApplicationService {
  private apiUrl = 'http://localhost:3000/applications'; // JSON Server endpoint

  constructor(private http: HttpClient) {}

  // Crear una nueva application
  createApplication(application: Application): Observable<Application> {
    return this.http.post<Application>(this.apiUrl, application);
  }

  // Obtener todas las applications para un explorer
  getApplicationsByExplorer(explorerId: string): Observable<Application[]> {
    console.log(explorerId)
    return this.http.get<Application[]>(`${this.apiUrl}?explorerId=${explorerId}`);
  }

  // Obtener todas las applications para una trip (como manager)
  getApplicationsByTrip(tripId: string): Observable<Application[]> {
    return this.http.get<Application[]>(`${this.apiUrl}?tripId=${tripId}`);
  }

  // Actualizar el estado de una application
  updateApplicationStatus(id: string, status: 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'DUE'): Observable<Application> {
    return this.http.patch<Application>(`${this.apiUrl}/${id}`, { status });
  }
}