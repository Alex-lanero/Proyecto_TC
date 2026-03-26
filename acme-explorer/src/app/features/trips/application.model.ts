// src/app/features/trips/application.model.ts

export interface Application {
  id: string;
  tripId: string;         // Relación con la trip
  explorerId: string;     // Relación con el usuario (explorer)
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'DUE';
  comments?: string;      // Comentarios del manager
  rejectionReason?: string;  // Motivo de rechazo (si aplica)
  createdAt: string;      // Fecha de creación
}