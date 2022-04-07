import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EKalyRestaurantPlatComponent } from './e-kaly-restaurant-plat.component';

describe('EKalyRestaurantPlatComponent', () => {
  let component: EKalyRestaurantPlatComponent;
  let fixture: ComponentFixture<EKalyRestaurantPlatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EKalyRestaurantPlatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EKalyRestaurantPlatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
