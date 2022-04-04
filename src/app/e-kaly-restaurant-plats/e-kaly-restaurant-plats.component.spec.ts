import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EKalyRestaurantPlatsComponent } from './e-kaly-restaurant-plats.component';

describe('EKalyRestaurantPlatsComponent', () => {
  let component: EKalyRestaurantPlatsComponent;
  let fixture: ComponentFixture<EKalyRestaurantPlatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EKalyRestaurantPlatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EKalyRestaurantPlatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
