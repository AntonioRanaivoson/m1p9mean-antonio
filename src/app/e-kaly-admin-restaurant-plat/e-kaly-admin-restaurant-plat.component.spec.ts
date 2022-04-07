import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EKalyAdminRestaurantPlatComponent } from './e-kaly-admin-restaurant-plat.component';

describe('EKalyAdminRestaurantPlatComponent', () => {
  let component: EKalyAdminRestaurantPlatComponent;
  let fixture: ComponentFixture<EKalyAdminRestaurantPlatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EKalyAdminRestaurantPlatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EKalyAdminRestaurantPlatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
