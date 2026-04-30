import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateTripComponent } from './create-trip.component';
import { TripService } from '../../../core/services/trip.service';
import { AuthService } from '../../../core/services/auth.service';
import { provideRouter } from '@angular/router';
import { signal } from '@angular/core';

describe('CreateTripComponent', () => {

  let component: CreateTripComponent;
  let fixture: ComponentFixture<CreateTripComponent>;

  let mockTripService: any;
  let mockAuthService: any;

  beforeEach(async () => {

    mockTripService = {
      trips: signal([]), 
      createTrip: vi.fn(),
      updateTrip: vi.fn()
    };

    mockAuthService = {
      currentUser: () => ({ id: 'manager@test.com' })
    };

    await TestBed.configureTestingModule({
      imports: [CreateTripComponent],
      providers: [
        provideRouter([]),
        { provide: TripService, useValue: mockTripService },
        { provide: AuthService, useValue: mockAuthService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CreateTripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // ✅ a) VALID TRIP
  it('should create a trip with valid data', () => {

    component.title.set('Trip');
    component.description.set('Nice trip');
    component.city.set('Paris');
    component.country.set('France');
    component.startDate.set('2030-01-01');
    component.endDate.set('2030-01-10');

    component.stages.set([
      { id: '1', version: 1, title: 'Stage', description: '', price: 100 }
    ]);

    component.createTrip();

    expect(mockTripService.createTrip).toHaveBeenCalled();
  });

  // ❌ b) INVALID DATES
  it('should fail if endDate < startDate', () => {

    component.startDate.set('2030-01-10');
    component.endDate.set('2030-01-01');

    component.createTrip();

    expect(mockTripService.createTrip).not.toHaveBeenCalled();
  });

  // ❌ c) INVALID PRICE
  it('should fail if stage price is negative', () => {

    component.startDate.set('2030-01-01');
    component.endDate.set('2030-01-10');

    component.stages.set([
      { id: '1', version: 1, title: 'Stage', description: '', price: -10 }
    ]);

    component.createTrip();

    expect(mockTripService.createTrip).not.toHaveBeenCalled();
  });

});