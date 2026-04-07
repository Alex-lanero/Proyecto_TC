import { Entity } from '../../../shared/models/entity.model';

export type ApplicationStatus = 'PENDING' | 'REJECTED' | 'DUE' | 'ACCEPTED';

export interface Application extends Entity {
  tripId: string;
  explorerId: string;

  moment: Date;
  status: ApplicationStatus;

  comments?: string;
  rejectReason?: string;
}