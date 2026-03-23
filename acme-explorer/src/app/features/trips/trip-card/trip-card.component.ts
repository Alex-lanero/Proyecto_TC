import { Component, Input } from '@angular/core';
import { Trip } from '../trip.model';

@Component({
  selector: 'app-trip-card',
  standalone: true,
  templateUrl: './trip-card.component.html',
})
export class TripCardComponent {
  @Input() trip!: Trip;
}