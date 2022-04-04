import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EKalyAdminAjoutRestaurantComponent } from './e-kaly-admin-ajout-restaurant.component';

describe('EKalyAdminAjoutRestaurantComponent', () => {
  let component: EKalyAdminAjoutRestaurantComponent;
  let fixture: ComponentFixture<EKalyAdminAjoutRestaurantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EKalyAdminAjoutRestaurantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EKalyAdminAjoutRestaurantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
