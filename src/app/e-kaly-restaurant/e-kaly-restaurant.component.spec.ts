import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EKalyRestaurantComponent } from './e-kaly-restaurant.component';

describe('EKalyRestaurantComponent', () => {
  let component: EKalyRestaurantComponent;
  let fixture: ComponentFixture<EKalyRestaurantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EKalyRestaurantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EKalyRestaurantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
