import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EKalyAdminRestaurantComponent } from './e-kaly-admin-restaurant.component';

describe('EKalyAdminRestaurantComponent', () => {
  let component: EKalyAdminRestaurantComponent;
  let fixture: ComponentFixture<EKalyAdminRestaurantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EKalyAdminRestaurantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EKalyAdminRestaurantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
