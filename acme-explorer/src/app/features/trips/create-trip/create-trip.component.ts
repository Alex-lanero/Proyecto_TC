import { Component, signal, computed, OnInit, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TripService } from '../../../core/services/trip.service';
import { AuthService } from '../../../core/services/auth.service';
import { Stage } from '../models/stage.model';
import { Trip } from '../models/trip.model';
import { ActivatedRoute } from '@angular/router';
import { NotificationService } from '../../../core/services/notification.service';

@Component({
  selector: 'app-create-trip',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-trip.component.html',
  styleUrl: './create-trip.component.scss'
})
export class CreateTripComponent implements OnInit{

  constructor(
    private tripService: TripService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private notificationService: NotificationService
  ) {}

  // 🔹 campos
  isEditMode = signal(false);
  editingTripId: string | null = null;
  title = signal('');
  description = signal('');
  city = signal('');
  country = signal('');
  difficulty = signal<'easy' | 'medium' | 'hard'>('easy');
  maxParticipants = signal(10);
  startDate = signal('');
  endDate = signal('');
  pictures = signal<string>('');

  // 🔹 stages dinámicos
  stages = signal<Stage[]>([]);

  // 🔹 precio automático
  totalPrice = computed(() =>
    this.stages().reduce((sum, s) => sum + s.price, 0)
  );

  ngOnInit() {

    const id = this.route.snapshot.paramMap.get('id');

    if (!id) return;

    this.isEditMode.set(true);
    this.editingTripId = id;

    this.tripService.loadTrips();

    const check = setInterval(() => {

      const trips = this.tripService.trips();

      if (!trips || trips.length === 0) return;

      const trip = trips.find(t => t.id === id);

      if (!trip) return;

      // 🔥 rellenar form
      this.title.set(trip.title);
      this.description.set(trip.description);
      this.city.set(trip.city);
      this.country.set(trip.country);
      this.difficulty.set(trip.difficulty);
      this.maxParticipants.set(trip.maxParticipants);

      this.startDate.set(
        new Date(trip.startDate).toISOString().substring(0, 10)
      );
      this.endDate.set(
        new Date(trip.endDate).toISOString().substring(0, 10)
      );

      this.pictures.set(trip.pictures?.[0] || '');
      this.stages.set(trip.stages || []);

      clearInterval(check); // 🔥 clave

    }, 100);

  }

  addStage() {
    this.stages.set([
      ...this.stages(),
      {
        id: Date.now().toString(),
        version: 1,
        title: '',
        description: '',
        price: 0
      }
    ]);
  }

  updateStage(index: number, field: string, value: any) {
    const updated = [...this.stages()];
    (updated[index] as any)[field] = field === 'price' ? +value : value;
    this.stages.set(updated);
  }

  removeStage(index: number) {
    const updated = [...this.stages()];
    updated.splice(index, 1);
    this.stages.set(updated);
  }

  // 🔥 ticker automático
  generateTicker(): string {
    const now = new Date();

    const y = now.getFullYear().toString().slice(-2);
    const m = String(now.getMonth() + 1).padStart(2, '0');
    const d = String(now.getDate()).padStart(2, '0');

    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let random = '';
    for (let i = 0; i < 4; i++) {
      random += letters[Math.floor(Math.random() * 26)];
    }

    return `${y}${m}${d}-${random}`;
  }

  createTrip() {

    // ❌ VALIDACIÓN FECHAS
    if (new Date(this.endDate()) < new Date(this.startDate())) {
      this.notificationService.show('End date must be after start date', 'error');
      return;
    }

    // ❌ VALIDACIÓN PRECIOS
    if (this.stages().some(s => s.price < 0)) {
      this.notificationService.show('Stage price cannot be negative', 'error');
      return;
    }

    // ❌ VALIDACIÓN FORM
    if (!this.isFormValid()) {
      this.notificationService.show('Please fill all required fields', 'error');
      return;
    }

    const existingTrip = this.tripService.trips()
      .find(t => t.id === this.editingTripId);

    const trip: Trip = {
      id: this.isEditMode() ? this.editingTripId! : Date.now().toString(),
      version: 1,

      ticker: this.isEditMode()
        ? existingTrip?.ticker || this.generateTicker()
        : this.generateTicker(),

      title: this.title(),
      description: this.description(),

      price: this.totalPrice(),

      city: this.city(),
      country: this.country(),

      difficulty: this.difficulty(),

      maxParticipants: this.maxParticipants(),

      startDate: new Date(this.startDate()),
      endDate: new Date(this.endDate()),

      managerId: this.authService.currentUser()?.id || '',

      stages: this.stages(),

      pictures: this.pictures() ? [this.pictures()] : [],

      // 🔥 CLAVE
      cancelled: this.isEditMode()
        ? existingTrip?.cancelled || false
        : false
    };

    if (this.isEditMode()) {
      this.tripService.updateTrip(trip);
      this.notificationService.show('Trip updated', 'success');
    } else {
      this.tripService.createTrip(trip);
      this.notificationService.show('Trip created', 'success');
    }
  }

  hasUnsavedChanges(): boolean {
    return !!this.title() || 
          !!this.description() || 
          this.stages().length > 0;
  }

  isFormValid(): boolean {
    return this.title().trim() !== '' &&
          this.description().trim() !== '' &&
          this.city().trim() !== '' &&
          this.country().trim() !== '' &&
          this.startDate() !== '' &&
          this.endDate() !== '' &&
          this.stages().length > 0 &&
          this.stages().every(s => 
            s.title.trim() !== '' &&
            s.price > 0
          );
  }
}