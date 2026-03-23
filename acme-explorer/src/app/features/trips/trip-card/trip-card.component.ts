import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Trip } from '../trip.model';

@Component({
  selector: 'app-trip-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './trip-card.component.html',
  styleUrl: './trip-card.component.scss',
})
export class TripCardComponent {
  @Input() trip!: Trip;
  @Output() cancel = new EventEmitter<Trip>();

  onCancel() {
    this.cancel.emit(this.trip);
  }
}