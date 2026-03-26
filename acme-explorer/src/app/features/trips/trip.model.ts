import { Entity } from "../../shared/entity.model";
import { Stage } from "./stage.model";

export interface Trip extends Entity {
  ticker: string;
  title: string;
  description: string;

  price: number;

  city: string;
  country: string;

  difficulty: 'easy' | 'medium' | 'hard';

  maxParticipants: number;

  startDate: string;
  endDate: string;

  pictures?: string[];

  cancelled?: boolean;
  cancellationReason?: string;

  role: 'user' | 'admin';
  stages: Stage[];
}