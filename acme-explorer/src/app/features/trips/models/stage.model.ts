import { Entity } from '../../../shared/models/entity.model';

export interface Stage extends Entity {
  title: string;
  description: string;
  price: number;
}