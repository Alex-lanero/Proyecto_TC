import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TripDisplay } from './trip-display.component';
import { TripService } from '../../../core/services/trip.service';
import { ApplicationService } from '../../../core/services/application.service';
import { AuthService } from '../../../core/services/auth.service';
import { of } from 'rxjs';
import { signal } from '@angular/core';
import { provideRouter } from '@angular/router';

describe('TripDisplayComponent', () => {

  let component: TripDisplay;
  let fixture: ComponentFixture<TripDisplay>;

  let mockTripService: any;
  let mockApplicationService: any;
  let mockAuthService: any;

  beforeEach(async () => {

    mockTripService = {
      trips: signal([
        {
          id: '1',
          title: 'Test Trip',
          description: 'Nice trip',
          price: 100,
          city: 'Paris',
          country: 'France',
          difficulty: 'easy',
          maxParticipants: 10,
          startDate: new Date(),
          endDate: new Date(),
          ticker: 'TEST-1',
          managerId: 'manager@test.com',
          stages: [],
          pictures: [''],
          cancelled: false
        }
      ]),
      loadTrips: vi.fn()
    };

    mockApplicationService = {
      applications: signal([]),
      loadApplications: vi.fn(),
      createApplication: vi.fn()
    };

    mockAuthService = {
      isExplorer: () => true,
      isManager: () => false,
      isAnonymous: () => false,
      currentUser: () => ({ email: 'explorer@test.com' })
    };

    await TestBed.configureTestingModule({
      imports: [TripDisplay],
      providers: [
        provideRouter([]),
        { provide: TripService, useValue: mockTripService },
        { provide: ApplicationService, useValue: mockApplicationService },
        { provide: AuthService, useValue: mockAuthService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TripDisplay);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // 🔥 TEST 1
  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  // 🔥 TEST 2
  it('should load trips on init', () => {
    expect(mockTripService.loadTrips).toHaveBeenCalled();
  });

  // 🔥 TEST 3
  it('should display trips', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Test Trip');
  });

  // 🔥 TEST 5
  it('should filter trips by difficulty', () => {

    component.selectedDifficulty.set('easy');

    const trips = component.filteredTrips();

    expect(trips.length).toBe(1);
  });

  // 🔥 TEST 6
  it('should hide cancelled trips for explorer', () => {

    mockTripService.trips.set([
      {
        ...mockTripService.trips()[0],
        cancelled: true
      }
    ]);

    const trips = component.filteredTrips();

    expect(trips.length).toBe(0);
  });

  // ✅ d) APPLY VALID
  it('should apply to valid trip', () => {

    const trip = {
      id: '1',
      cancelled: false,
      startDate: new Date('2030-01-01')
    } as any;

    component.applyToTrip(trip);

    expect(mockApplicationService.createApplication).toHaveBeenCalled();
  });


  // ❌ e) APPLY INVALID (past trip)
  it('should NOT apply to past trip', () => {

    const trip = {
      id: '1',
      cancelled: false,
      startDate: new Date('2020-01-01')
    } as any;

    component.applyToTrip(trip);

    expect(mockApplicationService.createApplication).not.toHaveBeenCalled();
  });

});