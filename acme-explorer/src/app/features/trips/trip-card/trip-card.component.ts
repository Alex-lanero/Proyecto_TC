import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Trip } from '../trip.model';
import { DifficultyPipe } from '../../../shared/pipes/difficulty-pipe';
import { TranslatePipe } from '../../../shared/pipes/translate-pipe';


@Component({
  selector: 'app-trip-card',
  standalone: true,
  imports: [CommonModule, DifficultyPipe, TranslatePipe],
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