import { Entity } from '../../../shared/models/entity.model';
import { Stage } from './stage.model';

export type Difficulty = 'easy' | 'medium' | 'hard';

export interface Trip extends Entity {
  ticker: string;

  title: string;
  description: string;

  price: number;

  city: string;
  country: string;

  difficulty: 'easy' | 'medium' | 'hard';

  maxParticipants: number;

  startDate: Date;
  endDate: Date;

  managerId: string;

  stages?: Stage[];

  pictures?: string[];

  cancelled?: boolean;
  cancelReason?: string;
}